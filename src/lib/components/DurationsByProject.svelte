<script lang="ts">
  import * as echarts from 'echarts'
  import { onMount } from 'svelte'
  import type { DurationsResult } from '../../routes/api/wakatime/current/durations/+server'
  import groupBy from 'lodash/groupBy'
  import orderBy from 'lodash/orderBy'

  import dayjs from 'dayjs'

  export let durations: DurationsResult

  const projects = [...new Set(durations.data.map((duration) => duration.project))]
  const durationsByProject = groupBy(durations.data, 'project')

  const projectsByTotalDuration = orderBy(projects, (project) =>
    durationsByProject[project].reduce((acc, cur) => cur.duration + acc, 0),
  ).filter(
    (project) => durationsByProject[project].reduce((acc, cur) => cur.duration + acc, 0) > 20 * 60,
  )

  onMount(() => {
    var chartDom = document.getElementById('durations')

    if (chartDom) {
      const myChart = echarts.init(chartDom)
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

      const option: echarts.EChartsOption = {
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
            fontWeight: 'bold',
            fontFamily: 'monospace',
            textBorderColor: '#ff0000',
            textBorderWidth: 3,
            textBorderType: 'solid',
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
                  style: api.style(),
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

      option && myChart.setOption(option)
    }
  })
</script>

<div class="space-y-8 rounded-2xl bg-slate-800 pt-4">
  <h2 class="text-center text-3xl text-stone-300">Coding Timeline by Project</h2>
  <div id="durations" class="mb-8 h-[450px] w-full" />
</div>
