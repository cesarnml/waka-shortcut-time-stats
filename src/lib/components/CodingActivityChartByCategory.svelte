<script lang="ts">
  import { DateFormat, secPerHour } from '$lib/constants'
  import type { SummariesResult } from '$src/routes/api/wakatime/current/summaries/+server'
  import dayjs from 'dayjs'
  import * as echarts from 'echarts'
  import { afterUpdate, onMount } from 'svelte'
  import ChartContainer from './ChartContainer.svelte'
  import ChartTitle from './ChartTitle.svelte'

  export let summaries: SummariesResult
  export let title = 'Category vs Time'

  let chartContainer: HTMLDivElement
  let chart: echarts.ECharts
  let option: echarts.EChartsOption

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
    tooltip: {
      valueFormatter: (value) => `${value}h`,
    },
    grid: { left: 20, right: 20, top: 50, bottom: 50 },
    legend: {
      type: 'scroll',
    },
    xAxis: {
      data: xValues,
    },
    yAxis: {
      axisLabel: {
        formatter: (value: number) => `${value}h`,
        showMinLabel: false,
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
      tooltip: {
        valueFormatter: (value) => `${value}h`,
      },
      grid: { top: 50, bottom: 50, left: 40, right: 20 },
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

<ChartContainer>
  <ChartTitle>{title}</ChartTitle>
  <div class="h-96 w-full" bind:this={chartContainer} />
</ChartContainer>
