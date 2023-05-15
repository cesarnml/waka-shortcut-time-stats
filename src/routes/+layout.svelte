<script lang="ts">
  import '../app.postcss'
  import { invalidate } from '$app/navigation'
  import { onMount } from 'svelte'
  import Navbar from '$lib/components/Navbar/Navbar.svelte'
  import { dev } from '$app/environment'
  import { inject } from '@vercel/analytics'
  import Footer from '$lib/components/Footer.svelte'
  import PageTransition from '$lib/components/PageTransition.svelte'
  import { selectedRange } from '$lib/stores/selectedRange'
  import { WakaApiRange, type KeyOf } from '$lib/constants'

  // Initiate Vercel analytics
  inject({ mode: dev ? 'development' : 'production', debug: false })

  export let data

  $: ({ supabase, session, pathname } = data)

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth')
      }
      const range = localStorage.getItem('range') as WakaApiRange[KeyOf<WakaApiRange>] | 'null'
      if (range !== 'null') {
        localStorage.setItem('range', $selectedRange ?? WakaApiRange.Last_7_Days_From_Yesterday)
        selectedRange.set(range)
      }

      return () =>
        localStorage.setItem('range', $selectedRange ?? WakaApiRange.Last_7_Days_From_Yesterday)
    })

    return () => data.subscription.unsubscribe()
  })
</script>

<main class="bg-[url('/bg4.svg')]">
  <Navbar />
  <div class="relative mx-auto min-h-screen max-w-screen-xl overflow-x-hidden pt-20">
    <PageTransition {pathname}>
      <slot />
    </PageTransition>
  </div>
  <div class="py-8">
    <Footer />
  </div>
</main>

<style lang="postcss">
  main {
    background-size: contain;
    background-position: top;
    object-fit: cover;
  }
</style>
