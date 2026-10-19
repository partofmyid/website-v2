<script lang="ts">
  import type { PageProps } from "./$types";
  import { docs } from '$lib';

  let { params, data }: PageProps = $props();
  let article: HTMLElement;
  let active = $state('');

  $effect(() => {
    data;
    const headings = article.querySelectorAll('h1,h2,h3,h4,h5,h6');
    if (!headings.length) return;
    
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        active = entry.target.id; break;
      }
    }, { rootMargin: '0px 0px -80% 0px', threshold: 0 });
  
    headings.forEach(heading => observer.observe(heading));
    return () => observer.disconnect();
  });
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
  <details class="mb-4 sticky top-14 border border-ctp-overlay0 rounded-lg px-4 py-2 bg-ctp-mantle w-fit open:w-full">
    <summary class="cursor-pointer font-bold">Table of Contents:</summary>
    <ol>
      {#each data.toc as heading}
        <li class="flex items-stretch text-ctp-subtext0 hover:underline cursor-pointer ml-4! rounded-r-lg group {[
          '', 'text-ctp-lavender!', 'text-ctp-lavender! font-bold'
        ][heading.level] ?? ''} {active === heading.id ? 'bg-ctp-surface0' : ''}">
          {#each Array(heading.level) as _}<div class="w-0.5 mr-4 bg-ctp-overlay0 group-hover:bg-ctp-overlay2"></div>{/each}
          <a href="#{heading.id}" class="my-1">{@html heading.text}</a>
        </li>
      {/each}
    </ol>
  </details>
  <article bind:this={article}>{@html data.html}</article>
</div>