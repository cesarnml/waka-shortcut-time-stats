import { ChartColor } from '$lib/helpers/chartHelpers'
import { createLineChartOption } from './lineChartHelpers'

const summaries = {
  color: ChartColor.Default,
  data: [
    {
      range: {
        date: '2022-05-03',
      },
      grand_total: {
        total_seconds: 3600,
      },
    },
    {
      range: {
        date: '2022-05-04',
      },
      grand_total: {
        total_seconds: 7200,
      },
    },
  ],
} as SummariesResult

it('should return expected EChartsOption object', () => {
  const expectedOption = {
    tooltip: {
      trigger: 'item',
      valueFormatter: expect.any(Function),
    },
    grid: { left: 50, right: 20, top: 50, bottom: 50, containLabel: true },

    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['May 03', 'May 04'],
        axisLabel: {
          color: ChartColor.Text,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          showMinLabel: false,
          formatter: expect.any(Function),
          color: ChartColor.Text,
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
        width: 4,
        color: summaries.color ?? ChartColor.Default,
      },
      itemStyle: {
        borderCap: 'round',
        color: ChartColor.Marker,
        borderWidth: 2,
        borderColor: ChartColor.Marker,
      },
      data: ['1.0', '2.0'],
    },
  }

  const actualOption = createLineChartOption(summaries)
  expect(actualOption).toEqual(expectedOption)
})

it('should format dates correctly', () => {
  const actualOption = createLineChartOption(summaries)
  // @ts-expect-error tough type
  const xAxisData = actualOption.xAxis[0].data
  expect(xAxisData).toEqual(['May 03', 'May 04'])
})

it('should convert total_seconds to hours and format values correctly', () => {
  const actualOption = createLineChartOption(summaries)
  // @ts-expect-error tough type
  const seriesData = actualOption.series.data
  expect(seriesData).toEqual(['1.0', '2.0'])
})
