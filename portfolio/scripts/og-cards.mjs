/**
 * Renders one 1200x630 link-preview card per case into public/assets/og/<id>.png.
 *
 * Run by hand when a case or its thumbnail changes: `npm run og`. The PNGs are
 * committed, so the build and CI never need a browser.
 * Runs on Node 22.18+ because it imports the typed case data directly.
 * Needs Playwright's headless shell (`npx playwright install chromium-headless-shell`),
 * or Chrome/Edge with no browser window already open.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { CASES } from '../src/data/cases.ts';

const ROOT = resolve(import.meta.dirname, '..');
const OUT = join(ROOT, 'public/assets/og');

/**
 * Playwright's headless shell is preferred: Chrome and Edge hand a headless
 * launch to an already-running window and exit without writing a PNG.
 */
function findHeadlessShell() {
  const roots = [
    process.env.PLAYWRIGHT_BROWSERS_PATH,
    process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, 'ms-playwright'),
    join(homedir(), '.cache/ms-playwright'),
    join(homedir(), 'Library/Caches/ms-playwright'),
  ].filter((r) => r && existsSync(r));
  for (const root of roots) {
    for (const dir of readdirSync(root).filter((d) => d.startsWith('chromium_headless_shell-'))) {
      for (const sub of readdirSync(join(root, dir))) {
        for (const exe of ['chrome-headless-shell.exe', 'chrome-headless-shell']) {
          const p = join(root, dir, sub, exe);
          if (existsSync(p)) return p;
        }
      }
    }
  }
}

const shell = process.env.CHROME_PATH ? undefined : findHeadlessShell();
const BROWSERS = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);
const browser = shell ?? BROWSERS.find((p) => existsSync(p));
if (!browser) throw new Error('og-cards: no headless Chromium, Chrome or Edge found; set CHROME_PATH');
const isShell = browser === shell;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

function card(c) {
  const thumb = pathToFileURL(join(ROOT, `public/assets/cases/${c.id}/en/thumb.webp`)).href;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;overflow:hidden;background:#080d13;color:#edf4fa;font-family:'Space Grotesk',sans-serif;position:relative}
.grid{position:absolute;inset:0;background-image:linear-gradient(#ffffff08 1px,transparent 1px),linear-gradient(90deg,#ffffff08 1px,transparent 1px);background-size:30px 30px}
.frame{position:absolute;inset:36px;border:1px solid #1d2733}
.copy{position:absolute;left:72px;top:72px;bottom:72px;width:500px;display:flex;flex-direction:column}
.mono{font-family:'IBM Plex Mono',monospace;letter-spacing:.14em;text-transform:uppercase}
.tag{font-size:19px;color:#3fd0ff}
h1{font-size:84px;line-height:1;font-weight:600;margin-top:28px;letter-spacing:-.02em}
.kind{font-size:15px;letter-spacing:.08em;color:#9fc2dc;margin-top:22px;line-height:1.5}
.line{font-size:25px;line-height:1.4;color:#bcd3e4;margin-top:26px;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
.foot{margin-top:auto;font-size:16px;color:#93a6b8}
.shot{position:absolute;left:640px;top:96px;width:620px;height:438px;border-radius:14px 0 0 14px;border:1px solid #2a3a4b;border-right:0;background:url('${thumb}') left top/auto 100% no-repeat;box-shadow:0 30px 80px #000a}
</style></head><body>
<div class="grid"></div><div class="frame"></div>
<div class="copy">
<div class="mono tag">Case ${esc(c.code)} · ${esc(c.year)}</div>
<h1>${esc(c.name)}</h1>
<div class="mono kind">${esc(c.kind.en)}</div>
<div class="line">${esc(c.line.en)}</div>
<div class="mono foot">Eduardo Azuolas · Product Designer UX/UI</div>
</div>
<div class="shot"></div>
</body></html>`;
}

mkdirSync(OUT, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), 'og-'));
for (const c of (process.env.OG_ONLY ? CASES.filter((x) => x.id === process.env.OG_ONLY) : CASES)) {
  const html = join(tmp, `${c.id}.html`);
  const png = join(OUT, `${c.id}.png`);
  writeFileSync(html, card(c));
  rmSync(png, { force: true }); // regenerate, never keep a stale card
  // The first launch of a run sometimes exits without writing; one retry covers it.
  for (let attempt = 0; attempt < 2 && !existsSync(png); attempt++) {
    try {
      execFileSync(browser, [
      ...(isShell ? [] : ['--headless=new']), '--disable-gpu', `--user-data-dir=${join(tmp, `profile-${c.id}`)}`, '--hide-scrollbars', '--force-device-scale-factor=1',
      '--window-size=1200,630', '--virtual-time-budget=10000',
      `--screenshot=${png}`, pathToFileURL(html).href,
    ], { stdio: 'ignore' });
    } catch {
      // a non-zero exit with no PNG is retried; the check below reports a final failure
    }
  }
  if (!existsSync(png)) throw new Error(`og-cards: browser produced no PNG for ${c.id}`);
  console.log(`og-cards: ${c.id} -> ${png}`);
}
