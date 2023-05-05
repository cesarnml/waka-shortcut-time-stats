<script lang="ts">
  import * as echarts from 'echarts'
  import add from 'lodash/add'
  import zipWith from 'lodash/zipWith'
  import { onMount } from 'svelte'
  import ChartContainer from './ChartContainer.svelte'
  import ChartTitle from './ChartTitle.svelte'

  export let summaries: SummariesResult
  export let title = 'Project vs Time'

  let chartContainer: HTMLDivElement
  let chart: echarts.ECharts
  let option: echarts.EChartsOption

  const projectNames = [
    ...new Set(
      summaries.data.map((summary) => summary.projects.map((project) => project.name)).flat(),
    ),
  ]
  let data: number[] = projectNames.map(() => 0)
  let dataByDateDict: Record<string, number[]> = {}

  summaries.data.forEach((summary) => {
    return (dataByDateDict[summary.range.date] = projectNames.map((name) =>
      Number(
        (
          (summary.projects.find((project) => project.name === name)?.total_seconds ?? 0) /
          60 /
          60
        ).toFixed(2),
      ),
    ))
  })

  let dates = Object.keys(dataByDateDict)

  option = {
    textStyle: {
      color: '#fafafa',
    },
    grid: {
      show: true,
      left: 25,
      right: 45,
      top: 10,
      bottom: 50,
    },
    xAxis: {
      max: 'dataMax',
      axisLabel: {
        formatter: (value: number) => `${value.toFixed(1)}h`,
      },
    },
    yAxis: {
      type: 'category',
      data: projectNames,
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      zlevel: 10,
      axisLabel: {
        show: true,
        inside: true,
        fontWeight: 'bold',
        textShadowBlur: 2,
        verticalAlign: 'top',
      },
      max: 4, // only the largest 3 bars will be displayed
    },
    series: [
      {
        colorBy: 'data',
        realtimeSort: true,
        name: 'X',
        type: 'bar',
        data: data,
        label: {
          show: true,
          position: 'right',
          verticalAlign: 'bottom',
          fontWeight: 'bold',
          valueAnimation: true,
          textShadowBlur: 2,
          color: '#fafafa',
          formatter: (item) => `${Number(item.value).toFixed(1)}h`,
        },
      },
    ],
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear',
  }

  onMount(() => {
    if (chartContainer) {
      chart = echarts.init(chartContainer, 'dark', { renderer: 'svg' })
      window.addEventListener('resize', () => chart.resize(), { passive: true })
      chart.setOption(option)
    }
  })

  const timer = (ms: number) => new Promise((res) => setTimeout(res, ms))

  async function load() {
    // We need to wrap the loop into an async function for this to work
    for (var i = 0; i < summaries.data.length; i++) {
      data = zipWith(data, dataByDateDict[dates[i]], add).map((number) => Number(number.toFixed(2)))
      chart?.setOption<echarts.EChartsOption>({
        series: [
          {
            type: 'bar',
            data: data,
          },
        ],
      })
      await timer(3000) // then the created Promise can be awaited
    }
  }

  load()
</script>

<ChartContainer>
  <ChartTitle>{title}</ChartTitle>
  <div bind:this={chartContainer} class="h-96 w-full" />
</ChartContainer>
