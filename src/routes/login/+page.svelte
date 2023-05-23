<script lang="ts">
  import { page } from '$app/stores'

  export let data
  const { supabase } = data
  const signInWithGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${$page.url.origin}/login-redirect`,
      },
    })
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="grid h-screen place-items-center">
  <button class="btn-primary btn" type="button" on:click={signInWithGitHub}
    >Sign in with GitHub</button
  >
</div>
