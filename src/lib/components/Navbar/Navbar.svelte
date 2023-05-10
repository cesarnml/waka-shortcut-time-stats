<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { Url, getNavDropdownUrls, getTopLevelUrl } from '$lib/constants'
  import { media } from '$lib/stores/media'
  import DarkModeToggle from '../DarkModeToggle.svelte'
  let showDropdownMenu = false

  $: if ($media.sm) {
    showDropdownMenu = false
  }
</script>

<div
  class="fixed top-0 z-10 w-full border-b-2 border-slate-300/10 backdrop-blur-md"
  class:showDropdown={showDropdownMenu}
>
  <nav class="navbar mx-auto max-w-screen-2xl">
    <div class="navbar-start">
      <button
        class="btn-link btn p-0 text-lg font-bold normal-case no-underline"
        on:click={() => {
          showDropdownMenu = false
          goto(Url.Home)
        }}>CodingStats</button
      >
    </div>
    <div class="navbar-center" />
    <div class="navbar-end flex gap-4">
      {#if $media.sm}
        {#each Object.entries(getTopLevelUrl(Url)) as [route, url] (route)}
          <a
            class="btn-link btn text-base normal-case no-underline"
            class:active={$page.url.pathname === url}
            href={url}>{route}</a
          >
        {/each}
      {:else if showDropdownMenu}
        <button on:click={() => (showDropdownMenu = false)} class="flex items-center">
          <iconify-icon class="text-3xl text-primary" icon="material-symbols:close-rounded" />
        </button>
      {:else}
        <button on:click={() => (showDropdownMenu = true)} class="flex items-center">
          <iconify-icon class="text-3xl text-primary" icon="ci:hamburger-md" />
        </button>
      {/if}
    </div>
  </nav>

  {#if showDropdownMenu}
    <div class="z-50 flex h-full flex-col items-center gap-8 py-16">
      {#each Object.entries(getNavDropdownUrls(Url)) as [route, url] (route)}
        <button
          class="btn-link btn text-lg normal-case no-underline"
          class:active={$page.url.pathname === url}
          on:click={() => {
            showDropdownMenu = false
            goto(url)
          }}>{route}</button
        >
      {/each}
      <div class="mb-12 mt-auto">
        <DarkModeToggle />
      </div>
    </div>
  {/if}
</div>

<style lang="postcss">
  .active {
    @apply underline underline-offset-8;
  }

  .btn:hover {
    @apply text-secondary no-underline;
  }
  a:hover {
    @apply text-secondary no-underline;
  }

  .showDropdown {
    @apply h-screen backdrop-blur-lg;
  }
</style>
