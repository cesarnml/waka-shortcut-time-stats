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
  let title = 'Coding Activity'

  let chartContainer: HTMLDivElement
  let chart: echarts.ECharts
  let option: echarts.EChartsOption

  const xValues = summaries.data.map((item) => dayjs(item.range.date).format(DateFormat.Short))
  const projectsByDate = summaries.data.map((item) => item.projects)
  const projectNames = [
    ...new Set(summaries.data.map((item) => item.projects.map((project) => project.name)).flat()),
  ]

  let yDataByProject = zipObject(
    projectNames,
    JSON.parse(JSON.stringify(Array(projectNames.length).fill(Array(xValues.length).fill(0)))),
  )

  projectsByDate.forEach((projects, dateIndex) => {
    projects.forEach((project) => {
      // @ts-expect-error tough type
      yDataByProject[project.name][dateIndex] = Number(
        (project.total_seconds / secPerHour).toFixed(1),
      )
    })
  })

  // @ts-expect-error tough type
  const seriesProject: echarts.SeriesOption[] = projectNames.map((key) => {
    return {
      data: yDataByProject[key],
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
    series: seriesProject,
  }

  onMount(() => {
    const handleResize = () => chart.resize()
    if (chartContainer) {
      chart = echarts.init(chartContainer, 'dark', { renderer: 'svg' })
      window.addEventListener('resize', handleResize, { passive: true })
      chart.setOption(option)
    }
    return () => window.removeEventListener('resize', handleResize)
  })

  afterUpdate(() => {
    const xValues = summaries.data.map((item) => dayjs(item.range.date).format(DateFormat.Short))
    const projectsByDate = summaries.data.map((item) => item.projects)
    const projectNames = [
      ...new Set(summaries.data.map((item) => item.projects.map((project) => project.name)).flat()),
    ]
    let yDataByProject = zipObject(
      projectNames,
      JSON.parse(JSON.stringify(Array(projectNames.length).fill(Array(xValues.length).fill(0)))),
    )

    projectsByDate.forEach((projects, dateIndex) => {
      projects.forEach((project) => {
        // @ts-expect-error tough type
        yDataByProject[project.name][dateIndex] = Number(
          (project.total_seconds / secPerHour).toFixed(1),
        )
      })
    })

    const seriesProject: echarts.SeriesOption[] = projectNames.map((key) => {
      return {
        data: yDataByProject[key],
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
      series: seriesProject,
    }

    chart.setOption(option)
  })
</script>

<ChartContainer>
  <ChartTitle>{title}</ChartTitle>
  <div class="h-96 w-full" bind:this={chartContainer} />
</ChartContainer>
