import { config } from '../config';
import { CV } from '../data/cv';
import { DimH, DimV } from '../components/Dim';
import { FigRule } from '../components/FigRule';
import type { Strings } from '../i18n/strings';
import type { Lang } from '../types';
import type { Viewport } from '../hooks/useViewport';

type Props = { t: Strings; lang: Lang; vp: Viewport };

export function Resume({ t, lang, vp }: Props) {
  const cv = CV[lang] ?? CV.en;

  return (
    <main id="content" tabIndex={-1} className="page page--resume">
      <div data-reveal className="reveal resume__head">
        <div>
          <div className="resume__sheet">
            <span aria-hidden="true">{t.sheet} 04 — </span>
            {t.resumeLabel}
          </div>
          <div data-title-exit className="title-exit">
            <DimV show={vp.rulers} />
            <h1 className="resume__title">{config.name}</h1>
          </div>
          <div className="resume__role">{cv.title}</div>
        </div>
        <a
          data-noprint
          className="btn btn--primary resume__download"
          href={config.resumeHref[lang] ?? config.resumeHref.en}
          download
        >
          {t.downloadResume}
        </a>
      </div>

      <div className="resume__body">
        <section data-reveal className="reveal reveal--sm">
          <FigRule tight as="h2" label={cv.summaryLabel} style={{ marginBottom: 18 }} />
          <p className="resume__summary">{cv.summary}</p>
          <DimH style={{ maxWidth: 760, marginTop: 18 }} />
        </section>

        <section data-reveal className="reveal reveal--sm">
          <FigRule tight as="h2" label={cv.expLabel} style={{ marginBottom: 22 }} />
          <div className="res-rows">
            <DimV show={vp.rulers} />
            {cv.exp.map((row) => (
              <div key={row.title + row.when} className="res-row">
                <div className="res-row__when">{row.when}</div>
                <div>
                  <h3 className="res-row__title">{row.title}</h3>
                  <div className="res-row__org">{row.org}</div>
                  <ul role="list" className="res-row__bullets">
                    {row.bullets.map((b) => (
                      <li key={b} className="bullet">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section data-reveal className="reveal reveal--sm">
          <FigRule tight as="h2" label={cv.eduLabel} style={{ marginBottom: 22 }} />
          <div className="res-edu">
            {cv.edu.map((row) => (
              <div key={row.title} className="res-row">
                <div className="res-row__when">{row.when}</div>
                <div>
                  <h3 className="res-row__title">{row.title}</h3>
                  <div className="res-row__org">{row.org}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section data-reveal className="reveal reveal--sm">
          <FigRule tight as="h2" label={cv.certLabel} style={{ marginBottom: 18 }} />
          <ul role="list" className="res-certs">
            {cv.certs.map((c) => (
              <li key={c} className="res-cert">
                {c}
              </li>
            ))}
          </ul>
        </section>

        <section data-reveal className="reveal reveal--sm">
          <FigRule tight as="h2" label={t.stackLabel} style={{ marginBottom: 18 }} />
          <div className="stack-grid">
            {cv.skills.map((g) => (
              <div key={g.label} className="skill-cell">
                <div className="skill-cell__label">{g.label}</div>
                <ul role="list" className="skill-cell__list">
                  {g.items.map((i) => (
                    <li key={i} className="skill-cell__item">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
