<script lang="ts">
  import CodingActivityChartByProject from '$lib/components/CodingActivityChartByProject.svelte'
  import CodingActivityChartByCategory from '$lib/components/CodingActivityChartByCategory.svelte'
  import CodingLanguagePieChart from '$lib/components/CodingLanguagePieChart.svelte'
  import CodingDisciplineGauge from '$lib/components/CodingDisciplineGauge.svelte'

  export let data
  const { summaries } = data
</script>

<svelte:head>
  <title>WakaStats</title>
</svelte:head>

<div class="pt-8">
  <CodingActivityChartByProject {summaries} />
  <CodingActivityChartByCategory {summaries} />
  <CodingLanguagePieChart {summaries} />
  <CodingDisciplineGauge {summaries} />
  <h2 class="text-4xl">Grand Total</h2>
  <pre>{JSON.stringify(data.allTimeSinceToday, null, 2)}</pre>
  <hr />
  <h2 class="text-4xl">Iterations</h2>
  <pre>{JSON.stringify(data.iterations, null, 2)}</pre>
</div>
