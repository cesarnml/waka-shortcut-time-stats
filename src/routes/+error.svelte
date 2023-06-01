<script lang="ts">
  import { page } from '$app/stores'
</script>

<h1>Oh snap!</h1>
{#if import.meta.env.DEV}
  <p class="prose">{JSON.stringify($page.error?.stack, null, 2)}</p>
{:else}
  <p>An error has occurred. I have spoken.</p>
{/if}
