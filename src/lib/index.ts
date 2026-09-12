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
  };
  proxied?: boolean;
};

export async function loadDoc(doc: string, announcementsOnly = false) {
  if (!doc) return 'No document specified.';
  const markdown = await fetch(`https://raw.githubusercontent.com/partofmyid/register/refs/heads/main/${doc}`)
    .then(res => res.text());
  return await marked.parse(announcementsOnly ? markdown.split('<!-- ANNOUNCEMENTS_START -->')[1] : markdown);
}

export async function getSubdomain(subdomain: string, apex: string) {
  const response = await fetch(`https://raw.githubusercontent.com/partofmyid/register/refs/heads/main/domains/${apex}/${subdomain}.json`);
  const available = response.status === 404;

  return { available, data: available ? null : await response.json() as DomainFile };
}