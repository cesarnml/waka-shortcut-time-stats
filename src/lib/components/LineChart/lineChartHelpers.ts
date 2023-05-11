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
      valueFormatter: (value) => `${formatTime(Number(value) * secPerHour)}`,
    },
    grid: { left: 55, right: 30, top: 40, bottom: 60 },
    xAxis: [
      {
        type: 'category',
        name: 'Date',
        nameLocation: 'middle',
        nameGap: 30,
        boundaryGap: false,
        data: dates,
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Hours',
        nameLocation: 'middle',
        nameGap: 30,
        axisLabel: {
          showMinLabel: false,
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
      symbol: 'circle',
      symbolSize: 8,
      itemStyle: {
        borderColor: summaries.color ?? ChartColor.Default,
        color: summaries.color ?? ChartColor.Default,
      },
      data: values,
    },
  }
}
