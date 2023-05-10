<script lang="ts">
  import { onMount } from 'svelte'
  import * as echarts from 'echarts'
  import dayjs from 'dayjs'
  import advanceFormat from 'dayjs/plugin/advancedFormat.js'
  import ChartContainer from './ChartContainer.svelte'
  import ChartTitle from './ChartTitle.svelte'
  import type { SummariesResult } from '$src/types/wakatime'
  import { DateFormat, formatTime } from '$lib/helpers/timeHelpers'
  import zipObject from 'lodash/zipObject'
  import { ChartColor } from '$lib/helpers/chartHelpers'
  import { afterUpdate } from 'svelte'

  dayjs.extend(advanceFormat)

  export let summaries: SummariesResult

  $: dailyAverage = summaries.daily_average.seconds_including_other_language
  $: dates = summaries.data.map((summary) => summary.range.date).reverse()
  $: times = summaries.data.map((summary) => summary.grand_total.total_seconds).reverse()
  $: ratios = times.map((time) => time / dailyAverage)
  $: dateToRatioMap = zipObject(dates, ratios)

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts
  let option: echarts.EChartsOption

  $: selectedDate = summaries.data?.at(-1)?.range.date ?? ''

  $: option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        center: ['50%', '75%'],
        radius: '90%',
        min: 0,
        max: 1.0,
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.2, '#9A60B4'],
              [0.4, '#EE6666'],
              [0.6, '#FDDD60'],
              [0.8, '#58D9F9'],
              [1, '#7CFFB2'],
            ],
          },
        },
        pointer: {
          keepAspect: true,
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 16,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'inherit',
          },
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: ChartColor.Text,
            width: 2,
          },
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: 'inherit',
            width: 5,
          },
        },
        axisLabel: {
          color: ChartColor.Text,
          fontSize: 28,
          distance: -50,
          rotate: 'tangential',
          formatter: (value: number) => {
            if (value === 0.9) {
              return '😄'
            } else if (value === 0.7) {
              return '🙂'
            } else if (value === 0.5) {
              return '😐'
            } else if (value === 0.3) {
              return '🫤'
            } else if (value === 0.1) {
              return '🙁'
            }
            return ''
          },
        },
        title: {
          offsetCenter: [0, -10],
          fontSize: 16,
          color: ChartColor.Text,
        },
        detail: {
          fontSize: 16,
          offsetCenter: [0, '-30%'],
          valueAnimation: true,
          formatter: function (value: number) {
            return Math.round(value * 100) + '' + '%' + ` of Avg`
          },
          color: 'inherit',
        },
        data: [
          {
            value: dateToRatioMap[selectedDate],
            name: `AVG: ${formatTime(summaries.daily_average.seconds_including_other_language)}`,
          },
        ],
      },
    ],
  }

  onMount(() => {
    chart = echarts.init(chartRef, 'dark', { renderer: 'canvas' })
    const handleResize = () => chart.resize()
    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      chart.dispose()
      window.removeEventListener('resize', handleResize)
    }
  })

  const handleClick = (date: string) => {
    const newData = {
      value: dateToRatioMap[date],
      name: `AVG: ${formatTime(summaries.daily_average.seconds_including_other_language)}`,
    }

    selectedDate = date
    const option = chart.getOption()
    //@ts-expect-error tough type
    option.series[0].data = [newData]
    chart.setOption(option)
  }

  afterUpdate(() => {
    chart.setOption(option)
  })
</script>

<ChartContainer>
  <ChartTitle>Discipline Gauge</ChartTitle>
  <div class="carousel-center carousel mx-4 space-x-4">
    {#each dates as date (date)}
      <div class="carousel-item">
        <button
          class:active={date === selectedDate}
          class="btn-outline btn-primary btn-sm btn normal-case"
          on:click={() => handleClick(date)}
        >
          {dayjs(date).format(DateFormat.Short)}
        </button>
      </div>
    {/each}
  </div>
  <div bind:this={chartRef} class="h-96 w-full" />
</ChartContainer>

<style lang="postcss">
  .active {
    @apply btn-outline btn-accent;
  }
</style>
