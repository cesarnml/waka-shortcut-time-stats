export const WakaSliceBy = {
  None: '',
  Entity: 'entity',
  Language: 'language',
  Dependencies: 'dependencies',
  OS: 'os',
  Editor: 'editor',
  Machine: 'machine',
} as const

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

export const WakaToShortcutApiRange = {
  [WakaApiRange.Today]: 0,
  [WakaApiRange.Yesterday]: 1,
  [WakaApiRange.Last_7_Days]: 7,
  [WakaApiRange.Last_7_Days_From_Yesterday]: 8,
  [WakaApiRange.Last_14_Days]: 14,
  [WakaApiRange.Last_30_Days]: 30,
  [WakaApiRange.This_Week]: 7,
  [WakaApiRange.This_Month]: 31,
  [WakaApiRange.Last_Month]: 62,
} as const

export const BRANCH_NAME_DELIMITER = '_'
export const BRANCH_ID_DELIMITER = '-'
export const MAIN_BRANCH = 'main'
export const NUMBER_OF_DECIMALS = 1
export const SHORTCUT_STORY_IDENTIFIER = 'cesar/sc-'

export const Url = {
  Home: '/',
  Projects: '/projects',
  ProjectDetail: (id: string) => `/projects/${id}`,
  Iterations: '/iterations',
  IterationDetail: (id: number) => `/iterations/${id}`,
  Login: '/login',
} as const

type Url = typeof Url

export const getTopLevelUrl = (url: Url) => {
  return Object.entries(url).reduce((acc, [route, url]) => {
    if (typeof url === 'string' && route !== 'Home') {
      return { ...acc, [route]: url }
    }
    return acc
  }, {} as Omit<Url, 'ProjectDetail' | 'IterationDetail'>)
}

export const Api = {
  WakaDurations: (date: string, itemType: string) =>
    `/api/wakatime/current/durations?date=${date}&slice_by=${itemType}`,
}

export const Step = {
  Next: 1,
  Prev: -1,
} as const

export type Step = (typeof Step)[keyof typeof Step]
