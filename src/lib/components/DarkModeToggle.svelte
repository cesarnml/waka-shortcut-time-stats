<script lang="ts">
  import { afterUpdate, onMount } from 'svelte'
  import Moon from '$lib/assets/svg/Moon.svelte'
  import Sun from '$lib/assets/svg/Sun.svelte'
  import System from '$lib/assets/svg/System.svelte'

  const iconMap = {
    dark: Moon,
    light: Sun,
    system: System,
  }

  const Selection = {
    dark: 'dark',
    light: 'light',
    system: 'system',
  } as const

  let selection: keyof typeof Selection

  onMount(() => {
    selection = localStorage.colorTheme ?? Selection.system
  })

  afterUpdate(() => {
    localStorage.colorTheme = selection
    if (selection === Selection.dark) {
      document.documentElement.setAttribute('data-theme', 'night')
    }
    if (selection === Selection.light) {
      document.documentElement.setAttribute('data-theme', 'synthwave')
    }
    if (selection === Selection.system) {
      document.documentElement.removeAttribute('data-theme')
    }
  })
</script>

<svelte:head>
  <script>
    if (localStorage.colorTheme === undefined) {
      localStorage.colorTheme = 'system'
    }
    if (localStorage.colorTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'night')
    }
    if (localStorage.colorTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'synthwave')
    }
    if (localStorage.colorTheme === 'system') {
      document.documentElement.removeAttribute('data-theme')
    }
  </script>
</svelte:head>

<div class="switch">
  {#each Object.values(Selection) as color}
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <label class:active={selection === color} tabindex={0}>
      <input type="radio" name="colorSelection" bind:group={selection} value={color} />
      <span><svelte:component this={iconMap[color]} /></span>
    </label>
  {/each}
</div>

<style lang="postcss">
  .switch {
    @apply flex h-10 select-none rounded-3xl border border-slate-400 p-1 text-sm;
  }
  input[type='radio'] {
    @apply hidden;
  }
  label {
    @apply h-full w-8 rounded-full text-neutral-300 transition-colors;
  }
  label:hover {
    @apply text-neutral-100;
  }
  label.active {
    @apply bg-zinc-700;
  }
  span {
    @apply grid h-full place-items-center;
  }
</style>
