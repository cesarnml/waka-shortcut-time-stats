<script lang="ts">
  import { onMount } from 'svelte'
  import * as echarts from 'echarts'
  import dayjs from 'dayjs'
  import localeData from 'dayjs/plugin/localeData'

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
      yDataByWeekday[dayIntToText[dayjs(datum.range.date).day() as KeyOfDayIntToText]] = Number(
        (datum.grand_total.total_seconds / 3600).toFixed(1),
      )
    }
    yDataByWeekday[dayIntToText[dayjs(datum.range.date).day() as KeyOfDayIntToText]] += Number(
      (datum.grand_total.total_seconds / 3600).toFixed(1),
    )
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
        grid: { left: '10%', right: '5%' },
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
            data: weekdays.map((weekday) => yDataByWeekday[weekday]),
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
