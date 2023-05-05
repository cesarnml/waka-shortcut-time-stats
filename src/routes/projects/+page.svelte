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
  <form class="flex gap-4 py-5" on:submit={handleSearch}>
    <input class="input" bind:value placeholder="Search project by name" />
    <button class="btn-primary btn">Submit</button>
    <button class="btn-warning btn" type="button" on:click={handleClear}>Clear</button>
  </form>
  <ul class="space-y-4">
    {#each projectsResult.data as project (project.name)}
      <li class="flex items-center gap-4">
        <a class="link-hover link" href={`/projects/${project.name}`}>{project.name}</a>
        {#if project?.badge?.url}
          <img src={project.badge.url} alt="badge" />
        {/if}
      </li>
    {/each}
  </ul>
</div>
