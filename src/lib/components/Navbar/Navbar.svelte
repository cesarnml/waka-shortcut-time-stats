<script lang="ts">
  import { media } from '$lib/stores/media'
  import { dropdown } from '$lib/stores/dropdown'
  import NavLogo from './NavLogo.svelte'
  import NavEnd from './NavEnd.svelte'
  import NavDropdown from './NavDropdown.svelte'

  $: if ($media.sm) {
    dropdown.close()
  }
</script>

<div
  class="fixed top-0 z-10 flex w-full flex-col border-b-2 border-slate-300/10 backdrop-blur-md"
  class:dropdownVisible={$dropdown}
>
  <nav class="navbar mx-auto max-w-screen-2xl">
    <div class="navbar-start">
      <NavLogo>Coding Stats</NavLogo>
    </div>
    <div class="navbar-center" />
    <div class="navbar-end flex gap-4">
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
