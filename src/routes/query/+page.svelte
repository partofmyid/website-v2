<script lang="ts">
  import type { PageProps } from "./$types";
  
  let { form, data }: PageProps = $props();
  let query = $derived(form?.subdomain ?? '');
  let apexDomains = $derived(data.apexDomains);
  
  // svelte-ignore state_referenced_locally
  let input = $state(query);
  let loading = $state(true);

  $effect(() => {
    query; loading = true;
    for (const { apex } of apexDomains) if (query.endsWith(`.${apex}`)) query = query.slice(0, -apex.length - 1);
    
    Promise.all(apexDomains.map(async ({ apex }, i) => {
      const queryRes =  await fetch(`https://raw.githubusercontent.com/partofmyid/register/refs/heads/main/domains/${apex}/${query}.json`);
      if (queryRes.status !== 404) apexDomains[i].owner = await queryRes.json().then(json => json.owner.username);
      else apexDomains[i].owner = '';
    })).then(() => loading = false);
  });
</script>

<div class="page-container">
  <noscript><p>This page requires javascript!</p></noscript>
  <p>Please make sure your subdomain meets our <a href="/docs/references" class="underline">filename requirements</a></p>
  <form onsubmit={(e) => { e.preventDefault(); query = input }} class="w-full flex gap-2 my-1">
    <input type="text" bind:value={input} class="flex-1" placeholder="your-subdomain-query">
    <button type="submit" disabled={input === '' || input === query}>search</button>
  </form>
  {#if input !== query}<span>press enter to query</span>{/if}
  {#if loading}<span class="animate-pulse">loading...</span>{/if}
  {#if query}
    <ul>
      {#each apexDomains as {apex, owner}, i}
        <li class="{
          loading ? 'marker:text-ctp-subtext0' : (owner === '' ? 'marker:text-ctp-green' : 'marker:text-ctp-red')
        } list-disc mt-4 ml-8 pr-2 text-xl border-ctp-overlay0 {i ? 'border-t pt-4' : ''}">
          <div class="flex gap-2 justify-between items-center">
            <span><span class="text-ctp-subtext0">{query}</span>.{apex}</span>
            <div class="flex gap-2 items-center text-right">
              {#if !loading}
                {#if owner === ''}
                  <button class="bg-ctp-green text-ctp-crust px-2 text-base font-bold">
                    <a href="/record?{new URLSearchParams({ apex, subdomain: query })}">register</a>
                  </button>
                {:else}
                  <span class="text-ctp-red"><a class="underline" href="/record?{new URLSearchParams({
                      apex, subdomain: query,
                    })}">taken</a> by <a href="https://github.com/{owner}" class="underline">{owner}</a></span>
                  <img src="https://github.com/{owner}.png?size=32" alt="{owner}'s profile picture" class="h-8 aspect-square rounded-full outline-ctp-overlay0 outline">
                {/if}
              {/if}
            </div>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
  <article class="my-8">{@html data.announcements}</article>
</div>