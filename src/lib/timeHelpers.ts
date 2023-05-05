import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { hoursPerDay } from './constants'

dayjs.extend(duration)

export const getDays = (value: number) => dayjs.duration(value, 's').days()
export const getHours = (value: number) => dayjs.duration(value, 's').hours()
export const getMinutes = (value: number) => dayjs.duration(value, 's').minutes()

export const getTotalHours = (value: number) => getDays(value) * hoursPerDay + getHours(value)
export const hasHours = (value: number) => Boolean(getTotalHours(value))
export const formatHours = (value: number) => (hasHours(value) ? `${getTotalHours(value)}h` : '')

export const hasMinutes = (value: number) => Boolean(getMinutes(value))
export const formatMinutes = (value: number) => (hasMinutes(value) ? `${getMinutes(value)}m` : '')
export const isMinimalWork = (value: number) => !hasHours(value) && !hasMinutes(value)
export const formatMinimalWork = (value: number) =>
  isMinimalWork(value) ? 'Less than 1 minute' : ''
