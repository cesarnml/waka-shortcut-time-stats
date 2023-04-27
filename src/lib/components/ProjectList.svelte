<script lang="ts">
  import dayjs from 'dayjs'
  import duration from 'dayjs/plugin/duration'

  dayjs.extend(duration)

  export let projects: { name: string; value: number }[]
</script>

<div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
  {#each projects as project (project.name)}
    <a class="card glass" href={`/projects/${project.name}`}>
      <div class="card-body flex flex-col p-4">
        <h2 class="card-title flex-grow">
          {project.name}
        </h2>
        <div>
          <span
            >{dayjs.duration(project.value, 'seconds').hours() +
            dayjs.duration(project.value, 'seconds').days() * 24
              ? `${
                  dayjs.duration(project.value, 'seconds').days() * 24 +
                  dayjs.duration(project.value, 'seconds').hours()
                }h`
              : ''}
          </span>
          <span
            >{dayjs.duration(project.value, 'seconds').minutes()
              ? `${dayjs.duration(project.value, 'seconds').minutes()}m`
              : ''}
          </span>
        </div>
      </div>
    </a>
  {/each}
</div>
