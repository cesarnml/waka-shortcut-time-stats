<script lang="ts">
  import { onMount } from 'svelte'
  import * as echarts from 'echarts'
  import dayjs from 'dayjs'
  import localeData from 'dayjs/plugin/localeData'
  import type { SummariesResult } from '../../routes/api/wakatime/current/summaries/+server'

  dayjs.extend(localeData)
  const countryColors = {
    Australia: '#00008b',
    Canada: '#f00',
    China: '#ffde00',
    Cuba: '#002a8f',
    Finland: '#003580',
    France: '#ed2939',
    Germany: '#000',
    Iceland: '#003897',
    India: '#f93',
    Japan: '#bc002d',
    'North Korea': '#024fa2',
    'South Korea': '#000',
    'New Zealand': '#00247d',
    Norway: '#ef2b2d',
    Poland: '#dc143c',
    Russia: '#d52b1e',
    Turkey: '#e30a17',
    'United Kingdom': '#00247d',
    'United States': '#b22234',
  }
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
        Math.round(datum.grand_total.total_seconds) / 60
    }
    yDataByWeekday[dayIntToText[dayjs(datum.range.date).day() as KeyOfDayIntToText]] +=
      Math.round(datum.grand_total.total_seconds) / 60
  })

  onMount(() => {
    const categoryChart = document.getElementById('wcs-weekday')

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
        grid: { left: '15%' },
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

          axisLabel: {
            color: '#fafafa',
          },
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

<div class="space-y-8 rounded-2xl bg-slate-800 pt-4">
  <h2 class="text-center text-3xl text-stone-300">Weekly Coding Stats by Weekday</h2>
  <div id="wcs-weekday" class="h-96 w-full" />
</div>
