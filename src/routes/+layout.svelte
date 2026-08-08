<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<header class="max-w-3xl fixed top-0 left-0 right-0 flex justify-between px-4 pb-2 pt-1 mx-auto text-lg rounded-b-lg border-b border-x border-ctp-overlay0 bg-ctp-crust">
  <h1 class="font-bold text-ctp-lavender"><a href="/">part-of.my.id</a></h1>
  <nav class="flex gap-4">
    <a href="https://github.com/partofmyid/register">repo</a>
    <a href="/docs">docs</a>
    <a href="/config">config</a>
  </nav>
</header>

{@render children()}

<footer class="border-t border-ctp-overlay0 py-4 bg-ctp-crust">
  <div class="max-w-3xl mx-auto flex justify-between gap-8">
    <p>Made in 🇮🇩 by <a class="underline" href="https://satr14.my.id">satr14</a></p>
    <div class="flex gap-4">
      <!-- <a href=""><img src="https://cdn.simpleicons.org/discord/cdd6f4" alt="discord" class="w-6 aspect-square"></a> -->
      <a href="https://github.com/partofmyid"><img src="https://cdn.simpleicons.org/github/cdd6f4" alt="github" class="w-6 aspect-square"></a>
    </div>
  </div>
</footer>