<script lang="ts">
  import { WakaApiRange, type KeyOf } from '$lib/constants'
  import { selectedRange } from '$lib/stores/selectedRange'
  import { createEventDispatcher, onMount } from 'svelte'

  const WORKING_OPTIONS_COUNT = 4
  const DISABLED_NOTE = ' (WIP)'

  const dispatch = createEventDispatcher()
  const handleChange = () => {
    localStorage.setItem('range', $selectedRange)
    dispatch('wakarange')
  }
  onMount(() => {
    const range = localStorage.getItem('range') as WakaApiRange[KeyOf<WakaApiRange>]
    if (range) {
      selectedRange.set(range)
    }
  })
</script>

<select
  class="select-accent select w-full text-accent sm:w-fit sm:bg-neutral-focus"
  bind:value={$selectedRange}
  on:change={handleChange}
>
  <option disabled selected>Pick a range</option>
  {#each Object.values(WakaApiRange) as range, idx (range)}
    <option value={range} disabled={idx > WORKING_OPTIONS_COUNT}>
      {range}{`${idx > WORKING_OPTIONS_COUNT ? DISABLED_NOTE : ''}`}
    </option>
  {/each}
</select>
