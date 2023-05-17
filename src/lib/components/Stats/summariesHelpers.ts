import type { SummariesResult } from '$src/types/wakatime'

const INITIAL_AMOUNT = 0
const HOLIDAY_WORK_THRESHOLD = 60 // in seconds
const HOLIDAY_INCREMENT = 1

export const computeTotalSeconds = (summaries: SummariesResult) =>
  summaries.data.reduce((acc, summary) => acc + summary.grand_total.total_seconds, INITIAL_AMOUNT)

export const computeHolidayCount = (summaries: SummariesResult) =>
  summaries.data.reduce((acc, summary) => {
    if (summary.grand_total.total_seconds < HOLIDAY_WORK_THRESHOLD) {
      return acc + HOLIDAY_INCREMENT
    } else {
      return acc
    }
  }, INITIAL_AMOUNT)

export const computeWorkdayCount = (summaries: SummariesResult) => summaries.data.length

export const computeAverageSeconds = (summaries: SummariesResult) =>
  computeTotalSeconds(summaries) / (computeWorkdayCount(summaries) - computeHolidayCount(summaries))

export const getDates = (summaries: SummariesResult) =>
  summaries.data.map((summary) => summary.range.date)

export const getTimes = (summaries: SummariesResult) =>
  summaries.data.map((summary) => summary.grand_total.total_seconds)

export const getRatios = (summaries: SummariesResult) => {
  const averageSeconds = computeAverageSeconds(summaries)
  return getTimes(summaries).map((time) => time / averageSeconds)
}
