<script lang="ts">
  import { goto } from '$app/navigation'
  import { Url } from '$lib/constants'
  import { dropdown } from '$lib/stores/dropdown'
</script>

<button
  class="btn-link btn p-0 text-lg font-bold normal-case no-underline"
  on:click={() => {
    dropdown.close()
    goto(Url.Home)
  }}
>
  <slot />
</button>

<style lang="postcss">
  .btn:hover {
    @apply text-secondary no-underline;
  }
</style>
