<script lang="ts">
  import { page } from "$app/stores";

  function constructURL(subdomain: string, apex: string, records: any = {}) {
    return `https://github.com/partofmyid/register/new/main/domains/${apex}?${new URLSearchParams({
      filename: subdomain + '.json',
      value: JSON.stringify(records),
    })}`
  }
  
  let redirectURL = constructURL(
    $page.url.searchParams.get('subdomain') || '',
    $page.url.searchParams.get('apex') || '',
  );
</script>

<div class="page-container">
  
</div>