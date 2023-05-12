<script lang="ts">
  import * as echarts from 'echarts'
  import { afterUpdate, onMount } from 'svelte'
  import type { SummariesResult } from '$src/types/wakatime'
  import { formatTime, secPerHour } from '$lib/helpers/timeHelpers'
  import { ChartColor } from '$lib/helpers/chartHelpers'
  import max from 'lodash/max'
  import ChartContainer from '../ChartContainer.svelte'
  import ChartTitle from '../ChartTitle.svelte'
  import { goto } from '$app/navigation'

  export let summaries: SummariesResult
  export let title: string

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts
  let option: echarts.EChartsOption

  const createBarChartData = (summaries: SummariesResult) => {
    const result = {} as Record<string, number>
    summaries.data.forEach((summary) =>
      summary.projects.forEach((project) => {
        result[project.name] = (result[project.name] ?? 0) + project.total_seconds
      }),
    )
    return result
  }

  $: projectNameToTotalSeconds = createBarChartData(summaries)

  // TODO: Enable turning off filtering small values
  $: filtered = Object.entries(projectNameToTotalSeconds).reduce((acc, [name, value]) => {
    if (value > (max(Object.values(projectNameToTotalSeconds)) ?? 1) * 0.01) {
      return { ...acc, [name]: value / secPerHour }
    }
    return acc
  }, {} as Record<string, number>)

  $: option = {
    grid: {
      left: 45,
      right: 45,
      top: 10,
      bottom: 65,
    },
    tooltip: { valueFormatter: (value) => formatTime(value as number) },
    xAxis: {
      type: 'value',
      name: 'Total Hours',
      nameLocation: 'middle',
      nameGap: 35,
      axisLabel: {
        showMinLabel: false,
      },
    },
    yAxis: {
      type: 'category',
      data: Object.keys(filtered),
      zlevel: 2,
      name: 'Projects',
      nameLocation: 'middle',
      axisTick: {
        alignWithLabel: true,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        inside: true,
        fontWeight: 'bold',
        textShadowBlur: 5,
        color: ChartColor.Text,
      },
    },
    series: [
      {
        colorBy: 'data',
        type: 'bar',
        data: Object.values(filtered),
      },
    ],
  }

  onMount(() => {
    chart = echarts.init(chartRef, 'dark', { renderer: 'svg' })
    const handleResize = () => chart.resize()
    window.addEventListener('resize', handleResize, { passive: true })

    chart.on('click', (params) => {
      goto(`/projects/${params.name}`)
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
  <div bind:this={chartRef} class="h-96 w-full" />
</ChartContainer>
