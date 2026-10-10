<script lang="ts">
  import { loadDoc } from '$lib';
  import type { PageProps } from "./$types";
  let { params, data }: PageProps = $props();

  const docs = {
    'Quickstart Registration Guide': 'quickstart',
    'Website & Usage Requirements': 'requirements',
    'Schema & Structure Reference': 'references',
    'List of Supported Services': 'services',
    // 'Frequently Asked Questions': 'questions',
    // 'Domain Management Resources': 'learning',
    // 'Contact Support & Reporting': 'contacts',
  };
  let html = $state(data.html);
  let loading = $state(false);
  let firstRun = true;

  $effect(() => {
    params.doc;
    if (firstRun) {
      firstRun = false;
      return;
    }
    loading = true;
    loadDoc(`docs/${params.doc}.md`).then(doc => {
      html = doc;
      loading = false;
    });
  });
</script>


<div class="page-container {loading ? 'opacity-50' : ''}">
  <span class="font-bold">Docs Navigation:</span>
  <nav class="mb-4 flex flex-col ml-2">
    {#each Object.entries(docs) as [name, link]}
      <a href='/docs/{link}' class="{link === params.doc ? 'opacity-70' : 'opacity-100'} w-fit group">
        {link} <b class="hidden group-hover:inline"> - {name}</b>
      </a>
    {/each}
  </nav>
  <article>{@html html}</article>
</div>