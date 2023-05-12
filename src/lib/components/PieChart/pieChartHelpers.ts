import { ChartColor, createItemNameToTimeDict, getSummaryItems } from '$lib/helpers/chartHelpers'
import { formatTime } from '$lib/helpers/timeHelpers'
import type { SummariesResult } from '$src/types/wakatime'
import type { GridComponentOption, TooltipComponentOption } from 'echarts/components'
import type {
  ComposeOption,
  LegendComponentOption,
  PieSeriesOption,
} from 'echarts/types/dist/shared'

export const createPieChartData = (summaries: SummariesResult) => {
  const languages = getSummaryItems(summaries, 'languages')

  const languageToTimeDict = createItemNameToTimeDict(languages)

  return Object.entries(languageToTimeDict).map(([name, totalSeconds]) => ({
    name,
    value: totalSeconds,
  }))
}

type ChartDatum = { name: string; value: number }
type ChartData = ChartDatum[]

export const createPieChartOption = (
  data: ChartData,
): ComposeOption<
  TooltipComponentOption | GridComponentOption | LegendComponentOption | PieSeriesOption
> => ({
  grid: { left: 0, right: 0, bottom: 0, top: 0 },
  tooltip: {
    valueFormatter: (value) => formatTime(Number(value)),
  },
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
      radius: '60%',
      center: ['50%', '55%'],
      label: {
        color: ChartColor.Text,
      },
      data,
    },
  ],
})
