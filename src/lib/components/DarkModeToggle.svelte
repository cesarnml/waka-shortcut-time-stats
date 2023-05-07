<script lang="ts">
  import Moon from '$lib/assets/svg/Moon.svelte'
  import Sun from '$lib/assets/svg/Sun.svelte'
  import System from '$lib/assets/svg/System.svelte'
  import { afterUpdate } from 'svelte'

  let active = 'dark'

  afterUpdate(() => {
    const html = document.getElementsByTagName('html')[0]
    if (active === 'dark') {
      html?.setAttribute('data-theme', 'night')
    }
    if (active === 'light') {
      html?.setAttribute('data-theme', 'synthwave')
    }
    if (active === 'system') {
      html?.removeAttribute('data-theme')
    }
  })
</script>

<div class="switch">
  <button class:active={active === 'dark'} on:click={() => (active = 'dark')}>
    <span><Moon /></span>
  </button>
  <button class:active={active === 'light'} on:click={() => (active = 'light')}>
    <span><Sun /></span>
  </button>
  <button class:active={active === 'system'} on:click={() => (active = 'system')}>
    <span><System /></span>
  </button>
</div>

<style>
  .switch {
    width: max-content;
    display: flex;
    align-items: center;
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

  button {
    height: 32px;
    width: 32px;
    border-radius: 50%;
  }
  button:hover {
    color: #fff;
  }

  button.active {
    background-color: #333;
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
