<script lang="ts">
  import type { DurationsResult, WakaDuration } from '$src/types/wakatime'
  import dayjs from 'dayjs'
  import * as echarts from 'echarts'
  import groupBy from 'lodash/groupBy'
  import orderBy from 'lodash/orderBy'
  import { afterUpdate, onMount } from 'svelte'
  import ChartContainer from './ChartContainer.svelte'
  import ChartTitle from './ChartTitle.svelte'
  import { DateFormat, formatTime, secPerHour, secPerMin } from '$lib/helpers/timeHelpers'
  import DailyTitleContent from './BarChart/DailyTitleContent.svelte'
  import DailyChartControls from './BarChart/DailyChartControls.svelte'
  import { ChartColor } from '$lib/helpers/chartHelpers'

  const languageToColor = {
    Svelte: '#EB5027',
    TypeScript: '#3075C0',
    HTML: '#EA6328',
    INI: '#B9B9B9',
    Other: '#FAFAFA',
    TSConfig: '#7D7DEB',
    Python: '#376D9D',
    SCSS: '#C76496',
    Markdown: '#000000',
    JSON: '#7D7D7D',
    Ruby: '#AA1401',
    CSS: '#2A65F1',
    Bash: '#44B050',
    YAML: '#F8CA3E',
    LESS: '#2C4E85',
    'Vue.js': '#3EB480',
    'Git Config': '#E94D31',
    Astro: '#583085',
    Text: '#F8F8F8',
    Docker: '#2596ED',
    GraphQL: '#DA32A4',
    Git: '#E94D31',
    SQL: '#D16F30',
  }

  export let durations: DurationsResult
  export let title = 'Context Switch'
  export let itemType: Extract<keyof WakaDuration, 'project' | 'language'>

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts
  let option: echarts.EChartsOption

  $: startTime = dayjs(durations.start).unix()
  $: date = dayjs(durations.start).format(DateFormat.Shortish)
  $: itemNames = [...new Set(durations.data.map((duration) => duration[itemType]))]
  $: durationsByItemNameDict = groupBy(durations.data, itemType)
  $: itemNamesSorted = orderBy(itemNames, (name) =>
    durationsByItemNameDict[name].reduce((acc, cur) => cur.duration + acc, 0),
  ).filter(
    (name) =>
      durationsByItemNameDict[name].reduce((acc, cur) => cur.duration + acc, 0) >= secPerMin,
  )
  $: data = itemNamesSorted.flatMap((name, index) =>
    durationsByItemNameDict[name]
      .filter((duration) => duration.duration >= secPerMin)
      .map(({ time, duration, color }) => ({
        name,
        value: [
          index,
          Math.floor(time),
          Math.floor(time + duration),
          Math.floor(time + duration) - Math.floor(time),
          itemType === 'project' ? color : languageToColor[name as keyof typeof languageToColor],
        ],
      })),
  )

  // @ts-expect-error tough type
  $: option = {
    tooltip: {
      formatter: function (params) {
        // @ts-expect-error tough type
        return params.marker + params.name + ': ' + formatTime(params.value[3])
      },
    },
    grid: {
      left: 30,
      right: 30,
    },
    xAxis: {
      min: startTime,
      type: 'time',
      axisLine: {
        show: true,
      },
      axisLabel: {
        color: ChartColor.Text,
        formatter: function (val: number) {
          return Math.floor(Math.max(0, val - startTime) / secPerHour) + 'h'
        },
      },
    },
    yAxis: {
      data: itemNamesSorted,
      type: 'category',
      zlevel: 10,
      axisLabel: {
        color: ChartColor.Text,
        inside: true,
        fontSize: 14,
        fontFamily: 'monospace',
        textShadowColor: ChartColor.Text,
        textShadowBlur: 1,
      },
    },
    series: [
      {
        type: 'custom',
        renderItem: (params, api) => {
          const categoryIndex = api.value(0)
          const start = api.coord([api.value(1), categoryIndex])
          const end = api.coord([api.value(2), categoryIndex])
          // @ts-expect-error no clue
          const height = api.size([0, 1])[1] * 0.6
          const rectShape = echarts.graphic.clipRectByRect(
            {
              x: start[0],
              y: start[1] - height / 2,
              width: end[0] - start[0],
              height: height,
            },
            {
              // @ts-expect-error no clue
              x: params.coordSys.x,
              // @ts-expect-error no clue
              y: params.coordSys.y,
              // @ts-expect-error no clue
              width: params.coordSys.width,
              // @ts-expect-error no clue
              height: params.coordSys.height,
            },
          )
          return (
            rectShape && {
              type: 'rect',
              transition: ['shape'],
              shape: rectShape,
              style: {
                fill: api.value(4),
                stroke: api.value(4),
                lineWidth: 2,
                opacity: 0.7,
              },
            }
          )
        },
        itemStyle: {
          opacity: 0.4,
        },
        encode: {
          x: [1, 2],
          y: 0,
        },
        data: data,
      },
    ],
  }

  onMount(() => {
    chart = echarts.init(chartRef)
    const handleResize = () => chart.resize()
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      chart.dispose()
      window.removeEventListener('resize', handleResize)
    }
  })

  afterUpdate(() => chart.setOption(option))

  const onUpdate = (e: CustomEvent) => (durations = e.detail)
</script>

<ChartContainer>
  <ChartTitle>
    <DailyTitleContent {title} {date} />
  </ChartTitle>
  <DailyChartControls {durations} {itemType} on:update={onUpdate} />
  <div bind:this={chartRef} class="h-96 w-full" />
</ChartContainer>
