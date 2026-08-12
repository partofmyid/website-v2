<script lang="ts">
  import { marked } from 'marked';
  import { page } from '$app/state';
  import { onMount } from 'svelte';

  const docs = {
    'Quickstart Registration Guide': 'quickstart',
    'Website & Usage Requirements': 'requirements',
    'Schema & Structure Reference': 'references',
    // 'Frequently Asked Questions': 'questions',
    // 'Domain Management Resources': 'learning',
    // 'Contact Support & Reporting': 'contacts',
  };
  let html = $state('');

  async function loadDoc(doc?: string) {
    if (!doc) return 'Click a documentation page above to view.';
    const markdown = await fetch(`https://raw.githubusercontent.com/partofmyid/register/refs/heads/main/docs/${doc}.md`)
      .then(res => res.text());
    return await marked.parse(markdown);
  }

  $effect(() => {
    loadDoc(page.params.doc).then(doc => html = doc)
  });
</script>


<div class="w-3xl mx-auto mt-16 mb-6 px-8">
  <span class="font-bold">Docs Navigation:</span>
  <nav class="mb-4 flex flex-col ml-2">
    {#each Object.entries(docs) as [name, link]}
      <a href='/d/{link}' class="{link === page.params.doc ? 'opacity-70' : 'opacity-100'} w-fit group">
        {link} <b class="{link === page.params.doc ? 'inline' : 'hidden'} group-hover:inline">- {name}</b>
      </a>
    {/each}
  </nav>
  <article class="
    prose-headings:text-ctp-lavender
    prose-code:text-ctp-subtext0
    prose-pre:bg-ctp-base
    
    prose-p:text-ctp-text
    prose-li:text-ctp-text
    prose-strong:text-ctp-text
    
    prose max-w-none">{@html html}</article>
</div>