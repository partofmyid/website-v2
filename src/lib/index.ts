import { marked } from "marked";
import { getHeadingList, gfmHeadingId, type HeadingData } from "marked-gfm-heading-id";
import markedExtendedAlert from '@fsegurai/marked-extended-alert';

marked.use(
  markedExtendedAlert(),
  gfmHeadingId(),
);

export const docs = {
  // 'What Is This?': 'domains101',
  'Quickstart Guide': 'quickstart',
  'Terms of Service': 'terms',
  'Schema & Structure': 'references',
  'Supported Services': 'services',
  'Frequently Asked Questions': 'questions',
  // 'Domain Management Resources': 'learning',
  // 'Contact Support & Reporting': 'contacts',
};

export type DomainFile = {
  description?: string;
  owner: {
    username: string;
  };
  records: {
    A?: string[];
    AAAA?: string[];
    CNAME?: string;
    MX?: string[];
    TXT?: string[];
    REDIRECT?: string;
  };
  proxied?: boolean;
};

export const ARRAY_RECORDS = ['A', 'AAAA', 'MX', 'TXT'] as const;
export type ArrayRecordType = typeof ARRAY_RECORDS[number];

interface ToC extends HeadingData {
  numbering: string
}

export async function loadDoc(doc: string, { announcementsOnly = true, fetchFn }: {
  announcementsOnly?: boolean
  fetchFn?: typeof fetch
} = {}): Promise<{
  html: string;
  toc?: ToC[];
}> {
  if (!doc) return { html: 'No document specified.' };
  const response = await (
    fetchFn ?? fetch
  )(`https://raw.githubusercontent.com/partofmyid/register/refs/heads/main/${doc}`);
  if (!response.ok) return { html: `Document not found: ${doc}` };

  const counters: number[] = [];
  const markdown = await response.text();
  const content = announcementsOnly ? (markdown.split('<!-- ANNOUNCEMENTS_START -->')[1] ?? markdown) : markdown;

  const html = await marked.parse(content);
  const toc = getHeadingList().map(h => {
    const idx = h.level - 1;
    counters[idx] = (counters[idx] ?? 0) + 1;
    counters.length = idx + 1;
    return { ...h, numbering: counters.join('.') }
  });
  
  return { toc, html }
}

export function constructURL(subdomain: string, apex: string, records: DomainFile | {} = {}) {
  return `https://github.com/partofmyid/register/new/main/domains/${apex}?${new URLSearchParams({
    filename: subdomain + '.json',
    value: JSON.stringify(records, null, 2),
  })}`;
}

export async function getSubdomain(subdomain: string, apex: string) {
  const response = await fetch(`https://raw.githubusercontent.com/partofmyid/register/refs/heads/main/domains/${apex}/${subdomain}.json`);
  const available = response.status === 404;

  return { available, data: available ? null : await response.json() as DomainFile };
}