<script lang="ts">
  import { page } from '$app/stores'
  import CodingActivityChartByCategory from '$lib/components/CodingActivityChartByCategory.svelte'
  import CodingLanguagePieChart from '$lib/components/CodingLanguagePieChart.svelte'
  import CodingActivityLineChart from '$lib/components/CodingActivityLineChart.svelte'
  import CodingTreeMap from '$lib/components/CodingTreeMap.svelte'
  import BranchesVsTime from '$lib/components/BranchesVsTime.svelte'
  import dayjs from 'dayjs'
  import duration from 'dayjs/plugin/duration'
  import FilesTable from '$lib/components/FilesTable.svelte'

  dayjs.extend(duration)

  export let data
  let { summaries } = data

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

  const handleChange = async () => {
    loading = true
    const response = await fetch(
      `/api/wakatime/current/summaries/?range=${selectedRanged}&project=${$page.params.projectName}`,
    )
    summaries = await response.json()
    loading = false
  }
</script>

<div class="space-y-8 pt-8">
  <h1 class="text-3xl text-zinc-300">Project: {$page.params.projectName}</h1>
  <div class="flex justify-end gap-4">
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
  <div class="stats flex bg-chart-dark shadow-lg">
    <div class="stat shrink">
      <div class="stat-figure">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
          ><path
            class="text-primary"
            fill="currentColor"
            d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8z"
          /><path
            class="text-primary"
            fill="currentColor"
            d="M12.5 7H11v6l5.25 3.15l.75-1.23l-4.5-2.67z"
          /></svg
        >
      </div>
      <div class="stat-title text-sm">Total Hours</div>
      <div class="stat-value text-lg text-primary">
        {`${
          dayjs.duration(summaries.cumulative_total.seconds, 'seconds').days() * 24 +
          dayjs.duration(summaries.cumulative_total.seconds, 'seconds').hours()
        }h ${dayjs.duration(summaries.cumulative_total.seconds, 'seconds').minutes()}m`}
      </div>
    </div>
    <div class="stat">
      <div class="stat-figure">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
          ><path
            class="text-secondary"
            fill="currentColor"
            d="M6 20c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2s-2 .9-2 2v7c0 1.1.9 2 2 2zm10-5v3c0 1.1.9 2 2 2s2-.9 2-2v-3c0-1.1-.9-2-2-2s-2 .9-2 2zm-4 5c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2s-2 .9-2 2v12c0 1.1.9 2 2 2z"
          /></svg
        >
      </div>
      <div class="stat-title text-sm">Daily Average</div>
      <div class="stat-value text-lg text-secondary">
        {`${dayjs
          .duration(summaries.daily_average.seconds_including_other_language, 'seconds')
          .hours()}h ${dayjs
          .duration(summaries.daily_average.seconds_including_other_language, 'seconds')
          .minutes()}m`}
      </div>
    </div>
    <div class="stat">
      <div class="stat-figure">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
          ><path
            class="text-secondary"
            fill="currentColor"
            d="m8.825 12l1.475-1.475q.3-.3.3-.7t-.3-.7q-.3-.3-.713-.3t-.712.3L6.7 11.3q-.15.15-.213.325T6.425 12q0 .2.062.375t.213.325l2.175 2.175q.3.3.713.3t.712-.3q.3-.3.3-.7t-.3-.7L8.825 12Zm6.35 0L13.7 13.475q-.3.3-.3.7t.3.7q.3.3.713.3t.712-.3L17.3 12.7q.15-.15.213-.325t.062-.375q0-.2-.063-.375T17.3 11.3l-2.175-2.175q-.15-.15-.338-.225t-.375-.075q-.187 0-.375.075t-.337.225q-.3.3-.3.7t.3.7L15.175 12ZM5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21H5Zm0-2h14V5H5v14ZM5 5v14V5Z"
          /></svg
        >
      </div>
      <div class="stat-title text-sm">No Code Days</div>
      <div class="stat-value text-lg text-secondary">
        {summaries.daily_average.holidays} days
      </div>
    </div>
  </div>
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
    <CodingActivityLineChart {summaries} />
    <CodingActivityChartByCategory {summaries} />
    <CodingLanguagePieChart {summaries} />
    <BranchesVsTime {summaries} />
  </div>
  <CodingTreeMap {summaries} />
  <FilesTable {summaries} />
</div>
