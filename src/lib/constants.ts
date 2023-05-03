import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'

dayjs.extend(localeData)

export const DateFormat = {
  Short: 'MMM DD',
  Shortish: 'MMM Do',
  Long: 'MMM DD YYYY',
} as const

export const secPerMin = 60
export const secPerHour = 3600

export const ChartColor = {
  Text: '#fafafa',
  Icon: '#fafafa',
} as const

/**
 * ['Mon',  'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun]
 */
export const weekdays = [...dayjs.weekdaysShort().slice(1), 'Sun']
console.log('weekdays:', weekdays)

export const integerDateMap = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
}

export type KeyOfDateMap = keyof typeof integerDateMap
