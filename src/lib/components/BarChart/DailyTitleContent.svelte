<script lang="ts">
  export let title: string
  export let date: string
</script>

<div class="flex px-4">
  <div class="flex-1" />
  <div>
    {title}
  </div>
  <div class="flex flex-1 items-center justify-end text-sm text-primary">
    {date}
  </div>
</div>
