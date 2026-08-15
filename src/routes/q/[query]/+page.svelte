<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";
  import { loadDoc } from "$lib";
  let { params }: PageProps = $props();

  let announcements =  $state( 'Loading README...');
  let input = $derived(params.query);
  let loading = $state(true);
  let apexDomains: {
    apex: string;
    owner: string;
  }[] = $state([]);

  function removeApex() {
    for (const { apex } of apexDomains) {
      if (params.query.endsWith(`.${apex}`)) {
        goto(`/q/${params.query.slice(0, -apex.length - 1)}`);
      }
    }
  }

  async function checkAvailabilities() {
    await Promise.all(apexDomains.map(async ({ apex }, i) => {
      const queryRes =  await fetch(`https://raw.githubusercontent.com/partofmyid/register/refs/heads/main/domains/${apex}/${params.query}.json`);
      if (queryRes.status !== 404) apexDomains[i].owner = await queryRes.json().then(json => json.owner.username);
      else apexDomains[i].owner = '';
    }));
  }
  
  $effect(() => {
    params.query;
    loading = true;
    removeApex();
    checkAvailabilities().then(() => loading = false);
  });
  onMount(async () => {
    announcements = await loadDoc('README.md', true);
    
    const availableApexes: string[] = await fetch(`https://raw.githubusercontent.com/partofmyid/register/refs/heads/main/scripts/apexdomains.json`).then(res => res.json());
    apexDomains = availableApexes.map((apex: string) => ({ apex, owner: '' }));
    removeApex();
    await checkAvailabilities();
    
    loading = false;
  });
</script>

<div class="page-container">
  <span class="font-bold">README.md announcements:</span>
  <article>{@html announcements}</article>
  <p>Please make sure your subdomain meets our <a href="/d/references" class="underline">filename requirements</a></p>
  <form onsubmit={(e) => { e.preventDefault(); goto(`/q/${input}`) }} class="w-full flex gap-2 my-1">
    <input type="text" bind:value={input} class="flex-1">
    <button type="submit" disabled={input === '' || input === params.query}>search</button>
  </form>
  {#if input !== params.query}<span>press enter to query</span>{/if}
  {#if loading}<span class="animate-pulse">loading...</span>{/if}
  <ul>
    {#each apexDomains as {apex, owner}}
      <li class="{
        loading ? 'marker:text-ctp-subtext0' :
        (owner === ''
        ? 'marker:text-ctp-green'
        : 'marker:text-ctp-red')
      } list-disc mt-4 pt-2 ml-8 pr-2 border-t border-ctp-overlay0 text-xl">
        <div class="flex gap-2 justify-between items-center">
          <span><span class="text-ctp-subtext0">{params.query}</span>.{apex}</span>
          <div class="flex gap-2 items-center text-right">
            {#if !loading}
              {#if owner === ''}
                <button class="bg-ctp-green text-ctp-crust px-2 text-base font-bold">
                  <a href="https://github.com/partofmyid/register/new/main/domains/{apex}?{new URLSearchParams({
                    filename: params.query + '.json',
                    message: `[website] add ${params.query}.${apex}`,
                    file: '{}',
                  })}">register</a>
                </button>
              {:else}
                <span class="text-ctp-red">taken by <a href="https://github.com/{owner}" class="underline">{owner}</a></span>
                <img src="https://github.com/{owner}.png?size=32" alt="{owner}'s profile picture" class="h-8 aspect-square rounded-full outline-ctp-overlay0 outline">
              {/if}
            {/if}
          </div>
        </div>
      </li>
    {/each}
  </ul>
</div>