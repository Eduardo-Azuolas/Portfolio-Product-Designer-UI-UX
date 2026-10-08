import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Plugin } from 'vite';
import { CASES } from './src/data/cases';
import { strings } from './src/i18n/strings';

const ORIGIN = 'https://www.eduardoazuolas.com.br';
const SUFFIX = strings.en.titleSuffix;

type Entry = { path: string; title: string; description: string; image?: string };

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

/** Search-snippet copy per case (about 150 characters), written for the result page, not the sheet. */
const CASE_DESCRIPTIONS: Record<string, string> = {
  pulse: 'Case study: redesigning a B2B finance analytics dashboard around decisions, not charts. Time to first action fell 35% and feature adoption rose 22%.',
  casado: 'Case study: a pickup-first ordering app for a home baker, with checkout that syncs the confirmed pickup time to both calendars.',
  investiq: 'Case study: an AI investing platform that brings a fragmented portfolio into one view, with onboarding that explains each money decision.',
  forge: 'Case study: a design system for a project-management app, built from tokens up to fix seven button variants and four input heights.',
  aether: 'Case study: onboarding for a Web3 wallet that lets new users rehearse their first transaction in a guided simulation before sending a real one.',
  reloop: 'Case study: a peer-to-peer secondhand fashion marketplace with a four-grade condition scale, so buyers and sellers stop guessing.',
};

const CASE_PAGES: Entry[] = CASES.map((c) => {
  const description = CASE_DESCRIPTIONS[c.id];
  if (!description) throw new Error(`prerender: no description for case "${c.id}"`);
  return { path: c.id, title: `${c.name} — ${SUFFIX}`, description, image: `og/${c.id}.png` };
});

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
  if (e.image) {
    html = setTag(html, /(<meta property="og:image" content=")[^"]*(")/, `${ORIGIN}/assets/${e.image}`);
    html = setTag(html, /(<meta property="og:image:alt" content=")[^"]*(")/, `${e.title}`);
  }
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
