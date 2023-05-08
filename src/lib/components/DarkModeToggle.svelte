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

<style>
  .switch {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: max-content;
    position: relative;
    padding: 3px;
    border: 1px solid #333;
    border-radius: 100px;
    max-width: 100%;
    height: 40px;
    font-size: 0.875rem;
    -webkit-user-select: none;
    user-select: none;
  }
  input[type='radio'] {
    display: none;
  }
  label {
    height: 100%;
    width: 32px;
    border-radius: 50%;
  }
  label:hover {
    color: #fff;
  }
  label.active {
    background-color: #333;
  }
  span {
    display: grid;
    height: 100%;
    place-items: center;
  }
</style>
