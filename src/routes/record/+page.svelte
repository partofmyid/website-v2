<script lang="ts">
  import { page } from "$app/stores";
  import { getSubdomain, type DomainFile } from "$lib";
  import { onMount } from "svelte";

  function constructURL(subdomain: string, apex: string, records: any = {}) {
    return `https://github.com/partofmyid/register/new/main/domains/${apex}?${new URLSearchParams({
      filename: subdomain + '.json',
      value: JSON.stringify(records),
    })}`
  }

  let subdomain = $derived($page.url.searchParams.get('subdomain') ?? '');
  let apex = $derived($page.url.searchParams.get('apex') ?? '');
  let redirectURL = $derived(constructURL(subdomain, apex));
  let info: Awaited<ReturnType<typeof getSubdomain>> | null = $state(null);
  let draft: DomainFile = $state({ owner: { username: '' }, records: {} });

  onMount(async () => {
    info = await getSubdomain(subdomain, apex);
    if (info?.data) draft = { ...info.data };
  });
</script>

<div class="page-container">
  <h2 class="text-xl"><b>{subdomain}</b>.<i>{apex}</i></h2>
  {#if !info?.available && info?.data}
    <p>
      - {info.data.owner.username}
      <img src="https://github.com/{info.data.owner.username}.png?size=32"
        alt="{info.data.owner.username}'s profile picture"
        class="h-6 aspect-square rounded-full outline-ctp-overlay0 outline inline">
    </p>
  {:else if info?.available}
    <p class="text-ctp-green">Subdomain is available!</p>
  {:else}
    <p class="animate-pulse text-ctp-subtext0">Loading...</p>
  {/if}
  <form class="flex flex-col gap-2 my-4">
    <input type="text" bind:value={draft.description} placeholder="Description" class="w-full">
    <label>
      <input type="checkbox" bind:checked={draft.proxied}>
      <img src="https://cdn.simpleicons.org/cloudflare/fab387" alt="Orange Clouding" class="inline h-6 {draft.proxied ? "" : "grayscale"}">
      {draft.proxied ? "Proxied" : "DNS only"}
    </label>

  </form>
</div>