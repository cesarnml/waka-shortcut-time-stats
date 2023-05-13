import { ChartColor } from '$lib/helpers/chartHelpers'
import { formatTime, secPerHour } from '$lib/helpers/timeHelpers'
import type { SummariesResult } from '$src/types/wakatime'
import type { GridComponentOption, TooltipComponentOption } from 'echarts/components'
import type { BarSeriesOption, ComposeOption } from 'echarts/types/dist/shared'
import { max } from 'lodash'

const MINIMUM_PERCENTAGE_OF_MAX_TIME = 0.01

export const createBreakdownChartData = (summaries: SummariesResult) => {
  const projectToTotalSeconds: Record<string, number> = {}

  for (const { projects } of summaries.data) {
    for (const { name, total_seconds } of projects) {
      projectToTotalSeconds[name] = (projectToTotalSeconds[name] ?? 0) + total_seconds
    }
  }

  return projectToTotalSeconds
}

export const filterBreakdownChartData = (data: Record<string, number>) => {
  return Object.entries(data).reduce((acc, [name, value]) => {
    if (value > (max(Object.values(data)) ?? 1) * MINIMUM_PERCENTAGE_OF_MAX_TIME) {
      return { ...acc, [name]: value / secPerHour }
    }
    return acc
  }, {} as Record<string, number>)
}

export const createBreakdownChartOption = (
  data: Record<string, number>,
): ComposeOption<GridComponentOption | TooltipComponentOption | BarSeriesOption> => ({
  grid: {
    left: 45,
    right: 45,
    top: 10,
    bottom: 65,
  },
  tooltip: { valueFormatter: (value) => formatTime(Number(value)) },
  xAxis: {
    type: 'value',
    name: 'Total Hours',
    nameLocation: 'middle',
    nameGap: 35,
    axisLabel: {
      showMinLabel: true,
    },
  },
  yAxis: {
    type: 'category',
    data: Object.keys(data),
    name: 'Projects',
    nameLocation: 'middle',
    zlevel: 2,
    axisTick: {
      alignWithLabel: true,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      show: true,
      inside: true,
      fontWeight: 'bold',
      textShadowBlur: 5,
      color: ChartColor.Text,
    },
  },
  series: [
    {
      type: 'bar',
      data: Object.values(data),
      colorBy: 'data',
    },
  ],
})
