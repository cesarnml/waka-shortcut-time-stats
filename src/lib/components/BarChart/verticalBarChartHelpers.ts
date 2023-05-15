import { MAIN_BRANCH } from '$lib/constants'
import { getBranchShortName } from '$lib/helpers/chartHelpers'
import { formatTime, secPerHour } from '$lib/helpers/timeHelpers'
import type { SummariesResult } from '$src/types/wakatime'
import type {
  DatasetComponentOption,
  GridComponentOption,
  TooltipComponentOption,
} from 'echarts/components'
import type { BarSeriesOption, ComposeOption } from 'echarts/types/dist/shared'

export const createVerticalBarChartDatasetSource = (summaries: SummariesResult) => {
  const branchToTimeDict = summaries.data.reduce((result, summary) => {
    summary.branches
      .filter((branch) => branch.name !== MAIN_BRANCH)
      .forEach((entity) => {
        result[entity.name] = (result[entity.name] ?? 0) + entity.total_seconds
      })
    return result
  }, {} as Record<string, number>)

  return Object.entries(branchToTimeDict).map(([branchFullName, totalSeconds]) => [
    getBranchShortName(branchFullName),
    totalSeconds / secPerHour,
  ])
}

export const createVerticalBarChartOption = (
  source: ReturnType<typeof createVerticalBarChartDatasetSource>,
  branches: string[],
): ComposeOption<
  GridComponentOption | TooltipComponentOption | DatasetComponentOption | BarSeriesOption
> => {
  return {
    grid: { left: 60, right: 30, top: 30, bottom: 75 },
    tooltip: {
      formatter: (params: any) => {
        return `${params.marker} ${branches.find((branch) =>
          branch.includes(params.name),
        )}: <strong>${formatTime(params.data[1] * secPerHour)}</strong>`
      },
    },
    dataset: [
      {
        source,
        dimensions: ['name', 'time'],
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'time', order: 'desc' },
        },
      },
    ],
    xAxis: {
      type: 'category',
      name: 'Branches',
      nameLocation: 'middle',
      nameGap: 45,
      axisLabel: {
        interval: 0,
        rotate: 30,
      },
    },
    yAxis: {
      type: 'value',
      name: 'Hours',
      nameLocation: 'middle',
      nameGap: 30,
    },
    series: {
      colorBy: 'data',
      type: 'bar',
      encode: { x: 'name', y: 'time' },
      datasetIndex: 1,
    },
  }
}