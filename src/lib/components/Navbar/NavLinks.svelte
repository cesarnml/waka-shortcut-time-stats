<script lang="ts">
  import { TOP_LEVEL_NAV_URLS, Url } from '$lib/constants'
  import { getContext } from 'svelte'
  import NavLink from './NavLink.svelte'
  $: user = getContext('user')
</script>

<div class="flex gap-8">
  {#each TOP_LEVEL_NAV_URLS as url}
    {#if user && url === Url.Login}
      <form method="POST" action="/account?/signout">
        <button>
          <img
            src={user?.user_metadata?.avatar_url}
            alt="avatar"
            width="46"
            height="46"
            class="rounded-full"
          />
        </button>
      </form>
    {:else}
      <NavLink {url} label={url.split('/')[1]} />
    {/if}
  {/each}
</div>
