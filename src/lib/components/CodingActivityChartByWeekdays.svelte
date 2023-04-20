<script lang="ts">
  import { onMount } from 'svelte'
  import * as echarts from 'echarts'
  import dayjs from 'dayjs'
  import localeData from 'dayjs/plugin/localeData'
  import type { SummariesResult } from '../../routes/api/wakatime/current/summaries/+server'

  dayjs.extend(localeData)

  const dayIntToText = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
  }

  type KeyOfDayIntToText = keyof typeof dayIntToText

  export let summaries: SummariesResult

  const weekdays = [...dayjs.weekdaysShort().slice(1), 'Sun']

  const yDataByWeekday: Record<string, number> = {}

  summaries.data.forEach((datum) => {
    if (
      yDataByWeekday[dayIntToText[dayjs(datum.range.date).day() as KeyOfDayIntToText]] === undefined
    ) {
      yDataByWeekday[dayIntToText[dayjs(datum.range.date).day() as KeyOfDayIntToText]] =
        datum.grand_total.total_seconds
    }
    yDataByWeekday[dayIntToText[dayjs(datum.range.date).day() as KeyOfDayIntToText]] +=
      datum.grand_total.total_seconds
  })

  onMount(() => {
    const categoryChart = document.getElementById('wcs-weekday')
    console.log('yDataByWeekday:', yDataByWeekday)

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
        xAxis: {
          type: 'category',
          data: weekdays,
          axisLabel: {
            color: '#fafafa',
          },
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: weekdays.map((weekday) => Math.floor(yDataByWeekday[weekday])),
            type: 'bar',
          },
        ],
      }

      myChart.setOption(option)
    }
  })
</script>

<div class="space-y-8 bg-slate-950 pt-4">
  <h2 class="text-center text-3xl text-stone-300">Weekly Coding Stats by Weekday</h2>
  <div id="wcs-weekday" class="h-96 w-full" />
</div>
