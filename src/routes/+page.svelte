<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { Auth } from '@supabase/auth-ui-svelte'
  import { ThemeSupa } from '@supabase/auth-ui-shared'
  import type { PageData } from './$types'
  import { page } from '$app/stores'

  export let data: PageData
</script>

<svelte:head>
  <title>User Management</title>
</svelte:head>

<div class="row flex-center flex">
  <div class="col-6 form-widget">
    <Auth
      supabaseClient={data.supabase}
      view="magic_link"
      redirectTo={`${$page.url}logging-in?redirect=/`}
      showLinks={false}
      appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
    />
  </div>
</div>
