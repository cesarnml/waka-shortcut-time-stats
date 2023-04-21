<script lang="ts">
  import dayjs from 'dayjs'
  import * as echarts from 'echarts'
  import { onMount } from 'svelte'
  import type { SummariesData } from '../../routes/api/wakatime/current/summaries/+server'
  import { page } from '$app/stores'

  export let data: SummariesData[]
  const dates = data.map((summary) => dayjs(summary.range.date).format('MMM Do'))
  const values = data.map((summary) => (summary.grand_total.total_seconds / 60 / 60).toFixed(1))
  type EChartsOption = echarts.EChartsOption

  onMount(() => {
    var chartDom = document.getElementById('main')
    if (chartDom) {
      var myChart = echarts.init(chartDom)
      window.addEventListener(
        'resize',
        function () {
          myChart.resize()
        },
        { passive: true },
      )
      var option: EChartsOption

      option = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          data: [$page.params.projectName],
          textStyle: {
            color: '#fafafa',
          },
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
          right: 50,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: dates,
            axisLabel: {
              color: '#fafafa',
            },
          },
        ],
        yAxis: [
          // @ts-expect-error no clue
          {
            type: 'value',
            axisLabel: {
              formatter: (value: string) => `${value}h`,
              color: '#fafafa',
            },
          },
        ],
        series: [
          {
            name: $page.params.projectName,
            type: 'line',
            smooth: true,
            areaStyle: {},
            lineStyle: {
              width: 4,
              color: '#5A6FC0',
            },
            data: values,
          },
        ],
      }

      option && myChart.setOption(option)
    }
  })
</script>

<div class="space-y-8 rounded-2xl bg-slate-800 pt-4">
  <h2 class="text-center text-3xl text-stone-300">Coding Activity Line Chart</h2>
  <div id="main" class="mb-8 h-96 w-full" />
</div>
