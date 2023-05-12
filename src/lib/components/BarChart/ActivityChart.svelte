<script lang="ts">
  import * as echarts from 'echarts'
  import DailyChartControls from '$lib/components/BarChart/DailyChartControls.svelte'
  import ChartContainer from '$lib/components/ChartContainer.svelte'
  import ChartTitle from '$lib/components/ChartTitle.svelte'
  import type { DurationsResult } from '$src/types/wakatime'
  import { onMount } from 'svelte'
  import { afterUpdate } from 'svelte'
  import DailyTitleContent from './DailyTitleContent.svelte'

  import { createActiveHoursData, createActiveHoursOption } from './barChartHelpers'

  export let durations: DurationsResult
  export let itemType: 'project' | 'language'

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts

  $: data = createActiveHoursData(durations)
  $: option = createActiveHoursOption(data)

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

<ChartContainer>
  <ChartTitle><DailyTitleContent title="Activity" {durations} /></ChartTitle>
  <DailyChartControls {durations} {itemType} on:update={onUpdate} />
  <div bind:this={chartRef} class="h-96 w-full" />
</ChartContainer>
