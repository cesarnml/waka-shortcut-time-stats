<script lang="ts">
  import { onMount } from 'svelte'
  import * as echarts from 'echarts'
  import dayjs from 'dayjs'
  import advanceFormat from 'dayjs/plugin/advancedFormat'
  import type { SummariesResult } from '../../routes/api/wakatime/current/summaries/+server'

  dayjs.extend(advanceFormat)

  export let summaries: SummariesResult

  let myChart: echarts.ECharts

  let option: echarts.EChartsOption

  const xSummaries = summaries.data.map((item) => dayjs(item.range.date).format('MMM Do'))
  const projectsByDate = summaries.data.map((item) => item.projects)
  const yDataByProject: Record<string, number[]> = {}

  projectsByDate.forEach((projects, dateIndex) => {
    projects.forEach((project) => {
      if (yDataByProject[project.name] === undefined) {
        if (dateIndex === 0) {
          yDataByProject[project.name] = [Math.floor(project.total_seconds / 60)]
        } else {
          const initialArray = Array(dateIndex).fill(0)
          yDataByProject[project.name] = [...initialArray, Math.floor(project.total_seconds / 60)]
        }
      } else {
        yDataByProject[project.name].push(Math.floor(project.total_seconds / 60))
      }
    })
  })

  const seriesProject: echarts.SeriesOption[] = Object.keys(yDataByProject).map((key) => {
    return {
      data: yDataByProject[key],
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
      pageIconColor: '#fafafa',
      pageTextStyle: {
        color: '#fafafa',
      },
    },
    xAxis: {
      data: xSummaries,
      axisLabel: {
        color: '#fafafa',
      },
    },
    yAxis: {
      axisLabel: {
        color: '#fafafa',
      },
    },
    series: seriesProject,
  }

  $: {
    if (myChart && option) {
      const xSummaries = summaries.data.map((item) => dayjs(item.range.date).format('MMM Do'))
      const projectsByDate = summaries.data.map((item) => item.projects)
      const yDataByProject: Record<string, number[]> = {}

      projectsByDate.forEach((projects, dateIndex) => {
        projects.forEach((project) => {
          if (yDataByProject[project.name] === undefined) {
            if (dateIndex === 0) {
              yDataByProject[project.name] = [Math.floor(project.total_seconds / 60)]
            } else {
              const initialArray = Array(dateIndex).fill(0)
              yDataByProject[project.name] = [
                ...initialArray,
                Math.floor(project.total_seconds / 60),
              ]
            }
          } else {
            yDataByProject[project.name].push(Math.floor(project.total_seconds / 60))
          }
        })
      })

      const seriesProject: echarts.SeriesOption[] = Object.keys(yDataByProject).map((key) => {
        return {
          data: yDataByProject[key],
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
          pageIconColor: '#fafafa',
          pageTextStyle: {
            color: '#fafafa',
          },
        },
        xAxis: {
          data: xSummaries,
          axisLabel: {
            color: '#fafafa',
          },
        },
        yAxis: {
          axisLabel: {
            color: '#fafafa',
          },
        },
        series: seriesProject,
      }
      myChart.setOption(option)
    }
  }
  onMount(() => {
    const projectChart = document.getElementById('wcs-project')
    if (projectChart) {
      myChart = echarts.init(projectChart, undefined, { renderer: 'svg' })
      window.addEventListener(
        'resize',
        function () {
          myChart.resize()
        },
        { passive: true },
      )

      myChart.setOption(option)
    }
  })
</script>

<div class="space-y-8 rounded-2xl bg-slate-800 pt-4">
  <h2 class="text-center text-3xl text-stone-300">Weekly Coding Stats by Project</h2>
  <div id="wcs-project" class="mb-8 h-96 w-full" />
</div>
