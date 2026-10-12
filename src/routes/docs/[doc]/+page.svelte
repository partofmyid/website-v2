<script lang="ts">
  import type { PageProps } from "./$types";

  let { params, data }: PageProps = $props();
  let toc = $state(true);
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
  <details open class="mb-4 sticky top-14 border border-ctp-overlay0 rounded-lg px-4 py-2 bg-ctp-mantle">
    <summary class="cursor-pointer font-bold">Table of Contents:</summary>
    <ol>
      {#each data.toc as heading}
        <li class="text-ctp-lavender hover:underline cursor-pointer ml-0! {[
          'pl-8', 'pl-12', 'pl-16', 'pl-20', 'pl-24', 'pl-28'
        ][heading.level-1]}"><a href="#{heading.id}">{@html heading.text}</a></li>
      {/each}
    </ol>
  </details>
  <article>{@html data.html}</article>
</div>