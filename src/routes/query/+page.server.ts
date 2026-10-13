import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { loadDoc } from '$lib';

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    return { subdomain: form.get('subdomain')?.toString() ?? '' }
	}
} satisfies Actions;

export const load: PageServerLoad = async ({ fetch: fetchFn }) => {
  const availableApexes: string[] = await fetchFn(`https://raw.githubusercontent.com/partofmyid/register/refs/heads/main/scripts/apexdomains.json`).then(res => res.json());
  const apexDomains = availableApexes.map((apex: string) => ({ apex, owner: '' }))

  const { html } = await loadDoc('README.md', { announcementsOnly: true, fetchFn });
  return { apexDomains, announcements: html }
}