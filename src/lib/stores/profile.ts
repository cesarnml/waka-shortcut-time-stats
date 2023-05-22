import { writable } from 'svelte/store'

const createProfileStore = () => {
  const { subscribe, set } = writable<Record<string, any> | null>(null)

  return {
    subscribe,
    set: (profile: Record<string, any> | null) => set(profile),
    clear: () => set(null),
  }
}

export const profile = createProfileStore()
