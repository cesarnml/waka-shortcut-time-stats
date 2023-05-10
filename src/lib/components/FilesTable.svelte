<script lang="ts">
  import { page } from '$app/stores'
  import { formatTime } from '$lib/helpers/timeHelpers'
  import type { SummariesResult } from '$src/types/wakatime'
  import orderBy from 'lodash/orderBy'

  export let summaries: SummariesResult

  let files: string[]
  let filesToTimeDict: Record<string, number>
  let rows: { name: string; time: string }[]

  const computeFiles = (summaries: SummariesResult) => {
    const unwantedRegex = /(node_modules|generated)/

    return [
      ...new Set(
        summaries.data.flatMap((summary) => summary.entities.map((entity) => entity.name)),
      ),
    ].filter((file) => !unwantedRegex.test(file))
  }

  $: files = computeFiles(summaries)

  const computeFilesToDict = (summaries: SummariesResult) => {
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
    return filesToTimeDict
  }

  $: filesToTimeDict = computeFilesToDict(summaries)

  $: rows = orderBy(
    Object.entries(filesToTimeDict).map(([file, time]) => ({
      name: file,
      time: formatTime(time),
    })),
    'time',
    'desc',
  )
</script>

<div class="space-y-8 rounded-2xl bg-slate-800 p-4">
  <h2 class="text-center text-3xl text-stone-300">Files vs Time</h2>
  <div class="max-h-[500px] overflow-x-auto overflow-y-auto">
    <table class="table-zebra table w-full">
      <thead>
        <tr>
          <th>Filename</th>
          <th>Time</th>
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
            <td>{row.time}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
