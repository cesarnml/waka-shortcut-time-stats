<script lang="ts">
  import { hoursPerDay } from '$lib/helpers/timeHelpers'
  import dayjs from 'dayjs'
  import duration from 'dayjs/plugin/duration'
  import first from 'lodash/first'

  dayjs.extend(duration)

  export let summaries: SummariesResult
  export let projectList: { name: string; value: number }[]

  const averageSeconds = summaries.daily_average.seconds_including_other_language
  const totalSeconds = summaries.cumulative_total.seconds

  const languagesByDate = summaries.data.map((item) => item.languages)
  const languageToWeeklyCodingTime: Record<string, number> = {}

  languagesByDate.forEach((languages) => {
    languages.forEach((language) => {
      if (languageToWeeklyCodingTime[language.name] === undefined) {
        languageToWeeklyCodingTime[language.name] = language.total_seconds
      } else {
        languageToWeeklyCodingTime[language.name] += language.total_seconds
      }
    })
  })

  const topLanguage = Object.keys(languageToWeeklyCodingTime).reduce((a, b) =>
    languageToWeeklyCodingTime[a] > languageToWeeklyCodingTime[b] ? a : b,
  )
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
        dayjs.duration(totalSeconds, 's').days() * hoursPerDay +
        dayjs.duration(totalSeconds, 's').hours()
      }h ${dayjs.duration(totalSeconds, 's').minutes()}m`}
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
      {`${dayjs.duration(averageSeconds, 's').hours()}h ${dayjs
        .duration(averageSeconds, 's')
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
  <div class="stat">
    <div class="stat-figure">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        ><path
          class="text-secondary"
          fill="currentColor"
          d="M4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h5.175q.4 0 .763.15t.637.425L12 6h8q.825 0 1.413.588T22 8v10q0 .825-.588 1.413T20 20H4ZM4 6v12h16V8h-8.825l-2-2H4Zm0 0v12V6Z"
        /></svg
      >
    </div>
    <div class="stat-title text-sm">Top Project</div>
    <div class="stat-value text-lg text-secondary">
      {first(projectList)?.name}
    </div>
  </div>
  <div class="stat">
    <div class="stat-figure">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        ><path
          class="text-secondary"
          fill="currentColor"
          d="M12 22q-2.05 0-3.875-.788t-3.188-2.15q-1.362-1.362-2.15-3.187T2 12q0-2.075.788-3.888t2.15-3.174Q6.3 3.575 8.124 2.788T12 2q2.075 0 3.888.788t3.174 2.15q1.363 1.362 2.15 3.175T22 12q0 2.05-.788 3.875t-2.15 3.188q-1.362 1.362-3.175 2.15T12 22Zm0-2.05q.65-.9 1.125-1.875T13.9 16h-3.8q.3 1.1.775 2.075T12 19.95Zm-2.6-.4q-.45-.825-.788-1.713T8.05 16H5.1q.725 1.25 1.813 2.175T9.4 19.55Zm5.2 0q1.4-.45 2.488-1.375T18.9 16h-2.95q-.225.95-.562 1.838T14.6 19.55ZM4.25 14h3.4q-.075-.5-.113-.988T7.5 12q0-.525.038-1.012T7.65 10h-3.4q-.125.5-.188.988T4 12q0 .525.063 1.012T4.25 14Zm5.4 0h4.7q.075-.5.113-.988T14.5 12q0-.525-.038-1.012T14.35 10h-4.7q-.075.5-.113.988T9.5 12q0 .525.038 1.012T9.65 14Zm6.7 0h3.4q.125-.5.188-.988T20 12q0-.525-.063-1.012T19.75 10h-3.4q.075.5.113.988T16.5 12q0 .525-.038 1.012T16.35 14Zm-.4-6h2.95q-.725-1.25-1.812-2.175T14.6 4.45q.45.825.788 1.713T15.95 8ZM10.1 8h3.8q-.3-1.1-.775-2.075T12 4.05q-.65.9-1.125 1.875T10.1 8Zm-5 0h2.95q.225-.95.563-1.838T9.4 4.45Q8 4.9 6.912 5.825T5.1 8Z"
        /></svg
      >
    </div>
    <div class="stat-title text-sm">Top Language</div>
    <div class="stat-value text-lg text-secondary">
      {topLanguage}
    </div>
  </div>
</div>
