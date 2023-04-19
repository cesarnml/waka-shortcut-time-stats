<script lang="ts">
  import '../app.postcss'
  import '$lib/styles/supabase.postcss'

  import { invalidate } from '$app/navigation'
  import { onMount } from 'svelte'

  export let data

  $: ({ supabase, session } = data)

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth')
      }
    })

    return () => data.subscription.unsubscribe()
  })
</script>

<svelte:head>
  <title>User Management</title>
</svelte:head>

<div class="bg-slate-700">
  <div class="mx-auto max-w-screen-xl">
    <slot />
  </div>
</div>
