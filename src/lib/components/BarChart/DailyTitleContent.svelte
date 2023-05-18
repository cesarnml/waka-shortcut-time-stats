<script lang="ts">
  import { DateFormat } from '$lib/helpers/timeHelpers'
  import type { DurationsResult } from '$src/types/wakatime'
  import dayjs from 'dayjs'
  import advancedFormat from 'dayjs/plugin/advancedFormat'
  import { fade } from 'svelte/transition'

  dayjs.extend(advancedFormat)

  export let title: string
  export let durations: DurationsResult
  export let showCurrentTime = false

  $: date = dayjs(durations.start).format(DateFormat.Shortish)
  $: isToday = dayjs().isSame(durations.start, 'day')
</script>

<div class="flex px-2">
  <div class="flex-1 text-left text-orange-500" transition:fade>
    {#if showCurrentTime && isToday}
      <span class="text-sm">{dayjs().format(DateFormat.TwelveHour)}</span>
    {/if}
  </div>
  <div>
    {title}
  </div>
  <div class="flex flex-1 items-center justify-end text-sm text-primary">
    {date}
  </div>
</div>
