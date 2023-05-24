<script lang="ts">
  import { ApiEndpoint, Url } from '$lib/constants.js'
  import { ChartColor } from '$lib/helpers/chartHelpers.js'
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
    <button class="btn-primary btn-wide btn flex-shrink" type="submit">Submit</button>
  </form>
  <ul class="w-full space-y-4 px-4">
    {#each projectsResult.data as { name, color } (name)}
      <li class="flex items-center gap-4">
        <div class="inline-flex flex-col">
          <input type="color" value={color ?? ChartColor.Icon} class="project-color" />
        </div>
        <a
          class="link-hover link line-clamp-1 flex-1 text-ellipsis font-semibold text-neutral-content"
          href={Url.ProjectDetail(name)}>{name}</a
        >
        {#if (trackedProjects ?? []).map((p) => p.name).includes(name)}
          <button class="btn-sm btn" type="button" on:click={() => onUnTrackProject(name)}
            >Tracking</button
          >
        {:else}
          <button
            class="btn-secondary btn-sm btn"
            type="button"
            on:click={() => onTrackProject(name)}>Track</button
          >
        {/if}
      </li>
    {/each}
  </ul>
</div>

<style lang="postcss">
  .project-color {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 28px;
    height: 32px;
    background-color: transparent;
    cursor: pointer;
    border-radius: 50%;
  }
  .project-color::-webkit-color-swatch {
    border-radius: 50%;
  }
  .project-color::-moz-color-swatch {
    border-radius: 50%;
  }
</style>
