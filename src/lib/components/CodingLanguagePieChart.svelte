<script lang="ts">
  import { onMount } from 'svelte'
  import * as echarts from 'echarts'
  import dayjs from 'dayjs'
  import advanceFormat from 'dayjs/plugin/advancedFormat.js'
  import type { SummariesResult } from '../../routes/api/wakatime/current/summaries/+server'

  dayjs.extend(advanceFormat)

  export let summaries: SummariesResult

  const languagesByDate = summaries.data.map((item) => item.languages)
  const languageToWeeklyCodingTime: Record<string, number> = {}

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

  onMount(() => {
    const languagePie = document.getElementById('pie')

    if (languagePie) {
      const myChart = echarts.init(languagePie)
      window.addEventListener(
        'resize',
        function () {
          myChart.resize()
        },
        { passive: true },
      )

      const option: echarts.EChartsOption = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          padding: 10,
          type: 'scroll',
          textStyle: {
            color: '#fafafa',
          },
        },
        series: [
          {
            name: 'Languages',
            type: 'pie',
            radius: '50%',
            data: dataPie,
            label: {
              color: '#fafafa',
            },
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
      myChart.setOption(option)
    }
  })
</script>

<div class="space-y-8 bg-slate-950 pt-4">
  <h2 class="text-center text-3xl text-stone-300">Languages</h2>
  <div id="pie" class="h-[500px] w-full" />
</div>
