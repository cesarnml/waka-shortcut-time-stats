<script lang="ts">
  export let data
  const { supabase } = data
  async function signInWithGitHub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
    console.log('data:', data)
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="grid h-screen place-items-center">
  <button class="btn-primary btn" on:click={signInWithGitHub}>Sign in with GitHub</button>
</div>
