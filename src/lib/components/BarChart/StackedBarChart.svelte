<script lang="ts">
  import * as echarts from 'echarts'
  import type {
    TooltipComponentOption,
    GridComponentOption,
    LegendComponentOption,
  } from 'echarts/components'
  import type { BarSeriesOption } from 'echarts/charts'

  type EChartsOption = echarts.ComposeOption<
    TooltipComponentOption | GridComponentOption | LegendComponentOption | BarSeriesOption
  >

  import { afterUpdate, onMount } from 'svelte'
  import ChartTitle from '../ChartTitle.svelte'
  import ChartContainer from '../ChartContainer.svelte'
  import { createBarChartOption, createBarChartSeries, createXAxisValues } from './barChartHelpers'
  import type { SummariesResult } from '$src/types/wakatime'

  export let summaries: SummariesResult
  export let title: string
  export let itemsType: 'categories' | 'projects'

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts
  let option: EChartsOption

  $: xValues = createXAxisValues(summaries)
  $: series = createBarChartSeries({ summaries, itemsType })
  $: option = createBarChartOption(xValues, series)

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
