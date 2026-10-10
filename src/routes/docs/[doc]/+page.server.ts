import { loadDoc } from '$lib';
import type { PageServerLoad } from './$types';

export const ssr = true;
export const load: PageServerLoad = async ({ params, fetch: fetchFn }) => {
  return {
    html: await loadDoc(`docs/${params.doc}.md`, { fetchFn }),
  };
};