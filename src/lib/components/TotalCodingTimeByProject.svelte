<script lang="ts">
  import * as echarts from 'echarts'
  import { onMount } from 'svelte'
  import type { SummariesResult } from '../../routes/api/wakatime/current/summaries/+server'
  import zipWith from 'lodash/zipWith'
  import add from 'lodash/add'
  import dayjs from 'dayjs'

  type EChartsOption = echarts.EChartsOption

  export let summaries: SummariesResult
  let myChart: echarts.ECharts

  const projectNames = [
    ...new Set(
      summaries.data.map((summary) => summary.projects.map((project) => project.name)).flat(),
    ),
  ]

  let data: number[] = projectNames.map(() => 0)

  let dataByDateDict: Record<string, number[]> = {}

  summaries.data.forEach((summary) => {
    return (dataByDateDict[summary.range.date] = projectNames.map((name) =>
      Number(
        (
          (summary.projects.find((project) => project.name === name)?.total_seconds ?? 0) /
          60 /
          60
        ).toFixed(2),
      ),
    ))
  })

  let dates = Object.keys(dataByDateDict)

  const dateToDay = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
  }

  onMount(() => {
    var chartDom = document.getElementById('racing')
    if (chartDom) {
      myChart = echarts.init(chartDom)

      window.addEventListener(
        'resize',
        function () {
          myChart.resize()
        },
        { passive: true },
      )

      const option: EChartsOption = {
        textStyle: {
          color: '#fafafa',
          fontSize: 14,
          fontWeight: 'bold',
        },
        grid: {
          name: 'grid',
          show: true,
          containLabel: true,
          left: '8%',
          right: '16%',
        },
        xAxis: {
          max: 'dataMax',
          name: dayjs(dates[0]).format('MMM Do'),
          axisLabel: {
            color: '#fafafa',
          },
        },
        yAxis: {
          type: 'category',
          data: projectNames,
          inverse: true,
          animationDuration: 300,
          animationDurationUpdate: 300,
          axisLabel: {
            color: '#fafafa',
          },
          max: 4, // only the largest 3 bars will be displayed
        },
        series: [
          {
            colorBy: 'data',
            realtimeSort: true,
            name: 'X',
            type: 'bar',
            data: data,
            label: {
              show: true,
              position: 'right',
              valueAnimation: true,
              textBorderWidth: 3,
              formatter: (item) => `${item.value} h`,
            },
          },
        ],
        animationDuration: 0,
        animationDurationUpdate: 3000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
      }

      option && myChart.setOption(option)
    }
  })

  const timer = (ms: number) => new Promise((res) => setTimeout(res, ms))

  async function load() {
    // We need to wrap the loop into an async function for this to work
    for (var i = 0; i < summaries.data.length; i++) {
      data = zipWith(data, dataByDateDict[dates[i]], add).map((number) => Number(number.toFixed(2)))
      myChart?.setOption<echarts.EChartsOption>({
        xAxis: {
          name: `${dateToDay[dayjs(dates[i]).day() as keyof typeof dateToDay]} ${dayjs(
            dates[i],
          ).format('Do')}`,
        },
        series: [
          {
            type: 'bar',
            data: data,
          },
        ],
      })
      await timer(3000) // then the created Promise can be awaited
    }
  }

  load()
</script>

<div class="space-y-8 rounded-2xl bg-slate-800 pt-4">
  <h2 class="text-center text-3xl text-stone-300">Top 5 Projects by Total Time</h2>
  <div id="racing" class="h-96 w-full" />
</div>
