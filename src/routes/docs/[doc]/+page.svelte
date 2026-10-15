<script lang="ts">
  import type { PageProps } from "./$types";

  let { params, data }: PageProps = $props();
  const docs = {
    'Quickstart Registration Guide': 'quickstart',
    'Terms of Service': 'terms',
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
  <details open class="mb-4 sticky top-14 border border-ctp-overlay0 rounded-lg px-4 py-2 bg-ctp-mantle w-fit open:w-full">
    <summary class="cursor-pointer font-bold">Table of Contents:</summary>
    <ol>
      {#each data.toc as heading}
        <li class="flex items-stretch text-ctp-subtext0 hover:underline cursor-pointer ml-4! group {[
          'text-ctp-lavender!', 'text-ctp-lavender! font-bold'
        ][heading.level-1] ?? ''}">
          {#each Array(heading.level-1) as _}<div class="w-0.5 mr-4 bg-ctp-surface0 group-hover:bg-ctp-surface2"></div>{/each}
          <a href="#{heading.id}" class="mt-1">{@html heading.text}</a>
        </li>
      {/each}
    </ol>
  </details>
  <article>{@html data.html}</article>
</div>