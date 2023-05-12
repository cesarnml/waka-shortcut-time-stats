<script lang="ts">
  import type { DurationsResult, WakaDuration } from '$src/types/wakatime'
  import * as echarts from 'echarts'
  import { afterUpdate, onMount } from 'svelte'
  import ChartContainer from './ChartContainer.svelte'
  import ChartTitle from './ChartTitle.svelte'
  import DailyTitleContent from './BarChart/DailyTitleContent.svelte'
  import DailyChartControls from './BarChart/DailyChartControls.svelte'
  import { createDurationsChartOption } from './BarChart/barChartHelpers'

  export let durations: DurationsResult
  export let title = 'Context Switch'
  export let itemType: Extract<keyof WakaDuration, 'project' | 'language'>

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts
  let option: echarts.EChartsOption

  $: option = createDurationsChartOption(durations, itemType) as echarts.EChartsOption

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

  afterUpdate(() => chart.setOption(option))

  const onUpdate = (e: CustomEvent<DurationsResult>) => (durations = e.detail)
</script>

<ChartContainer>
  <ChartTitle>
    <DailyTitleContent {title} {durations} />
  </ChartTitle>
  <DailyChartControls {durations} {itemType} on:update={onUpdate} />
  <div bind:this={chartRef} class="h-96 w-full" />
</ChartContainer>
