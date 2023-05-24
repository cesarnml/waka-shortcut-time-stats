<script lang="ts">
  import { invalidate } from '$app/navigation'
  import { ApiEndpoint, Url } from '$lib/constants.js'
  import { ChartColor } from '$lib/helpers/chartHelpers.js'
  import { project } from '$lib/stores/project.js'
  import type { WakaProjectResult } from '$src/types/wakatime.js'

  export let data

  $: ({ wakaProjects, supabase } = data)

  let search: string

  const handleSearch = async () => {
    const response = await fetch(`${ApiEndpoint.Projects}?q=${search}`)
    const result: WakaProjectResult = await response.json()
    wakaProjects = result
  }

  const onTrackProject = async (projectName: string) => {
    const { data } = await supabase.from('projects').select('*').eq('name', projectName).single()
    if (!data) {
      const { data: newProject } = await supabase
        .from('projects')
        .insert({ name: projectName, is_tracked: true })
        .select('*')
        .single()

      if (newProject) {
        project.add(newProject)
      }
    } else {
      const { data: updatedProject } = await supabase
        .from('projects')
        .update({ is_tracked: true })
        .eq('name', projectName)
        .select('*')
        .single()

      if (updatedProject) {
        project.update(updatedProject)
      }
    }
  }
  const onUnTrackProject = async (projectName: string) => {
    const { data: updatedProject } = await supabase
      .from('projects')
      .update({ is_tracked: false })
      .eq('name', projectName)
      .select('*')
      .single()

    if (updatedProject) {
      project.update(updatedProject)
    }
  }

  const onColorChange = async (projectName: string, color: string) => {
    const { data } = await supabase.from('projects').select('*').eq('name', projectName).single()
    if (!data) {
      const { data: newProject } = await supabase
        .from('projects')
        .insert({ name: projectName, color })
        .select('*')
        .single()

      if (newProject) {
        project.add(newProject)
      }
    } else {
      const { data: updatedProject } = await supabase
        .from('projects')
        .update({ color })
        .eq('name', projectName)
        .select('*')
        .single()

      if (updatedProject) {
        project.update(updatedProject)
      }
    }
  }
</script>

<div class="space-y-8">
  <form class="flex items-center gap-4 px-4 pt-4" on:submit={handleSearch}>
    <input
      class="input-primary input flex-shrink text-base"
      bind:value={search}
      placeholder="Search"
    />
    <button class="btn-primary btn-wide btn flex-shrink" type="submit">Submit</button>
  </form>
  <ul class="w-full space-y-4 px-4">
    {#each wakaProjects.data as { name, color } (name)}
      <li class="flex items-center gap-4">
        <div class="inline-flex flex-col">
          <input
            class="project-color"
            type="color"
            value={$project?.find((p) => p.name === name)?.color ?? ChartColor.Icon}
            on:change={(e) => onColorChange(name, e?.target?.value ?? '')}
          />
        </div>
        <a
          class="link-hover link mr-auto line-clamp-1 text-ellipsis font-semibold text-neutral-content"
          href={Url.ProjectDetail(name)}>{name}</a
        >
        {#if ($project ?? []).find((p) => p?.name?.includes(name))?.is_tracked}
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
