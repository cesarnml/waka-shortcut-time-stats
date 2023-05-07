<script lang="ts">
  import * as echarts from 'echarts'
  import ChartContainer from '../ChartContainer.svelte'
  import ChartTitle from '../ChartTitle.svelte'
  import { createSimpleBarChartOption, type SimpleBarChartOption } from './barChartHelpers'
  import type { SummariesResult } from '$src/types/wakatime'
  import { onMount } from 'svelte'
  import { afterUpdate } from 'svelte'

  export let summaries: SummariesResult
  export let title = 'Coding Stats by Weekday'

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts
  let option: SimpleBarChartOption

  $: option = createSimpleBarChartOption(summaries)

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
  <div class="h-96 w-full" bind:this={chartRef} />
</ChartContainer>
