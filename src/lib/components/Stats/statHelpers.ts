import { createItemNameToTimeDict, getSummaryItems } from '$lib/helpers/chartHelpers'
import type { SummariesResult } from '$src/types/wakatime'
import orderBy from 'lodash/orderBy'

export const createProjectList = (summaries: SummariesResult) => {
  const projects = getSummaryItems(summaries, 'projects')

  const projectToTimeDict = createItemNameToTimeDict(projects)

  return orderBy(
    Object.entries(projectToTimeDict)
      .filter(([, value]) => value)
      .map(([name, value]) => ({ name, value })),
    'value',
    'desc',
  )
}

export const getTopLanguage = (summaries: SummariesResult) => {
  const languages = summaries.data.flatMap((summary) => summary.languages)

  const languageToTimeDict = languages.reduce((acc, { name, total_seconds }) => {
    acc[name] = (acc[name] ?? 0) + total_seconds
    return acc
  }, {} as Record<string, number>)

  return Object.keys(languageToTimeDict).reduce((a, b) =>
    languageToTimeDict[a] > languageToTimeDict[b] ? a : b,
  )
}
