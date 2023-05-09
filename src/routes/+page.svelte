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
  import DateRangeSelect from '$lib/components/DateRangeSelect.svelte'
  import orderBy from 'lodash/orderBy'
  import CodeStatsFullPanel from '$lib/components/CodeStatsFullPanel.svelte'
  import axios from 'axios'

  export let data: PageData

  let { summaries, durations, durationsByLanguage } = data

  $: allProjects = summaries.data
    .map((summary) =>
      summary.projects.map((project) => ({ name: project.name, time: project.total_seconds })),
    )
    .flat()

  $: projectDict = allProjects.reduce((acc, cur) => {
    const { name, time } = cur
    return { ...acc, [name]: (acc[name] ?? 0) + time }
  }, {} as Record<string, number>)

  $: projectList = orderBy(
    Object.entries(projectDict)
      .map(([name, value]) => ({ name, value }))
      .filter((item) => item.value),
    'value',
    'desc',
  )

  const onWakaRange = async (e: CustomEvent) => {
    const { data } = await axios.get(
      `/api/wakatime/current/summaries/?range=${e.detail.selectedRange}`,
    )
    summaries = data
  }
</script>

<svelte:head>
  <title>WakaStats</title>
</svelte:head>

<div class="space-y-8 px-2 md:px-4">
  <DateRangeSelect on:wakarange={onWakaRange} />
  <CodeStatsFullPanel {summaries} {projectList} />
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
    <StackedBarChart {summaries} itemsType="projects" title="Coding Activity by Project" />
    <TotalCodingTimeByProject {summaries} />
    <StackedBarChart {summaries} itemsType="categories" title="Coding Activity by Category" />
    <WeekdaysBarChart {summaries} />
    <LanguagePieChart {summaries} />
    <CodingDisciplineGauge {summaries} />
    <DurationsByProject {durations} itemType="project" />
    <DurationsByLanguageSlice durations={durationsByLanguage} />
  </div>
  <ProjectList projects={projectList} />
</div>
