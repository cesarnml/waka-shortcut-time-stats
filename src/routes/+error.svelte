<script lang="ts">
  import { page } from '$app/stores'
  if (import.meta.env.DEV) {
    console.error('page:', $page.error?.stack)
  }
</script>

<h1>Second error page</h1>
<pre>{JSON.stringify($page.error?.stack, null, 2)}</pre>
