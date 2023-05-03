<script lang="ts">
  import { secPerHour } from '$lib/constants'
  import type { SummariesResult } from '$src/routes/api/wakatime/current/summaries/+server'
  import dayjs from 'dayjs'
  import localeData from 'dayjs/plugin/localeData'
  import * as echarts from 'echarts'
  import { onMount } from 'svelte'
  import ChartContainer from './ChartContainer.svelte'
  import ChartTitle from './ChartTitle.svelte'
  import { afterUpdate } from 'svelte'

  dayjs.extend(localeData)

  const dateMap = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
  }

  type KeyOfDateMap = keyof typeof dateMap

  export let summaries: SummariesResult
  export let title = 'Coding Stats by Weekday'

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts
  let option: echarts.EChartsOption

  const weekdays = [...dayjs.weekdaysShort().slice(1), 'Sun']

  const dateCount = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  }

  const yDataByWeekday: Record<string, number> = {}

  summaries.data.forEach((datum) => {
    const dateInteger = dayjs(datum.range.date).day() as KeyOfDateMap
    dateCount[dateInteger] += 1
    if (yDataByWeekday[dateMap[dateInteger]] === undefined) {
      yDataByWeekday[dateMap[dateInteger]] = Number(datum.grand_total.total_seconds / secPerHour)
    } else {
      yDataByWeekday[dateMap[dateInteger]] += Number(datum.grand_total.total_seconds / secPerHour)
    }
  })

  option = {
    grid: { left: 50, right: 20, top: 50, bottom: 50 },
    // @ts-expect-error tough type
    tooltip: {
      valueFormatter: (value: number) => `${value}h`,
    },
    xAxis: {
      type: 'category',
      data: weekdays,
      axisLabel: {
        color: '#fafafa',
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#fafafa',
        formatter: (value: number) => `${value}h`,
        showMinLabel: false,
      },
    },
    series: [
      {
        data: weekdays.map((weekday, index) =>
          Number((yDataByWeekday[weekday] / dateCount[index as keyof typeof dateCount]).toFixed(1)),
        ),
        type: 'bar',
      },
    ],
  }

  onMount(() => {
    const handleResize = () => chart.resize()
    if (chartRef) {
      chart = echarts.init(chartRef, 'dark', { renderer: 'svg' })
      window.addEventListener('resize', handleResize, { passive: true })
      chart.setOption(option)
    }
    return () => window.removeEventListener('resize', handleResize)
  })

  afterUpdate(() => {
    const dateCount = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    }

    const yDataByWeekday: Record<string, number> = {}

    summaries.data.forEach((datum) => {
      const dateInteger = dayjs(datum.range.date).day() as KeyOfDateMap
      dateCount[dateInteger] += 1
      if (yDataByWeekday[dateMap[dateInteger]] === undefined) {
        yDataByWeekday[dateMap[dateInteger]] = Number(datum.grand_total.total_seconds / secPerHour)
      } else {
        yDataByWeekday[dateMap[dateInteger]] += Number(datum.grand_total.total_seconds / secPerHour)
      }
    })

    option = {
      grid: { left: 50, right: 20, top: 50, bottom: 50 },
      // @ts-expect-error tough type
      tooltip: {
        valueFormatter: (value: number) => `${value}h`,
      },
      xAxis: {
        type: 'category',
        data: weekdays,
        axisLabel: {
          color: '#fafafa',
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#fafafa',
          formatter: (value: number) => `${value}h`,
          showMinLabel: false,
        },
      },
      series: [
        {
          data: weekdays.map((weekday, index) =>
            Number(
              (yDataByWeekday[weekday] / dateCount[index as keyof typeof dateCount]).toFixed(1),
            ),
          ),
          type: 'bar',
        },
      ],
    }

    chart.setOption(option)
  })
</script>

<ChartContainer>
  <ChartTitle>{title}</ChartTitle>
  <div class="h-96 w-full" bind:this={chartRef} />
</ChartContainer>
