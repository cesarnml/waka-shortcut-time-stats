import type { SummariesResult } from '$src/types/wakatime'

export const LanguageColor = {
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
} as const

export type KeyOfLanguageColor = keyof typeof LanguageColor

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

export const SummaryItemType = {
  Categories: 'categories',
  Projects: 'projects',
  Languages: 'languages',
  Branches: 'branches',
  Entities: 'entities',
} as const

export type ValueOfSummaryItemType = (typeof SummaryItemType)[keyof typeof SummaryItemType]

export const DurationItemType = {
  Category: 'category',
  Project: 'project',
  Language: 'language',
  Branch: 'branch',
  Entity: 'entity',
} as const

export type KeyOfDurationItemType = keyof typeof DurationItemType
export type ValueOfDurationItemType = (typeof DurationItemType)[keyof typeof DurationItemType]

export const getSummaryItems = (summaries: SummariesResult, itemType: ValueOfSummaryItemType) =>
  summaries.data.flatMap((summary) => summary[itemType])

type Item = { name: string; total_seconds: number }

export const createItemNameToTimeDict = (items: Item[]) =>
  items.reduce((acc, { name, total_seconds }) => {
    acc[name] = (acc[name] ?? 0) + total_seconds
    return acc
  }, {} as Record<string, number>)
