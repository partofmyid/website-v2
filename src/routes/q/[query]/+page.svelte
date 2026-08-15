<script lang="ts">
  import { goto } from "$app/navigation";
  import type { PageProps } from "./$types";
  let { params }: PageProps = $props();

  let input = $derived(params.query);

</script>

<div class="page-container">
  <form onsubmit={(e) => { e.preventDefault(); goto(`/q/${input}`) }}>
    <input type="text" bind:value={input}>
    <button type="submit">search</button>
  </form>
  
</div>