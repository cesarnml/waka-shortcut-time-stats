<script lang="ts">
  import type { DurationsResult, WakaDuration } from '$src/types/wakatime'
  import dayjs from 'dayjs'
  import * as echarts from 'echarts'
  import groupBy from 'lodash/groupBy'
  import orderBy from 'lodash/orderBy'
  import { afterUpdate, onMount } from 'svelte'
  import ChartContainer from './ChartContainer.svelte'
  import ChartTitle from './ChartTitle.svelte'
  import { DateFormat, secPerHour, secPerMin } from '$lib/helpers/timeHelpers'
  import DailyTitleContent from './BarChart/DailyTitleContent.svelte'
  import DailyChartControls from './BarChart/DailyChartControls.svelte'
  import { ChartColor } from '$lib/helpers/chartHelpers'

  const MIN_DURATION = 20 * secPerMin
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
  $: filteredAndSortedItemNames = orderBy(itemNames, (item) =>
    durationsByItemNameDict[item].reduce((acc, cur) => cur.duration + acc, 0),
  ).filter(
    (item) =>
      durationsByItemNameDict[item].reduce((acc, cur) => cur.duration + acc, 0) > MIN_DURATION,
  )
  $: data = filteredAndSortedItemNames.flatMap((name, index) =>
    durationsByItemNameDict[name].map(({ time, duration, color }) => ({
      name,
      value: [
        index,
        Math.floor(time),
        Math.floor(time + duration),
        Math.floor(time + duration) - Math.floor(time),
      ],
      itemStyle: {
        color: color ?? ChartColor.Text,
      },
    })),
  )

  $: option = {
    tooltip: {
      formatter: function (params) {
        // @ts-expect-error tough type
        return params.marker + params.name + ': ' + Math.floor(params.value[3] / 60) + ' min'
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
        color: '#fafafa',
        formatter: function (val: number) {
          return Math.floor(Math.max(0, val - startTime) / secPerHour) + 'h'
        },
      },
    },
    yAxis: {
      data: filteredAndSortedItemNames,
      type: 'category',
      zlevel: 10,
      axisLabel: {
        color: '#fafafa',
        inside: true,
        fontSize: 14,
        fontFamily: 'monospace',
        textShadowColor: '#ffffff',
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
                fill: '#EB5027',
                stroke: '#EB5027',
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
  <DailyChartControls {durations} on:update={onUpdate} />
  <div bind:this={chartRef} class="h-96 w-full" />
</ChartContainer>
