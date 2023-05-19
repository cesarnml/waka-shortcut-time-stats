<script lang="ts">
  import { ApiEndpoint, Url } from '$lib/constants.js'
  import type { WakaProjectResult } from '$src/types/wakatime.js'

  export let data

  $: ({ projectsResult, trackedProjects, supabase } = data)

  let value: string
  const handleSearch = async () => {
    const response = await fetch(`${ApiEndpoint.Projects}?q=${value}`)
    const result: WakaProjectResult = await response.json()
    projectsResult = result
  }

  const onTrackProject = async (projectName: string) => {
    await supabase.from('projects').insert({ name: projectName })
    const { data } = await supabase.from('projects').select('*')
    trackedProjects = data
  }
  const onUnTrackProject = async (projectName: string) => {
    await supabase.from('projects').delete().eq('name', projectName)
    const { data } = await supabase.from('projects').select('*')
    trackedProjects = data
  }
</script>

<div class="space-y-8">
  <form class="flex items-center gap-4 px-4 pt-4" on:submit={handleSearch}>
    <input class="input-primary input flex-shrink text-base" bind:value placeholder="Search" />
    <button class="btn-primary btn-wide btn flex-shrink">Submit</button>
  </form>
  <ul class="w-full space-y-4 px-4">
    {#each projectsResult.data as { name, color } (name)}
      <li class="flex items-center gap-4">
        <div class="inline-flex flex-col">
          <input type="color" value={color ?? '#fafafa'} id="style1" />
        </div>
        <a
          class="link-hover link line-clamp-1 flex-1 text-ellipsis font-semibold text-neutral-content"
          href={Url.ProjectDetail(name)}>{name}</a
        >
        {#if (trackedProjects ?? []).map((p) => p.name).includes(name)}
          <button class="btn-sm btn" on:click={() => onUnTrackProject(name)}>Tracking</button>
        {:else}
          <button class="btn-secondary btn-sm btn" on:click={() => onTrackProject(name)}
            >Track</button
          >
        {/if}
      </li>
    {/each}
  </ul>
</div>

<style>
  /*------ Style 1 ------*/
  #style1 {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 32px;
    height: 32px;
    background-color: transparent;
    cursor: pointer;
  }
  #style1::-webkit-color-swatch {
    border-radius: 15px;
  }
  #style1::-moz-color-swatch {
    border-radius: 15px;
  }
</style>
