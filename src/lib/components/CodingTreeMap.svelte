<script lang="ts">
  import { page } from '$app/stores'
  import type { SummariesResult } from '$src/types/wakatime'
  import * as echarts from 'echarts'
  import { afterUpdate, onMount } from 'svelte'
  import ChartContainer from './ChartContainer.svelte'
  import ChartTitle from './ChartTitle.svelte'
  import { formatTime, secPerHour } from '$lib/helpers/timeHelpers'
  import { ChartColor } from '$lib/helpers/chartHelpers'

  export let summaries: SummariesResult

  let chartRef: HTMLDivElement
  let chart: echarts.ECharts
  let option: echarts.EChartsOption

  $: files = [
    ...new Set(
      summaries.data.map((summary) => summary.entities.map((entity) => entity.name)).flat(),
    ),
  ].filter((file) => !file.includes('node_modules') && !file.includes('generated'))

  const createFilesToTimeDict = (summaries: SummariesResult) => {
    const filesToTimeDict: Record<string, number> = {}
    summaries.data.forEach((summary) => {
      summary.entities.forEach((entity) => {
        if (!files.includes(entity.name)) {
          return
        }
        if (filesToTimeDict[entity.name.split(`${$page.params.projectName}/`)[1]] === undefined) {
          return (filesToTimeDict[entity.name.split(`${$page.params.projectName}/`)[1]] =
            entity.total_seconds / secPerHour)
        }
        return (filesToTimeDict[entity.name.split(`${$page.params.projectName}/`)[1]] +=
          entity.total_seconds / secPerHour)
      })
    })
    return filesToTimeDict
  }

  $: filesToTimeDict = createFilesToTimeDict(summaries)

  function convertToTreeMap(obj: any) {
    const result: any[] = []

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

  function getLevelOption() {
    return [
      {
        upperLabel: {
          show: false,
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

  $: diskData = convertToTreeMap(filesToTimeDict)

  $: option = {
    tooltip: {
      formatter: function (info: any) {
        const value = info.value
        const treePathInfo = info.treePathInfo
        const treePath = []

        for (let i = 1; i < treePathInfo.length; i++) {
          treePath.push(treePathInfo[i].name)
        }

        return [
          '<div class="tooltip-title">' + echarts.format.encodeHTML(treePath.join('/')) + '</div>',
          'Time Spent: ' + `<strong>` + formatTime(value * secPerHour) + '</strong>',
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
          color: ChartColor.Text,
          backgroundColor: ChartColor.Default,
          borderColor: '#555',
          borderWidth: 0.5,
          show: true,
        },
        itemStyle: {
          borderColor: '#fff',
        },
        levels: getLevelOption(),
        data: diskData,
      },
    ],
  }

  onMount(() => {
    chart = echarts.init(chartRef, 'dark', { renderer: 'svg' })
    const handleResize = () => chart.resize()
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      chart.dispose()
      window.removeEventListener('resize', handleResize)
    }
  })

  afterUpdate(() => {
    chart.setOption(option)
  })
</script>

<ChartContainer>
  <ChartTitle>Files in Focus</ChartTitle>
  <div bind:this={chartRef} class="h-[600px] w-full" />
</ChartContainer>
