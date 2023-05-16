<script lang="ts">
  import { formatTime } from '$lib/helpers/timeHelpers'
  import type { SummariesResult } from '$src/types/wakatime'
  import first from 'lodash/first'
  import StatPanelItem from './StatPanelItem.svelte'
  import { createProjectList, getTopLanguage } from './statHelpers'
  import { Url, WakaApiRange } from '$lib/constants'
  import { selectedRange } from '$lib/stores/selectedRange'

  export let summaries: SummariesResult
  export let showFullPanel = false

  let topProject: string
  let topLanguage: string
  let projectList: ReturnType<typeof createProjectList>

  $: totalSeconds = summaries.data.reduce(
    (acc, summary) => acc + summary.grand_total.total_seconds,
    0,
  )
  $: holidayCount = summaries.data.reduce((acc, summary) => {
    if (summary.grand_total.total_seconds < 60) {
      return acc + 1
    } else {
      return acc
    }
  }, 0)
  $: averageSeconds = totalSeconds / (summaries.data.length - holidayCount)

  $: if (showFullPanel) {
    topLanguage = getTopLanguage(summaries)
    projectList = createProjectList(summaries)
    topProject = first(projectList)?.name ?? 'N/A'
  }
  // @ts-expect-error tough type
  $: isSingleDay = [WakaApiRange.Today, WakaApiRange.Yesterday].includes($selectedRange)
</script>

<div class="stats bg-chart-dark shadow-lg">
  <StatPanelItem title="Total Hours" icon="mdi:clock-outline">
    {formatTime(totalSeconds)}
  </StatPanelItem>
  {#if !isSingleDay}
    <StatPanelItem title="Daily Average" icon="material-symbols:bar-chart-rounded">
      {formatTime(averageSeconds)}
    </StatPanelItem>
    <StatPanelItem title="No Code Days" icon="material-symbols:code-blocks-outline-rounded">
      {holidayCount} days
    </StatPanelItem>
  {/if}
  {#if showFullPanel}
    <StatPanelItem title="Top Project" icon="material-symbols:folder-outline-rounded">
      <a class="link-hover link" href={Url.ProjectDetail(topProject)}>{topProject}</a>
    </StatPanelItem>
    <StatPanelItem title="Top Language" icon="tabler:world">
      {topLanguage}
    </StatPanelItem>
  {/if}
</div>
