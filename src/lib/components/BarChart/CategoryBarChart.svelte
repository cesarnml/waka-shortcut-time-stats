<script lang="ts">
  import { DateFormat } from '$lib/constants'
  import type {
    SummariesResult,
    WakaCategory,
  } from '$src/routes/api/wakatime/current/summaries/+server'
  import dayjs from 'dayjs'
  import * as echarts from 'echarts'
  import { afterUpdate, onMount } from 'svelte'
  import ChartTitle from '../ChartTitle.svelte'
  import ChartContainer from '../ChartContainer.svelte'
  import { createBarChartOption, createBarChartSeries } from './ barChartHelpers'

  export let summaries: SummariesResult
  export let title = 'Category vs Time'

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts
  let option: echarts.EChartsOption

  $: xValues = summaries.data.map((item) => dayjs(item.range.date).format(DateFormat.Short))
  $: categoriesByDate = summaries.data.map((item) => item.categories)
  $: categoryNames = [
    ...new Set(
      summaries.data.map((item) => item.categories.map((category) => category.name)).flat(),
    ),
  ]
  $: series = createBarChartSeries<WakaCategory>(xValues, categoriesByDate, categoryNames)
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
