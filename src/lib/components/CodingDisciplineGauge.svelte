<script lang="ts">
  import { onMount } from 'svelte'
  import * as echarts from 'echarts'
  import dayjs from 'dayjs'
  import advanceFormat from 'dayjs/plugin/advancedFormat.js'
  import type { SummariesResult } from '../../routes/api/wakatime/current/summaries/+server'

  dayjs.extend(advanceFormat)

  export let summaries: SummariesResult

  $: dailyAverage = summaries.daily_average.seconds_including_other_language
  $: todayData = summaries.data.at(-1)?.grand_total.total_seconds ?? 0
  $: todayDecimal = todayData / dailyAverage
  $: yesterdayData = summaries.data.at(-2)?.grand_total.total_seconds ?? 0
  $: yesterdayDecimal = yesterdayData / dailyAverage

  let gaugeChart: echarts.ECharts
  let gaugeOption: echarts.EChartsOption

  onMount(() => {
    const gaugeElement = document.getElementById('gauge')
    if (gaugeElement) {
      gaugeChart = echarts.init(gaugeElement)

      gaugeOption = {
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            center: ['50%', '75%'],
            radius: '95%',
            min: 0,
            max: 1.0,
            splitNumber: 10,
            axisLine: {
              lineStyle: {
                width: 6,
                color: [
                  [0.2, '#9A60B4'],
                  [0.4, '#EE6666'],
                  [0.6, '#FDDD60'],
                  [0.8, '#58D9F9'],
                  [1, '#7CFFB2'],
                ],
              },
            },
            pointer: {
              icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              length: '16%',
              width: 18,
              offsetCenter: [0, '-60%'],
              itemStyle: {
                color: 'inherit',
              },
            },
            axisTick: {
              length: 12,
              lineStyle: {
                color: '#fafafa',
                width: 2,
              },
            },
            splitLine: {
              length: 20,
              lineStyle: {
                color: 'inherit',
                width: 5,
              },
            },
            axisLabel: {
              color: '#fafafa',
              fontSize: 32,
              distance: -60,
              rotate: 'tangential',
              formatter: function (value: number) {
                if (value === 0.9) {
                  return '😄'
                } else if (value === 0.7) {
                  return '🙂'
                } else if (value === 0.5) {
                  return '😐'
                } else if (value === 0.3) {
                  return '🫤'
                } else if (value === 0.1) {
                  return '🤨'
                }
                return ''
              },
            },
            title: {
              offsetCenter: [0, '-10%'],
              fontSize: 20,
              color: '#fafafa',
            },
            detail: {
              fontSize: 20,
              offsetCenter: [0, '-35%'],
              valueAnimation: true,
              formatter: function (value: number) {
                return Math.round(value * 100) + '' + '%' + ' of Daily Avg'
              },
              color: 'inherit',
            },
            data: [
              {
                value: todayDecimal,
                name: `Today\n ${dayjs().format('MMM DD, YYYY')}`,
              },
            ],
          },
        ],
      }
      gaugeChart.setOption(gaugeOption)
      window.addEventListener(
        'resize',
        function () {
          gaugeChart.resize()
        },
        { passive: true },
      )
    }
  })

  const handleClick = (value: string) => {
    const newYest = {
      value: yesterdayDecimal,
      name: `${dayjs().subtract(1, 'day').format('MMM DD, YYYY')}\nYesterday`,
    }

    const newToday = {
      value: todayDecimal,
      name: `${dayjs().format('MMM DD, YYYY')}\nToday`,
    }

    const option = gaugeChart.getOption()

    if (value === 'Yesterday') {
      // @ts-expect-error no clue
      option.series[0].data = [newYest]
      gaugeChart.setOption(option)
    } else {
      // @ts-expect-error no clue
      option.series[0].data = [newToday]
      gaugeChart.setOption(option)
    }
  }
</script>

<div class="space-y-8 bg-slate-950 pt-4">
  <h2 class="text-center text-3xl text-stone-300">Discipline Gauge</h2>
  <div>
    <div class="flex justify-center gap-4">
      <button class="btn-primary btn-sm btn" on:click={() => handleClick('Yesterday')}
        >Yesterday</button
      >
      <button class="btn-secondary btn-sm btn" on:click={() => handleClick('Today')}>Today</button>
    </div>
    <div id="gauge" class="h-96 w-full" />
  </div>
</div>
