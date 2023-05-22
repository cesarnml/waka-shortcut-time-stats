<script lang="ts">
  import { dev } from '$app/environment'
  import { goto, invalidate } from '$app/navigation'
  import { page } from '$app/stores'
  import Footer from '$lib/components/Footer.svelte'
  import Navbar from '$lib/components/Navbar/Navbar.svelte'
  import PageTransition from '$lib/components/PageTransition.svelte'
  import { selectedRange } from '$lib/stores/selectedRange'
  import { inject } from '@vercel/analytics'
  import { onMount, setContext } from 'svelte'
  import 'tippy.js/animations/scale.css'
  import 'tippy.js/dist/tippy.css'
  import 'tippy.js/themes/light.css'
  import '../app.postcss'

  // Initiate Vercel analytics
  inject({ mode: dev ? 'development' : 'production', debug: false })

  export let data

  $: ({ pathname, session, supabase, profile } = data)

  $: {
    setContext('user', session?.user)
  }

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth')
      }
    })
    return () => subscription.unsubscribe()
  })

  $: if ($selectedRange && !profile) {
    const url = new URL(window.location.href)

    url.searchParams.set('range', $selectedRange)
    goto(url, { replaceState: true, keepFocus: true })
  }
</script>

<svelte:head>
  <meta name="description" content="Visualize your coding metrics!" />
  <link rel="canonical" href={$page.url.href} />
</svelte:head>

<main class="bg-[url('/assets/images/bg4.svg')]">
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
    background-size: cover;
  }
</style>
