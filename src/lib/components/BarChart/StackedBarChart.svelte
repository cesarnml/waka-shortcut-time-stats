<script lang="ts">
  import * as echarts from 'echarts'
  import { afterUpdate, onMount } from 'svelte'
  import ChartTitle from '../ChartTitle.svelte'
  import Container from '../Container.svelte'
  import {
    createBarChartSeries,
    createStackedBarChartOption,
    createXAxisValues,
    type StackedBarChartOption,
  } from './barChartHelpers'
  import type { SummariesResult } from '$src/types/wakatime'
  import ChartContainer from '../common/ChartContainer.svelte'

  export let summaries: SummariesResult
  export let title: string
  export let itemsType: 'categories' | 'projects'

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts
  let option: StackedBarChartOption

  $: xValues = createXAxisValues(summaries)
  $: series = createBarChartSeries({ summaries, itemsType })
  $: option = createStackedBarChartOption(xValues, series)

  onMount(() => {
    chart = echarts.init(chartRef, 'dark', { renderer: 'svg' })
    const handleResize = () => chart.resize()
    window.addEventListener('resize', handleResize, { passive: true })
    chart.setOption(option)

    return () => {
      chart.dispose()
      window.removeEventListener('resize', handleResize)
    }
  })

  afterUpdate(() => {
    chart.dispose()
    chart = echarts.init(chartRef, 'dark', { renderer: 'svg' })
    chart.setOption(option)
  })
</script>

<Container>
  <ChartTitle>{title}</ChartTitle>
  <ChartContainer>
    <div class="h-full w-full" bind:this={chartRef} />
  </ChartContainer>
</Container>
