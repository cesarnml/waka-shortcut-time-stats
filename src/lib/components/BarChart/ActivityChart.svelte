<script lang="ts">
  import * as echarts from 'echarts'
  import DailyChartControls from '$lib/components/BarChart/DailyChartControls.svelte'
  import Container from '$lib/components/Container.svelte'
  import ChartTitle from '$lib/components/ChartTitle.svelte'
  import type { DurationsResult } from '$src/types/wakatime'
  import { onMount } from 'svelte'
  import { afterUpdate } from 'svelte'
  import DailyTitleContent from './DailyTitleContent.svelte'

  import { createActiveHoursData, createActiveHoursOption } from './barChartHelpers'
  import ChartContainer from '../common/ChartContainer.svelte'

  export let durations: DurationsResult
  export let itemType: 'project' | 'language'

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts

  $: data = createActiveHoursData(durations)
  $: option = createActiveHoursOption(data, durations)

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
  <ChartTitle><DailyTitleContent showCurrentTime title="Activity" {durations} /></ChartTitle>
  <DailyChartControls {durations} {itemType} on:update={onUpdate} />
  <ChartContainer>
    <div class="h-full w-full" bind:this={chartRef} />
  </ChartContainer>
</Container>
