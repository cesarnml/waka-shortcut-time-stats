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
  import type { SummariesResult } from './api/wakatime/current/summaries/+server'

  export let data: PageData
  // const { summaries, allTimeSinceToday, iterations, durations, durationsByLanguage, projects } =
  // data

  const { summaries, durations, durationsByLanguage } = data

  let newSummaries: undefined | SummariesResult = undefined
  let loading = false

  const WakaApiRange = {
    Today: 'Today',
    Yesterday: 'Yesterday',
    Last_7_Days: 'Last 7 Days',
    Last_7_Days_From_Yesterday: 'Last 7 Days From Yesterday',
    Last_14_Days: 'Last 14 Days',
    Last_30_Days: 'Last 30 Days',
    This_Week: 'This Week',
    This_Month: 'This Month',
    Last_Month: 'Last Month',
  } as const

  let selectedRanged = WakaApiRange.Last_7_Days_From_Yesterday

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

  const handleChange = async () => {
    loading = true
    const response = await fetch(`/api/wakatime/current/summaries/?range=${selectedRanged}`)
    newSummaries = await response.json()
    loading = false
    console.log('newSummaries:', summaries)
  }
</script>

<svelte:head>
  <title>WakaStats</title>
</svelte:head>

<div class="space-y-8 pt-8">
  <div class="flex gap-4">
    <select
      class="select-primary select w-full max-w-xs text-zinc-300"
      bind:value={selectedRanged}
      on:change={handleChange}
      disabled={loading}
    >
      <option disabled selected>Pick a range</option>
      <option value={WakaApiRange.Last_7_Days_From_Yesterday}
        >{WakaApiRange.Last_7_Days_From_Yesterday}</option
      >
      <option value={WakaApiRange.Last_7_Days}>{WakaApiRange.Last_7_Days}</option>
      <option value={WakaApiRange.Last_14_Days}>{WakaApiRange.Last_14_Days}</option>
      <option value={WakaApiRange.Last_30_Days}>{WakaApiRange.Last_30_Days}</option>
      <option value={WakaApiRange.This_Week}>{WakaApiRange.This_Week}</option>
      <option value={WakaApiRange.This_Month}>{WakaApiRange.This_Month}</option>
      <option value={WakaApiRange.Last_Month}>{WakaApiRange.Last_Month}</option>
    </select>
    {#if loading}
      <button class="loading btn-primary btn-link btn" />
    {/if}
  </div>

  <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
    <CodingActivityChartByProject summaries={newSummaries ?? summaries} />
    <TotalCodingTimeByProject summaries={newSummaries ?? summaries} />
    <CodingActivityChartByCategory summaries={newSummaries ?? summaries} />
    <CodingActivityChartByWeekdays summaries={newSummaries ?? summaries} />
    <CodingLanguagePieChart summaries={newSummaries ?? summaries} />
    <CodingDisciplineGauge summaries={newSummaries ?? summaries} />
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
