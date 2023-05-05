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
  import DataRangeSelect from '$lib/components/DataRangeSelect.svelte'
  import CodeStatsPanel from '$lib/components/CodeStatsPanel.svelte'

  dayjs.extend(duration)

  export let data

  let { summaries } = data

  let loading = false

  const handleChange = async (e: CustomEvent) => {
    loading = true
    const response = await fetch(
      `/api/wakatime/current/summaries/?range=${e.detail.selectedRange}&project=${$page.params.projectName}`,
    )
    summaries = await response.json()
    loading = false
  }
</script>

<div class="space-y-8 pt-8">
  <h1 class="text-3xl text-zinc-300">Project: {$page.params.projectName}</h1>
  <DataRangeSelect on:duration={handleChange} {loading} />
  <CodeStatsPanel {summaries} />
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
    <CodingLineChart {summaries} />
    <StackedBarChart {summaries} itemsType="categories" title="Coding Activity by Category" />
    <LanguagePieChart {summaries} />
    <BranchesVsTime {summaries} />
  </div>
  <CodingTreeMap {summaries} />
  <FilesTable {summaries} />
</div>
