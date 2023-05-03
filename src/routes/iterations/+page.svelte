<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData

  $: ({ iterations } = data)
</script>

<pre>{JSON.stringify(iterations, null, 2)}</pre>
