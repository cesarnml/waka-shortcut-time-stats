import zipObject from 'lodash/zipObject'
import dayjs from 'dayjs'
import { onMount, afterUpdate } from 'svelte'
import localeData from 'dayjs/plugin/localeData'
import { ChartColor } from '$lib/helpers/chartHelpers'
import {
  DateFormat,
  type KeyOfDateMap,
  integerDateMap,
  secPerHour,
  weekdays,
  secPerMin,
  formatTime,
} from '$lib/helpers/timeHelpers'
import type { DurationsResult, SummariesResult, WakaDuration } from '$src/types/wakatime'
import * as echarts from 'echarts'
import type {
  TooltipComponentOption,
  GridComponentOption,
  LegendComponentOption,
} from 'echarts/components'
import groupBy from 'lodash/groupBy'
import orderBy from 'lodash/orderBy'
import type { BarSeriesOption } from 'echarts/charts'

export type StackedBarChartOption = echarts.ComposeOption<
  TooltipComponentOption | GridComponentOption | LegendComponentOption | BarSeriesOption
>

export type SimpleBarChartOption = echarts.ComposeOption<
  TooltipComponentOption | GridComponentOption | BarSeriesOption
>

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
      name: key,
    }
  }) as BarSeriesOption[]
}

export const createStackedBarChartOption = (
  xValues: string[],
  series: BarSeriesOption[],
): StackedBarChartOption => ({
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
      formatter: (value: unknown) => `${value}h`,
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

  const yDataByWeekday: Record<string, number> = {}

  summaries.data.forEach((datum) => {
    const dateInteger = dayjs(datum.range.date).day() as KeyOfDateMap
    dateCount[dateInteger] += 1

    yDataByWeekday[integerDateMap[dateInteger]] =
      (yDataByWeekday[integerDateMap[dateInteger]] ?? 0) +
      datum.grand_total.total_seconds / secPerHour
  })

  return {
    grid: { left: 50, right: 20, top: 50, bottom: 50 },
    tooltip: {
      valueFormatter: (value) => `${value}h`,
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
  }
}

export const initializeAndUpdateChart = (
  chartRef: HTMLDivElement,
  chart: echarts.ECharts,
  option: StackedBarChartOption | SimpleBarChartOption,
) => {
  onMount(() => {
    const handleResize = () => chart.resize()
    chart = echarts.init(chartRef, 'auto', { renderer: 'svg' })
    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      chart.dispose()
      window.removeEventListener('resize', handleResize)
    }
  })

  afterUpdate(() => {
    chart.setOption(option)
  })
}

const languageToColor = {
  Svelte: '#EB5027',
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

export const createDurationsChartOption = (
  durations: DurationsResult,
  itemType: Extract<keyof WakaDuration, 'project' | 'language'>,
): echarts.ComposeOption<
  TooltipComponentOption | GridComponentOption | echarts.CustomSeriesOption
> => {
  const startTime = dayjs(durations.start).unix()
  const itemNames = [...new Set(durations.data.map((duration) => duration[itemType]))]
  const durationsByItemNameDict = groupBy(durations.data, itemType)
  const itemNamesSorted = orderBy(itemNames, (itemName) =>
    durationsByItemNameDict[itemName].reduce((acc, cur) => cur.duration + acc, 0),
  ).filter(
    (itemName) =>
      durationsByItemNameDict[itemName].reduce((acc, cur) => cur.duration + acc, 0) >= secPerMin,
  )
  const data = itemNamesSorted.flatMap((name, index) =>
    durationsByItemNameDict[name]
      .filter(({ duration }) => Math.floor(duration) >= secPerMin)
      .map(({ time, duration, color }) => ({
        name,
        value: [
          index,
          Math.floor(time),
          Math.floor(time + duration),
          Math.floor(time + duration) - Math.floor(time),
          itemType === 'project' ? color : languageToColor[name as keyof typeof languageToColor],
        ],
        itemStyle: {
          color: color ?? ChartColor.Text,
        },
      })),
  )
  return {
    tooltip: {
      formatter: (params: any) => params.marker + params.name + ': ' + formatTime(params.value[3]),
    },
    grid: {
      left: 30,
      right: 30,
    },
    xAxis: {
      type: 'time',
      min: startTime,
      axisLine: {
        show: true,
        lineStyle: {
          color: ChartColor.Text,
        },
      },
      axisTick: {
        show: true,
      },
      axisLabel: {
        color: ChartColor.Text,
        formatter: (val: number) => Math.floor(Math.max(0, val - startTime) / secPerHour) + 'h',
      },
    },
    yAxis: {
      data: itemNamesSorted,
      type: 'category',
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
    series: {
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
              fill: api.value(4) ?? ChartColor.Default,
              stroke: api.value(4) ?? ChartColor.Default,
              lineWidth: 1,
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
  }
}
