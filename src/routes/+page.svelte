<script lang="ts">
  export let data
</script>

<svelte:head>
  <title>WakaStats</title>
</svelte:head>

<div class="row flex-center flex">
  <h2 class="text-4xl">Grand Total</h2>
  <pre>{JSON.stringify(data.allTimeSinceToday, null, 2)}</pre>
  <h2 class="text-4xl">Summaries</h2>
  <pre>{JSON.stringify(data.summaries, null, 2)}</pre>
</div>
