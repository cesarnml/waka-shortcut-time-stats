<script lang="ts">
  export let data
  const { supabase } = data
  async function signInWithGitHub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: import.meta.env.PROD
          ? 'https://codingstats.vercel.app'
          : 'http://localhost:5173',
      },
    })
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="grid h-screen place-items-center">
  <button class="btn-primary btn" on:click={signInWithGitHub}>Sign in with GitHub</button>
</div>
