<script lang="ts">
	// TODO: LOADING BAR on top of the screen based on dom isFileLoadingAllowed
	// TODO: prefill options for /records for popular services
  // TODO: regex checks on forum in /records
  // TODO: simplify and make things scalable for more record types with rules in /records

  import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.webp';
	import banner from '$lib/assets/banner.webp';
	import './layout.css';

	import '@fsegurai/marked-extended-alert/styles/alert.css';
	import '@fsegurai/marked-extended-alert/styles/alert-theme.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<script defer src="https://a.satr14.my.id/script.js" data-website-id="828b48bc-6242-44a9-9d3e-9ab7603411c2"></script>
	<title>part-of.my.id{page.url.pathname}</title>
	<meta name="description" content="your own personal id for your website - a free subdomain service">
	<meta name="theme-color" content="#b4befe">

	<!-- og tags: -->
	<meta property="og:title" content="part-of.my.id" />
  <meta property="og:description" content="your own personal id for your website - a free subdomain service" />
  <meta property="og:image" content={banner} />
  <meta property="og:url" content="https://part-of.my.id" />
  <meta property="og:type" content="website" />

  <!-- twitter tags: -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="part-of.my.id" />
  <meta name="twitter:description" content="your own personal id for your website - a free subdomain service" />
  <meta name="twitter:image" content={banner} />
</svelte:head>

<div class="min-h-full flex flex-col">
  <header class="max-w-3xl fixed top-0 left-0 right-0 flex justify-between px-4 pb-2 pt-1 mx-6 md:mx-auto text-lg rounded-b-lg border-b border-x border-ctp-overlay0 bg-ctp-crust z-10">
    <h1 class="font-bold text-ctp-lavender"><a href="/">part-of.my.id</a></h1>
    <nav class="flex gap-4">
      <a href="https://github.com/partofmyid/register">repo</a>
      <a href="/docs">docs</a>
      <a href="/query">query</a>
    </nav>
  </header>

  {let clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'}
  <div class="-z-10 fixed top-0 left-0 w-40 aspect-square animate-spin bg-ctp-mantle scale-300 md:scale-400 [animation-duration:25s]" style="clip-path: {clipPath}"></div>
  <div class="-z-10 fixed bottom-0 right-0 w-40 aspect-square animate-spin bg-ctp-mantle scale-300 md:scale-400 [animation-duration:25s]" style="clip-path: {clipPath}"></div>
  <div class="-z-10 fixed top-0 left-0 w-full h-full bg-size-[40px_40px] opacity-25 rotate-1" style="background-image: radial-gradient(white 1px, transparent 0);"></div>

  <main class="flex-1">
    {@render children()}
  </main>

  <footer class="border-t border-ctp-overlay0 py-4 bg-ctp-crust">
    <div class="max-w-3xl mx-auto px-6 flex justify-between gap-8">
      <p>Made in 🇮🇩 by <a class="underline" href="https://satr14.my.id">satr14</a></p>
      <div class="flex gap-6">
        <a href="mailto:support@part-of.my.id"><img src="https://cdn.simpleicons.org/protonmail/cdd6f4" alt="github" class="w-6 aspect-square"></a>
        <a href="https://github.com/partofmyid"><img src="https://cdn.simpleicons.org/github/cdd6f4" alt="github" class="w-6 aspect-square"></a>
      </div>
    </div>
  </footer>
</div>
