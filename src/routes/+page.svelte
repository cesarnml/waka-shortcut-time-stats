<script lang="ts">
  import type { PageData } from './$types'
  import StackedBarChart from '$lib/components/BarChart/StackedBarChart.svelte'
  import LanguagePieChart from '$lib/components/PieChart/LanguagePieChart.svelte'
  import CodingDisciplineGauge from '$lib/components/CodingDisciplineGauge.svelte'
  import WeekdaysBarChart from '$lib/components/BarChart/WeekdaysBarChart.svelte'
  import DurationsByProject from '$lib/components/DurationsByProject.svelte'
  import DurationsByLanguageSlice from '$lib/components/DurationsByLanguageSlice.svelte'
  import ProjectList from '$lib/components/ProjectList.svelte'
  import TotalCodingTimeByProject from '$lib/components/TotalCodingTimeByProject.svelte'
  import DataRangeSelect from '$lib/components/DataRangeSelect.svelte'
  import orderBy from 'lodash/orderBy'
  import CodeStatsFullPanel from '$lib/components/CodeStatsFullPanel.svelte'

  export let data: PageData

  let { summaries, durations, durationsByLanguage } = data

  let loading = false

  const handleChange = async (e: CustomEvent) => {
    console.log('handleChange:', e.detail.selectedRange)
    loading = true
    const response = await fetch(`/api/wakatime/current/summaries/?range=${e.detail.selectedRange}`)
    summaries = await response.json()
    loading = false
  }

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

<div class="space-y-8 px-1 pt-8 md:px-4">
  <div class="flex justify-end gap-4">
    <DataRangeSelect on:duration={handleChange} {loading} />
  </div>
  <CodeStatsFullPanel {summaries} {projectList} />
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
    <StackedBarChart {summaries} itemsType="projects" title="Coding Activity by Project" />
    <TotalCodingTimeByProject {summaries} />
    <StackedBarChart {summaries} itemsType="categories" title="Coding Activity by Category" />
    <WeekdaysBarChart {summaries} />
    <LanguagePieChart {summaries} />
    <CodingDisciplineGauge {summaries} />
    <DurationsByProject {durations} />
    <DurationsByLanguageSlice {durationsByLanguage} />
  </div>
  <ProjectList projects={projectList} />
</div>
