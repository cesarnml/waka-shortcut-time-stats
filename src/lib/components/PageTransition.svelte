<script lang="ts">
  import { blur } from 'svelte/transition'
  import { cubicInOut } from 'svelte/easing'

  export let pathname: string
  const duration = 150 // in ms
</script>

{#key pathname}
  <div
    in:blur={{ duration, delay: duration, easing: cubicInOut }}
    out:blur={{ duration, easing: cubicInOut }}
  >
    <slot />
  </div>
{/key}
