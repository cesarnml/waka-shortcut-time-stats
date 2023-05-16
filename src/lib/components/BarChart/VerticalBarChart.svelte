<script lang="ts">
  import * as echarts from 'echarts'
  import { afterUpdate, onMount } from 'svelte'
  import ChartContainer from '../ChartContainer.svelte'
  import ChartTitle from '../ChartTitle.svelte'
  import type { SummariesResult } from '$src/types/wakatime'
  import { ApiEndpoint, SHORTCUT_STORY_IDENTIFIER } from '$lib/constants'
  import { getStoryBranches, getStoryId } from '$lib/helpers/chartHelpers'
  import {
    createVerticalBarChartDatasetSource,
    createVerticalBarChartOption,
  } from './verticalBarChartHelpers'

  export let summaries: SummariesResult
  export let title = 'Branches vs Time'

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts

  $: ({ available_branches } = summaries)

  $: storyBranches = getStoryBranches(available_branches)
  $: source = createVerticalBarChartDatasetSource(summaries)
  $: option = createVerticalBarChartOption(source, storyBranches)

  onMount(() => {
    chart = echarts.init(chartRef, 'dark', { renderer: 'svg' })
    const handleResize = () => chart.resize()
    window.addEventListener('resize', handleResize, { passive: true })

    // @ts-expect-error tough type
    chart.on('click', async (params) => {
      const branch: string = params.data[0 as keyof echarts.ECElementEvent['data']] ?? ''
      if (branch.includes(SHORTCUT_STORY_IDENTIFIER)) {
        const storyId = getStoryId(branch)
        const response = await fetch(`${ApiEndpoint.SearchStories}?query=id:${storyId}`)
        const result = await response.json()
        const storyLink: string = (result.data ?? [''])[0]?.app_url
        window.open(storyLink, '_blank')
      }
    })

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
  <div class="h-96" bind:this={chartRef} />
</ChartContainer>
