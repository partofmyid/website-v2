<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<header class="max-w-3xl fixed top-0 left-0 right-0 flex justify-between px-4 pb-2 pt-1 mx-auto text-lg rounded-b-lg border-b border-x border-ctp-overlay0 bg-ctp-crust">
  <h1 class="font-bold"><a href="/">part-of.my.id</a></h1>
  <nav class="flex gap-4">
    <a href="https://github.com/partofmyid/register">repo</a>
    <a href="/docs">docs</a>
    <a href="/config">config</a>
  </nav>
</header>

{@render children()}
