<script lang="ts">
  import DarkModeToggle from '$lib/components/DarkModeToggle.svelte'
  import { DROPDOWN_NAV_URLS } from '$lib/constants'
  import { dropdown } from '$lib/stores/dropdown'
  import NavLink from './NavLink.svelte'
</script>

{#if $dropdown}
  <div class="z-50 flex h-full flex-col items-center gap-8 pt-16">
    {#each DROPDOWN_NAV_URLS as url}
      <NavLink {url} label={url.split('/')[1] || 'Home'} isLarge />
    {/each}
    <div class="mb-12 mt-auto">
      <DarkModeToggle />
    </div>
  </div>
{/if}
