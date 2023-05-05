<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { WakaApiRange } from '$lib/constants'

  export let loading: boolean
  let selectedRange = WakaApiRange.Last_7_Days_From_Yesterday

  const dispatch = createEventDispatcher()
  const handleSelect = () => {
    dispatch('duration', { selectedRange })
  }
</script>

<select
  class="select-primary select w-full max-w-sm text-zinc-300"
  bind:value={selectedRange}
  on:change={handleSelect}
  disabled={loading}
>
  <option disabled selected>Pick a range</option>
  <option value={WakaApiRange.Last_7_Days_From_Yesterday}
    >{WakaApiRange.Last_7_Days_From_Yesterday}</option
  >
  <option value={WakaApiRange.Last_7_Days}>{WakaApiRange.Last_7_Days}</option>
  <option value={WakaApiRange.Last_14_Days}>{WakaApiRange.Last_14_Days}</option>
  <option value={WakaApiRange.Last_30_Days}>{WakaApiRange.Last_30_Days}</option>
  <option value={WakaApiRange.This_Week}>{WakaApiRange.This_Week}</option>
  <option value={WakaApiRange.This_Month}>{WakaApiRange.This_Month}</option>
  <option value={WakaApiRange.Last_Month}>{WakaApiRange.Last_Month}</option>
</select>
{#if loading}
  <button class="loading btn-primary btn-link btn" />
{/if}
