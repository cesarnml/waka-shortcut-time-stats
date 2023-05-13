<script lang="ts">
  import { page } from '$app/stores'
  import type { SummariesResult } from '$src/types/wakatime'
  import * as echarts from 'echarts'
  import { afterUpdate, onMount } from 'svelte'
  import ChartContainer from '../ChartContainer.svelte'
  import ChartTitle from '../ChartTitle.svelte'
  import {
    createProjectFileToTimeDict,
    createTreemapData,
    createTreemapOption,
  } from './treemapHelpers'

  export let summaries: SummariesResult
  export let title: string

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts

  $: filesToTimeDict = createProjectFileToTimeDict(summaries, $page.params.projectName)
  $: data = createTreemapData(filesToTimeDict)

  $: option = createTreemapOption(data, $page.params.projectName)

  onMount(() => {
    chart = echarts.init(chartRef, 'dark', { renderer: 'svg' })
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
</script>

<ChartContainer>
  <ChartTitle>{title}</ChartTitle>
  <div class="p-6">
    <div class="h-[600px] w-full" bind:this={chartRef} />
  </div>
</ChartContainer>
