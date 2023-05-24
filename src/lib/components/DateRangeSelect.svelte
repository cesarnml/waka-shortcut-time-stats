<script lang="ts">
  import { WakaApiRange } from '$lib/constants'
  import type { Database } from '$lib/database.types'
  import { selectedRange } from '$lib/stores/selectedRange'
  import { afterUpdate, createEventDispatcher } from 'svelte'

  export let profile: Database['public']['Tables']['profiles']['Row']

  const dispatch = createEventDispatcher()

  afterUpdate(async () => {
    if (profile.range !== $selectedRange && $selectedRange !== 'Pick a range') {
      await fetch('/api/supabase/profiles', {
        method: 'POST',
        body: JSON.stringify({
          id: profile?.id,
          range: $selectedRange,
        }),
      })
      dispatch('wakarange')
    }
  })
</script>

<select
  class="select-accent select w-full bg-neutral-focus text-accent sm:w-fit"
  bind:value={$selectedRange}
  title="Select date range"
>
  <option disabled selected>Pick a range</option>
  {#each Object.values(WakaApiRange) as range (range)}
    <option value={range}>
      {range}
    </option>
  {/each}
</select>
