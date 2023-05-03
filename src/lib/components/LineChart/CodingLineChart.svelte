<script lang="ts">
  import * as echarts from 'echarts'
  import { onMount, afterUpdate } from 'svelte'
  import type { SummariesResult } from '$src/routes/api/wakatime/current/summaries/+server'
  import ChartContainer from '../ChartContainer.svelte'
  import ChartTitle from '../ChartTitle.svelte'
  import { createLineChartOption } from './lineChartHelpers'

  export let summaries: SummariesResult
  export let title = 'Coding Activity'

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts
  let option: echarts.EChartsOption

  $: option = createLineChartOption(summaries)

  onMount(() => {
    chart = echarts.init(chartRef, 'dark', { renderer: 'svg' })
    const handleResize = () => chart.resize()
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  })

  afterUpdate(() => {
    chart.setOption(option)
  })
</script>

<ChartContainer>
  <ChartTitle>{title}</ChartTitle>
  <div class="h-96 w-full" bind:this={chartRef} />
</ChartContainer>
