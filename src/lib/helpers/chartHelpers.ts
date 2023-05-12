import type { SummariesResult } from '$src/types/wakatime'

export const ChartColor = {
  Text: '#fafafa',
  Icon: '#fafafa',
  Default: '#5A6FC0',
  Marker: '#ff0000',
  Great: '#00ff00',
  Good: '#62BAF3',
  Fair: '#ffff00',
  Poor: '#ff0000',
} as const

export type SummaryItemType = 'categories' | 'projects' | 'languages' | 'branches' | 'entities'

export const getSummaryItems = (summaries: SummariesResult, itemType: SummaryItemType) =>
  summaries.data.flatMap((summary) => summary[itemType])

type Item = { name: string; total_seconds: number }

export const createItemNameToTimeDict = (items: Item[]) =>
  items.reduce((acc, { name, total_seconds }) => {
    acc[name] = (acc[name] ?? 0) + total_seconds
    return acc
  }, {} as Record<string, number>)
