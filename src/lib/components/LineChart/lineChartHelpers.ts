import type * as echarts from 'echarts'
import dayjs from 'dayjs'
import { ChartColor } from '$lib/helpers/chartHelpers'
import { DateFormat, formatTime, secPerHour } from '$lib/helpers/timeHelpers'
import type { SummariesResult } from '$src/types/wakatime'

export const createLineChartOption = (summaries: SummariesResult): echarts.EChartsOption => {
  const dates = summaries.data.map((summary) => dayjs(summary.range.date).format(DateFormat.Short))
  const values = summaries.data.map((summary) => summary.grand_total.total_seconds / secPerHour)

  return {
    tooltip: {
      trigger: 'item',
      valueFormatter: (value: any) => `${formatTime(value * secPerHour)}`,
    },
    grid: { left: 50, right: 20, top: 50, bottom: 50, containLabel: true },

    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: dates,
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          showMinLabel: false,
          formatter: (value: number) => `${value}h`,
        },
      },
    ],
    series: {
      type: 'line',
      smooth: true,
      areaStyle: {
        color: summaries.color ?? ChartColor.Default,
      },
      lineStyle: {
        width: 2,
        color: summaries.color ?? ChartColor.Default,
      },
      itemStyle: {
        borderCap: 'round',
        color: summaries.color ?? ChartColor.Default,
        borderWidth: 2,
        borderColor: summaries.color ?? ChartColor.Default,
      },
      data: values,
    },
  }
}
