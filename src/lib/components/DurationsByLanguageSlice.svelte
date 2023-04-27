<script lang="ts">
  import 'iconify-icon'
  import * as echarts from 'echarts'
  import { onMount } from 'svelte'
  import type { DurationsResult } from '../../routes/api/wakatime/current/durations/+server'
  import groupBy from 'lodash/groupBy'
  import orderBy from 'lodash/orderBy'
  import isToday from 'dayjs/plugin/isToday'
  import dayjs from 'dayjs'
  import duration from 'dayjs/plugin/duration'
  import { browser } from '$app/environment'

  dayjs.extend(duration)
  dayjs.extend(isToday)

  export let durationsByLanguage: DurationsResult

  let loading = false
  let myChart: echarts.ECharts
  let option: echarts.EChartsOption

  $: languages = [...new Set(durationsByLanguage.data.map((duration) => duration.language))]
  $: totalDuration = durationsByLanguage.data.reduce((acc, cur) => cur.duration + acc, 0)
  $: durationsByLang = groupBy(durationsByLanguage.data, 'language')
  $: languagesByTotalDuration = orderBy(languages, (language) =>
    durationsByLang[language].reduce((acc, cur) => cur.duration + acc, 0),
  ).filter(
    (language) => durationsByLang[language].reduce((acc, cur) => cur.duration + acc, 0) > 20 * 60,
  )

  const languageToColor = {
    Svelte: '#EB5027',
    TypeScript: '#3075C0',
    HTML: '#EA6328',
    INI: '#B9B9B9',
    Other: '#FAFAFA',
    TSConfig: '#7D7DEB',
    Python: '#376D9D',
    SCSS: '#C76496',
    Markdown: '#000000',
    JSON: '#7D7D7D',
    Ruby: '#AA1401',
    CSS: '#2A65F1',
    Bash: '#44B050',
    YAML: '#F8CA3E',
    LESS: '#2C4E85',
    'Vue.js': '#3EB480',
    'Git Config': '#E94D31',
    Astro: '#583085',
    Text: '#F8F8F8',
    Docker: '#2596ED',
    GraphQL: '#DA32A4',
    Git: '#E94D31',
    SQL: '#D16F30',
  }

  $: {
    if (browser && myChart && option) {
      const startTime = dayjs(durationsByLanguage.start).unix()
      const data: any[] = []

      languagesByTotalDuration.forEach((duration, index) => {
        durationsByLang[duration].forEach((duration) => {
          data.push({
            name: duration.language,
            value: [
              index,
              Math.floor(duration.time),
              Math.floor(duration.time) + Math.floor(duration.duration),
              Math.floor(duration.duration),
            ],
            itemStyle: {
              color: languageToColor[duration.language as keyof typeof languageToColor],
            },
          })
        })
      })

      option = {
        tooltip: {
          formatter: function (params) {
            // @ts-expect-error no clue
            return params.marker + params.name + ': ' + Math.floor(params.value[3] / 60) + ' min'
          },
        },
        dataZoom: [
          {
            type: 'slider',
            filterMode: 'weakFilter',
            showDataShadow: false,
            top: 400,
            labelFormatter: '',
          },
          {
            type: 'inside',
            filterMode: 'weakFilter',
          },
        ],
        grid: {
          height: 250,
          left: 30,
          right: 30,
        },
        xAxis: {
          min: startTime,
          type: 'time',
          axisLabel: {
            color: '#fafafa',
            formatter: function (val: number) {
              return Math.floor(Math.max(0, val - startTime) / 60 / 60) + 'h'
            },
          },
          axisLine: {
            show: true,
          },
        },
        yAxis: {
          data: languagesByTotalDuration,
          type: 'category',
          axisLabel: {
            color: '#fafafa',
            inside: true,
            fontSize: 14,
            fontWeight: 'bold',
            fontFamily: 'monospace',
            textBorderColor: '#ff0000',
            textBorderWidth: 3,
            textBorderType: 'solid',
          },
        },
        series: [
          {
            type: 'custom',
            renderItem: (params, api) => {
              const categoryIndex = api.value(0)
              const start = api.coord([api.value(1), categoryIndex])
              const end = api.coord([api.value(2), categoryIndex])
              // @ts-expect-error no clue
              const height = api.size([0, 1])[1] * 0.6
              const rectShape = echarts.graphic.clipRectByRect(
                {
                  x: start[0],
                  y: start[1] - height / 2,
                  width: end[0] - start[0],
                  height: height,
                },
                {
                  // @ts-expect-error no clue
                  x: params.coordSys.x,
                  // @ts-expect-error no clue
                  y: params.coordSys.y,
                  // @ts-expect-error no clue
                  width: params.coordSys.width,
                  // @ts-expect-error no clue
                  height: params.coordSys.height,
                },
              )
              return (
                rectShape && {
                  type: 'rect',
                  transition: ['shape'],
                  shape: rectShape,
                  style: api.style(),
                }
              )
            },
            itemStyle: {
              opacity: 0.4,
            },
            encode: {
              x: [1, 2],
              y: 0,
            },
            data: data,
          },
        ],
      }

      myChart.setOption(option)
    }
  }

  onMount(() => {
    var chartDom = document.getElementById('durations-by-language')

    if (chartDom) {
      myChart = echarts.init(chartDom)
      window.addEventListener(
        'resize',
        function () {
          myChart.resize()
        },
        { passive: true },
      )
      const startTime = dayjs(durationsByLanguage.start).unix()
      const data: any[] = []

      languagesByTotalDuration.forEach((duration, index) => {
        durationsByLang[duration].forEach((duration) => {
          data.push({
            name: duration.language,
            value: [
              index,
              Math.floor(duration.time),
              Math.floor(duration.time) + Math.floor(duration.duration),
              Math.floor(duration.duration),
            ],
            itemStyle: {
              color: languageToColor[duration.language as keyof typeof languageToColor],
            },
          })
        })
      })

      option = {
        tooltip: {
          formatter: function (params) {
            // @ts-expect-error no clue
            return params.marker + params.name + ': ' + Math.floor(params.value[3] / 60) + ' min'
          },
        },
        dataZoom: [
          {
            type: 'slider',
            filterMode: 'weakFilter',
            showDataShadow: false,
            top: 400,
            labelFormatter: '',
          },
          {
            type: 'inside',
            filterMode: 'weakFilter',
          },
        ],
        grid: {
          height: 250,
          left: 30,
          right: 30,
        },
        xAxis: {
          min: startTime,
          type: 'time',
          axisLabel: {
            color: '#fafafa',
            formatter: function (val: number) {
              return Math.floor(Math.max(0, val - startTime) / 60 / 60) + 'h'
            },
          },
          axisLine: {
            show: true,
          },
        },
        yAxis: {
          data: languagesByTotalDuration,
          type: 'category',
          zlevel: 10,
          axisLabel: {
            color: '#fafafa',
            inside: true,
            fontSize: 14,
            fontWeight: 'bold',
            fontFamily: 'monospace',
            textBorderColor: '#ff0000',
            textBorderWidth: 3,
            textBorderType: 'solid',
          },
        },
        series: [
          {
            type: 'custom',
            renderItem: (params, api) => {
              const categoryIndex = api.value(0)
              const start = api.coord([api.value(1), categoryIndex])
              const end = api.coord([api.value(2), categoryIndex])
              // @ts-expect-error no clue
              const height = api.size([0, 1])[1] * 0.6
              const rectShape = echarts.graphic.clipRectByRect(
                {
                  x: start[0],
                  y: start[1] - height / 2,
                  width: end[0] - start[0],
                  height: height,
                },
                {
                  // @ts-expect-error no clue
                  x: params.coordSys.x,
                  // @ts-expect-error no clue
                  y: params.coordSys.y,
                  // @ts-expect-error no clue
                  width: params.coordSys.width,
                  // @ts-expect-error no clue
                  height: params.coordSys.height,
                },
              )
              return (
                rectShape && {
                  type: 'rect',
                  transition: ['shape'],
                  shape: rectShape,
                  style: api.style(),
                }
              )
            },
            itemStyle: {
              opacity: 0.4,
            },
            encode: {
              x: [1, 2],
              y: 0,
            },
            data: data,
          },
        ],
      }

      myChart.setOption(option)
    }
  })

  const handleClick = async (next: number) => {
    const response = await fetch(
      `/api/wakatime/current/durations?date=${dayjs(durationsByLanguage.start)
        .add(next, 'd')
        .format('YYYY-MM-DD')}&slice_by=language`,
    )
    durationsByLanguage = await response.json()
  }
</script>

<div class="space-y-8 rounded-2xl bg-slate-800 pt-4">
  <h2 class="text-center text-3xl text-stone-300">Coding Timeline by Language</h2>
  <div class="text-center text-slate-300">
    {dayjs(durationsByLanguage.start).format('DD MMM YYYY')}
  </div>
  <div class="flex items-center justify-center gap-4">
    <button on:click={() => handleClick(-1)} disabled={loading} class="flex items-center">
      <iconify-icon
        class="text-slate-300"
        icon="material-symbols:arrow-circle-left-outline-rounded"
      />
    </button>
    <div class="text-slate-300">
      {dayjs.duration(totalDuration, 's').hours()}h {dayjs.duration(totalDuration, 's').minutes()}m
    </div>
    <button
      class="flex items-center"
      on:click={() => handleClick(1)}
      disabled={loading || dayjs(durationsByLanguage.start).isToday()}
    >
      <iconify-icon
        class="text-slate-300"
        icon="material-symbols:arrow-circle-right-outline-rounded"
      />
    </button>
  </div>
  <div id="durations-by-language" class="mb-8 h-[450px] w-full" />
</div>
