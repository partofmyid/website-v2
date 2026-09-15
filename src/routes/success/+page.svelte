<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  let fullDomain = $derived($page.url.searchParams.get('full') ?? '');
  let nextURL = $derived($page.url.searchParams.get('next') ?? '');
  let counter = $state(5);
  let interval: ReturnType<typeof setInterval> | null = null;

  onMount(() => {
    interval = setInterval(() => {
      if (counter >= 0) return counter -= 0.1;
      if (interval) clearInterval(interval);
      window.open(nextURL);
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
  <span>Next Steps:</span>
  <ol class="list-decimal">
    <li>Fork (and star) the repository (if you haven't already)</li>
    <li>Commit the file with your prefilled records</li>
    <li><b>Fill in the PR requirements checklist</b> and provide a website preview</li>
    <li>Open the Pull Request</li>
    <li>Wait for a maintainer to review and merge</li>
    <li>???</li>
    <li>Wait for GitHub Actions to deploy your records</li>
    <li><b>Your subdomain is live and ready to use!</b></li>
  </ol>
</div>