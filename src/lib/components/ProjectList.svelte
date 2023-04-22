<script lang="ts">
  import dayjs from 'dayjs'
  import duration from 'dayjs/plugin/duration'

  dayjs.extend(duration)

  export let projects: { name: string; value: number }[]
</script>

<div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
  {#each projects as project (project.name)}
    <a class="card glass" href={`/projects/${project.name}`}>
      <div class="card-body">
        <h2 class="card-title">
          {project.name}
        </h2>
        <div>
          <span
            >{dayjs.duration(project.value, 'seconds').days()
              ? `${dayjs.duration(project.value, 'seconds').days()}d`
              : ''}
          </span>
          <span
            >{dayjs.duration(project.value, 'seconds').hours()
              ? `${dayjs.duration(project.value, 'seconds').hours()}h`
              : ''}
          </span>
          <span
            >{dayjs.duration(project.value, 'seconds').minutes()
              ? `${dayjs.duration(project.value, 'seconds').minutes()}m`
              : ''}
          </span>
          <span
            >{dayjs.duration(project.value, 'seconds').seconds()
              ? `${dayjs.duration(project.value, 'seconds').seconds()}s
              `
              : ''}
          </span>
        </div>
      </div>
    </a>
  {/each}
</div>
