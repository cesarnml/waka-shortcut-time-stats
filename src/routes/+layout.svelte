<script lang="ts">
  import '../app.postcss'
  import { invalidate } from '$app/navigation'
  import { onMount } from 'svelte'
  import Navbar from '$lib/components/Navbar.svelte'

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

<div class="bg-slate-950 p-4">
  <Navbar />
  <div class="mx-auto min-h-screen max-w-screen-xl">
    <slot />
  </div>
</div>
