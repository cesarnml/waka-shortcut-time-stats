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
  function createLeaf(path) {
    return {
      value: filesToTimeDict[path],
      name: path.split('/').at(-1),
      path: path,
    }
  }

  function convertToTreeMap(obj) {
    const result = []

    for (const key in obj) {
      const value = obj[key]
      const path = key.split('/')
      let current = result

      // Traverse the tree map until we reach the leaf node
      for (let i = 0; i < path.length; i++) {
        const name = path[i]
        let child = current.find((item) => item.name === name)

        if (!child) {
          child = {
            name,
            path: path.slice(0, i + 1).join('/'),
            value: 0,
            children: [],
          }
          current.push(child)
        }

        child.value += value
        current = child.children
      }
    }

    return result
  }
</script>

<div class="space-y-8 rounded-2xl bg-slate-800 p-4">
  <h2 class="text-center text-3xl text-stone-300">Files vs Time</h2>
  <ul>
    {#each Object.keys(filesToTimeDict) as file (file)}
      <li class="text-slate-300">{file}: {Math.floor(filesToTimeDict[file] / 60)} mins</li>
    {/each}
  </ul>
</div>
