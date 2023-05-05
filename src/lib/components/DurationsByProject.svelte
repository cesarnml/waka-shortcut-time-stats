<script lang="ts">
  import { browser } from '$app/environment'
  import type { DurationsResult } from '$src/types/wakatime'
  import dayjs from 'dayjs'
  import duration from 'dayjs/plugin/duration'
  import isToday from 'dayjs/plugin/isToday'
  import * as echarts from 'echarts'
  import 'iconify-icon'
  import groupBy from 'lodash/groupBy'
  import orderBy from 'lodash/orderBy'
  import { onMount } from 'svelte'

  dayjs.extend(duration)
  dayjs.extend(isToday)

  export let durations: DurationsResult
  let loading = false

  $: projects = [...new Set(durations.data.map((duration) => duration.project))]
  $: totalDuration = durations.data.reduce((acc, cur) => cur.duration + acc, 0)
  $: durationsByProject = groupBy(durations.data, 'project')
  $: projectsByTotalDuration = orderBy(projects, (project) =>
    durationsByProject[project].reduce((acc, cur) => cur.duration + acc, 0),
  ).filter(
    (project) => durationsByProject[project].reduce((acc, cur) => cur.duration + acc, 0) > 20 * 60,
  )

  $: {
    if (browser && myChart && option) {
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
      myChart.setOption(option)
    }
  }

  let myChart: echarts.ECharts
  let option: echarts.EChartsOption

  onMount(() => {
    var chartDom = document.getElementById('durations')

    if (chartDom) {
      myChart = echarts.init(chartDom)

      window.addEventListener(
        'resize',
        function () {
          myChart.resize()
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

      myChart.setOption(option)
    }
  })

  const handleClick = async (next: number) => {
    const response = await fetch(
      `/api/wakatime/current/durations?date=${dayjs(durations.start)
        .add(next, 'd')
        .format('YYYY-MM-DD')}`,
    )
    durations = await response.json()
  }
</script>

<div class="space-y-8 rounded-2xl bg-slate-800 pt-4">
  <h2 class="text-center text-3xl text-stone-300">Coding Timeline by Project</h2>
  <div class="text-center text-slate-300">{dayjs(durations.start).format('DD MMM YYYY')}</div>
  <div class="flex items-center justify-center gap-4">
    <button on:click={() => handleClick(-1)} disabled={loading} class="flex items-center">
      <iconify-icon
        class="text-slate-300"
        icon="material-symbols:arrow-circle-left-outline-rounded"
      />
    </button>
    <div class="text-slate-300">
      {dayjs.duration(totalDuration, 's').hours()}h {dayjs.duration(totalDuration, 's').minutes()}m
    </div>
    <button
      class="flex items-center"
      on:click={() => handleClick(1)}
      disabled={loading || dayjs(durations.start).isToday()}
    >
      <iconify-icon
        class="text-slate-300"
        icon="material-symbols:arrow-circle-right-outline-rounded"
      />
    </button>
  </div>
  <div id="durations" class="mb-8 h-[450px] w-full" />
</div>
