<script lang="ts">
  import * as echarts from 'echarts'
  import { afterUpdate, onMount } from 'svelte'
  import ChartTitle from '../ChartTitle.svelte'
  import ChartContainer from '../ChartContainer.svelte'
  import { createBarChartOption, createBarChartSeries, createXAxisValues } from './ barChartHelpers'

  export let summaries: SummariesResult
  export let title: string
  export let itemsType: 'categories' | 'projects'

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts
  let option: echarts.EChartsOption

  $: xValues = createXAxisValues(summaries)
  $: series = createBarChartSeries({ summaries, itemsType })
  $: option = createBarChartOption(xValues, series)

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
