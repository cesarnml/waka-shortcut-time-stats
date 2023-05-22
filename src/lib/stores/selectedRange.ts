import { writable } from 'svelte/store'
import type { WakaApiRange, KeyOf } from '$lib/constants'

const createSelectedRangeStore = () => {
  const { subscribe, set } = writable<WakaApiRange[KeyOf<WakaApiRange>] | 'Pick a range'>()

  return {
    subscribe,
    set: (date: WakaApiRange[KeyOf<WakaApiRange>]) => set(date),
  }
}

export const selectedRange = createSelectedRangeStore()
