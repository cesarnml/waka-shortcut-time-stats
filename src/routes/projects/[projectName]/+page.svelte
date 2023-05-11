<script lang="ts">
  import { page } from '$app/stores'
  import StackedBarChart from '$lib/components/BarChart/StackedBarChart.svelte'
  import LanguagePieChart from '$lib/components/PieChart/LanguagePieChart.svelte'
  import CodingLineChart from '$lib/components/LineChart/CodingLineChart.svelte'
  import CodingTreeMap from '$lib/components/CodingTreeMap.svelte'
  import BranchesVsTime from '$lib/components/BranchesVsTime.svelte'
  import dayjs from 'dayjs'
  import duration from 'dayjs/plugin/duration'
  import FilesTable from '$lib/components/FilesTable.svelte'
  import DateRangeSelect from '$lib/components/DateRangeSelect.svelte'
  import CodeStatsPanel from '$lib/components/CodeStatsPanel.svelte'
  import WeekdaysBarChart from '$lib/components/BarChart/WeekdaysBarChart.svelte'
  import ScatterPlot from '$lib/components/ScatterPlot.svelte'
  import { WakaToShortcutApiRange } from '$lib/constants.js'
  import { DateFormat } from '$lib/helpers/timeHelpers.js'
  import ChartContainer from '$lib/components/ChartContainer.svelte'
  import ChartTitle from '$lib/components/ChartTitle.svelte'

  dayjs.extend(duration)

  export let data

  $: ({
    summaries,
    projectName,
    stories,
    lazy: { aliases },
  } = data)

  const onWakaRange = async (e: CustomEvent) => {
    const shortcutRange =
      WakaToShortcutApiRange[e.detail.selectedRange as keyof typeof WakaToShortcutApiRange]

    const responses = await Promise.all([
      fetch(
        `/api/wakatime/current/summaries/?range=${e.detail.selectedRange}&project=${$page.params.projectName}`,
      ),
      fetch(
        `/api/shortcut/search/stories?query=has:branch moved:${dayjs()
          .subtract(shortcutRange, 'd')
          .format(DateFormat.Query)}..*`,
      ),
    ])
    summaries = await responses[0].json()
    stories = await responses[1].json()
  }
</script>

<div class="space-y-4 px-2 md:px-4">
  <h1 class="font-mono uppercase text-primary-focus">{$page.params.projectName}</h1>
  <DateRangeSelect on:wakarange={onWakaRange} />
  <CodeStatsPanel {summaries} />
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
    <CodingLineChart {summaries} />
    <LanguagePieChart {summaries} />
    <WeekdaysBarChart {summaries} />
    <StackedBarChart {summaries} itemsType="categories" title="Coding Activity by Category" />
  </div>
  <BranchesVsTime {summaries} />
  <ScatterPlot {summaries} {stories} />
  <CodingTreeMap {summaries} />
  <ChartContainer>
    <ChartTitle>Preview Branch Deploy</ChartTitle>
    <div class="grid grid-cols-1 gap-2 px-6 pb-6 lg:grid-cols-2">
      {#await aliases}
        <div>Loading ...</div>
      {:then result}
        {#each result.aliases as alias}
          {#if alias.alias.includes(`${projectName}-git-cesar-sc`) && summaries.available_branches.find( (branch) => branch.includes((alias.alias.match(/sc-(\d+)/g) ?? [''])[0]), )}
            <div>
              <a class="link-hover link-primary link" href={`https://${alias.alias}`}
                >{summaries.available_branches
                  .find((branch) => branch.includes((alias.alias.match(/sc-(\d+)/g) ?? [''])[0]))
                  ?.split('cesar/')[1]}</a
              >
            </div>
          {/if}
        {/each}
      {/await}
    </div>
  </ChartContainer>
</div>
