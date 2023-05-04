<script lang="ts">
  import { formatHours, formatMinutes } from '$lib/timeHelpers'

  export let projects: { name: string; value: number }[]
</script>

<div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
  {#each projects as { name, value } (name)}
    <a class="card glass" href={`/projects/${name}`}>
      <div class="card-body flex flex-col p-4">
        <h2 class="card-title flex-grow">
          {name}
        </h2>
        <div class="flex gap-2">
          <span>{formatHours(value)}</span>
          <span>{formatMinutes(value)}</span>
        </div>
      </div>
    </a>
  {/each}
</div>
