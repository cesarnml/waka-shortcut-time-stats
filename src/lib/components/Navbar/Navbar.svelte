<script lang="ts">
  import { page } from '$app/stores'
  import { Url, getTopLevelUrl } from '$lib/constants'
</script>

<div class="sticky top-0 z-10 border-b-2 border-slate-300/10 backdrop-blur-md">
  <nav class="navbar mx-auto max-w-screen-2xl">
    <div class="navbar-start">
      <a
        class="btn-link btn font-bold normal-case no-underline"
        href={Url.Home}
        class:active={$page.url.pathname === Url.Home}>CodingStats</a
      >
    </div>
    <div class="navbar-center" />
    <div class="navbar-end flex gap-4">
      {#each Object.entries(getTopLevelUrl(Url)) as [route, url] (route)}
        <a
          class="btn-link btn normal-case no-underline"
          class:active={$page.url.pathname === url}
          href={url}>{route}</a
        >
      {/each}
    </div>
  </nav>
</div>

<style lang="postcss">
  .active {
    @apply text-secondary-focus;
  }

  a:hover {
    @apply text-secondary no-underline;
  }
</style>
