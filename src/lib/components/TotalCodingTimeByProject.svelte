<script lang="ts">
  import * as echarts from 'echarts'
  import { afterUpdate, onMount } from 'svelte'
  import ChartContainer from './ChartContainer.svelte'
  import ChartTitle from './ChartTitle.svelte'
  import type { SummariesResult } from '$src/types/wakatime'
  import { secPerHour } from '$lib/helpers/timeHelpers'
  import { ChartColor } from '$lib/helpers/chartHelpers'
  import { NUMBER_OF_DECIMALS } from '$lib/constants'
  import max from 'lodash/max'

  export let summaries: SummariesResult
  export let title = 'Project vs Time'

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts
  let option: echarts.EChartsOption

  const createBarChartData = (summaries: SummariesResult) => {
    const result = {} as Record<string, number>
    summaries.data.forEach((summary) =>
      summary.projects.forEach((project) => {
        result[project.name] = (result[project.name] ?? 0) + project.total_seconds
      }),
    )
    return result
  }

  $: projectNameToTotalSeconds = createBarChartData(summaries)

  // FIXME: Enable turning off filtering small values
  $: filtered = Object.entries(projectNameToTotalSeconds).reduce((acc, [name, value]) => {
    if (value > (max(Object.values(projectNameToTotalSeconds)) ?? 1) * 0.1) {
      return { ...acc, [name]: value }
    }
    return acc
  }, {} as Record<string, number>)

  $: option = {
    textStyle: {
      color: ChartColor.Text,
    },
    grid: {
      left: 25,
      right: 45,
      top: 10,
      bottom: 50,
    },
    // bang
    tooltip: {
      valueFormatter: (value) => `${value}h`,
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        color: ChartColor.Text,
        formatter: (value: number) => `${value}h`,
        showMinLabel: false,
      },
    },
    yAxis: {
      type: 'category',
      data: Object.keys(filtered),
      zlevel: 2,
      axisLabel: {
        show: true,
        inside: true,
        fontWeight: 'bold',
        textShadowBlur: 2,
      },
    },
    series: [
      {
        colorBy: 'data',
        type: 'bar',
        data: Object.values(filtered).map((value) =>
          Number((value / secPerHour).toFixed(NUMBER_OF_DECIMALS)),
        ),
      },
    ],
  }

  onMount(() => {
    const handleResize = () => chart.resize()
    chart = echarts.init(chartRef, 'auto', { renderer: 'svg' })
    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      chart.dispose()
      window.removeEventListener('resize', handleResize)
    }
  })

  afterUpdate(() => {
    chart.setOption(option)
  })
</script>

<ChartContainer>
  <ChartTitle>{title}</ChartTitle>
  <div bind:this={chartRef} class="h-96 w-full" />
</ChartContainer>
