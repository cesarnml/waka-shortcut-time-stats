<script lang="ts">
  import * as echarts from 'echarts'
  import { afterUpdate, onMount } from 'svelte'
  import { secPerHour } from '$lib/helpers/timeHelpers'
  import { ChartColor } from '$lib/helpers/chartHelpers'
  import last from 'lodash/last'
  import first from 'lodash/first'
  import type { StorySearchResults } from '$lib/generated/openapi/shortcut'
  import type { SummariesResult } from '$src/types/wakatime'
  import ChartContainer from './ChartContainer.svelte'
  import ChartTitle from './ChartTitle.svelte'
  import {
    BRANCH_ID_DELIMITER,
    BRANCH_NAME_DELIMITER,
    MAIN_BRANCH,
    NUMBER_OF_DECIMALS,
    SHORTCUT_STORY_IDENTIFIER,
  } from '$lib/constants'
  import zipObject from 'lodash/zipObject'

  export let summaries: SummariesResult
  export let stories: StorySearchResults
  export let title = 'Scatter Plot'

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts
  let option: echarts.EChartsOption

  const getBranchShortName = (name: string) => first(name.split(BRANCH_NAME_DELIMITER))
  const getStoryId = (branch: string) => last(branch.split(BRANCH_ID_DELIMITER))

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
        (story) => story.branches?.find((branch) => branch.name.includes(String(story.id)))?.name,
      )
      .filter(Boolean) as string[],
    stories.data.map((story) => story.estimate),
  )

  $: option = {
    tooltip: {
      formatter: (params: any) =>
        `${params.marker} ${params.data[2]} - ${params.data[1]}<strong>h<strong>`,
    },
    xAxis: {
      type: 'category',
      data: [0, 1, 2, 3, 5, 8],
      boundaryGap: false,
      splitLine: {
        show: true,
      },
      axisLine: {
        show: false,
      },
    },
    yAxis: {
      axisLabel: {
        showMinLabel: false,
      },
    },
    series: [
      {
        colorBy: 'data',
        symbolSize: 20,
        data: branches.map((branch) => [
          branchesToEstimateDict[branch],
          Number((branchesToTimeDict[branch] / secPerHour).toFixed(1)),
          branch,
        ]),
        type: 'scatter',
      },
    ],
  }
  onMount(() => {
    if (chartRef) {
      chart = echarts.init(chartRef, 'dark', { renderer: 'svg' })
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
