<script lang="ts">
  import dayjs from 'dayjs'
  import * as echarts from 'echarts'
  import { onMount, afterUpdate } from 'svelte'
  import { page } from '$app/stores'
  import type { SummariesResult } from '$src/routes/api/wakatime/current/summaries/+server'
  import ChartContainer from './ChartContainer.svelte'
  import ChartTitle from './ChartTitle.svelte'
  import { DateFormat, secPerHour } from '$lib/constants'

  export let summaries: SummariesResult
  export let title = 'Coding Activity'
  let chartRef: HTMLDivElement

  let chart: echarts.ECharts
  $: dates = summaries.data.map((summary) => dayjs(summary.range.date).format(DateFormat.Short))
  $: values = summaries.data.map((summary) =>
    (summary.grand_total.total_seconds / secPerHour).toFixed(1),
  )

  let option: echarts.EChartsOption

  option = {
    tooltip: {
      trigger: 'item',
      valueFormatter: (value) => `${value}h`,
    },
    grid: { left: 50, right: 20, top: 50, bottom: 50, containLabel: true },

    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: dates,
        axisLabel: {
          color: '#fafafa',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          showMinLabel: false,

          formatter: (value: string) => `${value}h`,
          color: '#fafafa',
        },
      },
    ],
    // @ts-expect-error tough type
    series: {
      name: $page.params.projectName,
      type: 'line',
      smooth: true,
      areaStyle: {
        color: summaries.color ?? '#5A6FC0',
      },
      lineStyle: {
        width: 4,
        color: summaries.color ?? '#5A6FC0',
      },
      itemStyle: {
        borderCap: 'round',
        borderJoin: true,
        color: '#ff0000',
        borderWidth: 2,
        borderColor: '#ff0000',
      },
      data: values,
    },
  }

  afterUpdate(() => {
    if (option && chart) {
      option = {
        tooltip: {
          trigger: 'item',
          valueFormatter: (value) => `${value}h`,
        },
        grid: { left: 50, right: 20, top: 50, bottom: 50, containLabel: true },

        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: dates,
            axisLabel: {
              color: '#fafafa',
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              showMinLabel: false,

              formatter: (value: string) => `${value}h`,
              color: '#fafafa',
            },
          },
        ],
        // @ts-expect-error tough type
        series: {
          name: $page.params.projectName,
          type: 'line',
          smooth: true,
          areaStyle: {
            color: summaries.color ?? '#5A6FC0',
          },
          lineStyle: {
            width: 4,
            color: summaries.color ?? '#5A6FC0',
          },
          itemStyle: {
            borderCap: 'round',
            borderJoin: true,
            color: '#ff0000',
            borderWidth: 2,
            borderColor: '#ff0000',
          },
          data: values,
        },
      }

      chart.setOption(option)
    }
  })

  onMount(() => {
    const handleResize = () => chart.resize()
    if (chartRef) {
      chart = echarts.init(chartRef, 'dark', { renderer: 'svg' })
      window.addEventListener('resize', handleResize, { passive: true })
      chart.setOption(option)
    }
    return () => window.removeEventListener('resize', handleResize)
  })
</script>

<ChartContainer>
  <ChartTitle>{title}</ChartTitle>
  <div class="h-96 w-full" bind:this={chartRef} />
</ChartContainer>
