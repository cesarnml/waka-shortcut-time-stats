<script lang="ts">
  import { page } from '$app/stores'
  import CodingActivityChartByCategory from '$lib/components/CodingActivityChartByCategory.svelte'
  import CodingLanguagePieChart from '$lib/components/CodingLanguagePieChart.svelte'
  import CodingActivityLineChart from '$lib/components/CodingActivityLineChart.svelte'
  import CodingTreeMap from '$lib/components/CodingTreeMap.svelte'

  export let data
  const { summaries } = data
  console.log('summaries:', summaries)
</script>

<div>{$page.params.projectName}</div>
<CodingActivityChartByCategory {summaries} />
<CodingLanguagePieChart {summaries} />
<CodingActivityLineChart data={summaries.data} />
<CodingTreeMap />
