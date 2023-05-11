<script lang="ts">
  import * as echarts from 'echarts'
  import { afterUpdate, onMount } from 'svelte'
  import ChartContainer from './ChartContainer.svelte'
  import ChartTitle from './ChartTitle.svelte'
  import { formatTime, secPerHour } from '$lib/helpers/timeHelpers'
  import type { SummariesResult } from '$src/types/wakatime'
  import last from 'lodash/last'
  import first from 'lodash/first'
  import {
    BRANCH_ID_DELIMITER,
    BRANCH_NAME_DELIMITER,
    MAIN_BRANCH,
    SHORTCUT_STORY_IDENTIFIER,
  } from '$lib/constants'

  export let summaries: SummariesResult
  export let title = 'Branches vs Time'

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts
  let option: echarts.ComposeOption<
    echarts.GridComponentOption | echarts.TooltipComponentOption | echarts.BarSeriesOption
  >

  const getBranchShortName = (name: string) =>
    // eslint-disable-next-line
    last(first(name.split(BRANCH_NAME_DELIMITER))!.split('/'))

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

  $: option = {
    grid: { left: 60, right: 30, top: 30, bottom: 75 },
    dataset: [
      {
        dimensions: ['name', 'time'],
        source: Object.entries(branchesToTimeDict).map(([branchFullName, totalSeconds]) => [
          getBranchShortName(branchFullName),
          totalSeconds / secPerHour,
        ]),
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'time', order: 'desc' },
        },
      },
    ],

    tooltip: {
      formatter: (params: any) => {
        return `${params.marker} ${branches.find((branch) =>
          branch.includes(params.name),
        )}: <strong>${formatTime(params.data[1] * secPerHour)}</strong>`
      },
    },
    xAxis: {
      type: 'category',
      name: 'Branches',
      nameLocation: 'middle',
      nameGap: 45,
      axisLabel: {
        interval: 0,
        rotate: 30,
      },
    },
    yAxis: {
      type: 'value',
      name: 'Hours',
      nameLocation: 'middle',
      nameGap: 30,
    },
    series: {
      colorBy: 'data',
      type: 'bar',
      encode: { x: 'name', y: 'time' },
      datasetIndex: 1,
    },
  }

  onMount(() => {
    if (chartRef) {
      chart = echarts.init(chartRef, 'auto', { renderer: 'svg' })
      // @ts-expect-error tough type
      chart.on('click', async (params) => {
        const branch: string = params.data[0 as keyof echarts.ECElementEvent['data']] ?? ''
        if (branch.includes(SHORTCUT_STORY_IDENTIFIER)) {
          const storyId = getStoryId(branch)
          const response = await fetch(`/api/shortcut/search/stories?query=id:${storyId}`)
          const result = await response.json()
          const storyLink: string = (result.data ?? [''])[0]?.app_url
          window.open(storyLink, '_blank')
        }
      })
      const handleResize = () => chart.resize()
      window.addEventListener('resize', handleResize, { passive: true })

      return () => {
        chart.dispose()
        window.removeEventListener('resize', handleResize)
      }
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
