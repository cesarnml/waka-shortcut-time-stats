<script lang="ts">
  import { DateFormat } from '$lib/constants'
  import type { PageData } from './$types'
  import dayjs from 'dayjs'

  export let data: PageData

  const { iterations, lazy } = data
</script>

<div class="grid grid-cols-3 gap-4 py-4">
  {#each iterations as iteration (iteration.id)}
    <div class="card w-96 bg-base-100 p-4 shadow-xl">
      <div><a href={`/iterations/${iteration.id}`}>{iteration.name}</a></div>
      <div>
        <div>
          <span>{iteration.status}</span>
          <span>{dayjs(iteration.start_date).format(DateFormat.Long)}</span>
          <span> to </span>
          <span>{dayjs(iteration.end_date).format(DateFormat.Long)}</span>
        </div>
        <div>
          <span>
            {iteration.stats.num_stories_unstarted +
              iteration.stats.num_stories_started +
              iteration.stats.num_stories_done +
              iteration.stats.num_stories_backlog}
          </span>
          <span>
            {iteration.stats.num_points}
          </span>
          <span>
            {iteration.stats.num_related_documents}
          </span>
        </div>
      </div>
      <div>
        {#await lazy.iterationStoriesDict[iteration.id] then stories}
          {#each stories as story}
            <div>{story.name}</div>
          {/each}
        {/await}
      </div>
    </div>
  {/each}
</div>
