<script lang="ts">
  import { media } from '$lib/stores/media'
  import { dropdown } from '$lib/stores/dropdown'
  import NavLogo from './NavLogo.svelte'
  import NavEnd from './NavEnd.svelte'
  import NavDropdown from './NavDropdown.svelte'
  import NinjaSpinner from '../common/NinjaSpinner.svelte'
  import { navigating } from '$app/stores'
  import { fade } from 'svelte/transition'
  import { loading } from '$lib/stores/loading'

  $: if ($media.sm) {
    dropdown.close()
  }
</script>

<div
  class="fixed top-0 z-10 flex w-full flex-col border-b-2 border-slate-300/10 backdrop-blur-md"
  class:dropdownVisible={$dropdown}
>
  <nav class="navbar relative mx-auto max-w-screen-2xl px-2">
    <div class="navbar-start">
      <NavLogo>
        <img
          src="/assets/images/logo.png"
          class="relative h-full scale-[1.5] transition hover:scale-[1.7]"
          alt="logo"
        />
      </NavLogo>
    </div>
    <div class="navbar-center relative h-12" transition:fade>
      {#if $navigating || $loading}
        <NinjaSpinner />
      {/if}
    </div>
    <div class="navbar-end relative flex gap-4">
      <NavEnd />
    </div>
  </nav>
  <NavDropdown />
</div>

<style lang="postcss">
  .dropdownVisible {
    @apply h-screen backdrop-blur-lg;
  }
</style>
