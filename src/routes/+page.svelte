<script lang="ts">
  import { onMount } from 'svelte'
  import * as echarts from 'echarts'

  import dayjs from 'dayjs'
  import advanceFormat from 'dayjs/plugin/advancedFormat.js'

  dayjs.extend(advanceFormat)

  export let data

  const { summaries } = data

  const xSummaries = summaries.data.map((item) => dayjs(item.range.date).format('MMM Do'))
  const projectsByDateArray = summaries.data.map((item) => item.projects)

  const yDataByProjectName: Record<string, any> = {}

  projectsByDateArray.forEach((projects, dateIndex) => {
    projects.forEach((project) => {
      if (yDataByProjectName[project.name] === undefined) {
        if (dateIndex === 0) {
          yDataByProjectName[project.name] = [Math.floor(project.total_seconds / 60)]
        } else {
          const initialArray = Array(dateIndex).fill(0)
          yDataByProjectName[project.name] = [
            ...initialArray,
            Math.floor(project.total_seconds / 60),
          ]
        }
      } else {
        yDataByProjectName[project.name].push(Math.floor(project.total_seconds / 60))
      }
    })
  })

  const series = Object.keys(yDataByProjectName).map((key) => {
    return {
      data: yDataByProjectName[key],
      type: 'bar',
      stack: 'x',
      name: key,
    }
  })

  onMount(() => {
    // Initialize the echarts instance based on the prepared dom
    const chartElement = document.getElementById('example-chart')
    if (chartElement) {
      const myChart = echarts.init(chartElement, undefined, { renderer: 'svg' })
      window.addEventListener('resize', function () {
        myChart.resize()
      })
      // Specify the configuration items and data for the chart
      const option = {
        darkMode: false,
        tooltip: {},
        legend: {
          type: 'scroll',
          align: 'auto',
        },
        xAxis: {
          data: xSummaries,
        },
        yAxis: {},
        series,
      }

      // Display the chart using the configuration items and data just specified.
      myChart.setOption(option)
    }
  })
</script>

<svelte:head>
  <title>WakaStats</title>
</svelte:head>

<div>
  <div id="example-chart" style="width: 100vw;height:600px" />
  <h2 class="text-4xl">Grand Total</h2>
  <pre>{JSON.stringify(data.allTimeSinceToday, null, 2)}</pre>
  <hr />
  <h2 class="text-4xl">Iterations</h2>
  <pre>{JSON.stringify(data.iterations, null, 2)}</pre>
  <hr />
  <h2 class="text-4xl">Summaries</h2>
  <pre>{JSON.stringify(data.summaries, null, 2)}</pre>
</div>
