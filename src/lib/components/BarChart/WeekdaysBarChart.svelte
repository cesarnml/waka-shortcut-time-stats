<script lang="ts">
  import * as echarts from 'echarts'
  import { onMount } from 'svelte'
  import ChartContainer from '../ChartContainer.svelte'
  import ChartTitle from '../ChartTitle.svelte'
  import { afterUpdate } from 'svelte'
  import { createSimpleBarChartOption } from './barChartHelpers'
  import type { SummariesResult } from '$src/types/wakatime'
  import type {
    TooltipComponentOption,
    GridComponentOption,
    LegendComponentOption,
  } from 'echarts/components'
  import type { BarSeriesOption } from 'echarts/charts'

  type EChartsOption = echarts.ComposeOption<
    TooltipComponentOption | GridComponentOption | LegendComponentOption | BarSeriesOption
  >

  export let summaries: SummariesResult
  export let title = 'Coding Stats by Weekday'

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts
  let option: EChartsOption

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
