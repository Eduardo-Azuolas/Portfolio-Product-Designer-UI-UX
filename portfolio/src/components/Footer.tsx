import { config } from '../config';
import type { Strings } from '../i18n/strings';

export function Footer({ t }: { t: Strings }) {
  return (
    <footer data-noprint className="footer">
      <div className="footer__inner">
        <span>
          {config.name} — {t.role}
        </span>
        <span className="footer__rev">
          <span className="footer__mark" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
          REV. 2026.08
        </span>
      </div>
    </footer>
  );
}
