<script lang="ts">
  import { Url, getTopLevelLinks } from '$lib/constants'
  import NavLink from './NavLink.svelte'
</script>

<div class="flex gap-8">
  {#each Object.entries(getTopLevelLinks(Url)) as [label, url] (label)}
    <NavLink {url} {label} />
  {/each}
</div>
