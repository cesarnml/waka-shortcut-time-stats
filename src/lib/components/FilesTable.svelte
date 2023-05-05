<script lang="ts">
  import { page } from '$app/stores'
  import orderBy from 'lodash/orderBy'
  import { afterUpdate } from 'svelte'

  export let summaries: SummariesResult

  let files: string[] = []
  let filesToTimeDict: Record<string, number> = {}
  let rows: { name: string; time: number }[] = []

  afterUpdate(() => {
    files = []
    filesToTimeDict = {}
    rows = []

    files = [
      ...new Set(
        summaries.data.map((summary) => summary.entities.map((entity) => entity.name)).flat(),
      ),
    ].filter((file) => !file.includes('node_modules') && !file.includes('generated'))

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

    rows = orderBy(
      Object.keys(filesToTimeDict).map((file) => ({
        name: file,
        time: Number((filesToTimeDict[file] / 3600).toFixed(2)),
      })),
      'time',
      'desc',
    )
  })
</script>

<div class="space-y-8 rounded-2xl bg-slate-800 p-4">
  <h2 class="text-center text-3xl text-stone-300">Files vs Time</h2>
  <div class="max-h-[500px] overflow-x-auto overflow-y-auto">
    <table class="table-zebra table w-full">
      <thead>
        <tr>
          <th>Filename</th>
          <th>Time Spent (hours)</th>
        </tr>
      </thead>
      <tbody>
        {#each rows as row (row.name)}
          <tr>
            <td
              ><a
                class="link-accent link"
                href={`https://github.com/cesarnml/waka-shortcut-time-stats/blob/main/${row.name}`}
                target="_blank"
                rel="noopener noreferrer">{row.name}</a
              ></td
            >
            <td>{row.time}h</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
