import { marked } from "marked";
import markedExtendedAlert from '@fsegurai/marked-extended-alert';

marked.use(markedExtendedAlert());

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

export async function loadDoc(doc: string, { announcementsOnly = true, fetchFn }: {
  announcementsOnly?: boolean
  fetchFn?: typeof fetch
} = {}) {
  if (!doc) return 'No document specified.';
  const response = await (
    fetchFn ?? fetch
  )(`https://raw.githubusercontent.com/partofmyid/register/refs/heads/main/${doc}`);
  if (!response.ok) return `Document not found: ${doc}`;
  const markdown = await response.text();
  const content = announcementsOnly ? (markdown.split('<!-- ANNOUNCEMENTS_START -->')[1] ?? markdown) : markdown;
  return await marked.parse(content);
}

export async function getSubdomain(subdomain: string, apex: string) {
  const response = await fetch(`https://raw.githubusercontent.com/partofmyid/register/refs/heads/main/domains/${apex}/${subdomain}.json`);
  const available = response.status === 404;

  return { available, data: available ? null : await response.json() as DomainFile };
}