import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { prerender } from './prerender';

/**
 * Where the site is mounted. Root for a user page (name.github.io) or a custom
 * domain; "/repo-name/" for a GitHub project page. Routes and asset paths all
 * read this back through import.meta.env.BASE_URL, so it is the only place to
 * change — and public/404.html carries a matching knob.
 */
const base = '/';

export default defineConfig({
  base,
  plugins: [react(), prerender()],
  server: { port: 5173, open: true },
  build: { outDir: 'dist', sourcemap: false },
});
