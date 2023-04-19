<script lang="ts">
  import { onMount } from 'svelte'
  import * as echarts from 'echarts'
  import dayjs from 'dayjs'
  import advanceFormat from 'dayjs/plugin/advancedFormat.js'
  import type { SummariesResult } from '../../routes/api/wakatime/current/summaries/+server'

  dayjs.extend(advanceFormat)

  export let summaries: SummariesResult

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

  onMount(() => {
    const projectChart = document.getElementById('wcs-project')
    if (projectChart) {
      const myChart = echarts.init(projectChart, undefined, { renderer: 'svg' })
      window.addEventListener(
        'resize',
        function () {
          myChart.resize()
        },
        { passive: true },
      )
      // Specify the configuration items and data for the chart
      const option: echarts.EChartsOption = {
        tooltip: {},
        legend: {
          type: 'scroll',
          align: 'auto',
        },
        xAxis: {
          data: xSummaries,
          axisLabel: {
            color: '#fafafa',
          },
        },
        yAxis: {},
        series: seriesProject,
      }

      myChart.setOption(option)
    }
  })
</script>

<h2 class="mb-8 text-center text-3xl text-stone-300">Weekly Coding Stats by Project</h2>
<div id="wcs-project" class="mb-8 h-96 w-full bg-slate-950 p-4" />
