<script lang="ts">
  import '../app.postcss'

  import Navbar from '$lib/components/Navbar/Navbar.svelte'
  import { dev } from '$app/environment'
  import { inject } from '@vercel/analytics'
  import Footer from '$lib/components/Footer.svelte'
  import PageTransition from '$lib/components/PageTransition.svelte'
  import { page } from '$app/stores'
  import 'tippy.js/dist/tippy.css'
  import 'tippy.js/themes/light.css'
  import 'tippy.js/animations/scale.css'
  import { setContext } from 'svelte'

  // Initiate Vercel analytics
  inject({ mode: dev ? 'development' : 'production', debug: false })

  export let data

  $: ({ pathname, session, supabase } = data)

  $: {
    setContext('user', session?.user)
    setContext('supabase', supabase.auth)
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
