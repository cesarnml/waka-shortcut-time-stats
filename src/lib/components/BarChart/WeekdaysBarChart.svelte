<script lang="ts">
  import type { SummariesResult } from '$src/routes/api/wakatime/current/summaries/+server'
  import * as echarts from 'echarts'
  import { onMount } from 'svelte'
  import ChartContainer from '../ChartContainer.svelte'
  import ChartTitle from '../ChartTitle.svelte'
  import { afterUpdate } from 'svelte'
  import { createSimpleBarChartOption } from './ barChartHelpers'

  export let summaries: SummariesResult
  export let title = 'Coding Stats by Weekday'

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts
  let option: echarts.EChartsOption

  $: option = createSimpleBarChartOption(summaries)

  onMount(() => {
    const handleResize = () => chart.resize()
    chart = echarts.init(chartRef, 'dark', { renderer: 'svg' })
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
