import type * as echarts from 'echarts'
import { ChartColor, secPerHour } from '$lib/constants'
import type { SummariesResult } from '$src/routes/api/wakatime/current/summaries/+server'

/**
 * Given a SummariesResult object, calculates the total weekly coding time for each programming language
 * and returns an array of objects with name and value properties for each language.
 */
export const createPieChartData = (summaries: SummariesResult) => {
  const languagesByDate = summaries.data.map((item) => item.languages)
  const languageToWeeklyCodingTime: Record<string, number> = {}

  // Use nested forEach loops to iterate over the array of languages
  // and add up the total weekly coding time for each language.
  languagesByDate.forEach((languages) => {
    languages.forEach((language) => {
      languageToWeeklyCodingTime[language.name] =
        (languageToWeeklyCodingTime[language.name] ?? 0) + language.total_seconds
    })
  })

  // Use Object.entries() to iterate over the properties of the languageToWeeklyCodingTime object
  // and map them to an array of objects with name and value properties.
  return Object.entries(languageToWeeklyCodingTime).map(([name, totalSeconds]) => ({
    name,
    value: Number((totalSeconds / secPerHour).toFixed(1)),
  }))
}

type Datum = { name: string; value: number }
type Data = Datum[]

/**
 * Given an array of data objects with name and value properties, returns an echarts pie chart configuration object
 * with the data included.
 */
export const createPieChartOption = (data: Data): echarts.EChartsOption => ({
  tooltip: {
    trigger: 'item',
    valueFormatter: (value) => `${value}h`,
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
})
