import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { loadDoc } from '$lib';

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    return {
      query: form.get('query')?.toString() ?? ''
    }
	}
} satisfies Actions;

export const load: PageServerLoad = async ({ fetch }) => {
  const availableApexes: string[] = await fetch(`https://raw.githubusercontent.com/partofmyid/register/refs/heads/main/scripts/apexdomains.json`).then(res => res.json());
  const apexDomains = availableApexes.map((apex: string) => ({ apex, owner: '' }))

  const { html } = await loadDoc('README.md', {
    announcementsOnly: true,
  });
  
  return { apexDomains, announcements: html }
}