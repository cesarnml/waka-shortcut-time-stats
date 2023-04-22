<script lang="ts">
  import type { SummariesResult } from '../../routes/api/wakatime/current/summaries/+server'
  export let summaries: SummariesResult

  const { data } = summaries

  const branches = [
    ...new Set(data.map((summary) => summary.branches.map((entity) => entity.name)).flat()),
  ].filter((file) => !file.includes('node_modules') && !file.includes('generated'))

  const branchesToTimeDict: Record<string, number> = {}

  summaries.data.forEach((summary) => {
    summary.branches.forEach((entity) => {
      if (!branches.includes(entity.name)) {
        return
      }
      if (branchesToTimeDict[entity.name] === undefined) {
        return (branchesToTimeDict[entity.name] = entity.total_seconds)
      }
      return (branchesToTimeDict[entity.name] += entity.total_seconds)
    })
  })
  console.log('branchesToTimeDict:', branchesToTimeDict)
</script>

<div class="space-y-8 rounded-2xl bg-slate-800 p-4">
  <h2 class="text-center text-3xl text-stone-300">Branches vs Time</h2>
  <ul>
    {#each Object.keys(branchesToTimeDict) as file (file)}
      <li class="text-slate-300">{file}: {Math.floor(branchesToTimeDict[file] / 60)} mins</li>
    {/each}
  </ul>
</div>
