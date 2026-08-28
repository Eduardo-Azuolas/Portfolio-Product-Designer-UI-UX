import { useEffect, useMemo, useRef, useState } from 'react';
import { CASES } from '../data/cases';
import { SECTIONS } from '../data/sections';
import { SECTION_COLS } from '../data/slots';
import { MEDIA } from '../data/media';
import { DimH, DimV } from '../components/Dim';
import { Figure } from '../components/Figure';
import { FigRule } from '../components/FigRule';
import { pick } from '../i18n/pick';
import type { Strings } from '../i18n/strings';
import type { Lang, Metric, SlotImage } from '../types';
import type { Viewport } from '../hooks/useViewport';

type Props = {
  index: number;
  t: Strings;
  lang: Lang;
  vp: Viewport;
  active: string;
  reduced: boolean;
  onOpenCase: (index: number) => void;
};

type Slot = { img: SlotImage };

type Section = {
  key: string;
  id: string;
  n: string;
  label: string;
  body: string;
  size: string;
  pad: string;
  gap: string;
  coord: string;
  note?: string;
  slots?: Slot[];
  slotCols?: string;
};

const pad2 = (n: number) => String(n).padStart(2, '0');

export function CaseStudy({ index, t, lang, vp, active, reduced, onOpenCase }: Props) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetRef = useRef<HTMLDialogElement>(null);
  const cs = CASES[index];
  const media = MEDIA[cs.id];

  useEffect(() => {
    if (!sheetOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [sheetOpen]);

  // Widening past the mobile breakpoint takes the FAB away, so the sheet it
  // opened must not be left holding the page hostage.
  useEffect(() => {
    if (!vp.mob) sheetRef.current?.close();
  }, [vp.mob]);

  const openSheet = () => {
    setSheetOpen(true);
    sheetRef.current?.showModal();
  };
  const closeSheet = () => sheetRef.current?.close();

  // The header offset lives in CSS as scroll-margin-top on [data-sec], so this
  // no longer carries its own copy of the header height.
  const jump = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  const sections: Section[] = useMemo(
    () =>
      SECTIONS.map(({ key, en, pt }, i) => {
        const thin = (cs.s.thin ?? []).includes(key);
        const item: Section = {
          key,
          id: `sec-${key}`,
          n: pad2(i + 3),
          label: (lang === 'pt' ? pt : en).toUpperCase(),
          body: pick(cs.s[key], lang),
          size: thin ? '15px' : '17px',
          pad: thin ? '44px' : '72px',
          gap: thin ? '14px' : '22px',
          coord: `X: ${120 + i * 24} Y: ${88 + i * 56}`,
        };

        if (thin) item.note = t.thin;

        // Only real images render. A section with none simply has no figure
        // grid — no reserved space, no empty frame.
        const shots = (media?.slots?.[key] ?? []).filter((s): s is SlotImage => Boolean(s));
        if (!thin && shots.length) {
          item.slots = shots.map((img) => ({ img }));
          item.slotCols =
            media?.cols?.[key] ??
            (vp.mob ? (vp.narrow ? '1fr' : 'repeat(2,1fr)') : SECTION_COLS[key] ?? '1fr');
        }

        return item;
      }),
    [cs, media, lang, t, vp.mob, vp.narrow],
  );

  const indexItems = useMemo(
    () =>
      [
        { key: 'hero', label: t.secResults },
        { key: 'glance', label: t.secGlance },
        ...SECTIONS.map(({ key, en, pt }) => ({ key, label: (lang === 'pt' ? pt : en).toUpperCase() })),
      ].map((it, i) => ({ ...it, n: pad2(i + 1) })),
    [lang, t],
  );

  // The three numbers open the case rather than closing it, and the note that
  // qualifies them travels with them.
  const metrics = cs.s.metrics.map((m: Metric) => ({
    v: m.v,
    k: pick(m.k, lang),
    src: m.proj ? t.projectedTag : t.measuredTag,
  }));
  const metricsNote = cs.s.metrics.some((m) => m.proj) ? t.projected : t.measured;

  const spec = (['role', 'duration', 'team', 'tools', 'platform'] as const).map((k) => ({
    k: t.spec[k],
    v: pick(cs.spec[k], lang),
  }));

  const highlights = [
    { k: t.kProblem, v: pick(cs.hi.p, lang) },
    { k: t.kMove, v: pick(cs.hi.m, lang) },
    { k: t.kOutcome, v: pick(cs.hi.o, lang) },
  ];

  const prev = CASES[(index + CASES.length - 1) % CASES.length];
  const next = CASES[(index + 1) % CASES.length];

  return (
    <main className="page page--case">
      <div className="case__grid">
        {!vp.mob && (
          <nav data-noprint data-thin-scroll className="case-index" aria-label={t.indexLabel}>
            <div className="case-index__inner">
              <div className="case-index__label">{t.indexLabel}</div>
              <ul className="case-index__list">
                {indexItems.map((s) => (
                  <li key={s.key}>
                    <button
                      type="button"
                      className="case-index__btn"
                      aria-current={active === s.key}
                      onClick={() => jump(`sec-${s.key}`)}
                    >
                      <span className="n">{s.n}</span>
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}

        <div>
          {/* FIG. 01 — project hero */}
          <section id="sec-hero" data-sec="hero" style={{ paddingTop: 24 }}>
            <div data-reveal className="reveal">
              <FigRule
                label={`FIG. 01 — ${t.secResults}`}
                meta={`SPEC-${cs.code}`}
                style={{ marginBottom: 22 }}
              />

              <div data-title-exit className="title-exit">
                <DimV show={vp.rulers} />
                <h1 className="case__title">{cs.name}</h1>
              </div>

              <div className="case__kind">{pick(cs.kind, lang)}</div>
              <p className="case__line">{pick(cs.line, lang)}</p>
              <DimH style={{ maxWidth: 720, marginTop: 18 }} />

              <div className="hairgrid results">
                <DimV show={vp.rulers} />
                {metrics.map((m) => (
                  <div key={m.k} className="hairgrid__cell metric">
                    <div className="metric__v">{m.v}</div>
                    <div className="metric__k">{m.k}</div>
                    <div className="metric__src">{m.src}</div>
                  </div>
                ))}
              </div>
              <div className="note">
                <span className="note__star">*</span>
                {metricsNote}
              </div>
            </div>
          </section>

          {/* FIG. 02 — at a glance */}
          <section id="sec-glance" data-sec="glance" data-reveal className="reveal" style={{ paddingTop: 72 }}>
            <FigRule as="h2" label={`FIG. 02 — ${t.secGlance}`} style={{ marginBottom: 22 }} />

            <div className="hairgrid spec-grid">
              <DimV show={vp.rulers} />
              {spec.map((s) => (
                <div key={s.k} className="hairgrid__cell spec-cell">
                  <div className="spec-cell__k">{s.k}</div>
                  <div className="spec-cell__v">{s.v}</div>
                </div>
              ))}
            </div>
            <DimH style={{ marginTop: 14 }} />

            <div className="highlights">
              <h3 className="highlights__label">{t.highlights}</h3>
              <div className="highlights__grid">
                {highlights.map((h) => (
                  <div key={h.k} className="highlight">
                    <div className="highlight__k">
                      <span className="diamond" aria-hidden="true" />
                      <span>{h.k}</span>
                    </div>
                    <div className="highlight__v">{h.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FIG. 03…15 — the sheet body */}
          {sections.map((s) => (
            <section
              key={s.key}
              id={s.id}
              data-sec={s.key}
              data-reveal
              className="reveal"
              style={{ paddingTop: s.pad }}
            >
              <FigRule
                as="h2"
                label={`FIG. ${s.n} — ${s.label}`}
                meta={s.coord}
                metaDim
                style={{ marginBottom: s.gap }}
              />

              <p className="case-section__body" style={{ fontSize: s.size }}>
                {s.body}
              </p>

              {s.slots && (
                <div className="case-slots" style={{ gridTemplateColumns: s.slotCols }}>
                  {s.slots.map((p, i) => (
                    <Figure key={`${s.key}-${i}`} img={p.img} lang={lang} />
                  ))}
                </div>
              )}

              {s.note && (
                <div className="note">
                  <span className="note__star">*</span>
                  {s.note}
                </div>
              )}
            </section>
          ))}

          <div data-reveal className="reveal reveal--fade case-nav">
            <button
              type="button"
              className="btn btn--ghost btn--nav"
              onClick={() => onOpenCase((index + CASES.length - 1) % CASES.length)}
            >
              ← {prev.name}
            </button>
            <button
              type="button"
              className="btn btn--ghost btn--nav"
              onClick={() => onOpenCase((index + 1) % CASES.length)}
            >
              {next.name} →
            </button>
          </div>
        </div>
      </div>

      {vp.mob && (
        <button
          data-noprint
          type="button"
          className="btn btn--primary fab"
          aria-haspopup="dialog"
          aria-expanded={sheetOpen}
          onClick={openSheet}
        >
          {t.indexLabel}
        </button>
      )}

      <dialog
        data-noprint
        ref={sheetRef}
        className="sheet"
        aria-labelledby="sheet-label"
        onClose={() => setSheetOpen(false)}
        // Clicking the backdrop lands on the dialog itself, never on its content.
        onClick={(e) => {
          if (e.target === sheetRef.current) closeSheet();
        }}
      >
        <div className="sheet__head">
          <h2 id="sheet-label" className="sheet__label">
            {t.indexLabel}
          </h2>
          <button type="button" className="sheet__close" aria-label={t.close} onClick={closeSheet}>
            ✕
          </button>
        </div>
        <ul className="sheet__list">
          {indexItems.map((s) => (
            <li key={s.key} className="sheet__item">
              <button
                type="button"
                className="sheet__btn"
                aria-current={active === s.key}
                onClick={() => {
                  closeSheet();
                  jump(`sec-${s.key}`);
                }}
              >
                <span className="n">{s.n}</span>
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </dialog>
    </main>
  );
}
