<script lang="ts">
  import { TOP_LEVEL_NAV_URLS, Url } from '$lib/constants'
  import { profile } from '$lib/stores/profile'
  import NavLink from './NavLink.svelte'
</script>

<div class="flex gap-8">
  {#each TOP_LEVEL_NAV_URLS as url}
    {#if $profile && url === Url.Login}
      <a href={Url.Account}>
        <img src={$profile.avatar_url} alt="avatar" width="46" height="46" class="rounded-full" />
      </a>
    {:else}
      <NavLink {url} label={url.split('/')[1]} />
    {/if}
  {/each}
</div>
