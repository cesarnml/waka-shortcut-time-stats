<script lang="ts">
  import { ApiEndpoint, Url } from '$lib/constants.js'
  import type { WakaProjectResult } from '$src/types/wakatime.js'

  export let data

  $: ({ projectsResult } = data)
  let value: string
  const handleSearch = async () => {
    const response = await fetch(`${ApiEndpoint.Projects}?q=${value}`)
    const result: WakaProjectResult = await response.json()
    projectsResult = result
  }
</script>

<div class="space-y-8">
  <form class="flex items-center gap-4 px-4 pt-4" on:submit={handleSearch}>
    <input class="input-primary input flex-shrink text-base" bind:value placeholder="Search" />
    <button class="btn-primary btn-wide btn flex-shrink">Submit</button>
  </form>
  <ul class="w-full space-y-4 px-4">
    {#each projectsResult.data as { name } (name)}
      <li class="flex items-center justify-between gap-4">
        <a class="link-hover link" href={Url.ProjectDetail(name)}>{name}</a>
      </li>
    {/each}
  </ul>
</div>
