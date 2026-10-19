<script lang="ts">
  import forkRequired from "$lib/assets/screenshots/fork-required.webp";
  import commitToBranch from "$lib/assets/screenshots/commit-to-branch.webp";
  import prPrompt from "$lib/assets/screenshots/pr-prompt.webp";
  
  import { constructURL } from "$lib";
  import { dev } from "$app/environment";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  let params = $derived($page.url.searchParams);
  let subdomain = $derived(params.get('subdomain') ?? '');
  let apex = $derived(params.get('apex') ?? '');
  let file = $derived(JSON.parse(params.get('file') ?? '{}'));
  
  let fullDomain = $derived(`${subdomain}.${apex}`);
  let nextURL = $derived(constructURL(subdomain, apex, file));
  let counter = $state(dev ? 0 : 5);
  let interval: ReturnType<typeof setInterval> | null = null;

  onMount(() => {
    if (dev) return;
    interval = setInterval(() => {
      if (counter >= 0) return counter -= 0.1;
      if (interval) clearInterval(interval);
      if (!dev) window.open(nextURL);
    }, 100);
  });
</script>

<div class="page-container">
  <h1 class="text-xl">Your subdomain <b>{fullDomain}</b> is ready for review!</h1>
  <p class="italic text-ctp-subtext0">
    {#if counter > 0}
      Opening GitHub in {Math.floor(counter)}s...
    {:else}
      Opening... <a href={nextURL} class="underline" target="_blank">not redirected?</a>
    {/if}
  </p>
  <div class="h-1 bg-ctp-surface0 my-4">
    <div class="h-full bg-ctp-lavender transition-all w-0" style="width: {counter/5*100}%"></div>
  </div>
  <p class="text-ctp-yellow">Note: Please make sure your website is up and complete, you must provide a live preview link within your pull request description.</p>
  <h2 class="text-lg mt-4">Next Steps:</h2>
  <ol class="list-decimal">
    <li>Commit the file with your prefilled records</li>
    <li><b class="text-ctp-red">Fill in the PR requirements checklist</b> and provide a website preview</li>
    <li>Open the Pull Request</li>
    <li>Wait for a maintainer to review and merge</li>
    <li>Wait for GitHub Actions to deploy your records</li>
    <li><b class="text-ctp-green">Your subdomain is live and ready to use!</b></li>
  </ol>
  <details class="my-4 p-4 bg-ctp-base rounded-lg border border-ctp-yellow">
    <summary class="text-lg font-bold">Ran into issues?</summary>
    <p class="mb-2">If you got the following page, it's normal. Just click to <a href="https://github.com/partofmyid/register/fork" class="underline">fork</a> the repository:</p>
    <div class="px-4 py-2 flex justify-center">
      <img class="rounded-lg" src={forkRequired} alt="fork required github error">
    </div>
    <hr class="my-4">
    <h2 class="text-lg font-bold">Can't create a PR?</h2>
    <p class="mb-2">Make sure you selected "<b>Create a new branch...</b>" in the commit dialogue:</p>
    <div class="px-4 py-2 flex justify-center">
      <img class="rounded-lg" src={commitToBranch} alt="github commit message dialogue">
    </div>
    <p class="mb-2">After that, you should see this box in your fork's README page:</p>
    <div class="px-4 py-2 flex justify-center">
      <img class="rounded-lg" src={prPrompt} alt="pull request suggestion message">
    </div>
  </details>
</div>