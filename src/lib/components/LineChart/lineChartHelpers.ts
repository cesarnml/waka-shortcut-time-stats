import { ChartColor, DateFormat, secPerHour } from '$lib/constants'
import type * as echarts from 'echarts'
import type { SummariesResult } from '$src/routes/api/wakatime/current/summaries/+server'
import dayjs from 'dayjs'

export const createLineChartOption = (summaries: SummariesResult): echarts.EChartsOption => {
  const dates = summaries.data.map((summary) => dayjs(summary.range.date).format(DateFormat.Short))
  const values = summaries.data.map((summary) =>
    (summary.grand_total.total_seconds / secPerHour).toFixed(1),
  )
  return {
    tooltip: {
      trigger: 'item',
      valueFormatter: (value) => `${value}h`,
    },
    grid: { left: 50, right: 20, top: 50, bottom: 50, containLabel: true },

    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: dates,
        axisLabel: {
          color: ChartColor.Text,
        },
      },
    ],
    yAxis: [
      // @ts-expect-error tough type
      {
        type: 'value',
        axisLabel: {
          showMinLabel: false,
          formatter: (value: string) => `${value}h`,
          color: ChartColor.Text,
        },
      },
    ],
    series: {
      type: 'line',
      smooth: true,
      areaStyle: {
        color: summaries.color ?? '#5A6FC0',
      },
      lineStyle: {
        width: 4,
        color: summaries.color ?? '#5A6FC0',
      },
      itemStyle: {
        borderCap: 'round',
        color: '#ff0000',
        borderWidth: 2,
        borderColor: '#ff0000',
      },
      data: values,
    },
  }
}
