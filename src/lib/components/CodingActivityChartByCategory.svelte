<script lang="ts">
  import { onMount } from 'svelte'
  import * as echarts from 'echarts'
  import dayjs from 'dayjs'
  import advanceFormat from 'dayjs/plugin/advancedFormat.js'
  import type { SummariesResult } from '../../routes/api/wakatime/current/summaries/+server'

  dayjs.extend(advanceFormat)

  export let summaries: SummariesResult

  const xSummaries = summaries.data.map((item) => dayjs(item.range.date).format('MMM Do'))
  const categoriesByDate = summaries.data.map((item) => item.categories)
  const yDataByCategory: Record<string, number[]> = {}

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

  const seriesCategory: echarts.SeriesOption[] = Object.keys(yDataByCategory).map((key) => {
    return {
      data: yDataByCategory[key],
      type: 'bar',
      stack: 'x',
      name: key,
    }
  })

  onMount(() => {
    const categoryChart = document.getElementById('wcs-category')
    if (categoryChart) {
      const myChart: echarts.ECharts = echarts.init(categoryChart, undefined, { renderer: 'svg' })
      window.addEventListener(
        'resize',
        function () {
          myChart.resize()
        },
        { passive: true },
      )
      // Specify the configuration items and data for the chart
      const option: echarts.EChartsOption = {
        darkMode: false,
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
        series: seriesCategory,
      }

      myChart.setOption(option)
    }
  })
</script>

<h2 class="mb-8 text-center text-3xl text-stone-300">Weekly Coding Stats by Category</h2>
<div id="wcs-category" class="mb-8 h-96 w-full bg-slate-950 p-4" />
