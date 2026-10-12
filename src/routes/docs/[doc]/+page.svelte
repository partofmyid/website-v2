<script lang="ts">
  import type { PageProps } from "./$types";
  let { params, data }: PageProps = $props();

  const docs = {
    'Quickstart Registration Guide': 'quickstart',
    'Website & Usage Requirements': 'requirements',
    'Schema & Structure Reference': 'references',
    'List of Supported Services': 'services',
    'Frequently Asked Questions': 'questions',
    // 'Domain Management Resources': 'learning',
    // 'Contact Support & Reporting': 'contacts',
  };
</script>


<div class="page-container">
  <span class="font-bold">Docs Navigation:</span>
  <nav class="mb-4 flex flex-col ml-2">
    {#each Object.entries(docs) as [name, link]}
      <a href='/docs/{link}' class="{link === params.doc ? 'opacity-70' : 'opacity-100'} w-fit group">
        {link} <b class="hidden group-hover:inline"> - {name}</b>
      </a>
    {/each}
  </nav>
  <article>{@html data.html}</article>
</div>