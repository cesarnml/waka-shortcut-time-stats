<!-- src/routes/account/+page.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms'
  import { goto } from '$app/navigation'
  import Avatar from './Avatar.svelte'

  export let data
  export let form

  let { session, profile, supabase } = data

  let profileForm: any
  let loading = false
  let fullName: string | null = profile?.full_name
  let username: string | null = profile?.username
  let website: string | null = profile?.website
  let avatarUrl: string | null = profile?.avatar_url

  function handleSubmit() {
    loading = true
    return async () => {
      loading = false
      goto('/', { replaceState: true })
    }
  }
</script>

<div class="form-widget">
  <form
    class="form-widget"
    method="post"
    action="?/update"
    use:enhance={handleSubmit}
    bind:this={profileForm}
  >
    <Avatar
      {supabase}
      bind:url={avatarUrl}
      size={10}
      on:upload={() => {
        profileForm.requestSubmit()
      }}
    />
    <div>
      <label for="email">Email</label>
      <input id="email" type="text" value={session.user.email} disabled />
    </div>

    <div>
      <label for="fullName">Full Name</label>
      <input id="fullName" name="fullName" type="text" value={form?.fullName ?? fullName} />
    </div>

    <div>
      <label for="username">Username</label>
      <input id="username" name="username" type="text" value={form?.username ?? username} />
    </div>

    <div>
      <label for="website">Website</label>
      <input id="website" name="website" type="url" value={form?.website ?? website} />
    </div>

    <div>
      <input
        type="submit"
        class="button primary block"
        value={loading ? 'Loading...' : 'Update'}
        disabled={loading}
      />
    </div>
  </form>

  <form method="post" action="?/signout" use:enhance={handleSubmit}>
    <div>
      <button class="button block" disabled={loading}>Sign Out</button>
    </div>
  </form>
</div>
