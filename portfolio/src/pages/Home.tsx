import { config } from '../config';
import { CASES } from '../data/cases';
import { MEDIA } from '../data/media';
import { DimH, DimV } from '../components/Dim';
import { FigRule } from '../components/FigRule';
import { HeroArt } from '../components/HeroArt';
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
    const thumb = MEDIA[c.id]?.thumb;

    return (
    <button key={c.id} type="button" className="plate" onClick={() => onOpenCase(i)}>
      <span className="plate__corner" aria-hidden="true" />
      {thumb && (
        <span
          className="plate__thumb"
          style={thumb.ground ? { background: thumb.ground } : undefined}
        >
          {thumb.shots.map((shot, s) => (
            <img
              key={s}
              className="plate__shot"
              src={pick(shot.src, lang)}
              // The plate already names the case twice, in the kind line and the
              // heading. A third reading of it here would be noise.
              alt=""
              width={shot.w}
              height={shot.h}
              loading="lazy"
              decoding="async"
              style={{ left: `${shot.x}%`, width: `${shot.width}%`, top: `${shot.y ?? 0}%` }}
            />
          ))}
        </span>
      )}
      <div className="plate__kind">{pick(c.kind, lang)}</div>
      <div data-line className="plate__rule" />
      <h3 className="plate__name">{c.name}</h3>
      <p className="plate__line">{pick(c.line, lang)}</p>
      <div className="plate__spacer" />
      <div className="plate__foot">
        <span>SPEC-{c.code}</span>
        <span>{c.year}</span>
        <span>{t.openSheet}</span>
      </div>
    </button>
    );
  });

  return (
    <main className="page">
      {/* FIG. 01 — title block */}
      <section className="hero">
        <HeroArt show={vp.heroArt} showAnnotations={!vp.mob} />

        <div className="hero__body">
          <FigRule
            accent
            className="hero__eyebrow"
            label={`FIG. 01 — ${t.heroLabel}`}
            meta="X: 240 Y: 088"
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
            <button type="button" className="btn btn--primary" onClick={() => onNavigate('resume')}>
              {t.ctaResume}
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => onNavigate('contact')}>
              {t.ctaContact}
            </button>
          </div>
        </div>
      </section>

      {/* FIG. 02 — selected work */}
      <section id="work" data-reveal className="reveal section section--work">
        <FigRule
          as="h2"
          label={`FIG. 02 — ${t.workLabel}`}
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
      <section data-reveal className="reveal section section--philosophy">
        <FigRule as="h2" label={`FIG. 03 — ${t.philLabel}`} style={{ marginBottom: 34 }} />
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
        <button type="button" className="btn btn--primary btn--wide" onClick={() => onNavigate('contact')}>
          {t.ctaContact}
        </button>
      </section>
    </main>
  );
}
