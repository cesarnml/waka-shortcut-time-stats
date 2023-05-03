<script lang="ts">
  import type { SummariesResult } from '$src/routes/api/wakatime/current/summaries/+server'
  import * as echarts from 'echarts'
  import { afterUpdate, onMount } from 'svelte'
  import ChartContainer from './ChartContainer.svelte'
  import ChartTitle from './ChartTitle.svelte'
  import { secPerHour } from '$lib/constants'

  export let summaries: SummariesResult
  export let title = 'Branches vs Time'

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts
  let option: echarts.EChartsOption

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

  option = {
    grid: { top: 10, left: 70, bottom: 60 },
    dataset: [
      {
        dimensions: ['name', 'time'],
        source: Object.keys(branchesToTimeDict).map((key) => [
          key.split('_')[0],
          Number((branchesToTimeDict[key] / secPerHour).toFixed(1)),
        ]),
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'time', order: 'desc' },
        },
      },
    ],
    tooltip: {
      formatter: (params) =>
        `${params.marker} ${branches.find((branch) => branch.includes(params.name))}: <strong>${
          params.data[1]
        }h</strong>`,
    },
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
      colorBy: 'data',
      type: 'bar',
      encode: { x: 'name', y: 'time' },
      datasetIndex: 1,
    },
  }

  onMount(() => {
    if (chartRef) {
      chart = echarts.init(chartRef, 'dark', { renderer: 'svg' })
      // @ts-expect-error tough type
      chart.on('click', async (params) => {
        const branch: string = params.data[0 as keyof echarts.ECElementEvent['data']]
        if (branch.includes('cesar')) {
          const storyId = branch.split('-')[1]
          const response = await fetch(`/api/shortcut/search/stories?query=id:${storyId}`)
          const result = await response.json()
          const storyLink: string = result.data[0].app_url
          window.open(storyLink, '_blank')
        }
      })

      chart.setOption(option)
    }
  })

  afterUpdate(() => {
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

    option = {
      grid: { top: 10, left: 70, bottom: 60 },
      dataset: [
        {
          dimensions: ['name', 'time'],
          source: Object.keys(branchesToTimeDict).map((key) => [
            key.split('_')[0],
            Number((branchesToTimeDict[key] / secPerHour).toFixed(1)),
          ]),
        },
        {
          transform: {
            type: 'sort',
            config: { dimension: 'time', order: 'desc' },
          },
        },
      ],
      tooltip: {
        formatter: (params) =>
          `${params.marker} ${branches.find((branch) => branch.includes(params.name))}: <strong>${
            params.data[1]
          }h</strong>`,
      },
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
        colorBy: 'data',
        type: 'bar',
        encode: { x: 'name', y: 'time' },
        datasetIndex: 1,
      },
    }
    chart.setOption(option)
  })
</script>

<ChartContainer>
  <ChartTitle>{title}</ChartTitle>
  <div class="h-96 w-full" bind:this={chartRef} />
</ChartContainer>
