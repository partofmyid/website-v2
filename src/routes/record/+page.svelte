<script lang="ts">
  import { ARRAY_RECORDS, getSubdomain, type DomainFile, type ArrayRecordType } from "$lib";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  function constructURL(subdomain: string, apex: string, records: any = {}) {
    return `https://github.com/partofmyid/register/new/main/domains/${apex}?${new URLSearchParams({
      filename: subdomain + '.json',
      value: JSON.stringify(records),
    })}`;
  }

  function addRecord(type: ArrayRecordType) {
    if (!draft.records[type]) draft.records[type] = [];
    draft.records[type]!.push('');
  }

  let subdomain = $derived($page.url.searchParams.get('subdomain') ?? '');
  let apex = $derived($page.url.searchParams.get('apex') ?? '');
  let redirectURL = $derived(constructURL(subdomain, apex));
  let info: Awaited<ReturnType<typeof getSubdomain>> | null = $state(null);
  let draft: DomainFile = $state({ owner: { username: '' }, records: {} });
  let hasOtherRecords = $derived(ARRAY_RECORDS.some((type) => (draft.records[type]?.length ?? 0) > 0));
  let disabled = $state(false);
  let showCNAME = $state(false);
  let previewUsername = $state('');

  onMount(async () => {
    info = await getSubdomain(subdomain, apex);
    if (info?.data) draft = { ...info.data };
    previewUsername = draft.owner.username;
    disabled = !info?.available;
    showCNAME = !!draft.records.CNAME;
  });
</script>

<div class="page-container">
  <h2 class="text-xl"><b>{subdomain}</b>.<i>{apex}</i></h2>
  {#if !info?.available && info?.data}
    <p>
      - <a href="https://github.com/{info.data.owner.username}" class="hover:underline">
        {info.data.owner.username}
        <img src="https://github.com/{previewUsername}.png?size=32"
          alt="{info.data.owner.username}'s profile picture"
          class="h-6 aspect-square rounded-full outline-ctp-overlay0 outline inline">
      </a>
      {#if disabled}
        <span class="text-ctp-red">taken, read only.</span>
      {/if}
    </p>
  {:else if info?.available}
    <p class="text-ctp-green">Subdomain is available!</p>
  {:else}
    <p class="animate-pulse text-ctp-subtext0">Loading...</p>
  {/if}
  <form class="flex flex-col gap-4 my-4" onsubmit={(e) => e.preventDefault()}>
    <div>
      {#if previewUsername}
        <img src="https://github.com/{previewUsername}.png?size=32" alt=""
          class="h-10 aspect-square outline-ctp-overlay0 outline inline">
      {/if}
      <input type="text" bind:value={draft.owner.username} onblur={() => previewUsername = draft.owner.username} placeholder="GitHub Username" class="w-[25%] inline" required {disabled}>
      <input type="text" bind:value={draft.description} placeholder="Subdomain Description" class="w-[65%] inline" {disabled}>
    </div>
    <hr>
    <label>
      <input type="checkbox" bind:checked={draft.proxied} disabled={disabled || (draft.proxied && showCNAME && hasOtherRecords)}>
      <img src="https://cdn.simpleicons.org/cloudflare/fab387" alt="Orange Clouding" class="inline h-6 {draft.proxied ? "" : "grayscale"}">
      {draft.proxied ? "Proxied" : "DNS only"}
    </label>
    {#if !disabled}
      <div class="flex gap-2 items-center">
        <b class="text-xl">Add Record:</b>
        {#each ARRAY_RECORDS as type}
          <button class="bg-ctp-surface0 hover:bg-ctp-green hover:text-ctp-crust py-1 px-2"
            onclick={(e) => { e.preventDefault(); addRecord(type) }} disabled={showCNAME && !draft.proxied}>{type}</button>
        {/each}
        <button class="bg-ctp-surface0 hover:bg-ctp-green hover:text-ctp-crust py-1 px-2"
          onclick={(e) => { e.preventDefault(); showCNAME = true; }} disabled={showCNAME || (hasOtherRecords && !draft.proxied)}>CNAME</button>
      </div>
    {/if}
    {#if showCNAME}
      <div class="flex items-center gap-2">
        <label class="text-xl font-semibold" for="CNAME">CNAME</label>
        <input required type="text" {disabled} bind:value={draft.records.CNAME} placeholder="CNAME Record" class="inline flex-1">
        {#if !disabled}
          <button class="bg-ctp-surface0 text-ctp-red hover:bg-ctp-red hover:text-ctp-crust py-1 px-2"
            onclick={(e) => { e.preventDefault(); draft.records.CNAME = ""; showCNAME = false; }}>Remove</button>
        {/if}
      </div>
    {/if}
    {#each ARRAY_RECORDS as type}
      {#each draft.records[type] ?? [] as _, i}
      <div class="flex items-center gap-2">
        <label class="text-xl font-semibold" for="CNAME">{type}#{i+1}</label>
          <input required type="text" {disabled} bind:value={draft.records[type]![i]} placeholder="{type} Record #{i+1}" class="inline flex-1">
          {#if !disabled}
            <button class="bg-ctp-surface0 text-ctp-red hover:bg-ctp-red hover:text-ctp-crust py-1 px-2"
              onclick={(e) => { e.preventDefault(); draft.records[type]?.splice(i,1) }}>Remove</button>
          {/if}
        </div>
      {/each}
    {/each}
  </form>
</div>