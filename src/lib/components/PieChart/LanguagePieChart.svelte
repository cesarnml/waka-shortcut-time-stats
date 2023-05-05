<script lang="ts">
  import { afterUpdate, onMount } from 'svelte'
  import * as echarts from 'echarts'
  import ChartContainer from '../ChartContainer.svelte'
  import ChartTitle from '../ChartTitle.svelte'
  import { createPieChartOption, createPieChartData } from './pieChartHelpers'

  export let summaries: SummariesResult

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts
  let option: echarts.EChartsOption

  $: data = createPieChartData(summaries)

  $: option = createPieChartOption(data)

  onMount(() => {
    const handleResize = () => chart.resize()
    chart = echarts.init(chartRef, 'dark', { renderer: 'svg' })
    window.addEventListener('resize', handleResize, { passive: true })
    chart.setOption(option)

    return () => window.removeEventListener('resize', handleResize)
  })

  afterUpdate(() => {
    chart.setOption({ series: [{ data }] })
  })
</script>

<ChartContainer>
  <ChartTitle>Languages</ChartTitle>
  <div class="h-96 w-full" bind:this={chartRef} data-testid="chart" />
</ChartContainer>
