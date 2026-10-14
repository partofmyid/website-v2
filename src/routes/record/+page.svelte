<!-- TODO: prefill for popular services -->

<script lang="ts">
  import { ARRAY_RECORDS, getSubdomain, type DomainFile, type ArrayRecordType } from "$lib";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  function constructURL(subdomain: string, apex: string, records: any = {}) {
    return `https://github.com/partofmyid/register/new/main/domains/${apex}?${new URLSearchParams({
      filename: subdomain + '.json',
      value: JSON.stringify(records, null, 2),
    })}`;
  }

  function addRecord(type: ArrayRecordType) {
    if (!draft.records[type]) draft.records[type] = [];
    draft.records[type]!.push('');
  }

  let disabled = $state(false);
  let showCNAME = $state(false);
  let showREDIRECT = $state(false);
  let previewUsername = $state('');
  let subdomain = $derived($page.url.searchParams.get('subdomain') ?? '');
  let apex = $derived($page.url.searchParams.get('apex') ?? '');
  let info: Awaited<ReturnType<typeof getSubdomain>> | null = $state(null);
  let draft: DomainFile = $state({ owner: { username: '' }, records: {} });
  let atLeastOneRecord = $derived(!ARRAY_RECORDS.some((type) => (draft.records[type]?.length ?? 0) > 0) && !showCNAME && !showREDIRECT);
  let hasAorAAAA = $derived((draft.records.A?.length ?? 0) > 0 || (draft.records.AAAA?.length ?? 0) > 0);
  let hasAorAAAAorCNAME = $derived(hasAorAAAA || showCNAME);
  let hasMXorTXT = $derived((draft.records.MX?.length ?? 0) > 0 || (draft.records.TXT?.length ?? 0) > 0);

  function openRedirect() {
    goto(`/success?${new URLSearchParams({
      next: constructURL(subdomain, apex, draft),
      full: `${subdomain}.${apex}`,
    })}`);
  }

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
        <br>
        <span class="text-ctp-red">(taken, read only)</span>
        <a href="https://{subdomain}.{apex}" class="underline text-ctp-sapphire">visit</a>
        <a href="https://github.com/partofmyid/register/blob/main/domains/{apex}/{subdomain}.json" class="underline text-ctp-sapphire">file</a>
      {/if}
    </p>
  {:else if info?.available}
    <p class="text-ctp-green">Subdomain is available!</p>
  {:else}
    <p class="animate-pulse text-ctp-subtext0">Loading...</p>
  {/if}
  <form class="flex flex-col gap-4 my-4" onsubmit={(e) => { e.preventDefault(); openRedirect(); }}>
    <div class="flex flex-wrap gap-2">
      {#if previewUsername}
        <a href="https://github.com/{previewUsername}" target="_blank">
          <img src="https://github.com/{previewUsername}.png?size=32" alt=""
            class="h-10 aspect-square outline-ctp-overlay0 outline inline">
        </a>
      {/if}
      <input type="text" bind:value={draft.owner.username} onblur={() => previewUsername = draft.owner.username} placeholder="GitHub Username" class="inline" required {disabled}>
      <input type="text" bind:value={draft.description} placeholder="(Optional) Subdomain Description" class="flex-1 inline" {disabled}>
    </div>
    <hr class="my-4">
    <label class="font-mono">
      <input type="checkbox" bind:checked={draft.proxied} disabled={disabled || showREDIRECT || (draft.proxied && showCNAME && hasMXorTXT)}>
      <img src="https://cdn.simpleicons.org/cloudflare/fab387" alt="Orange Clouding" class="inline h-6 {draft.proxied ? "" : "grayscale"}">
      {draft.proxied ? "Proxied" : "DNS only"}
    </label>
    {#if !disabled}
      <div class="flex flex-wrap gap-2 items-center">
        {#each ARRAY_RECORDS as type}
          <button class="bg-ctp-surface0 disabled:hover:bg-ctp-surface0 hover:bg-ctp-green hover:text-ctp-crust py-1 px-2 font-mono"
            onclick={(e) => { e.preventDefault(); addRecord(type) }} disabled={(type === 'A' || type === 'AAAA') ? (showCNAME || showREDIRECT) : (showCNAME && !draft.proxied)}>{type}</button>
        {/each}
        <button class="bg-ctp-surface0 disabled:hover:bg-ctp-surface0 hover:bg-ctp-green hover:text-ctp-crust py-1 px-2 font-mono"
          onclick={(e) => { e.preventDefault(); showCNAME = true; }} disabled={showCNAME || showREDIRECT || hasAorAAAA || (hasMXorTXT && !draft.proxied)}>CNAME</button>
        <button class="bg-ctp-surface0 disabled:hover:bg-ctp-surface0 hover:bg-ctp-green hover:text-ctp-crust py-1 px-2 font-mono"
          onclick={(e) => { e.preventDefault(); showREDIRECT = true; }} disabled={!draft.proxied || hasAorAAAAorCNAME || showREDIRECT}>REDIRECT</button>
      </div>
    {/if}
    <table>
      <thead><tr><th>Type</th><th>Value</th></tr></thead>
      <tbody>
      {#if showREDIRECT}
        <tr>
          <td class="text-xl font-semibold text-center font-mono!">REDIRECT</td>
          <td class="flex gap-2">
            <input required type="text" {disabled} bind:value={draft.records.REDIRECT} placeholder="REDIRECT Record" class="border-0! inline flex-1">
            {#if !disabled}
              <button class="bg-ctp-surface0 text-ctp-red hover:bg-ctp-red hover:text-ctp-crust py-1 px-2"
                onclick={(e) => { e.preventDefault(); draft.records.REDIRECT = ""; showREDIRECT = false; }}>-</button>
            {/if}
          </td>
        </tr>
      {/if}
      {#if showCNAME}
        <tr>
          <td class="text-xl font-semibold text-center font-mono!">CNAME</td>
          <td class="flex gap-2">
            <input required type="text" {disabled} bind:value={draft.records.CNAME} placeholder="CNAME Record" class="border-0! inline flex-1">
            {#if !disabled}
              <button class="bg-ctp-surface0 text-ctp-red hover:bg-ctp-red hover:text-ctp-crust py-1 px-2"
                onclick={(e) => { e.preventDefault(); draft.records.CNAME = ""; showCNAME = false; }}>-</button>
            {/if}
          </td>
        </tr>
      {/if}
      {#each ARRAY_RECORDS as type}
        {#each draft.records[type] ?? [] as _, i}
          <tr>
            <td class="text-xl font-semibold text-center font-mono!">{type}</td>
            <td class="flex gap-2">
              <input required type="text" {disabled} bind:value={draft.records[type]![i]} placeholder="{type} Record #{i+1}" class="border-0! inline flex-1">
              {#if !disabled}
                <button class="bg-ctp-surface0 text-ctp-red hover:bg-ctp-red hover:text-ctp-crust py-1 px-2"
                  onclick={(e) => { e.preventDefault(); draft.records[type]?.splice(i,1) }}>-</button>
              {/if}
            </td>
          </tr>
        {/each}
      {/each}
      </tbody>
    </table>
    {#if !disabled && atLeastOneRecord}
      <div class="bg-ctp-surface0 w-full border-ctp-red border p-4 flex justify-center">
        <span class="font-bold">Please add at least one populated record to register your subdomain.</span>
      </div>
    {/if}
    {#if !disabled}
      <p class="text-ctp-subtext0 italic">Note: Please check the <a href="/docs/references" class="underline">documentation</a> for record limitations.</p>
      <hr class="my-4">
      <div>
        <button type="submit" disabled={atLeastOneRecord}>Register Subdomain</button>
        <button class="bg-ctp-surface0 py-2 px-4 italic"><a href={constructURL(subdomain, apex)}>Manual Registration</a></button>
      </div>
      <p class="text-ctp-subtext1">You will be taken to GitHub to commit the file and open a PR.</p>
    {/if}
  </form>
</div>