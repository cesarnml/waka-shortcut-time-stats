<script lang="ts">
  import type { StorySearchResults } from '$lib/generated/openapi/shortcut'
  import { getStoryBranches } from '$lib/helpers/chartHelpers'
  import type { SummariesResult } from '$src/types/wakatime'
  import * as echarts from 'echarts'
  import { afterUpdate, onMount } from 'svelte'
  import ChartContainer from '../ChartContainer.svelte'
  import ChartTitle from '../ChartTitle.svelte'
  import {
    createBranchToEstimateDict,
    createBranchToTimeDict,
    createBranchesByEstimateDict,
    createScatterPlotOption,
  } from './scatterPlotHelpers'

  export let summaries: SummariesResult
  export let stories: StorySearchResults
  export let title = 'Estimation Accuracy'

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts

  $: ({ available_branches } = summaries)

  $: storyBranches = getStoryBranches(available_branches)
  $: branchToEstimateDict = createBranchToEstimateDict(stories)
  $: branchToTimeDict = createBranchToTimeDict(summaries)
  $: branchesByEstimateDict = createBranchesByEstimateDict(branchToEstimateDict, branchToTimeDict)

  $: option = createScatterPlotOption(
    storyBranches,
    branchToEstimateDict,
    branchToTimeDict,
    branchesByEstimateDict,
  )

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
  <div class="h-96" bind:this={chartRef} />
</ChartContainer>
