<script lang="ts">
  import * as echarts from 'echarts'
  import { onMount, afterUpdate } from 'svelte'
  import ChartContainer from '../ChartContainer.svelte'
  import ChartTitle from '../ChartTitle.svelte'
  import { createLineChartData, createLineChartOption } from './lineChartHelpers'
  import type { SummariesResult } from '$src/types/wakatime'

  export let summaries: SummariesResult
  export let title: string

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts

  $: data = createLineChartData(summaries)
  $: option = createLineChartOption(data, summaries.color)

  onMount(() => {
    chart = echarts.init(chartRef, 'dark', { renderer: 'svg' })
    const handleResize = () => chart.resize()
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
  <div class="h-96" bind:this={chartRef} />
</ChartContainer>
