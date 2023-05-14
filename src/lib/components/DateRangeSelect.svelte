<script lang="ts">
  import { WakaApiRange } from '$lib/constants'
  import { createEventDispatcher } from 'svelte'

  const WORKING_OPTIONS_COUNT = 4
  const DISABLED_NOTE = ' (WIP)'

  let selectedRange = WakaApiRange.Last_7_Days_From_Yesterday

  const dispatch = createEventDispatcher()
  const handleSelect = () => {
    dispatch('wakarange', { selectedRange })
  }
</script>

<select
  class="select-accent select w-full text-accent sm:w-fit sm:bg-neutral-focus"
  bind:value={selectedRange}
  on:change={handleSelect}
>
  <option disabled selected>Pick a range</option>
  {#each Object.values(WakaApiRange) as range, idx (range)}
    <option value={range} disabled={idx > WORKING_OPTIONS_COUNT}>
      {range}{`${idx > WORKING_OPTIONS_COUNT ? DISABLED_NOTE : ''}`}
    </option>
  {/each}
</select>
