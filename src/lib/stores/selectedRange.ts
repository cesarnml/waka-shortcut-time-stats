import { writable } from 'svelte/store'
import { WakaApiRange, type KeyOf } from '$lib/constants'

const createSelectedRangeStore = () => {
  const { subscribe, set } = writable<WakaApiRange[KeyOf<WakaApiRange>]>(
    WakaApiRange.Last_7_Days_From_Yesterday,
  )

  return {
    subscribe,
    set: (date: WakaApiRange[KeyOf<WakaApiRange>]) => set(date),
  }
}

export const selectedRange = createSelectedRangeStore()
