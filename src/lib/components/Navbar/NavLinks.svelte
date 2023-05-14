<script lang="ts">
  import { Url, getTopLevelLinks } from '$lib/constants'
  import NavLink from './NavLink.svelte'
</script>

<div class="flex gap-8">
  {#each Object.entries(getTopLevelLinks(Url)) as [route, url] (route)}
    <NavLink {url} {route} />
  {/each}
</div>
