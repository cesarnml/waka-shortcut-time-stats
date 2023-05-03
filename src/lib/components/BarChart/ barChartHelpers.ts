import { ChartColor } from '$lib/constants'
import type * as echarts from 'echarts'
import zipObject from 'lodash/zipObject'
import { secPerHour } from '$lib/constants'

export const createBarChartOption = (
  xValues: string[],
  series: echarts.SeriesOption[],
): echarts.EChartsOption => ({
  tooltip: {
    valueFormatter: (value) => `${value}h`,
  },
  grid: { left: 50, right: 20, top: 50, bottom: 50 },
  legend: {
    type: 'scroll',
    textStyle: {
      color: ChartColor.Text,
    },
    pageIconColor: ChartColor.Icon,
    pageTextStyle: {
      color: ChartColor.Text,
    },
  },
  xAxis: {
    type: 'category',
    data: xValues,
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: (value) => `${value}h`,
      showMinLabel: false,
    },
  },
  series,
})

export const createBarChartSeries = <T>(
  xValues: string[],
  itemsByXValues: T[][],
  itemNames: string[],
) => {
  const yDataByItem = zipObject(
    itemNames,
    JSON.parse(JSON.stringify(Array(itemNames.length).fill(Array(xValues.length).fill(0)))),
  )

  itemsByXValues.forEach((items, index) => {
    items.forEach((item) => {
      // @ts-expect-error tough type
      yDataByItem[item.name][index] = Number((item.total_seconds / secPerHour).toFixed(1))
    })
  })

  return itemNames.map((key) => {
    return {
      data: yDataByItem[key],
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series',
      },
      name: key,
    }
  }) as echarts.SeriesOption[]
}
