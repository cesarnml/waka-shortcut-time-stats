<script lang="ts">
  import { DateFormat, secPerHour } from '$lib/constants'
  import type { SummariesResult } from '$src/routes/api/wakatime/current/summaries/+server'
  import dayjs from 'dayjs'
  import * as echarts from 'echarts'
  import { afterUpdate, onMount } from 'svelte'
  import ChartContainer from './ChartContainer.svelte'
  import ChartTitle from './ChartTitle.svelte'
  import zipObject from 'lodash/zipObject'

  export let summaries: SummariesResult
  export let title = 'Category vs Time'

  let chartContainer: HTMLDivElement
  let chart: echarts.ECharts
  let option: echarts.EChartsOption

  const xValues = summaries.data.map((item) => dayjs(item.range.date).format(DateFormat.Short))
  const categoriesByDate = summaries.data.map((item) => item.categories)
  const categoryNames = [
    ...new Set(
      summaries.data.map((item) => item.categories.map((category) => category.name)).flat(),
    ),
  ]

  const yDataByCategory = zipObject(
    categoryNames,
    JSON.parse(JSON.stringify(Array(categoryNames.length).fill(Array(xValues.length).fill(0)))),
  )

  categoriesByDate.forEach((categories, dateIndex) => {
    categories.forEach((category) => {
      // @ts-expect-error tough type
      yDataByCategory[category.name][dateIndex] = Number(
        (category.total_seconds / secPerHour).toFixed(1),
      )
    })
  })

  // @ts-expect-error tough type
  const seriesCategory: echarts.SeriesOption[] = categoryNames.map((key) => {
    return {
      data: yDataByCategory[key],
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series',
      },
      name: key,
    }
  })
  option = {
    tooltip: {
      valueFormatter: (value) => `${value}h`,
    },
    grid: { left: 50, right: 20, top: 50, bottom: 50 },
    legend: {
      type: 'scroll',
      textStyle: {
        color: '#fafafa',
      },
      pageIconColor: '#fafafa',
      pageTextStyle: {
        color: '#fafafa',
      },
    },
    xAxis: {
      type: 'category',
      data: xValues,
    },
    yAxis: {
      type: 'value',
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
    const categoryNames = [
      ...new Set(
        summaries.data.map((item) => item.categories.map((category) => category.name)).flat(),
      ),
    ]

    const yDataByCategory = zipObject(
      categoryNames,
      JSON.parse(JSON.stringify(Array(categoryNames.length).fill(Array(xValues.length).fill(0)))),
    )

    categoriesByDate.forEach((categories, dateIndex) => {
      categories.forEach((category) => {
        // @ts-expect-error tough type
        yDataByCategory[category.name][dateIndex] = Number(
          (category.total_seconds / secPerHour).toFixed(1),
        )
      })
    })

    // @ts-expect-error tough type
    const seriesCategory: echarts.SeriesOption[] = categoryNames.map((key) => {
      return {
        data: yDataByCategory[key],
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series',
        },
        name: key,
      }
    })

    option = {
      tooltip: {
        valueFormatter: (value) => `${value}h`,
      },
      grid: { left: 50, right: 20, top: 50, bottom: 50 },
      legend: {
        type: 'scroll',
        textStyle: {
          color: '#fafafa',
        },
        pageIconColor: '#fafafa',
        pageTextStyle: {
          color: '#fafafa',
        },
      },
      xAxis: {
        type: 'category',
        data: xValues,
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: number) => `${value}h`,
          showMinLabel: false,
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
