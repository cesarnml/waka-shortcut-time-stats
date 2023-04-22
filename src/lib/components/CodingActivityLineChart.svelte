<script lang="ts">
  import dayjs from 'dayjs'
  import * as echarts from 'echarts'
  import { onMount } from 'svelte'
  import type { SummariesResult } from '../../routes/api/wakatime/current/summaries/+server'
  import { page } from '$app/stores'

  export let summaries: SummariesResult
  const dates = summaries.data.map((summary) => dayjs(summary.range.date).format('MMM Do'))
  const values = summaries.data.map((summary) =>
    (summary.grand_total.total_seconds / 60 / 60).toFixed(1),
  )
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
        grid: {
          top: '4%',
          left: '2%',
          right: '4%',
          bottom: '4%',
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
          {
            type: 'value',
            axisLabel: {
              formatter: (value: string) => `${value}h`,
              color: '#fafafa',
            },
          },
        ],
        series: {
          name: $page.params.projectName,
          type: 'line',
          smooth: true,
          areaStyle: {
            color: summaries.color ?? '#5A6FC0',
          },
          lineStyle: {
            width: 4,
            color: summaries.color ?? '#5A6FC0',
          },
          data: values,
        },
      }

      option && myChart.setOption(option)
    }
  })
</script>

<div class="space-y-8 rounded-2xl bg-slate-800 p-4">
  <h2 class="text-center text-3xl text-stone-300">Coding Activity Line Chart</h2>
  <div id="main" class="mb-8 h-96 w-full" />
</div>
