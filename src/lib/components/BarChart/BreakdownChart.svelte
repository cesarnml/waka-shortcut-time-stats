<script lang="ts">
  import { goto } from '$app/navigation'
  import type { SummariesResult } from '$src/types/wakatime'
  import * as echarts from 'echarts'
  import { afterUpdate, onMount } from 'svelte'
  import ChartContainer from '../ChartContainer.svelte'
  import ChartTitle from '../ChartTitle.svelte'
  import {
    createBreakdownChartData,
    createBreakdownChartOption,
    filterBreakdownChartData,
  } from './horizontalBarChartHelpers'
  import { Url } from '$lib/constants'
  import 'iconify-icon'
  import tippy from 'tippy.js'
  export let summaries: SummariesResult
  export let title: string

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts

  $: data = createBreakdownChartData(summaries)
  $: filteredData = filterBreakdownChartData(data)
  $: option = createBreakdownChartOption(filteredData)

  onMount(() => {
    chart = echarts.init(chartRef, 'dark', { renderer: 'svg' })
    const handleResize = () => chart.resize()
    window.addEventListener('resize', handleResize, { passive: true })
    tippy('[data-tippy-content]')

    chart.on('click', (params) => {
      goto(Url.ProjectDetail(params.name))
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
  <ChartTitle>
    <div class="relative flex items-center justify-center">
      <span />
      <span>
        {title}
      </span>
      <div class="absolute right-0 top-0 flex h-full items-center">
        <iconify-icon
          icon="solar:info-circle-linear"
          data-tippy-content="Click the bar chart to view project details"
        />
      </div>
    </div>
  </ChartTitle>
  <div bind:this={chartRef} class="h-96" />
</ChartContainer>
