<script lang="ts">
  import { page } from '$app/stores'
  import { formatTime } from '$lib/helpers/timeHelpers'
  import type { SummariesResult } from '$src/types/wakatime'
  import orderBy from 'lodash/orderBy'
  import ChartContainer from './ChartContainer.svelte'
  import ChartTitle from './ChartTitle.svelte'

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
  ).filter((item) => Boolean(item.time.trim()))
</script>

<ChartContainer>
  <ChartTitle>Files vs Time</ChartTitle>
  <div class="mb-4 max-h-[500px] overflow-auto px-6">
    <div class="flex justify-between pb-2 font-bold uppercase">
      <div>Filename</div>
      <div>Time</div>
    </div>
    <div class="space-y-2">
      {#each rows as row (row.name)}
        <div class="flex justify-between">
          <a
            class="link-hover link-accent link"
            href={`https://github.com/cesarnml/waka-shortcut-time-stats/blob/main/${row.name}`}
            target="_blank"
            rel="noopener noreferrer"
            >{row.name}
          </a>
          <div>{row.time}</div>
        </div>
      {/each}
    </div>
  </div>
</ChartContainer>
