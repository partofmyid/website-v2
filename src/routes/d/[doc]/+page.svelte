<script lang="ts">
  import { loadDoc } from '$lib';
  import type { PageProps } from "./$types";
  let { params }: PageProps = $props();

  const docs = {
    'Quickstart Registration Guide': 'quickstart',
    'Website & Usage Requirements': 'requirements',
    'Schema & Structure Reference': 'references',
    // 'Frequently Asked Questions': 'questions',
    // 'Domain Management Resources': 'learning',
    // 'Contact Support & Reporting': 'contacts',
  };
  let html = $state('Loading...');

  $effect(() => {
    html = 'Loading...'
    loadDoc(`docs/${params.doc}.md`).then(doc => html = doc)
  });
</script>


<div class="page-container">
  <span class="font-bold">Docs Navigation:</span>
  <nav class="mb-4 flex flex-col ml-2">
    {#each Object.entries(docs) as [name, link]}
      <a href='/d/{link}' class="{link === params.doc ? 'opacity-70' : 'opacity-100'} w-fit group">
        {link}.md <b class="{link === params.doc ? 'inline' : 'hidden'} group-hover:inline"> - {name}</b>
      </a>
    {/each}
  </nav>
  <article class="
    prose-headings:text-ctp-lavender
    prose-code:text-ctp-subtext0
    prose-pre:bg-ctp-base
    
    prose-p:text-ctp-text
    prose-a:text-ctp-text
    prose-li:text-ctp-text
    prose-strong:text-ctp-text
    
    prose max-w-none">{@html html}</article>
</div>