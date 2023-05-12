import { HOUR_GOAL, getPercent, hours } from '$lib/constants'
import { ChartColor } from '$lib/helpers/chartHelpers'
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

export const createDurationsChartOption = (
  durations: DurationsResult,
  itemType: Extract<keyof WakaDuration, 'project' | 'language'>,
): echarts.ComposeOption<
  TooltipComponentOption | GridComponentOption | echarts.CustomSeriesOption
> => {
  const languageToColor = {
    Svelte: '#EB5027',
    JavaScript: '#FFCB6B',
    TypeScript: '#3075C0',
    HTML: '#EA6328',
    INI: '#B9B9B9',
    Other: '#FAFAFA',
    TSConfig: '#7D7DEB',
    Python: '#376D9D',
    SCSS: '#C76496',
    Markdown: '#000000',
    JSON: '#7D7D7D',
    Ruby: '#AA1401',
    CSS: '#2A65F1',
    Bash: '#44B050',
    YAML: '#F8CA3E',
    LESS: '#2C4E85',
    'Vue.js': '#3EB480',
    'Git Config': '#E94D31',
    Astro: '#583085',
    Text: '#F8F8F8',
    Docker: '#2596ED',
    GraphQL: '#DA32A4',
    Git: '#E94D31',
    SQL: '#D16F30',
  }

  const startTime = dayjs(durations.start).unix()
  const itemNames = [...new Set(durations.data.map((duration) => duration[itemType]))]
  const durationsByItemNameDict = groupBy(durations.data, itemType)
  const itemNamesSorted = orderBy(itemNames, (name) =>
    durationsByItemNameDict[name].reduce((acc, cur) => cur.duration + acc, 0),
  ).filter(
    (name) =>
      durationsByItemNameDict[name].reduce((acc, cur) => cur.duration + acc, 0) >= secPerMin,
  )

  const data = itemNamesSorted.flatMap((name, index) =>
    durationsByItemNameDict[name]
      .filter((duration) => duration.duration >= secPerMin)
      .map(({ time, duration, color }) => ({
        name,
        value: [
          index,
          Math.floor(time),
          Math.floor(time + duration),
          Math.floor(time + duration) - Math.floor(time),
          itemType === 'project' ? color : languageToColor[name as keyof typeof languageToColor],
        ],
      })),
  )
  return {
    tooltip: {
      formatter: function (params: any) {
        return (
          params.marker + params.name + ': ' + `<strong>${formatTime(params.value[3])}</strong>`
        )
      },
    },
    grid: {
      left: 50,
      right: 30,
      top: 20,
      bottom: 60,
    },
    xAxis: {
      type: 'time',
      min: startTime,
      name: 'Time',
      nameLocation: 'middle',
      nameGap: 30,
      axisLine: {
        show: true,
      },
      axisLabel: {
        formatter: (val) => `${Math.floor(Math.max(0, val - startTime) / secPerHour)}h`,
      },
    },
    yAxis: {
      data: itemNamesSorted,
      name: 'Projects',
      nameLocation: 'middle',
      nameGap: 20,
      type: 'category',
      axisTick: {
        alignWithLabel: true,
      },
      zlevel: 10,
      axisLabel: {
        color: ChartColor.Text,
        inside: true,
        fontSize: 14,
        fontFamily: 'monospace',
        textShadowColor: ChartColor.Text,
        textShadowBlur: 1,
      },
    },
    series: [
      {
        type: 'custom',
        renderItem: (params: any, api: any) => {
          const categoryIndex = api.value(0)
          const start = api.coord([api.value(1), categoryIndex])
          const end = api.coord([api.value(2), categoryIndex])
          const height = api.size([0, 1])[1] * 0.6
          const rectShape = echarts.graphic.clipRectByRect(
            {
              x: start[0],
              y: start[1] - height / 2,
              width: end[0] - start[0],
              height: height,
            },
            {
              x: params.coordSys.x,
              y: params.coordSys.y,
              width: params.coordSys.width,
              height: params.coordSys.height,
            },
          )
          return (
            rectShape && {
              type: 'rect',
              transition: ['shape'],
              shape: rectShape,
              style: {
                fill: api.value(4),
                stroke: api.value(4),
                lineWidth: 0,
                opacity: 0.7,
              },
            }
          )
        },
        itemStyle: {
          opacity: 0.4,
        },
        encode: {
          x: [1, 2],
          y: 0,
        },
        data,
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
  const startHour = '8 am'
  const endHour = '5 pm'
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
                xAxis: endHour,
              },
            ],
          ],
        },
      },
    ],
  }
}
