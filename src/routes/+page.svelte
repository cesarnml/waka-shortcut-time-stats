<script lang="ts">
  import { onMount } from 'svelte'
  import * as echarts from 'echarts'

  import dayjs from 'dayjs'
  import advanceFormat from 'dayjs/plugin/advancedFormat.js'

  dayjs.extend(advanceFormat)

  export let data

  const { summaries } = data

  const xSummaries = summaries.data.map((item) => dayjs(item.range.date).format('MMM Do'))

  const projectsByDate = summaries.data.map((item) => item.projects)
  const categoriesByDate = summaries.data.map((item) => item.categories)
  const languagesByDate = summaries.data.map((item) => item.languages)

  const yDataByCategory: Record<string, number[]> = {}
  const yDataByProject: Record<string, number[]> = {}
  const languageToWeeklyCodingTime: Record<string, number> = {}

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

  categoriesByDate.forEach((categories, dateIndex) => {
    categories.forEach((category) => {
      if (yDataByCategory[category.name] === undefined) {
        if (dateIndex === 0) {
          yDataByCategory[category.name] = [Math.floor(category.total_seconds / 60)]
        } else {
          const initialArray = Array(dateIndex).fill(0)
          yDataByCategory[category.name] = [
            ...initialArray,
            Math.floor(category.total_seconds / 60),
          ]
        }
      } else {
        yDataByCategory[category.name].push(Math.floor(category.total_seconds / 60))
      }
    })
  })

  languagesByDate.forEach((languages) => {
    languages.forEach((language) => {
      if (languageToWeeklyCodingTime[language.name] === undefined) {
        languageToWeeklyCodingTime[language.name] = language.total_seconds
      } else {
        languageToWeeklyCodingTime[language.name] += language.total_seconds
      }
    })
  })

  const dataPie = Object.keys(languageToWeeklyCodingTime).map((language) => ({
    value: Math.floor(languageToWeeklyCodingTime[language] / languagesByDate.length),
    name: language,
  }))

  const seriesProject = Object.keys(yDataByProject).map((key) => {
    return {
      data: yDataByProject[key],
      type: 'bar',
      stack: 'x',
      name: key,
    }
  })

  const seriesCategory = Object.keys(yDataByCategory).map((key) => {
    return {
      data: yDataByCategory[key],
      type: 'bar',
      stack: 'x',
      name: key,
    }
  })

  onMount(() => {
    // Initialize the echarts instance based on the prepared dom
    const projectChart = document.getElementById('wcs-project')
    if (projectChart) {
      const myChart = echarts.init(projectChart, undefined, { renderer: 'svg' })
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
        series: seriesProject,
      }

      // Display the chart using the configuration items and data just specified.
      myChart.setOption(option)
    }

    const categoryChart = document.getElementById('wcs-category')
    if (categoryChart) {
      const myChart = echarts.init(categoryChart, undefined, { renderer: 'svg' })
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
        series: seriesCategory,
      }

      // Display the chart using the configuration items and data just specified.
      myChart.setOption(option)
    }

    const languagePie = document.getElementById('pie')

    if (languagePie) {
      const myChart = echarts.init(languagePie)
      const option = {
        tooltip: {
          trigger: 'item',
        },
        legend: {},
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: dataPie,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
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
  <h2 class="mb-4 text-center text-3xl">Weekly Coding Stats by Project</h2>
  <div id="wcs-project" class="h-96 w-screen" />
  <h2 class="mb-4 text-center text-3xl">Weekly Coding Stats by Category</h2>
  <div id="wcs-category" class="h-96 w-screen" />
  <h2 class="mb-4 text-center text-3xl">Languages</h2>
  <div id="pie" class="h-[600px] w-screen" />
  <h2 class="text-4xl">Grand Total</h2>
  <pre>{JSON.stringify(data.allTimeSinceToday, null, 2)}</pre>
  <hr />
  <h2 class="text-4xl">Iterations</h2>
  <pre>{JSON.stringify(data.iterations, null, 2)}</pre>
  <hr />
  <h2 class="text-4xl">Summaries</h2>
  <pre>{JSON.stringify(data.summaries, null, 2)}</pre>
</div>
