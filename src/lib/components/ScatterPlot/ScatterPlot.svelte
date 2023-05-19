<script lang="ts">
  import type { StorySearchResults } from '$lib/generated/openapi/shortcut'
  import { getStoryBranches } from '$lib/helpers/chartHelpers'
  import type { SummariesResult } from '$src/types/wakatime'
  import * as echarts from 'echarts'
  import { afterUpdate, onMount } from 'svelte'
  import Container from '../Container.svelte'
  import ChartTitle from '../ChartTitle.svelte'
  import {
    createBranchToEstimateDict,
    createBranchToTimeDict,
    createBranchesByEstimateDict,
    createScatterPlotOption,
  } from './scatterPlotHelpers'
  import ChartContainer from '../common/ChartContainer.svelte'

  export let summaries: SummariesResult
  export let stories: StorySearchResults
  export let title = 'Estimation Accuracy'

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts

  $: available_branches = [
    ...new Set(summaries.data.flatMap((summary) => summary.branches.map((branch) => branch.name))),
  ]

  $: storyBranches = getStoryBranches(available_branches)
  $: branchToEstimateDict = createBranchToEstimateDict(stories)
  $: branchToTimeDict = createBranchToTimeDict(summaries, available_branches)
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

<Container>
  <ChartTitle>{title}</ChartTitle>
  <ChartContainer>
    <div class="h-full w-full" bind:this={chartRef} />
  </ChartContainer>
</Container>
