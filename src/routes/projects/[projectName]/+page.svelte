<script lang="ts">
  import { page } from '$app/stores'
  import StackedBarChart from '$lib/components/BarChart/StackedBarChart.svelte'
  import LanguagePieChart from '$lib/components/PieChart/LanguagePieChart.svelte'
  import CodingLineChart from '$lib/components/LineChart/CodingLineChart.svelte'
  import CodingTreeMap from '$lib/components/CodingTreeMap.svelte'
  import BranchesVsTime from '$lib/components/BranchesVsTime.svelte'
  import dayjs from 'dayjs'
  import duration from 'dayjs/plugin/duration'
  import FilesTable from '$lib/components/FilesTable.svelte'
  import DateRangeSelect from '$lib/components/DateRangeSelect.svelte'
  import CodeStatsPanel from '$lib/components/CodeStatsPanel.svelte'
  import WeekdaysBarChart from '$lib/components/BarChart/WeekdaysBarChart.svelte'
  import ScatterPlot from '$lib/components/ScatterPlot.svelte'

  dayjs.extend(duration)

  export let data

  $: ({
    summaries,
    projectName,
    stories,
    lazy: { aliases },
  } = data)

  const onWakaRange = async (e: CustomEvent) => {
    const response = await fetch(
      `/api/wakatime/current/summaries/?range=${e.detail.selectedRange}&project=${$page.params.projectName}`,
    )
    summaries = await response.json()
  }
</script>

<div class="space-y-8 pt-8">
  <h1 class="font-bold uppercase text-accent-focus">{$page.params.projectName}</h1>
  <DateRangeSelect on:wakarange={onWakaRange} />
  <CodeStatsPanel {summaries} />
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
    <CodingLineChart {summaries} />
    <StackedBarChart {summaries} itemsType="categories" title="Coding Activity by Category" />
    <WeekdaysBarChart {summaries} />
    <LanguagePieChart {summaries} />
  </div>
  <BranchesVsTime {summaries} />
  <ScatterPlot {summaries} {stories} />
  <FilesTable {summaries} />
  <CodingTreeMap {summaries} />
  {#await aliases}
    <div>Loading ...</div>
  {:then result}
    {#each result.aliases as alias}
      {#if alias.alias.includes(`${projectName}-git-cesar-sc`) && summaries.available_branches.find( (branch) => branch.includes((alias.alias.match(/sc-(\d+)/g) ?? [''])[0]), )}
        <div>
          <a class="link-hover link-primary link" href={`https://${alias.alias}`}
            >{summaries.available_branches.find((branch) =>
              branch.includes((alias.alias.match(/sc-(\d+)/g) ?? [''])[0]),
            )}</a
          >
        </div>
      {/if}
    {/each}
  {/await}
</div>
