<script lang="ts">
  import CodingActivityChartByProject from '$lib/components/CodingActivityChartByProject.svelte'
  import CodingActivityChartByCategory from '$lib/components/CodingActivityChartByCategory.svelte'
  import CodingLanguagePieChart from '$lib/components/CodingLanguagePieChart.svelte'
  import CodingDisciplineGauge from '$lib/components/CodingDisciplineGauge.svelte'
  import CodingActivityChartByWeekdays from '$lib/components/CodingActivityChartByWeekdays.svelte'

  import type { PageData } from './$types'
  import DurationsByProject from '$lib/components/DurationsByProject.svelte'

  export let data: PageData
  const { summaries, allTimeSinceToday, iterations, projects } = data
  let wakaProjects = projects.data
</script>

<svelte:head>
  <title>WakaStats</title>
</svelte:head>

<div class="space-y-8 pt-8">
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
    <CodingActivityChartByProject {summaries} />
    <CodingActivityChartByCategory {summaries} />
    <CodingLanguagePieChart {summaries} />
    <CodingDisciplineGauge {summaries} />
    <CodingActivityChartByWeekdays {summaries} />
    <DurationsByProject />
  </div>
  <div class="grid grid-cols-5 gap-6">
    {#each wakaProjects as project (project.id)}
      <a class="card glass" href={`/projects/${project.name}`}>
        <div class="card-body">
          <h2 class="card-title">
            {project.name}
          </h2>
          <p>{project.id}</p>
        </div>
      </a>
    {/each}
  </div>
</div>
<!-- <h2 class="text-4xl">Grand Total</h2>
<pre>{JSON.stringify(allTimeSinceToday, null, 2)}</pre>
<hr />
<h2 class="text-4xl">Iterations</h2>
<pre>{JSON.stringify(iterations, null, 2)}</pre> -->
