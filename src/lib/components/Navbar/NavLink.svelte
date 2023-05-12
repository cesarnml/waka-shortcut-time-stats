<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { dropdown } from '$lib/stores/dropdown'

  export let route: string
  export let url: string
  export let isLarge = false
</script>

<button
  class="btn-link btn text-lg normal-case no-underline"
  class:active={$page.url.pathname === url}
  class:text-lg={isLarge}
  class:text-base={!isLarge}
  on:click={() => {
    dropdown.close()
    goto(url)
  }}
  >{route}
</button>

<style lang="postcss">
  .active {
    @apply underline underline-offset-8;
  }
  button:hover {
    @apply text-secondary no-underline;
  }
</style>
