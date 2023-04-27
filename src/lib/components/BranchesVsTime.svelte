<script lang="ts">
  import { onMount } from 'svelte'
  import type { SummariesResult } from '../../routes/api/wakatime/current/summaries/+server'
  import * as echarts from 'echarts'

  export let summaries: SummariesResult

  const { data } = summaries

  const branches = [
    ...new Set(data.map((summary) => summary.branches.map((entity) => entity.name)).flat()),
  ].filter((file) => !file.includes('node_modules') && !file.includes('generated'))

  const branchesToTimeDict: Record<string, number> = {}

  summaries.data.forEach((summary) => {
    summary.branches.forEach((entity) => {
      if (!branches.includes(entity.name)) {
        return
      }
      if (branchesToTimeDict[entity.name] === undefined) {
        return (branchesToTimeDict[entity.name] = entity.total_seconds)
      }
      return (branchesToTimeDict[entity.name] += entity.total_seconds)
    })
  })

  console.log(
    'branchesToTimeDict:',
    Object.keys(branchesToTimeDict).map((key) => [
      key,
      Number((branchesToTimeDict[key] / 3600).toFixed(1)),
    ]),
  )
  let myChart: echarts.ECharts

  let option: echarts.EChartsOption

  onMount(() => {
    const chartDom = document.getElementById('branches')

    if (chartDom) {
      myChart = echarts.init(chartDom)

      option = {
        grid: {
          top: 10,
          left: 70,
          bottom: 60,
        },
        dataset: [
          {
            dimensions: ['name', 'time'],
            source: Object.keys(branchesToTimeDict).map((key) => [
              key.split('_')[0],
              Number((branchesToTimeDict[key] / 3600).toFixed(1)),
            ]),
          },
          {
            transform: {
              type: 'sort',
              config: { dimension: 'time', order: 'desc' },
            },
          },
        ],
        tooltip: {},
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: 30,
            color: '#fafafa',
          },
        },
        yAxis: {
          axisLabel: { color: '#fafafa', formatter: (value: string) => `${value}h` },
        },
        series: {
          type: 'bar',
          encode: { x: 'name', y: 'time' },
          datasetIndex: 1,
        },
      }

      myChart.setOption(option)
    }
  })
</script>

<div class="space-y-8 rounded-2xl bg-slate-800 pt-4">
  <h2 class="text-center text-3xl text-stone-300">Branches vs Time</h2>
  <div id="branches" class="h-96 w-full" />
</div>
