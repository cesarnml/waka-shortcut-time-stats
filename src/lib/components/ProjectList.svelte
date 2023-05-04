<script lang="ts">
  import { hoursPerDay } from '$lib/constants'
  import dayjs from 'dayjs'
  import duration from 'dayjs/plugin/duration'

  dayjs.extend(duration)

  const getDays = (value: number) => dayjs.duration(value, 's').days()
  const getHours = (value: number) => dayjs.duration(value, 's').hours()
  const getMinutes = (value: number) => dayjs.duration(value, 's').minutes()

  const getTotalHours = (value: number) => getDays(value) * hoursPerDay + getHours(value)
  const hasHours = (value: number) => Boolean(getTotalHours(value))
  const formatHours = (value: number) => (hasHours(value) ? `${getTotalHours(value)}h` : '')

  const hasMinutes = (value: number) => Boolean(getMinutes(value))
  const formatMinutes = (value: number) => (hasMinutes(value) ? `${getMinutes(value)}m` : '')

  export let projects: { name: string; value: number }[]
</script>

<div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
  {#each projects as { name, value } (name)}
    <a class="card glass" href={`/projects/${name}`}>
      <div class="card-body flex flex-col p-4">
        <h2 class="card-title flex-grow">
          {name}
        </h2>
        <div>
          <span>{formatHours(value)}</span>
          <span>{formatMinutes(value)}</span>
        </div>
      </div>
    </a>
  {/each}
</div>
