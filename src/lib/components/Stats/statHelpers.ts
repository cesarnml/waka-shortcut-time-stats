import type { SummariesResult } from '$src/types/wakatime'
import orderBy from 'lodash/orderBy'

export const createProjectList = (summaries: SummariesResult) => {
  const allProjects = summaries.data.flatMap((summary) =>
    summary.projects.map((project) => ({
      name: project.name,
      time: project.total_seconds,
    })),
  )

  const projectNameToTimeDict = allProjects.reduce((acc, { name, time }) => {
    return { ...acc, [name]: (acc[name] ?? 0) + time }
  }, {} as Record<string, number>)

  return orderBy(
    Object.entries(projectNameToTimeDict)
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
