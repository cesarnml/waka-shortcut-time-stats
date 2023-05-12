<script lang="ts">
  import { afterUpdate, onMount } from 'svelte'
  import * as echarts from 'echarts'
  import ChartContainer from '../ChartContainer.svelte'
  import ChartTitle from '../ChartTitle.svelte'
  import { createPieChartOption, createPieChartData } from './pieChartHelpers'
  import type { SummariesResult } from '$src/types/wakatime'

  export let summaries: SummariesResult
  export let title: string

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts

  $: data = createPieChartData(summaries)
  $: option = createPieChartOption(data)

  onMount(() => {
    const handleResize = () => chart.resize()
    chart = echarts.init(chartRef, 'dark', { renderer: 'svg' })
    window.addEventListener('resize', handleResize, { passive: true })
    chart.setOption(option)

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
  <div class="h-96 w-full" bind:this={chartRef} data-testid="chart" />
</ChartContainer>
