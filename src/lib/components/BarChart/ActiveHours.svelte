<script lang="ts">
  import * as echarts from 'echarts'
  import DailyChartControls from '$lib/components/BarChart/DailyChartControls.svelte'
  import ChartContainer from '$lib/components/ChartContainer.svelte'
  import ChartTitle from '$lib/components/ChartTitle.svelte'
  import type { DurationsResult, WakaDuration } from '$src/types/wakatime'
  import { onMount } from 'svelte'
  import { afterUpdate } from 'svelte'
  import dayjs from 'dayjs'
  import DailyTitleContent from './DailyTitleContent.svelte'
  import { DateFormat } from '$lib/helpers/timeHelpers'

  export let durations: DurationsResult
  export let itemType: Extract<keyof WakaDuration, 'project' | 'language'>

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts
  let option: echarts.EChartsOption

  $: date = dayjs(durations.start).format(DateFormat.Shortish)

  $: option = {
    xAxis: {
      type: 'category',
      axisTick: {
        alignWithLabel: true,
      },
      data: [
        '12 am',
        '1 am',
        '2 am',
        '3 am',
        '4 am',
        '5 am',
        '6 am',
        '7 am',
        '8 am',
        '9 am',
        '10 am',
        '11 am',
        '12 pm',
        '1 pm',
        '2 pm',
        '3 pm',
        '4 pm',
        '5 pm',
        '6 pm',
        '7 pm',
        '8 pm',
        '9 pm',
        '10 pm',
        '11 pm',
      ],
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => `${value}m`,
        showMinLabel: false,
      },
    },
    tooltip: {
      valueFormatter: (value) => `${value}m`,
    },
    series: [
      {
        data: durations.data.reduce((acc, duration) => {
          const start = duration.time
          const end = duration.time + duration.duration

          const startTime = dayjs.unix(start)
          const endTime = dayjs.unix(end)
          const startHour = startTime.hour()
          const endHour = endTime.hour()

          if (startHour === endHour) {
            acc[startHour] += endTime.diff(startTime, 'minutes')
            return acc
          }

          for (let hour = startHour; hour <= endHour; hour++) {
            const startInterval = startTime.hour(hour).minute(0).millisecond(0)
            const endInterval = startTime
              .hour(hour + 1)
              .minute(0)
              .millisecond(0)
            const lowerMinute = startInterval.isBefore(startTime) ? startTime.minute() : 0
            const upperMinute = endInterval.isBefore(endTime) ? 60 : endTime.minute()
            const deltaMinutes = upperMinute - lowerMinute
            acc[hour] += deltaMinutes
          }
          return acc
        }, Array(24).fill(0)),
        type: 'bar',
        showBackground: true,
      },
    ],
  }

  onMount(() => {
    chart = echarts.init(chartRef)
    const handleResize = () => chart.resize()
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      chart.dispose()
      window.removeEventListener('resize', handleResize)
    }
  })

  afterUpdate(() => chart.setOption(option))

  const onUpdate = (e: CustomEvent) => (durations = e.detail)
</script>

<ChartContainer>
  <ChartTitle><DailyTitleContent title="Active Hours" {date} /></ChartTitle>
  <DailyChartControls {durations} {itemType} on:update={onUpdate} />
  <div bind:this={chartRef} class="h-96 w-full" />
</ChartContainer>
