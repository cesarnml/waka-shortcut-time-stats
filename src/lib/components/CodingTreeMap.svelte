<script lang="ts">
  import * as echarts from 'echarts'
  import { page } from '$app/stores'

  import { onMount } from 'svelte'
  import json from '$lib/data/treemap.json'
  import type { SummariesResult } from '../../routes/api/wakatime/current/summaries/+server'

  export let summaries: SummariesResult

  const { data } = summaries

  const files = [
    ...new Set(data.map((summary) => summary.entities.map((entity) => entity.name)).flat()),
  ].filter((file) => !file.includes('node_modules') && !file.includes('generated'))

  const filesToTimeDict: Record<string, number> = {}

  summaries.data.forEach((summary) => {
    summary.entities.forEach((entity) => {
      if (!files.includes(entity.name)) {
        return
      }
      if (filesToTimeDict[entity.name.split(`${$page.params.projectName}/`)[1]] === undefined) {
        return (filesToTimeDict[entity.name.split(`${$page.params.projectName}/`)[1]] =
          Math.floor(entity.total_seconds) / 3600)
      }
      return (filesToTimeDict[entity.name.split(`${$page.params.projectName}/`)[1]] +=
        Math.floor(entity.total_seconds) / 3600)
    })
  })

  function convertToTreeMap(obj) {
    const result = []

    for (const key in obj) {
      const value = obj[key]
      const path = key.split('/')
      let current = result

      // Traverse the tree map until we reach the leaf node
      for (let i = 0; i < path.length; i++) {
        const name = path[i]
        let child = current.find((item) => item.name === name)

        if (!child) {
          child = {
            name,
            path: path.slice(0, i + 1).join('/'),
            value: 0,
            children: [],
          }
          current.push(child)
        }

        child.value += value
        current = child.children
      }
    }

    return result
  }

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

      const diskData = convertToTreeMap(filesToTimeDict)
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
              'Time Spent: ' + echarts.format.addCommas(value) + ' h',
            ].join('')
          },
        },

        series: [
          {
            name: $page.params.projectName,
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
            // itemStyle: {
            //   borderColor: '#fff',
            // },
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
