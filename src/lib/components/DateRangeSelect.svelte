<script lang="ts">
  import { browser } from '$app/environment'
  import { WakaApiRange, type KeyOf } from '$lib/constants'
  import { selectedRange } from '$lib/stores/selectedRange'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
  const handleChange = () => {
    localStorage.setItem('range', $selectedRange)
    dispatch('wakarange')
  }

  $: if (browser) {
    const range = localStorage.getItem('range')
    if (range !== null && range !== 'null') {
      selectedRange.set(range as WakaApiRange[KeyOf<WakaApiRange>])
    }

    if (range === null) {
      selectedRange.set(WakaApiRange.Last_7_Days_From_Yesterday)
    }
  }
</script>

<select
  class="select-accent select w-full text-accent sm:w-fit sm:bg-neutral-focus"
  bind:value={$selectedRange}
  on:change={handleChange}
>
  <option disabled selected>Pick a range</option>
  {#each Object.values(WakaApiRange) as range (range)}
    <option value={range}>
      {range}
    </option>
  {/each}
</select>
