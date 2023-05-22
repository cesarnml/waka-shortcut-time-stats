<!-- src/routes/account/+page.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms'
  import { goto } from '$app/navigation'
  import { Url } from '$lib/constants'
  import Avatar from './Avatar.svelte'

  export let data
  export let form

  let { session, profile, supabase } = data

  let profileForm: HTMLFormElement
  let loading = false
  let name: string | null = profile?.name
  let email: string | null = profile?.email
  let avatarUrl: string | null = profile?.avatar_url

  function handleSubmit() {
    loading = true
    return async () => {
      loading = false
      goto(Url.Home, { replaceState: true })
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
      <label for="name">Name</label>
      <input class="input" id="name" name="name" type="text" value={name} />
    </div>

    <div>
      <label for="email">Email</label>
      <input class="input" id="email" type="email" value={email} />
    </div>

    <div>
      <label for="avatarUrl">avatarUrl</label>
      <input class="input" id="avatarUrl" name="avatarUrl" type="text" value={avatarUrl} />
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
      <button class="button block" type="submit" disabled={loading}>Sign Out</button>
    </div>
  </form>
</div>
