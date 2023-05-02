<script lang="ts">
  import { afterUpdate, onMount } from 'svelte'
  import * as echarts from 'echarts'
  import type { SummariesResult } from '$src/routes/api/wakatime/current/summaries/+server'
  import ChartContainer from './ChartContainer.svelte'
  import ChartTitle from './ChartTitle.svelte'
  import { secPerHour } from '$lib/constants'

  export let summaries: SummariesResult

  let chartContainer: HTMLDivElement
  let chart: echarts.ECharts
  let option: echarts.EChartsOption

  const createData = (summaries: SummariesResult) => {
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

    return Object.keys(languageToWeeklyCodingTime).map((language) => ({
      value: Number((languageToWeeklyCodingTime[language] / secPerHour).toFixed(1)),
      name: language,
    }))
  }

  $: data = createData(summaries)

  option = {
    // @ts-expect-error fix type
    tooltip: {
      trigger: 'item',
      valueFormatter: (value: number) => `${value.toFixed(1)}h`,
    },
    grid: { left: 0, right: 0, bottom: 0, top: 0 },
    legend: {
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
        type: 'pie',
        radius: '55%',
        data,
        label: {
          color: '#fafafa',
        },
      },
    ],
  }

  onMount(() => {
    const handleResize = () => chart.resize()
    if (chartContainer) {
      chart = echarts.init(chartContainer, 'dark', { renderer: 'svg' })
      window.addEventListener('resize', handleResize, { passive: true })
      chart.setOption(option)
    }
    return () => window.removeEventListener('resize', handleResize)
  })

  afterUpdate(() => {
    chart.setOption({ series: [{ data }] })
  })
</script>

<ChartContainer>
  <ChartTitle>Languages</ChartTitle>
  <div class="h-96 w-full" bind:this={chartContainer} />
</ChartContainer>
