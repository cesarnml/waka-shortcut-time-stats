<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { DateFormat, formatTime } from '$lib/helpers/timeHelpers'
  import type { DurationsResult } from '$src/types/wakatime'
  import dayjs from 'dayjs'
  import isToday from 'dayjs/plugin/isToday'
  import { Api, Step } from '$lib/constants'
  import 'iconify-icon'

  dayjs.extend(isToday)

  export let durations: DurationsResult
  export let itemType: string

  let loading = false

  const PREV_DAYS_LIMIT = 13
  const INCREMENT_UNIT = 'days'

  const LAST_DAY = dayjs().subtract(PREV_DAYS_LIMIT, INCREMENT_UNIT)

  const dispatch = createEventDispatcher()

  $: totalDuration = durations.data.reduce((acc, cur) => acc + cur.duration, 0)
  $: totalTime = formatTime(totalDuration)
  $: isNextDisabled = dayjs(durations.start).isToday() || loading
  $: isPrevDisabled = dayjs(durations.start).isSame(LAST_DAY, 'day') || loading

  const onClick = async (step: Step) => {
    loading = true
    const response = await fetch(
      Api.WakaDurations(
        dayjs(durations.start).add(step, INCREMENT_UNIT).format(DateFormat.Query),
        itemType,
      ),
    )
    durations = await response.json()
    dispatch('update', durations)
    loading = false
  }

  const getPrevDate = () => onClick(Step.Prev)
  const getNextDate = () => onClick(Step.Next)
</script>

<div class="flex items-center justify-center gap-4">
  <button
    class="btn-outline btn-square btn-sm btn flex items-center"
    on:click={getPrevDate}
    disabled={isPrevDisabled}
  >
    <iconify-icon class="text-2xl" icon="ic:baseline-chevron-left" />
  </button>
  <div class="w-24 text-center font-mono text-base text-base-content">
    {#if loading}
      <iconify-icon class="text-2xl" icon="eos-icons:three-dots-loading" />
    {:else}
      {totalTime}
    {/if}
  </div>
  <button
    class="btn-outline btn-square btn-sm btn flex items-center"
    on:click={getNextDate}
    disabled={isNextDisabled}
  >
    <iconify-icon class="text-2xl" icon="ic:baseline-chevron-right" />
  </button>
</div>
