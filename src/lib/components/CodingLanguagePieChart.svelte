<script lang="ts">
  import { onMount } from 'svelte'
  import * as echarts from 'echarts'
  import dayjs from 'dayjs'
  import advanceFormat from 'dayjs/plugin/advancedFormat.js'
  import type { SummariesResult } from '$src/routes/api/wakatime/current/summaries/+server'

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
    value: Number((languageToWeeklyCodingTime[language] / 3600).toFixed(1)),
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
        grid: { left: 0, right: 0, bottom: 0, top: 0 },
        legend: {
          padding: 10,
          type: 'scroll',
          textStyle: {
            color: '#fafafa',
          },
          pageIconColor: '#fafafa',
          pageTextStyle: {
            color: '#fafafa',
          },
        },
        series: [
          {
            name: 'Languages',
            type: 'pie',
            radius: '55%',
            top: 60,
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

<div class="space-y-8 rounded-2xl bg-slate-800 pt-4">
  <h2 class="text-center text-3xl text-stone-300">Languages</h2>
  <div id="pie" class="h-[400px] w-full" />
</div>
