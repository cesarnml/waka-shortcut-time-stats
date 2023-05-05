<script lang="ts">
  import { hoursPerDay } from '$lib/helpers/timeHelpers'
  import dayjs from 'dayjs'
  import duration from 'dayjs/plugin/duration'

  dayjs.extend(duration)

  export let summaries: SummariesResult
  const dailyAverageSeconds = summaries.daily_average.seconds_including_other_language
  const cumulativeTotalSeconds = summaries.cumulative_total.seconds
</script>

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
        dayjs.duration(cumulativeTotalSeconds, 's').days() * hoursPerDay +
        dayjs.duration(cumulativeTotalSeconds, 's').hours()
      }h ${dayjs.duration(cumulativeTotalSeconds, 's').minutes()}m`}
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
      {`${dayjs.duration(dailyAverageSeconds, 's').hours()}h ${dayjs
        .duration(dailyAverageSeconds, 's')
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
