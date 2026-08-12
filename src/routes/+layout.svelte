<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<script defer src="https://a.satr14.my.id/script.js" data-website-id="828b48bc-6242-44a9-9d3e-9ab7603411c2"></script>
</svelte:head>

<header class="max-w-3xl fixed top-0 left-0 right-0 flex justify-between px-4 pb-2 pt-1 mx-6 md:mx-auto text-lg rounded-b-lg border-b border-x border-ctp-overlay0 bg-ctp-crust">
  <h1 class="font-bold text-ctp-lavender"><a href="/">part-of.my.id</a></h1>
  <nav class="flex gap-4">
    <a href="https://github.com/partofmyid/register">repo</a>
    <a href="/d/quickstart">docs</a>
    <a href="/config">config</a>
  </nav>
</header>

<div class="-z-10 fixed top-0 left-0 w-full h-full bg-size-[40px_40px] opacity-25 rotate-1" style="background-image: radial-gradient(white 1px, transparent 0);"></div>

{@render children()}

<footer class="border-t border-ctp-overlay0 py-4 bg-ctp-crust">
  <div class="max-w-3xl mx-auto px-6 flex justify-between gap-8">
    <p>Made in 🇮🇩 by <a class="underline" href="https://satr14.my.id">satr14</a></p>
    <div class="flex gap-4">
      <!-- <a href=""><img src="https://cdn.simpleicons.org/discord/cdd6f4" alt="discord" class="w-6 aspect-square"></a> -->
      <a href="https://github.com/partofmyid"><img src="https://cdn.simpleicons.org/github/cdd6f4" alt="github" class="w-6 aspect-square"></a>
    </div>
  </div>
</footer>
