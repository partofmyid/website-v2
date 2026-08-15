import { marked } from "marked";
import markedExtendedAlert from '@fsegurai/marked-extended-alert';

marked.use(markedExtendedAlert());

export async function loadDoc(doc: string, announcementsOnly = false) {
  if (!doc) return 'No document specified.';
  const markdown = await fetch(`https://raw.githubusercontent.com/partofmyid/register/refs/heads/main/${doc}`)
    .then(res => res.text());
  return await marked.parse(announcementsOnly ? markdown.split('<!-- ANNOUNCEMENTS_START -->')[1] : markdown);
}