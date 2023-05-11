<script lang="ts">
  import { MAIN_BRANCH } from '$lib/constants'
  import type { StorySearchResults } from '$lib/generated/openapi/shortcut'
  import { formatTime, secPerHour } from '$lib/helpers/timeHelpers'
  import type { SummariesResult } from '$src/types/wakatime'
  import * as echarts from 'echarts'
  import zipObject from 'lodash/zipObject'
  import { afterUpdate, onMount } from 'svelte'
  import ChartContainer from './ChartContainer.svelte'
  import ChartTitle from './ChartTitle.svelte'

  import { ChartColor } from '$lib/helpers/chartHelpers'

  export let summaries: SummariesResult
  export let stories: StorySearchResults
  export let title = 'Estimation Accuracy'

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts
  let option: echarts.ComposeOption<
    | echarts.ScatterSeriesOption
    | echarts.TooltipComponentOption
    | echarts.GridComponentOption
    | echarts.LineSeriesOption
  >

  $: ({ available_branches } = summaries)

  $: branches = available_branches.filter((branch) => branch !== MAIN_BRANCH)

  $: branchesToTimeDict = summaries.data.reduce((result, summary) => {
    summary.branches.forEach((entity) => {
      if (!branches.includes(entity.name)) {
        return
      }
      result[entity.name] = (result[entity.name] ?? 0) + entity.total_seconds
    })
    return result
  }, {} as Record<string, number>)

  $: branchesToEstimateDict = zipObject(
    stories.data
      .map(
        (story) =>
          story.branches?.find((branch) => branch.name.includes(String(story.id)))?.name as string,
      )
      .filter(Boolean) as string[],
    stories.data.map((story) => story.estimate as number),
  )

  $: branchesByEstimateDict = Object.entries(branchesToEstimateDict).reduce(
    (acc, [branchName, estimate]) => {
      const defaultBranches: string[] = []
      if (branchesToTimeDict[branchName]) {
        acc[estimate] = acc[estimate] ?? defaultBranches
        acc[estimate].push(branchName)
      }
      return acc
    },
    {} as Record<string, string[]>,
  )

  $: option = {
    grid: {
      left: 60,
      right: 30,
      top: 20,
      bottom: 60,
    },
    tooltip: {
      formatter: (params: any) => {
        return `${params.marker} ${params.data[2]}: <strong>${formatTime(
          params.data[1] * secPerHour,
        )}<strong>`
      },
    },
    xAxis: {
      type: 'category',
      data: [0, 1, 2, 3, 4, 5, 6],
      name: 'Story Estimate',
      nameLocation: 'middle',
      boundaryGap: false,
      nameGap: 30,
      splitLine: {
        show: true,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        showMinLabel: false,
      },
    },
    yAxis: {
      type: 'value',
      name: 'Hours',
      nameLocation: 'middle',
      nameGap: 30,
      axisLabel: {
        showMinLabel: false,
      },
    },
    series: [
      {
        type: 'scatter',
        colorBy: 'data',
        symbolSize: 15,
        data: branches
          .map((branch) => [
            branchesToEstimateDict[branch],
            branchesToTimeDict[branch] / secPerHour,
            branch,
          ])
          .filter(([estimate]) => Boolean(estimate)),
      },
      {
        type: 'scatter',
        name: 'Average',
        symbol: 'diamond',
        symbolSize: 12,
        color: ChartColor.Poor,
        data: Object.entries(branchesByEstimateDict).map(([estimate, branchNames]) => [
          estimate,
          branchNames.reduce((acc, branchName) => acc + branchesToTimeDict[branchName], 0) /
            secPerHour /
            branchNames.length,
          'Average',
        ]),
      },
    ],
  } as echarts.ComposeOption<echarts.ScatterSeriesOption | echarts.GridComponentOption>

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
  <div class="h-96 w-full" bind:this={chartRef} />
</ChartContainer>
