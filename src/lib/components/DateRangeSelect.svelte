<script lang="ts">
  import { ApiEndpoint, WakaApiRange, WakaApiRangePrompt } from '$lib/constants'
  import { profile } from '$lib/stores/profile'
  import { selectedRange } from '$lib/stores/selectedRange'
  import { afterUpdate, createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  afterUpdate(async () => {
    if ($profile?.range !== $selectedRange && $selectedRange !== WakaApiRangePrompt) {
      await fetch(ApiEndpoint.SupabaseProfiles, {
        method: 'POST',
        body: JSON.stringify({
          id: $profile?.id,
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
