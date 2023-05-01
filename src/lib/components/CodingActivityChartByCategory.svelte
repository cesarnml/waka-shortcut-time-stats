<script lang="ts">
  import { afterUpdate, onMount } from 'svelte'
  import * as echarts from 'echarts'
  import dayjs from 'dayjs'
  import advanceFormat from 'dayjs/plugin/advancedFormat.js'
  import type { SummariesResult } from '../../routes/api/wakatime/current/summaries/+server'
  import { DateFormat, secPerHour } from '$lib/constants'

  dayjs.extend(advanceFormat)

  export let summaries: SummariesResult
  let chartContainer: HTMLDivElement
  let chart: echarts.ECharts
  let option: echarts.EChartsCoreOption

  const xValues = summaries.data.map((item) => dayjs(item.range.date).format(DateFormat.Short))
  const categoriesByDate = summaries.data.map((item) => item.categories)
  const yDataByCategory: Record<string, number[]> = {}

  categoriesByDate.forEach((categories, dateIndex) => {
    categories.forEach((category) => {
      if (yDataByCategory[category.name] === undefined) {
        if (dateIndex === 0) {
          yDataByCategory[category.name] = [
            Number((category.total_seconds / secPerHour).toFixed(1)),
          ]
        } else {
          const initialArray = Array(dateIndex).fill(0)
          yDataByCategory[category.name] = [
            ...initialArray,
            Number((category.total_seconds / secPerHour).toFixed(1)),
          ]
        }
      } else {
        yDataByCategory[category.name].push(
          Number((category.total_seconds / secPerHour).toFixed(1)),
        )
      }
    })
  })

  const seriesCategory: echarts.SeriesOption[] = Object.keys(yDataByCategory).map((key) => {
    return {
      data: yDataByCategory[key],
      type: 'bar',
      stack: 'x',
      name: key,
    }
  })

  option = {
    tooltip: {},
    grid: { left: '10%', right: '5%' },
    legend: {
      padding: 10,
      type: 'scroll',
      textStyle: {
        color: '#fafafa',
      },
    },
    xAxis: {
      data: xValues,
      axisLabel: {
        color: '#fafafa',
      },
    },
    yAxis: {
      axisLabel: {
        color: '#fafafa',
      },
    },
    series: seriesCategory,
  }

  onMount(() => {
    const handleResize = () => chart.resize()
    if (chartContainer) {
      // initialize chart instance
      chart = echarts.init(chartContainer, 'dark', { renderer: 'svg' })
      // add resize listener
      window.addEventListener('resize', handleResize, { passive: true })
      // Set chart configuration and data
      chart.setOption(option)
    }
    // remove listener on unMount
    return () => window.removeEventListener('resize', handleResize)
  })

  afterUpdate(() => {
    const xValues = summaries.data.map((item) => dayjs(item.range.date).format(DateFormat.Short))
    const categoriesByDate = summaries.data.map((item) => item.categories)
    const yDataByCategory: Record<string, number[]> = {}

    categoriesByDate.forEach((categories, dateIndex) => {
      categories.forEach((category) => {
        if (yDataByCategory[category.name] === undefined) {
          if (dateIndex === 0) {
            yDataByCategory[category.name] = [
              Number((category.total_seconds / secPerHour).toFixed(1)),
            ]
          } else {
            const initialArray = Array(dateIndex).fill(0)
            yDataByCategory[category.name] = [
              ...initialArray,
              Number((category.total_seconds / secPerHour).toFixed(1)),
            ]
          }
        } else {
          yDataByCategory[category.name].push(
            Number((category.total_seconds / secPerHour).toFixed(1)),
          )
        }
      })
    })

    const seriesCategory: echarts.SeriesOption[] = Object.keys(yDataByCategory).map((key) => {
      return {
        data: yDataByCategory[key],
        type: 'bar',
        stack: 'x',
        name: key,
      }
    })

    option = {
      tooltip: {},
      grid: { left: '10%', right: '5%' },
      legend: {
        padding: 10,
        type: 'scroll',
        textStyle: {
          color: '#fafafa',
        },
      },
      xAxis: {
        data: xValues,
        axisLabel: {
          color: '#fafafa',
        },
      },
      yAxis: {
        axisLabel: {
          color: '#fafafa',
        },
      },
      series: seriesCategory,
    }
    chart.setOption(option)
  })
</script>

<div class="space-y-8 rounded-2xl bg-slate-800 pt-4">
  <h2 class="text-center text-3xl text-stone-300">Weekly Coding Stats by Category</h2>
  <div bind:this={chartContainer} class="h-96 w-full" />
</div>
