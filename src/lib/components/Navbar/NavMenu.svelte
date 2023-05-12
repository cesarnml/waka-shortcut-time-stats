<script>
  import { dropdown } from '$lib/stores/dropdown'
</script>

{#if $dropdown}
  <button on:click={dropdown.close}>
    <iconify-icon icon="material-symbols:close-rounded" />
  </button>
{:else}
  <button on:click={dropdown.open}>
    <iconify-icon icon="ci:hamburger-md" />
  </button>
{/if}

<style lang="postcss">
  button {
    @apply flex items-center;
  }
  iconify-icon {
    @apply text-3xl text-primary;
  }
</style>
