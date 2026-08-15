<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";
  import { loadDoc } from "$lib";
  let { params }: PageProps = $props();

  let announcements =  $state( 'Loading README...');
  let input = $derived(params.query);
  let apexDomains: {
    apex: string;
    availability?: boolean;
  }[] = $state([]);

  function removeApex() {
    for (const { apex } of apexDomains) {
      if (params.query.endsWith(`.${apex}`)) {
        goto(`/q/${params.query.slice(0, -apex.length - 1)}`);
      }
    }
  }
  
  $effect(removeApex);
  onMount(async () => {
    const availableApexes = await fetch(`https://raw.githubusercontent.com/partofmyid/register/refs/heads/main/scripts/apexdomains.json`).then(res => res.json());
    apexDomains = availableApexes.map((apex: string) => ({ apex }));
    removeApex();
    
    announcements = await loadDoc('README.md', true);
  });
</script>

<div class="page-container">
  <article>{@html announcements}</article>
  <form onsubmit={(e) => { e.preventDefault(); goto(`/q/${input}`) }}>
    <input type="text" bind:value={input}>
    <button type="submit">search</button>
  </form>
  <ul>
    {#each apexDomains as {apex, availability}}
      <li class="mt-4 pt-2 px-2 border-t border-ctp-overlay0 text-xl">
        {input}.{apex}
      </li>
    {/each}
  </ul>
</div>