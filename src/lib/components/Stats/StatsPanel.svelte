<script lang="ts">
  import { formatTime } from '$lib/helpers/timeHelpers'
  import type { SummariesResult } from '$src/types/wakatime'
  import first from 'lodash/first'
  import StatPanelItem from './StatPanelItem.svelte'
  import { createProjectList, getTopLanguage } from './statHelpers'

  export let summaries: SummariesResult
  export let renderFullPanel = false

  let topLanguage: string
  let projectList: {
    name: string
    value: number
  }[]

  $: averageSeconds = summaries.daily_average.seconds_including_other_language
  $: totalSeconds = summaries.cumulative_total.seconds

  $: if (renderFullPanel) {
    topLanguage = getTopLanguage(summaries)
    projectList = createProjectList(summaries)
  }
</script>

<div class="stats flex bg-chart-dark shadow-lg">
  <StatPanelItem title="Total Hours" icon="mdi:clock-outline">
    {formatTime(totalSeconds)}
  </StatPanelItem>
  <StatPanelItem title="Daily Average" icon="material-symbols:bar-chart-rounded">
    {formatTime(averageSeconds)}
  </StatPanelItem>
  <StatPanelItem title="No Code Days" icon="material-symbols:code-blocks-outline-rounded">
    {summaries.daily_average.holidays} days
  </StatPanelItem>
  {#if renderFullPanel}
    <StatPanelItem title="Top Project" icon="material-symbols:folder-outline-rounded">
      {first(projectList)?.name ?? 'N/A'}
    </StatPanelItem>
    <StatPanelItem title="Top Language" icon="tabler:world">
      {topLanguage}
    </StatPanelItem>
  {/if}
</div>
