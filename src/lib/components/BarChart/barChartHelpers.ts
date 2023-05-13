import { HOUR_GOAL, getPercent, hours } from '$lib/constants'
import { ChartColor, LanguageColor, type KeyOfLanguageColor } from '$lib/helpers/chartHelpers'
import {
  DateFormat,
  formatTime,
  integerDateMap,
  secPerHour,
  secPerMin,
  weekdays,
  type KeyOfDateMap,
} from '$lib/helpers/timeHelpers'
import type { DurationsResult, SummariesResult, WakaDuration } from '$src/types/wakatime'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import * as echarts from 'echarts'
import type { BarSeriesOption, LineSeriesOption } from 'echarts/charts'
import type {
  GridComponentOption,
  LegendComponentOption,
  TooltipComponentOption,
} from 'echarts/components'
import groupBy from 'lodash/groupBy'
import orderBy from 'lodash/orderBy'
import sum from 'lodash/sum'
import zipObject from 'lodash/zipObject'

dayjs.extend(localeData)

export type StackedBarChartOption = echarts.ComposeOption<
  TooltipComponentOption | GridComponentOption | LegendComponentOption | BarSeriesOption
>

export type SimpleBarChartOption = echarts.ComposeOption<
  TooltipComponentOption | GridComponentOption | BarSeriesOption | LineSeriesOption
>

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
      yDataByItem[item.name][index] = item.total_seconds / secPerHour
    })
  })

  return itemNames.map((itemName) => {
    return {
      data: yDataByItem[itemName],
      type: 'bar',
      stack: 'total',
      name: itemName,
    }
  }) as BarSeriesOption[]
}

export const createStackedBarChartOption = (
  xValues: string[],
  series: BarSeriesOption[],
): StackedBarChartOption => ({
  tooltip: {
    valueFormatter: (value) => formatTime(Number(value) * secPerHour),
  },
  grid: { left: 55, right: 20, top: 50, bottom: 60 },
  legend: {
    type: 'scroll',
    pageIconColor: ChartColor.Icon,
    pageTextStyle: {
      color: ChartColor.Text,
    },
  },
  xAxis: {
    type: 'category',
    name: 'Date',
    nameLocation: 'middle',
    nameGap: 30,
    data: xValues,
    axisTick: {
      alignWithLabel: true,
      show: true,
    },
  },
  yAxis: {
    type: 'value',
    name: 'Hours',
    nameLocation: 'middle',
    nameGap: 30,
    axisLabel: {
      showMinLabel: false,
    },
  },
  series,
})

export const createSimpleBarChartOption = (summaries: SummariesResult): SimpleBarChartOption => {
  const dateCount = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  }

  type KeyOfDateCount = keyof typeof dateCount

  const yDataByWeekday: Record<string, number> = {}

  summaries.data.forEach((datum) => {
    const dateInteger = dayjs(datum.range.date).day() as KeyOfDateMap
    dateCount[dateInteger] += 1

    yDataByWeekday[integerDateMap[dateInteger]] =
      (yDataByWeekday[integerDateMap[dateInteger]] ?? 0) + datum.grand_total.total_seconds
  })

  return {
    grid: { left: 60, right: 20, top: 50, bottom: 60 },
    tooltip: {
      valueFormatter: (value) => formatTime(Number(value) * secPerHour),
    },
    xAxis: {
      type: 'category',
      name: 'Weekday',
      nameLocation: 'middle',
      nameGap: 30,
      data: weekdays,
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: 'value',
      name: 'Hours',
      nameLocation: 'middle',
      nameGap: 30,
      axisLabel: {
        showMinLabel: false,
      },
    },
    series: [
      {
        type: 'bar',
        data: weekdays
          .map(
            (weekday, index) =>
              yDataByWeekday[weekday] / dateCount[index as KeyOfDateCount] / secPerHour,
          )
          .map((value, index) => ({
            value,
            itemStyle: {
              color:
                index > 4 ? ChartColor.Fair : value > HOUR_GOAL ? ChartColor.Good : ChartColor.Poor,
            },
          })),
      },
      {
        type: 'line',
        lineStyle: {
          width: 2,
        },
        itemStyle: {
          borderColor: ChartColor.Great,
          borderCap: 'round',
          borderWidth: 5,
        },
        color: ChartColor.Great,
        data: Array(5).fill(HOUR_GOAL),
        name: 'Daily Coding Goal',
        zlevel: 20,
      },
    ],
  }
}

