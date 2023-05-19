<script lang="ts">
  import { onMount } from 'svelte'
  import * as echarts from 'echarts'
  import dayjs from 'dayjs'
  import advanceFormat from 'dayjs/plugin/advancedFormat.js'
  import type { SummariesResult } from '$src/types/wakatime'
  import { afterUpdate } from 'svelte'
  import Container from '../Container.svelte'
  import ChartTitle from '../ChartTitle.svelte'
  import { createDisciplineGaugeData, createDisciplineGaugeOption } from './gaugeChartHelpers'
  import DailyGaugeControls from './DailyGaugeControls.svelte'
  import ChartContainer from '../common/ChartContainer.svelte'

  dayjs.extend(advanceFormat)

  export let summaries: SummariesResult
  export let title: string

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts

  $: selectedDate = summaries.data?.at(-1)?.range.date ?? ''
  $: data = createDisciplineGaugeData(summaries, selectedDate)
  $: option = createDisciplineGaugeOption(data)

  onMount(() => {
    chart = echarts.init(chartRef, 'dark', { renderer: 'canvas' })
    const handleResize = () => chart.resize()
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      chart.dispose()
      window.removeEventListener('resize', handleResize)
    }
  })

  afterUpdate(() => {
    chart.setOption(option)
  })

  const onUpdate = (e: CustomEvent<string>) => (selectedDate = e.detail)
</script>

<Container>
  <ChartTitle>{title}</ChartTitle>
  <DailyGaugeControls {summaries} {selectedDate} on:update={onUpdate} />
  <ChartContainer>
    <div class="h-full w-full" bind:this={chartRef} />
  </ChartContainer>
</Container>
