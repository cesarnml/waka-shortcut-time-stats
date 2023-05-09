<script lang="ts">
  import { WakaApiRange } from '$lib/constants'
  import { createEventDispatcher } from 'svelte'

  let selectedRange = WakaApiRange.Last_7_Days_From_Yesterday

  const dispatch = createEventDispatcher()
  const handleSelect = () => {
    dispatch('wakarange', { selectedRange })
  }
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
  <option value={WakaApiRange.Last_30_Days} disabled
    >{WakaApiRange.Last_30_Days} (feature WIP)</option
  >
  <option value={WakaApiRange.This_Week} disabled>{WakaApiRange.This_Week} (feature WIP)</option>
  <option value={WakaApiRange.This_Month} disabled>{WakaApiRange.This_Month} (feature WIP)</option>
  <option value={WakaApiRange.Last_Month} disabled>{WakaApiRange.Last_Month} (feature WIP)</option>
</select>
