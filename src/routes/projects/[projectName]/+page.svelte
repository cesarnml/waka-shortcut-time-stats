<script lang="ts">
  import { page } from '$app/stores'
  import StackedBarChart from '$lib/components/BarChart/StackedBarChart.svelte'
  import VerticalBarChart from '$lib/components/BarChart/VerticalBarChart.svelte'
  import WeekdaysBarChart from '$lib/components/BarChart/WeekdaysBarChart.svelte'
  import Container from '$lib/components/Container.svelte'
  import ChartTitle from '$lib/components/ChartTitle.svelte'
  import DateRangeSelect from '$lib/components/DateRangeSelect.svelte'
  import LineChart from '$lib/components/LineChart/LineChart.svelte'
  import PieChart from '$lib/components/PieChart/PieChart.svelte'
  import ScatterPlot from '$lib/components/ScatterPlot/ScatterPlot.svelte'
  import StatsPanel from '$lib/components/Stats/StatsPanel.svelte'
  import Treemap from '$lib/components/Treemap/Treemap.svelte'
  import {
    ApiEndpoint,
    WakaApiRange,
    WakaToShortcutApiRange,
    type ValueOf,
  } from '$lib/constants.js'
  import { DateFormat } from '$lib/helpers/timeHelpers.js'
  import { loading } from '$lib/stores/loading.js'
  import { selectedRange } from '$lib/stores/selectedRange.js'
  import dayjs from 'dayjs'
  import { onMount } from 'svelte'

  export let data

  $: ({
    summaries,
    projectName,
    stories,
    lazy: { aliases },
    profile,
  } = data)

  $: available_branches = summaries.data
    ? [
        ...new Set(
          summaries.data.flatMap((summary) => summary.branches.map((branch) => branch.name)),
        ),
      ]
    : []

  onMount(() => {
    if (profile) {
      selectedRange.set(profile.range as ValueOf<WakaApiRange>)
    } else if ($selectedRange === 'Pick a range') {
      selectedRange.set(WakaApiRange.Last_30_Days)
    }
  })

  const onWakaRange = async () => {
    const shortcutRange =
      WakaToShortcutApiRange[$selectedRange as keyof typeof WakaToShortcutApiRange]
    loading.on()
    const responses = await Promise.all([
      fetch(
        `${ApiEndpoint.SupabaseProjectSummaries}?range=${$selectedRange}&project=${$page.params.projectName}`,
      ),
      fetch(
        `${ApiEndpoint.SearchStories}?query=has:branch moved:${dayjs()
          .subtract(shortcutRange, 'd')
          .format(DateFormat.Query)}..*`,
      ),
    ])
    summaries = await responses[0].json()
    stories = await responses[1].json()
    loading.off()
  }
</script>

<div class="space-y-4 px-2 md:px-4">
  <div class="flex flex-col items-center justify-between sm:flex-row sm:items-center">
    <h1
      class="my-auto flex h-full items-center self-start pb-6 pt-2 font-mono font-semibold uppercase text-primary-focus sm:items-center sm:pb-0"
    >
      {$page.params.projectName}
    </h1>
    <DateRangeSelect on:wakarange={onWakaRange} />
  </div>
  <StatsPanel {summaries} />
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
    {#if $selectedRange !== WakaApiRange.Today && $selectedRange !== WakaApiRange.Yesterday}
      <LineChart {summaries} title="Coding Activity" />
    {/if}
    <PieChart {summaries} title="Languages" />
    {#if $selectedRange !== WakaApiRange.Today && $selectedRange !== WakaApiRange.Yesterday}
      <WeekdaysBarChart {summaries} />
    {/if}
    <StackedBarChart {summaries} itemsType="categories" title="Coding Activity by Category" />
  </div>
  <VerticalBarChart {summaries} title="Branch Completion" />
  <Container>
    <ChartTitle>Preview Branch Deploy</ChartTitle>
    <div class="grid grid-cols-1 gap-2 px-6 pb-6 lg:grid-cols-2">
      {#await aliases}
        <div>Loading ...</div>
      {:then result}
        {#each result.aliases as alias}
          {#if alias.alias.includes(`${projectName}-git-cesar-sc`) && available_branches.find( (branch) => branch.includes((alias.alias.match(/sc-(\d+)/g) ?? [''])[0]), )}
            <div>
              <a class="link-hover link-primary link" href={`https://${alias.alias}`}
                >{available_branches
                  .find((branch) => branch.includes((alias.alias.match(/sc-(\d+)/g) ?? [''])[0]))
                  ?.split('cesar/')[1]}</a
              >
            </div>
          {/if}
        {/each}
      {/await}
    </div>
  </Container>
  <ScatterPlot {summaries} {stories} />
  <Treemap {summaries} title="Files In Focus" />
</div>
