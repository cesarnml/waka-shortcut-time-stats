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
          yDataByCategory[category.name] = [Number((category.total_seconds / 3600).toFixed(1))]
        } else {
          const initialArray = Array(dateIndex).fill(0)
          yDataByCategory[category.name] = [
            ...initialArray,
            Number((category.total_seconds / 3600).toFixed(1)),
          ]
        }
      } else {
        yDataByCategory[category.name].push(Number((category.total_seconds / 3600).toFixed(1)))
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
        series: seriesCategory,
      }

      myChart.setOption(option)
    }
  })
</script>

<div class="space-y-8 rounded-2xl bg-slate-800 pt-4">
  <h2 class="text-center text-3xl text-stone-300">Weekly Coding Stats by Category</h2>
  <div id="wcs-category" class="h-96 w-full" />
</div>
