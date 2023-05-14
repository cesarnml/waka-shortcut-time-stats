<script>
  import { dropdown } from '$lib/stores/dropdown'
  import 'iconify-icon'
</script>

<div class="relative left-[12.5px]">
  {#if $dropdown}
    <button on:click={dropdown.close}>
      <iconify-icon icon="material-symbols:close-rounded" />
    </button>
  {:else}
    <button on:click={dropdown.open}>
      <iconify-icon icon="ci:hamburger-md" />
    </button>
  {/if}
</div>

<style lang="postcss">
  button {
    @apply flex items-center;
  }
  iconify-icon {
    @apply text-3xl text-primary;
  }
</style>
