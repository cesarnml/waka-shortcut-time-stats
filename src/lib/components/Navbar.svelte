<script>
  import DarkModeToggle from '$lib/components/DarkModeToggle.svelte'
</script>

<div class="sticky top-0 z-10 border-b-2 border-slate-300/10 backdrop-blur-md">
  <nav class="navbar mx-auto max-w-screen-2xl">
    <div class="navbar-start">
      <a class="btn-accent btn normal-case" href="/">CodingStats</a>
    </div>
    <div class="navbar-center" />
    <ul class="navbar-end flex gap-4">
      <li class="normal-case">
        <a class="link-hover link-primary link" href="/projects">Projects</a>
      </li>
      <li class="normal-case">
        <a class="link-hover link-primary link" href="/iterations">Iterations</a>
      </li>
      <li class="normal-case"><a class="link-hover link-primary link" href="/login">Login</a></li>
      <DarkModeToggle />
    </ul>
  </nav>
</div>