export const createActiveHoursData = (durations: DurationsResult) =>
  durations.data
    .reduce((acc, duration) => {
      const start = duration.time
      const end = duration.time + duration.duration

      const startTime = dayjs.unix(start)
      const endTime = dayjs.unix(end)
      const startHour = startTime.hour()
      const endHour = endTime.hour()

      if (startHour === endHour) {
        acc[startHour] += endTime.diff(startTime, 'minutes')
        return acc
      }

      for (let hour = startHour; hour <= endHour; hour++) {
        const startInterval = startTime.hour(hour).minute(0).millisecond(0)
        const endInterval = startTime
          .hour(hour + 1)
          .minute(0)
          .millisecond(0)
        const lowerMinute = startInterval.isBefore(startTime) ? startTime.minute() : 0
        const upperMinute = endInterval.isBefore(endTime) ? 60 : endTime.minute()
        const deltaMinutes = upperMinute - lowerMinute
        acc[hour] += deltaMinutes
      }
      return acc
    }, Array(24).fill(0))
    .map((value: number) => ({
      value,
      itemStyle:
        value > 45
          ? { color: ChartColor.Great }
          : value > 30
          ? { color: ChartColor.Good }
          : value > 15
          ? { color: ChartColor.Fair }
          : { color: ChartColor.Poor },
    }))

export const createActiveHoursOption = (
  data: ReturnType<typeof createActiveHoursData>,
): echarts.ComposeOption<
  echarts.GridComponentOption | echarts.ToolboxComponentOption | echarts.BarSeriesOption
> => {
  const startHour = '8a'
  const endHour = '5p'
  const goalMinutes = 300

  const startIndex = hours.findIndex((hour) => hour === startHour)
  const endIndex = hours.findIndex((hour) => hour === endHour)

  const innerMinutes = sum(data.map((datum) => datum.value).slice(startIndex, endIndex + 1))
  const totalMinutes = sum(data.map((datum) => datum.value))
  const outerMinutes = totalMinutes - innerMinutes

  return {
    grid: {
      left: 60,
      right: 25,
      top: 20,
      bottom: 60,
    },
    xAxis: {
      type: 'category',
      name: 'Time',
      nameLocation: 'middle',
      nameGap: 30,
      data: hours,

      axisLabel: {
        showMaxLabel: true,
      },
    },
    yAxis: {
      type: 'value',
      name: 'Minutes',
      nameLocation: 'middle',
      nameGap: 30,
      max: 60,
      axisLabel: {
        showMinLabel: false,
      },
    },
    tooltip: {
      valueFormatter: (value: number) => `${value}m`,
    },
    series: [
      {
        type: 'bar',
        data,
        showBackground: true,
        markArea: {
          itemStyle: {
            color: 'rgba(15,117,224,0.2)',
          },
          tooltip: {
            show: true,
            formatter: () => {
              return [
                `<div style="display: flex; gap: 12px; font-family: monospace">Work Hours: <span style="color:blue; font-weight: bold">${startHour} - ${endHour}</span></div>`,
                `<div style="display: flex; gap: 12px; font-family: monospace">Goal Hours: <span style="color:purple; font-weight: bold"> ${formatTime(
                  goalMinutes * secPerMin,
                )} <small>(${getPercent(totalMinutes / goalMinutes)})</small></span></div>`,
                '<hr style="margin: 4px 0 4px 0"/>',
                `<div style="display: flex; gap: 36px; font-family: monospace">In-Time: <span style="color:green; font-weight: bold"> ${formatTime(
                  innerMinutes * secPerMin,
                )} <small>(${getPercent(innerMinutes / goalMinutes)})</small></span></div>`,
                `<div style="display: flex; gap: 28px; font-family: monospace">Out-Time: <span style="color:red; font-weight: bold"> ${formatTime(
                  outerMinutes * secPerMin,
                )} <small>(${getPercent(outerMinutes / goalMinutes)})</small></span></div>`,
              ].join(' ')
            },
          },
          data: [
            [
              {
                xAxis: startHour,
              },
              {
                xAxis: hours[endIndex - 1],
              },
            ],
          ],
        },
      },
    ],
  }
}
