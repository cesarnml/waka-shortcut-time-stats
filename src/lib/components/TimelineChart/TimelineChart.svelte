<script lang="ts">
  import type { DurationsResult, WakaDuration } from '$src/types/wakatime'
  import * as echarts from 'echarts'
  import { afterUpdate, onMount } from 'svelte'
  import Container from '../Container.svelte'
  import ChartTitle from '../ChartTitle.svelte'
  import DailyTitleContent from '../BarChart/DailyTitleContent.svelte'
  import DailyChartControls from '../BarChart/DailyChartControls.svelte'
  import { createTimelineChartOption } from './timelineChartHelpers'
  import ChartContainer from '../common/ChartContainer.svelte'

  export let durations: DurationsResult
  export let title = 'Context Switch'
  export let itemType: keyof Omit<WakaDuration, 'color' | 'duration' | 'time'>

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts

  $: option = createTimelineChartOption(durations, itemType)

  onMount(() => {
    chart = echarts.init(chartRef, 'dark', { renderer: 'svg' })
    const handleResize = () => chart.resize()
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      chart.dispose()
      window.removeEventListener('resize', handleResize)
    }
  })

  afterUpdate(() => chart.setOption(option))

  const onUpdate = (e: CustomEvent<DurationsResult>) => (durations = e.detail)
</script>

<Container>
  <ChartTitle>
    <DailyTitleContent {title} {durations} />
  </ChartTitle>
  <DailyChartControls {durations} {itemType} on:update={onUpdate} />
  <ChartContainer>
    <div class="h-full w-full" bind:this={chartRef} />
  </ChartContainer>
</Container>
