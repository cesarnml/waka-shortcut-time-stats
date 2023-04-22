<script lang="ts">
  import type { PageData } from './$types'
  import CodingActivityChartByProject from '$lib/components/CodingActivityChartByProject.svelte'
  import CodingActivityChartByCategory from '$lib/components/CodingActivityChartByCategory.svelte'
  import CodingLanguagePieChart from '$lib/components/CodingLanguagePieChart.svelte'
  import CodingDisciplineGauge from '$lib/components/CodingDisciplineGauge.svelte'
  import CodingActivityChartByWeekdays from '$lib/components/CodingActivityChartByWeekdays.svelte'
  import DurationsByProject from '$lib/components/DurationsByProject.svelte'
  import DurationsByLanguageSlice from '$lib/components/DurationsByLanguageSlice.svelte'
  import ProjectList from '$lib/components/ProjectList.svelte'
  import orderBy from 'lodash/orderBy'
  import TotalCodingTimeByProject from '$lib/components/TotalCodingTimeByProject.svelte'

  export let data: PageData
  const { summaries, allTimeSinceToday, iterations, durations, durationsByLanguage, projects } =
    data

  const allProjectNames = summaries.data
    .map((summary) =>
      summary.projects.map((project) => ({ name: project.name, time: project.total_seconds })),
    )
    .flat()

  const projectDict = allProjectNames.reduce((acc, cur) => {
    if (acc[cur.name] === undefined) {
      acc[cur.name] = cur.time
      return acc
    }
    acc[cur.name] += cur.time
    return acc
  }, {} as Record<string, number>)

  const projectList = orderBy(
    Object.keys(projectDict)
      .map((key) => ({
        name: key,
        value: projectDict[key],
      }))
      .filter((item) => item.value),
    'value',
    'desc',
  )
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
    <TotalCodingTimeByProject {summaries} />
    <DurationsByProject {durations} />
    <DurationsByLanguageSlice {durationsByLanguage} />
  </div>
  <ProjectList projects={projectList} />
</div>
<!-- <h2 class="text-4xl">Grand Total</h2>
<pre>{JSON.stringify(allTimeSinceToday, null, 2)}</pre>
<hr />
<h2 class="text-4xl">Iterations</h2>
<pre>{JSON.stringify(iterations, null, 2)}</pre> -->
