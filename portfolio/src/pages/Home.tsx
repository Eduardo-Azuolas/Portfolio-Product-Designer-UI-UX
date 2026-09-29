import { config } from '../config';
import { CASES } from '../data/cases';
import { COVER, coverSrc } from '../data/covers';
import { DimH, DimV } from '../components/Dim';
import { FigRule } from '../components/FigRule';
import { HeroArt } from '../components/HeroArt';
import { RouteLink } from '../components/RouteLink';
import { routeHref } from '../hooks/useRoute';
import type { Strings } from '../i18n/strings';
import type { Lang, Page } from '../types';
import { pick } from '../i18n/pick';
import type { Viewport } from '../hooks/useViewport';

type Props = {
  t: Strings;
  lang: Lang;
  vp: Viewport;
  onNavigate: (page: Page) => void;
  onOpenCase: (index: number) => void;
};

export function Home({ t, lang, vp, onNavigate, onOpenCase }: Props) {
  const cards = CASES.map((c, i) => {
    return (
    // A link, not a button: reviewers open several cases in tabs to compare.
    // The name and kind label it; the rest of the card is read as its content.
    <RouteLink
      key={c.id}
      className="plate"
      href={routeHref('cs', i)}
      aria-labelledby={`plate-${c.id}-name plate-${c.id}-kind`}
      onNavigate={() => onOpenCase(i)}
    >
      <span className="plate__corner" aria-hidden="true" />
      <span className="plate__thumb">
        <img
          className="plate__cover"
          src={coverSrc(c.id, lang)}
          // The plate already names the case twice, in the kind line and the
          // heading. A third reading of it here would be noise.
          alt=""
          width={COVER.w}
          height={COVER.h}
          // Below the hero on every screen, so it waits for the scroll
          // instead of competing with the fonts and the title.
          loading="lazy"
          decoding="async"
        />
        </span>
      <div className="plate__kind" id={`plate-${c.id}-kind`}>
        {pick(c.kind, lang)}
      </div>
      <div data-line className="plate__rule" />
      <h3 className="plate__name" id={`plate-${c.id}-name`}>
        {c.name}
      </h3>
      <p className="plate__line">{pick(c.line, lang)}</p>
      <div className="plate__spacer" />
      <div className="plate__foot">
        <span aria-hidden="true">SPEC-{c.code}</span>
        <span>{c.year}</span>
        <span aria-hidden="true">{t.openSheet} →</span>
      </div>
    </RouteLink>
    );
  });

  return (
    <main id="content" tabIndex={-1} className="page">
      {/* FIG. 01 — title block */}
      <section data-sec="hero" className="hero">
        <HeroArt show={vp.heroArt} showAnnotations={!vp.mob} />

        <div className="hero__body">
          <FigRule
            accent
            className="hero__eyebrow"
            prefix="FIG. 01"
            label={t.heroLabel}
          />

          <div data-title-exit className="title-exit">
            <DimV show={vp.rulers} />
            <h1 data-intro className="hero__title">
              {config.name}
            </h1>
          </div>

          <div data-intro className="hero__meta">
            <span>{t.role}</span>
            <span className="diamond" aria-hidden="true" />
            <span>{t.based}</span>
          </div>

          <p data-intro className="hero__lede">
            {t.valueProp}
          </p>

          <DimH className="hero__dim" />

          <div data-intro className="hero__cta">
            <RouteLink className="btn btn--primary" href={routeHref('resume')} onNavigate={() => onNavigate('resume')}>
              {t.ctaResume}
            </RouteLink>
            <RouteLink className="btn btn--ghost" href={routeHref('contact')} onNavigate={() => onNavigate('contact')}>
              {t.ctaContact}
            </RouteLink>
          </div>
        </div>
      </section>

      {/* FIG. 02 — selected work */}
      <section id="work" data-sec="work" data-reveal className="reveal section section--work">
        <FigRule
          as="h2"
          prefix="FIG. 02"
          label={t.workLabel}
          meta={`${String(CASES.length).padStart(2, '0')} ${t.sheets}`}
          style={{ marginBottom: 34 }}
        />

        <div className="plate-grid">
          <DimV show={vp.rulers} />
          {cards}
        </div>

        <DimH style={{ marginTop: 14 }} />
      </section>

      {/* FIG. 03 — philosophy */}
      <section data-sec="philosophy" data-reveal className="reveal section section--philosophy">
        <FigRule as="h2" prefix="FIG. 03" label={t.philLabel} style={{ marginBottom: 34 }} />
        <p className="philosophy__quote">{t.philosophy}</p>
        <DimH style={{ maxWidth: 900, marginTop: 18 }} />
        <p className="philosophy__sub">{t.philosophySub}</p>
      </section>

      {/* Next step */}
      <section data-reveal className="reveal cta-band">
        <DimV show={vp.rulers} />
        <div>
          <div className="cta-band__label">{t.ctaLabel}</div>
          <h2 className="cta-band__heading">{t.ctaHeading}</h2>
        </div>
        <RouteLink
          className="btn btn--primary btn--wide"
          href={routeHref('contact')}
          onNavigate={() => onNavigate('contact')}
        >
          {t.ctaContact}
        </RouteLink>
      </section>
    </main>
  );
}
