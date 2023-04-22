<script lang="ts">
  import * as echarts from 'echarts'
  import { onMount } from 'svelte'
  import json from '$lib/data/treemap.json'

  onMount(() => {
    const chartDom = document.getElementById('treemap')
    if (chartDom) {
      const myChart = echarts.init(chartDom)
      window.addEventListener(
        'resize',
        function () {
          myChart.resize()
        },
        { passive: true },
      )
      myChart.showLoading()

      const diskData = json
      const option: echarts.EChartsOption = {}

      myChart.hideLoading()

      myChart.setOption({
        tooltip: {
          formatter: function (info: any) {
            const value = info.value
            const treePathInfo = info.treePathInfo
            const treePath = []

            for (let i = 1; i < treePathInfo.length; i++) {
              treePath.push(treePathInfo[i].name)
            }

            return [
              '<div class="tooltip-title">' +
                echarts.format.encodeHTML(treePath.join('/')) +
                '</div>',
              'Time Spent: ' + echarts.format.addCommas(value) + ' KB',
            ].join('')
          },
        },

        series: [
          {
            name: 'Project',
            type: 'treemap',
            visibleMin: 400,
            label: {
              show: true,
              formatter: '{b}',
            },
            upperLabel: {
              show: true,
              height: 30,
            },
            itemStyle: {
              borderColor: '#fff',
            },
            levels: getLevelOption(),
            data: diskData,
          },
        ],
      })
      option && myChart.setOption(option)
    }
  })

  function getLevelOption() {
    return [
      {
        itemStyle: {
          borderColor: '#777',
          borderWidth: 0,
          gapWidth: 1,
        },
        upperLabel: {
          show: false,
        },
      },
      {
        itemStyle: {
          borderColor: '#555',
          borderWidth: 5,
          gapWidth: 1,
        },
        emphasis: {
          itemStyle: {
            borderColor: '#ddd',
          },
        },
      },
      {
        colorSaturation: [0.35, 0.5],
        itemStyle: {
          borderWidth: 5,
          gapWidth: 1,
          borderColorSaturation: 0.6,
        },
      },
    ]
  }
</script>

<div class="space-y-8 rounded-2xl bg-slate-800 pt-4">
  <h2 class="text-center text-3xl text-stone-300">Coding Treemap</h2>
  <div id="treemap" class="mb-8 h-[600px] w-full" />
</div>
