import { FigRule } from '../components/FigRule';
import { RouteLink } from '../components/RouteLink';
import { routeHref } from '../hooks/useRoute';
import type { Strings } from '../i18n/strings';

type Props = { t: Strings; onWork: () => void };

/** A case link that no longer resolves says so, and points back to the work. */
export function NotFound({ t, onWork }: Props) {
  return (
    <main id="content" tabIndex={-1} className="page page--contact">
      <FigRule prefix="404" label={t.notFound} style={{ marginBottom: 24 }} />
      <h1 className="contact__title">{t.notFound}</h1>
      <p className="about__lede">{t.notFoundBody}</p>
      <RouteLink className="btn btn--primary" href={`${routeHref('home')}#work`} onNavigate={onWork}>
        {t.seeAllWork}
      </RouteLink>
    </main>
  );
}
