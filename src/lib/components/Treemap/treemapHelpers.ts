import * as echarts from 'echarts'
import { formatTime, secPerHour } from '$lib/helpers/timeHelpers'
import type { SummariesResult } from '$src/types/wakatime'
import { ChartColor } from '$lib/helpers/chartHelpers'
export const getProjectFiles = (summaries: SummariesResult) =>
  [
    ...new Set(summaries.data.flatMap((summary) => summary.entities.map((entity) => entity.name))),
  ].filter((file) => !file.includes('node_modules') && !file.includes('generated'))

export const createProjectFileToTimeDict = (summaries: SummariesResult, projectName: string) => {
  const projectFiles = getProjectFiles(summaries)
  const filesToTimeDict: Record<string, number> = {}
  summaries.data.forEach((summary) => {
    summary.entities.forEach((entity) => {
      if (!projectFiles.includes(entity.name)) {
        return
      }
      if (filesToTimeDict[entity.name.split(`${projectName}/`)[1]] === undefined) {
        return (filesToTimeDict[entity.name.split(`${projectName}/`)[1]] =
          entity.total_seconds / secPerHour)
      }
      return (filesToTimeDict[entity.name.split(`${projectName}/`)[1]] +=
        entity.total_seconds / secPerHour)
    })
  })
  return filesToTimeDict
}

export const createTreemapData = (obj: any) => {
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

export const createTreemapOption = (data: any[], projectName: string) => ({
  grid: { left: 0, right: 0, top: 0, bottom: 0 },
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
      type: 'treemap',
      name: projectName,
      visibleMin: 400,
      label: {
        show: true,
        formatter: '{b}',
      },
      upperLabel: {
        show: true,
        color: ChartColor.Text,
        backgroundColor: ChartColor.Default,
        borderColor: ChartColor.Great,
        borderWidth: 0.1,
      },
      itemStyle: {
        borderColor: ChartColor.Text,
      },
      levels: [
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
      ],
      data,
    },
  ],
})
