<script lang="ts">
  import { invalidate } from '$app/navigation'
  import type { WakaProjectResult } from '$src/types/wakatime.js'

  export let data

  $: ({ projectsResult } = data)
  let value: string
  const handleSearch = async () => {
    const response = await fetch(`/api/wakatime/current/projects?q=${value}`)
    const result: WakaProjectResult = await response.json()
    projectsResult = result
  }

  const handleClear = async () => {
    value = ''
    const response = await fetch(`/api/wakatime/current/projects`)
    const result: WakaProjectResult = await response.json()
    projectsResult = result
  }
</script>

<div class="space-y-8">
  <form class="flex items-center gap-4 px-4" on:submit={handleSearch}>
    <input class="input-primary input flex-shrink text-base" bind:value placeholder="Search" />
    <button class="btn-primary btn flex-shrink">Submit</button>
  </form>
  <ul class="w-full space-y-4 px-4">
    {#each projectsResult.data as project (project.name)}
      <li class="flex items-center justify-between gap-4">
        <a class="link-hover link" href={`/projects/${project.name}`}>{project.name}</a>
        {#if project?.badge?.url}
          <img src={project.badge.url} alt="badge" />
        {/if}
      </li>
    {/each}
  </ul>
</div>
