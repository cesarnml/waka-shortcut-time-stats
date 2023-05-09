<script lang="ts">
  import { browser } from '$app/environment'
  import type { DurationsResult } from '$src/types/wakatime'
  import dayjs from 'dayjs'
  import * as echarts from 'echarts'
  import groupBy from 'lodash/groupBy'
  import orderBy from 'lodash/orderBy'
  import { onMount } from 'svelte'
  import ChartContainer from './ChartContainer.svelte'
  import ChartTitle from './ChartTitle.svelte'
  import { DateFormat, secPerMin } from '$lib/helpers/timeHelpers'
  import DailyTitleContent from './BarChart/DailyTitleContent.svelte'
  import DailyChartControls from './BarChart/DailyChartControls.svelte'
  import { ChartColor } from '$lib/helpers/chartHelpers'

  const MIN_DURATION = 20 * secPerMin
  export let durations: DurationsResult
  export let title = 'Context Switch'

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts
  let option: echarts.EChartsOption

  $: date = dayjs(durations.start).format(DateFormat.Shortish)
  $: projects = [...new Set(durations.data.map((duration) => duration.project))]
  $: durationsByProject = groupBy(durations.data, 'project')
  $: projectsByTotalDuration = orderBy(projects, (project) =>
    durationsByProject[project].reduce((acc, cur) => cur.duration + acc, 0),
  ).filter(
    (project) =>
      durationsByProject[project].reduce((acc, cur) => cur.duration + acc, 0) > MIN_DURATION,
  )

  $: {
    if (browser && chart && option) {
      const startTime = dayjs(durations.start).unix()
      const data: any[] = []

      projectsByTotalDuration.forEach((project, index) => {
        durationsByProject[project].forEach((duration) => {
          data.push({
            name: duration.project,
            value: [
              index,
              Math.floor(duration.time),
              Math.floor(duration.time + duration.duration),
              Math.floor(duration.duration),
            ],
            itemStyle: {
              color: duration.color ?? ChartColor.Text,
            },
          })
        })
      })

      option = {
        tooltip: {
          formatter: function (params) {
            // @ts-expect-error no clue
            return params.marker + params.name + ': ' + Math.floor(params.value[3] / 60) + ' min'
          },
        },
        dataZoom: [
          {
            type: 'slider',
            filterMode: 'weakFilter',
            showDataShadow: false,
            top: 400,
            labelFormatter: '',
          },
          {
            type: 'inside',
            filterMode: 'weakFilter',
          },
        ],
        grid: {
          height: 250,
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
              return Math.floor(Math.max(0, val - startTime) / 60 / 60) + 'h'
            },
          },
        },
        yAxis: {
          data: projectsByTotalDuration,
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
      chart.setOption(option)
    }
  }

  onMount(() => {
    chart = echarts.init(chartRef)

    window.addEventListener(
      'resize',
      function () {
        chart.resize()
      },
      { passive: true },
    )

    const startTime = dayjs(durations.start).unix()
    const data: any[] = []

    projectsByTotalDuration.forEach((project, index) => {
      durationsByProject[project].forEach((duration) => {
        data.push({
          name: duration.project,
          value: [
            index,
            Math.floor(duration.time),
            Math.floor(duration.time) + Math.floor(duration.duration),
            Math.floor(duration.duration),
          ],
          itemStyle: {
            color: duration.color ?? '#fff',
          },
        })
      })
    })

    option = {
      tooltip: {
        formatter: function (params) {
          // @ts-expect-error no clue
          return params.marker + params.name + ': ' + Math.floor(params.value[3] / 60) + ' min'
        },
      },
      dataZoom: [
        {
          type: 'slider',
          filterMode: 'weakFilter',
          showDataShadow: false,
          top: 400,
          labelFormatter: '',
        },
        {
          type: 'inside',
          filterMode: 'weakFilter',
        },
      ],
      grid: {
        height: 250,
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
            return Math.floor(Math.max(0, val - startTime) / 60 / 60) + 'h'
          },
        },
      },
      yAxis: {
        data: projectsByTotalDuration,
        type: 'category',
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

    chart.setOption(option)
  })

  const onUpdate = (e: CustomEvent) => (durations = e.detail)
</script>

<ChartContainer>
  <ChartTitle>
    <DailyTitleContent {title} {date} />
  </ChartTitle>
  <DailyChartControls {durations} on:update={onUpdate} />
  <div bind:this={chartRef} class="h-96 w-full" />
</ChartContainer>
