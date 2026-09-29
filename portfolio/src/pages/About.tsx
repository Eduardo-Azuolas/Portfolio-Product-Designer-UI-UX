import { config } from '../config';
import { ABOUT } from '../data/about';
import { ABOUT_STACK, stackFor } from '../data/stack';
import { DimH, DimV } from '../components/Dim';
import { FigRule } from '../components/FigRule';
import type { Strings } from '../i18n/strings';
import type { Lang } from '../types';
import type { Viewport } from '../hooks/useViewport';

type Props = { t: Strings; lang: Lang; vp: Viewport };

export function About({ t, lang, vp }: Props) {
  const blocks = ABOUT[lang] ?? ABOUT.en;
  const stack = stackFor(lang, ABOUT_STACK);

  return (
    <main id="content" tabIndex={-1} className="page page--about">
      <div data-reveal className="reveal">
        <FigRule prefix={`${t.sheet} 02`} label={t.aboutLabel} style={{ marginBottom: 26 }} />

        <div className="about__head">
          <div>
            <div data-title-exit className="title-exit">
              <DimV show={vp.rulers} />
              <h1 className="about__title">{config.name}</h1>
            </div>

            <p className="about__lede">{t.aboutLede}</p>
            <DimH style={{ maxWidth: 720, marginTop: 18 }} />
          </div>

          {/*
            Framed the way the hero art frames its Ø48 detail circle: a hairline
            ring, one accent arc, and the measurement called out on a rule.
          */}
          <figure className="portrait">
            <div className="portrait__disc">
              {/*
                The disc never renders wider than 320px, so a 1x screen takes
                the 320 file and only a 2x screen pulls the 560.
              */}
              <img
                className="portrait__img"
                src={`${import.meta.env.BASE_URL}assets/portrait.webp`}
                srcSet={`${import.meta.env.BASE_URL}assets/portrait-320.webp 320w, ${import.meta.env.BASE_URL}assets/portrait.webp 560w`}
                sizes="320px"
                alt={t.portraitAlt}
                width={560}
                height={560}
                decoding="async"
              />
              <svg className="portrait__ring" viewBox="0 0 280 280" aria-hidden="true">
                <circle cx="140" cy="140" r="139.5" />
                <path className="portrait__arc" d="M140,0.5 A139.5,139.5 0 0 1 279.5,140" />
              </svg>
            </div>
            <FigRule tight label="Ø280" meta={t.based} metaDim style={{ marginTop: 16 }} />
          </figure>
        </div>
      </div>

      <div className="about__grid">
        <div data-reveal className="reveal about__blocks">
          <DimV show={vp.rulers} />
          {blocks.map((b) => (
            <div key={b.fig}>
              <div className="about-block__head">
                <span className="about-block__fig">{b.fig}</span>
                <span data-line className="about-block__line" />
              </div>
              <h2 className="about-block__title">{b.title}</h2>
              <p className="about-block__body">{b.body}</p>
            </div>
          ))}
        </div>

        <aside data-reveal className="reveal">
          <div className="skills">
            <h2 className="skills__label">{t.skillsLabel}</h2>
            <div className="skills__groups">
              {stack.map((g) => (
                <div key={g.label}>
                  <div className="skills__group-label">{g.label}</div>
                  <div className="chips">
                    {g.items.map((item) => (
                      <span key={item} className="chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
