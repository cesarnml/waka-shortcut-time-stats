<script lang="ts">
  import { page } from '$app/stores'
  import type { SummariesResult } from '../../routes/api/wakatime/current/summaries/+server'
  export let summaries: SummariesResult

  const { data } = summaries

  const files = [
    ...new Set(data.map((summary) => summary.entities.map((entity) => entity.name)).flat()),
  ].filter((file) => !file.includes('node_modules') && !file.includes('generated'))

  const filesToTimeDict: Record<string, number> = {}

  summaries.data.forEach((summary) => {
    summary.entities.forEach((entity) => {
      if (!files.includes(entity.name)) {
        return
      }
      if (filesToTimeDict[entity.name.split(`${$page.params.projectName}/`)[1]] === undefined) {
        return (filesToTimeDict[entity.name.split(`${$page.params.projectName}/`)[1]] =
          entity.total_seconds)
      }
      return (filesToTimeDict[entity.name.split(`${$page.params.projectName}/`)[1]] +=
        entity.total_seconds)
    })
  })
  console.log('filesToTimeDict:', filesToTimeDict)
</script>

<div class="space-y-8 rounded-2xl bg-slate-800 p-4">
  <h2 class="text-center text-3xl text-stone-300">Files vs Time</h2>
  <ul>
    {#each Object.keys(filesToTimeDict) as file (file)}
      <li class="text-slate-300">{file}: {Math.floor(filesToTimeDict[file] / 60)} mins</li>
    {/each}
  </ul>
</div>
