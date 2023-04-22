<script lang="ts">
  import { page } from '$app/stores'
  import CodingActivityChartByCategory from '$lib/components/CodingActivityChartByCategory.svelte'
  import CodingLanguagePieChart from '$lib/components/CodingLanguagePieChart.svelte'
  import CodingActivityLineChart from '$lib/components/CodingActivityLineChart.svelte'
  import CodingTreeMap from '$lib/components/CodingTreeMap.svelte'
  import BranchCloud from '$lib/components/BranchCloud.svelte'
  import FilesVsTime from '$lib/components/FilesVsTime.svelte'
  import BranchesVsTime from '$lib/components/BranchesVsTime.svelte'

  export let data
  const { summaries } = data
  console.log('summaries:', summaries)
</script>

<div class="space-y-8 pt-8">
  <h1 class="text-3xl text-zinc-300">Project: {$page.params.projectName}</h1>
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
    <CodingActivityChartByCategory {summaries} />
    <CodingLanguagePieChart {summaries} />
    <CodingActivityLineChart {summaries} />
    <!-- <BranchCloud /> -->
  </div>
  <CodingTreeMap />
  <FilesVsTime {summaries} />
  <BranchesVsTime {summaries}/>
</div>
