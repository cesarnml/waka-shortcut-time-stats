<script lang="ts">
  import { page } from '$app/stores'
  import { WakaApiRange } from '$lib/constants'
  import { createEventDispatcher, onMount } from 'svelte'

  let selectedRange = WakaApiRange.Last_7_Days_From_Yesterday

  const dispatch = createEventDispatcher()
  const handleSelect = () => {
    dispatch('duration', { selectedRange })
  }
  onMount(() => {
    $page.url.searchParams.set('ted', 'ken')
  })
</script>

<select
  class="select-accent select w-full max-w-sm bg-neutral-focus text-accent"
  bind:value={selectedRange}
  on:change={handleSelect}
>
  <option disabled selected>Pick a range</option>
  <option value={WakaApiRange.Last_7_Days_From_Yesterday}>
    {WakaApiRange.Last_7_Days_From_Yesterday}
  </option>
  <option value={WakaApiRange.Last_7_Days}>{WakaApiRange.Last_7_Days}</option>
  <option value={WakaApiRange.Last_14_Days}>{WakaApiRange.Last_14_Days}</option>
  <option value={WakaApiRange.Last_30_Days}>{WakaApiRange.Last_30_Days}</option>
  <option value={WakaApiRange.This_Week}>{WakaApiRange.This_Week}</option>
  <option value={WakaApiRange.This_Month}>{WakaApiRange.This_Month}</option>
  <option value={WakaApiRange.Last_Month}>{WakaApiRange.Last_Month}</option>
</select>
