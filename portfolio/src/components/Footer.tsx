import { config } from '../config';
import type { Strings } from '../i18n/strings';

export function Footer({ t }: { t: Strings }) {
  return (
    <footer data-noprint className="footer">
      <div className="footer__inner">
        <span>
          {config.name} — {t.role}
        </span>
        {/* Contact at the bottom of every page, not only on the contact sheet. */}
        <span className="footer__links">
          <a href={`mailto:${config.email}`}>{config.email}</a>
          <a href={config.linkedin} target="_blank" rel="noreferrer">
            LinkedIn<span className="sr-only"> {t.newTab}</span>
          </a>
        </span>
        <span className="footer__rev">
          <span className="footer__mark" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
          {t.rev} 2026.09
        </span>
      </div>
    </footer>
  );
}
