<script lang="ts">
  import type { PageData } from './$types'
  import StackedBarChart from '$lib/components/BarChart/StackedBarChart.svelte'
  import LanguagePieChart from '$lib/components/PieChart/LanguagePieChart.svelte'
  import CodingDisciplineGauge from '$lib/components/CodingDisciplineGauge.svelte'
  import WeekdaysBarChart from '$lib/components/BarChart/WeekdaysBarChart.svelte'
  import DurationsChart from '$lib/components/DurationsChart.svelte'
  import ProjectList from '$lib/components/ProjectList.svelte'
  import ProjectBreakdownChart from '$lib/components/BarChart/ProjectBreakdownChart.svelte'
  import DateRangeSelect from '$lib/components/DateRangeSelect.svelte'
  import StatsPanel from '$lib/components/Stats/StatsPanel.svelte'
  import axios from 'axios'
  import ActiveHours from '$lib/components/BarChart/ActiveHours.svelte'

  export let data: PageData

  $: ({ summaries, durations, durationsByLanguage } = data)

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

<div class="space-y-4 px-2 md:px-4">
  <div class="flex justify-end">
    <DateRangeSelect on:wakarange={onWakaRange} />
  </div>
  <StatsPanel {summaries} renderFullPanel />
  <ActiveHours {durations} itemType="project" />
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <ProjectBreakdownChart {summaries} />
    <WeekdaysBarChart {summaries} />
    <StackedBarChart {summaries} itemsType="projects" title="Daily Activity by Project" />
    <StackedBarChart {summaries} itemsType="categories" title="Daily Activity by Category" />
    <LanguagePieChart {summaries} />
    <CodingDisciplineGauge {summaries} />
    <DurationsChart {durations} itemType="project" />
    <DurationsChart durations={durationsByLanguage} itemType="language" />
  </div>
  <ProjectList {summaries} />
</div>
