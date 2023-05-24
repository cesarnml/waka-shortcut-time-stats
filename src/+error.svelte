<script lang="ts">
  import { page } from '$app/stores'
  console.error($page.error)
</script>

<h1>First Error page</h1>
<pre>{JSON.stringify($page.error, null, 2)}</pre>
