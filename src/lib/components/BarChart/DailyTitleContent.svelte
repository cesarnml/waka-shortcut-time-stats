<script lang="ts">
  import { DateFormat } from '$lib/helpers/timeHelpers'
  import type { DurationsResult } from '$src/types/wakatime'
  import dayjs from 'dayjs'
  import advancedFormat from 'dayjs/plugin/advancedFormat'

  dayjs.extend(advancedFormat)

  export let title: string
  export let durations: DurationsResult

  $: date = dayjs(durations.start).format(DateFormat.Shortish)
</script>

<div class="flex px-4">
  <div class="flex-1" />
  <div>
    {title}
  </div>
  <div class="flex flex-1 items-center justify-end text-sm text-primary">
    {date}
  </div>
</div>
