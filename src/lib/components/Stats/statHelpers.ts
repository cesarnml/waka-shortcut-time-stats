import type { SummariesResult } from '$src/types/wakatime'
import orderBy from 'lodash/orderBy'

export const createProjectList = (summaries: SummariesResult) => {
  const allProjects = summaries.data
    .map((summary) =>
      summary.projects.map((project) => ({ name: project.name, time: project.total_seconds })),
    )
    .flat()

  const projectDict = allProjects.reduce((acc, cur) => {
    const { name, time } = cur
    return { ...acc, [name]: (acc[name] ?? 0) + time }
  }, {} as Record<string, number>)

  return orderBy(
    Object.entries(projectDict)
      .map(([name, value]) => ({ name, value }))
      .filter((item) => item.value),
    'value',
    'desc',
  )
}

export const getTopLanguage = (summaries: SummariesResult) => {
  const languagesByDate = summaries.data.map((item) => item.languages)
  const languageToWeeklyCodingTime = languagesByDate.reduce((acc, languages) => {
    languages.forEach((language) => {
      acc[language.name] = (acc[language.name] || 0) + language.total_seconds
    })
    return acc
  }, {} as Record<string, number>)

  return Object.keys(languageToWeeklyCodingTime).reduce((a, b) =>
    languageToWeeklyCodingTime[a] > languageToWeeklyCodingTime[b] ? a : b,
  )
}
