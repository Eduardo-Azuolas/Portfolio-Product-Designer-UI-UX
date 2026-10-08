import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Plugin } from 'vite';
import { CASES } from './src/data/cases';
import { strings } from './src/i18n/strings';

const ORIGIN = 'https://eduardoazuolas.com.br';
const SUFFIX = strings.en.titleSuffix;

type Entry = { path: string; title: string; description: string };

const label = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

const PAGES: Entry[] = [
  {
    path: 'about',
    title: `${label(strings.en.nav.about)} — ${SUFFIX}`,
    description:
      'Product Designer UX/UI based in São Paulo. Ten years designing physical and spatial products, now designing digital ones.',
  },
  {
    path: 'resume',
    title: `${label(strings.en.nav.resume)} — ${SUFFIX}`,
    description: 'Résumé of Eduardo Azuolas, Product Designer UX/UI: experience, skills, education and certifications.',
  },
  {
    path: 'contact',
    title: `${label(strings.en.nav.contact)} — ${SUFFIX}`,
    description: 'Get in touch with Eduardo Azuolas, Product Designer UX/UI, for roles, projects and collaboration.',
  },
];

const CASE_PAGES: Entry[] = CASES.map((c) => ({
  path: c.id,
  title: `${c.name} — ${SUFFIX}`,
  description: `${c.kind.en}. ${c.line.en}`,
}));

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Swap one `<meta>`/`<link>` tag's value; fail the build if the tag is missing. */
function setTag(html: string, tag: RegExp, value: string): string {
  if (!tag.test(html)) throw new Error(`prerender: tag not found in index.html: ${tag}`);
  return html.replace(tag, (_m, head: string, tail: string) => `${head}${escape(value)}${tail}`);
}

function render(template: string, e: Entry): string {
  const url = `${ORIGIN}/${e.path}/`;
  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escape(e.title)}</title>`);
  html = setTag(html, /(<meta name="description" content=")[^"]*(")/, e.description);
  html = setTag(html, /(<link rel="canonical" href=")[^"]*(")/, url);
  html = setTag(html, /(<meta property="og:title" content=")[^"]*(")/, e.title);
  html = setTag(html, /(<meta property="og:description" content=")[^"]*(")/, e.description);
  html = setTag(html, /(<meta property="og:url" content=")[^"]*(")/, url);
  return html;
}

/**
 * GitHub Pages has no SPA rewrite, so an unknown path answers 404 even when
 * the 404.html bounce renders the right page. A real file at <route>/index.html
 * answers 200 with the route's own title and description in the HTML a crawler
 * or link preview reads. The app still mounts client-side over it.
 */
export function prerender(): Plugin {
  let outDir = 'dist';
  return {
    name: 'prerender-routes',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    writeBundle() {
      const template = readFileSync(join(outDir, 'index.html'), 'utf8');
      for (const entry of [...CASE_PAGES, ...PAGES]) {
        const dir = join(outDir, entry.path);
        mkdirSync(dir, { recursive: true });
        writeFileSync(join(dir, 'index.html'), render(template, entry));
      }
    },
  };
}
