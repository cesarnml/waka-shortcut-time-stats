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
export const hoursPerDay = 24

export const ChartColor = {
  Text: '#fafafa',
  Icon: '#fafafa',
} as const

/**
 * ['Mon',  'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun]
 */
export const weekdays = [...dayjs.weekdaysShort().slice(1), 'Sun']

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

export const WakaApiRange = {
  Today: 'Today',
  Yesterday: 'Yesterday',
  Last_7_Days: 'Last 7 Days',
  Last_7_Days_From_Yesterday: 'Last 7 Days From Yesterday',
  Last_14_Days: 'Last 14 Days',
  Last_30_Days: 'Last 30 Days',
  This_Week: 'This Week',
  This_Month: 'This Month',
  Last_Month: 'Last Month',
} as const
