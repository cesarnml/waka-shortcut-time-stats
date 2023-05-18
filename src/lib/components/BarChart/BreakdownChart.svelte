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
  let isFiltered: boolean

  $: data = createBreakdownChartData(summaries)
  $: filteredData = filterBreakdownChartData(data)
  $: option = createBreakdownChartOption(isFiltered ? filteredData : data)

  onMount(() => {
    chart = echarts.init(chartRef, 'dark', { renderer: 'svg' })
    const handleResize = () => chart.resize()
    window.addEventListener('resize', handleResize, { passive: true })
    tippy(document.querySelectorAll('[data-tippy-content]'))

    chart.on('click', (params) => {
      goto(Url.ProjectDetail(params.name))
    })

    return () => {
      chart.dispose()
      window.removeEventListener('resize', handleResize)
    }
  })

  afterUpdate(() => {
    tippy(document.querySelectorAll('[data-tippy-content]'))
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

      <div class="absolute right-0 top-0 flex h-full h-full items-center gap-4">
        <button on:click={() => (isFiltered = !isFiltered)} class="flex items-center">
          {#if isFiltered}
            <iconify-icon
              class="h-full text-base"
              icon="bi:filter-circle"
              data-tippy-content="Show all projects"
            />
          {:else}
            <iconify-icon
              class="h-full text-base text-zinc-500"
              icon="bi:filter-circle"
              data-tippy-content="Hide small values"
            />
          {/if}
        </button>
        <iconify-icon
          icon="solar:info-circle-linear"
          data-tippy-content="Click a bar to view project details"
        />
      </div>
    </div>
  </ChartTitle>
  <div bind:this={chartRef} class="h-96" />
</ChartContainer>
