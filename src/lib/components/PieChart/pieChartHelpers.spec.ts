import { ChartColor } from '$lib/constants'
import type { SummariesResult } from '$src/routes/api/wakatime/current/summaries/+server'
import { createPieChartOption, createPieChartData } from './pieChartHelpers'

describe('createPieChartData', () => {
  it('should calculate the total weekly coding time for each language correctly', () => {
    const summaries = {
      data: [
        {
          languages: [
            { name: 'JavaScript', total_seconds: 3600 },
            { name: 'Python', total_seconds: 1800 },
          ],
        },
        {
          languages: [
            { name: 'JavaScript', total_seconds: 7200 },
            { name: 'TypeScript', total_seconds: 5400 },
          ],
        },
      ],
    } as SummariesResult

    const result = createPieChartData(summaries)

    expect(result).toEqual([
      { name: 'JavaScript', value: 3 },
      { name: 'Python', value: 0.5 },
      { name: 'TypeScript', value: 1.5 },
    ])
  })
})

describe('createPieChartOption', () => {
  it('should create a pie chart config with the correct data', () => {
    const data = [
      { name: 'JavaScript', value: 10 },
      { name: 'Python', value: 20 },
      { name: 'TypeScript', value: 15 },
    ]

    const expectedConfig: echarts.EChartsOption = {
      tooltip: {
        trigger: 'item',
        valueFormatter: expect.any(Function),
      },
      grid: { left: 0, right: 0, bottom: 0, top: 0 },
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
      series: [
        {
          type: 'pie',
          radius: '55%',
          label: {
            color: ChartColor.Text,
          },
          data,
        },
      ],
    }

    const config = createPieChartOption(data)

    expect(config).toEqual(expectedConfig)
  })
  it('should format the tooltip value correctly', () => {
    const data = [{ name: 'JavaScript', value: 12 }]
    const config = createPieChartOption(data)
    //  @ts-expect-error tough type
    const formatter = config.tooltip?.valueFormatter

    expect(formatter(10)).toBe('10h')
  })
})
