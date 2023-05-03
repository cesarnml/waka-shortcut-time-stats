import { ChartColor, DateFormat, integerDateMap, weekdays, type KeyOfDateMap } from '$lib/constants'
import type * as echarts from 'echarts'
import zipObject from 'lodash/zipObject'
import { secPerHour } from '$lib/constants'
import type { SummariesResult } from '$src/routes/api/wakatime/current/summaries/+server'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'

dayjs.extend(localeData)

export const createXAxisValues = (summaries: SummariesResult) =>
  summaries.data.map((item) => dayjs(item.range.date).format(DateFormat.Short))

type Params = {
  summaries: SummariesResult
  itemsType: 'projects' | 'categories'
}

const _createItemsByXValues = ({ summaries, itemsType }: Params) =>
  summaries.data.map((summary) => summary[itemsType])

const _getItemNames = ({ summaries, itemsType }: Params) => [
  ...new Set(
    summaries.data.map((summary) => summary[itemsType].map((project) => project.name)).flat(),
  ),
]

export const createBarChartSeries = ({ summaries, itemsType }: Params) => {
  const xValues = createXAxisValues(summaries)
  const itemsByXValues = _createItemsByXValues({ summaries, itemsType })
  const itemNames = _getItemNames({ summaries, itemsType })

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

export const createSimpleBarChartOption = (summaries: SummariesResult) => {
  const dateCount = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  }
  console.log('weekdays:', weekdays)

  const yDataByWeekday: Record<string, number> = {}

  summaries.data.forEach((datum) => {
    const dateInteger = dayjs(datum.range.date).day() as KeyOfDateMap
    dateCount[dateInteger] += 1

    yDataByWeekday[integerDateMap[dateInteger]] =
      (yDataByWeekday[integerDateMap[dateInteger]] ?? 0) +
      datum.grand_total.total_seconds / secPerHour
  })
  console.log('yDataByWeekday:', yDataByWeekday)

  console.log('dateCount:', dateCount)
  return {
    grid: { left: 50, right: 20, top: 50, bottom: 50 },
    tooltip: {
      valueFormatter: (value: number) => `${value}h`,
    },
    xAxis: {
      type: 'category',
      data: weekdays,
      axisLabel: {
        color: ChartColor.Text,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: ChartColor.Text,
        formatter: (value: number) => `${value}h`,
        showMinLabel: false,
      },
    },
    series: [
      {
        type: 'bar',
        data: weekdays.map((weekday, index) =>
          Number((yDataByWeekday[weekday] / dateCount[index as keyof typeof dateCount]).toFixed(1)),
        ),
      },
    ],
  } as echarts.EChartsOption
}
