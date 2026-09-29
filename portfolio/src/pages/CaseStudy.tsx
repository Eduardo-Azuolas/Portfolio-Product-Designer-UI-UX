import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { CASES } from '../data/cases';
import { SECTIONS } from '../data/sections';
import { SECTION_COLS } from '../data/slots';
import { MEDIA } from '../data/media';
import { DimH, DimV } from '../components/Dim';
import { Figure } from '../components/Figure';
import { Device, travel } from '../components/Device';
import { MockupScene } from '../components/MockupScene';
import { ScreenSequence } from '../components/ScreenSequence';
import { Spotlight } from '../components/Spotlight';
import { WireGrid } from '../components/WireGrid';
import { FlowStrip } from '../components/FlowStrip';
import { ComparePair } from '../components/ComparePair';
import { ViewSwitcher } from '../components/ViewSwitcher';
import { LensView } from '../components/LensView';
import { ThemeSlider } from '../components/ThemeSlider';
import { Anatomy } from '../components/Anatomy';
import { PickupSync } from '../components/PickupSync';
import { Lanes } from '../components/Lanes';
import { HangTag } from '../components/HangTag';
import { BadgeTrail } from '../components/BadgeTrail';
import { FigRule } from '../components/FigRule';
import { RouteLink } from '../components/RouteLink';
import { routeHref } from '../hooks/useRoute';
import { useActiveSection } from '../hooks/useScrollSpy';
import { pick } from '../i18n/pick';
import type { Strings } from '../i18n/strings';
import type { Lang, Localized, Metric, Page, SlotImage, Stage } from '../types';
import type { Viewport } from '../hooks/useViewport';

type Props = {
  index: number;
  t: Strings;
  lang: Lang;
  vp: Viewport;
  reduced: boolean;
  onOpenCase: (index: number) => void;
  onNavigate: (page: Page) => void;
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
  note?: string;
  slots?: Slot[];
  slotCols?: string;
  slotLabel?: Localized;
  stagger?: boolean;
  stages?: Stage[];
};

const pad2 = (n: number) => String(n).padStart(2, '0');

type IndexItem = { key: string; label: string; n: string };

/**
 * The figure index's buttons. Its own component so that it alone re-renders
 * when the reading band crosses a section, not the sheet around it.
 */
function IndexButtons({
  items,
  className,
  itemClass,
  onPick,
}: {
  items: IndexItem[];
  className: string;
  itemClass?: string;
  onPick: (key: string) => void;
}) {
  const active = useActiveSection();
  return (
    <>
      {items.map((s) => (
        <li key={s.key} className={itemClass}>
          <button
            type="button"
            className={className}
            aria-current={active === s.key ? 'true' : undefined}
            onClick={() => onPick(s.key)}
          >
            <span className="n">{s.n}</span>
            {s.label}
          </button>
        </li>
      ))}
    </>
  );
}

export function CaseStudy({ index, t, lang, vp, reduced, onOpenCase, onNavigate }: Props) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetRef = useRef<HTMLDialogElement>(null);
  const zoomRef = useRef<HTMLDialogElement>(null);
  const [zoom, setZoom] = useState<SlotImage | null>(null);

  // Closing a <dialog> drops focus on <body>, which loses a keyboard user's
  // place in a sheet that is mostly figures. Remember the button that opened
  // the viewer and hand focus back to it.
  const zoomOpener = useRef<HTMLElement | null>(null);
  const openZoom = (img: SlotImage) => {
    zoomOpener.current = document.activeElement as HTMLElement | null;
    setZoom(img);
    zoomRef.current?.showModal();
  };
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
  // no longer carries its own copy of the header height. Focus follows the
  // scroll, so the next Tab continues from the section, not from the index.
  const jump = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    const heading = section.querySelector<HTMLElement>('h1, h2');
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
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
        };

        if (thin) item.note = t.thin;

        const stages = media?.stages?.[key];
        if (!thin && stages?.length) item.stages = stages;
        item.slotLabel = media?.slotLabels?.[key];
        item.stagger = media?.stagger?.[key];

        // Only real images render. A section with none simply has no figure
        // grid — no reserved space, no empty frame.
        const shots = (media?.slots?.[key] ?? []).filter((s): s is SlotImage => Boolean(s));
        if (!thin && shots.length) {
          item.slots = shots.map((img) => ({ img }));
          // A case's column override is a desktop decision; on a phone two
          // 1936px frames side by side are 160px wide and unreadable.
          // Phones in devices stay two across even on a phone: one device at
          // full width is taller than the screen showing it.
          const devices = shots.every((img) => img.device === 'phone' || img.span);
          item.slotCols = vp.mob
            ? vp.narrow && !devices
              ? '1fr'
              : 'repeat(2,1fr)'
            : media?.cols?.[key] ?? SECTION_COLS[key] ?? '1fr';
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
    v: pick(m.v, lang),
    k: pick(m.k, lang),
    src: m.basis === 'target' ? t.targetTag : m.proj ? t.projectedTag : t.measuredTag,
  }));
  const metricsNote = cs.s.metrics.every((m) => m.basis === 'target')
    ? t.target
    : cs.s.metrics.some((m) => m.proj)
      ? t.projected
      : t.measured;

  // A row with no honest value is left out rather than shown as a dash.
  const spec = (['role', 'duration', 'team', 'tools', 'platform'] as const).flatMap((k) => {
    const value = cs.spec[k];
    return value ? [{ k: t.spec[k], v: pick(value, lang) }] : [];
  });

  const highlights = [
    { k: t.kProblem, v: pick(cs.hi.p, lang) },
    { k: t.kMove, v: pick(cs.hi.m, lang) },
    { k: t.kOutcome, v: pick(cs.hi.o, lang) },
  ];

  const prevIndex = (index + CASES.length - 1) % CASES.length;
  const nextIndex = (index + 1) % CASES.length;
  const prev = CASES[prevIndex];
  const next = CASES[nextIndex];

  return (
    <main id="content" tabIndex={-1} className="page page--case">
      <div className="case__grid">
        {!vp.mob && (
          <nav data-noprint data-thin-scroll className="case-index" aria-label={t.indexLabel}>
            <div className="case-index__inner">
              <div className="case-index__label">{t.indexLabel}</div>
              <ul role="list" className="case-index__list">
                <IndexButtons items={indexItems} className="case-index__btn" onPick={(key) => jump(`sec-${key}`)} />
              </ul>
            </div>
          </nav>
        )}

        <div>
          {/* FIG. 01 — project hero */}
          <section id="sec-hero" data-sec="hero" style={{ paddingTop: 24 }}>
            <div data-reveal className="reveal">
              <FigRule
                prefix="FIG. 01"
                label={t.secResults}
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

              {media?.hero && (
                <div className="case__hero-scene">
                  <MockupScene scene={media.hero} lang={lang} eager />
                </div>
              )}
              {!media?.hero && media?.heroCompare && (
                <div className="case__hero-scene">
                  <ThemeSlider {...media.heroCompare} lang={lang} eager />
                </div>
              )}
              {!media?.hero && !media?.heroCompare && !media?.heroSync && media?.heroTag && (
                <div className="case__hero-scene">
                  <HangTag {...media.heroTag} lang={lang} eager />
                </div>
              )}
              {!media?.hero && !media?.heroCompare && media?.heroSync && (
                <div className="case__hero-scene">
                  <PickupSync {...media.heroSync} lang={lang} mob={vp.mob} eager />
                </div>
              )}

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
                <span className="note__star" aria-hidden="true">*</span>
                {metricsNote}
              </div>
            </div>
          </section>

          {/* FIG. 02 — at a glance */}
          <section id="sec-glance" data-sec="glance" data-reveal className="reveal" style={{ paddingTop: 72 }}>
            <FigRule as="h2" prefix="FIG. 02" label={t.secGlance} style={{ marginBottom: 22 }} />

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
              <FigRule as="h2" prefix={`FIG. ${s.n}`} label={s.label} style={{ marginBottom: s.gap }} />

              <p className="case-section__body" style={{ fontSize: s.size }}>
                {s.body}
              </p>

              {s.stages?.map((st, i) => (
                <div key={`${s.key}-stage-${i}`} className={`stage stage--${st.kind}`}>
                  {st.label && <h3 className="stage__label">{st.label[lang]}</h3>}
                  {st.kind === 'scene' && <MockupScene scene={st.scene} lang={lang} />}
                  {st.kind === 'sequence' && (
                    <ScreenSequence steps={st.steps} lang={lang} mob={vp.mob} label={st.label?.[lang] ?? s.label} />
                  )}
                  {st.kind === 'wires' && (
                    <WireGrid
                      tiles={st.tiles}
                      notes={st.notes}
                      cols={st.cols}
                      device={st.device}
                      notesLabel={st.notesLabel}
                      lang={lang}
                      mob={vp.mob}
                      enlargeLabel={t.enlarge}
                      onEnlarge={openZoom}
                    />
                  )}
                  {st.kind === 'strip' && (
                    <FlowStrip steps={st.steps} lang={lang} mob={vp.mob} enlargeLabel={t.enlarge} onEnlarge={openZoom} />
                  )}
                  {st.kind === 'tabs' && (
                    <ViewSwitcher
                      tabs={st.tabs}
                      device={st.device}
                      url={st.url}
                      numbered={st.numbered}
                      caption={st.caption}
                      lang={lang}
                      mob={vp.mob}
                    />
                  )}
                  {st.kind === 'lens' && (
                    <LensView screen={st.screen} url={st.url} lenses={st.lenses} caption={st.caption} lang={lang} mob={vp.mob} />
                  )}
                  {st.kind === 'pair' && (
                    <ComparePair
                      left={st.left}
                      right={st.right}
                      notes={st.notes}
                      caption={st.caption}
                      lang={lang}
                      mob={vp.mob}
                    />
                  )}
                  {st.kind === 'trail' && (
                    <BadgeTrail stops={st.stops} caption={st.caption} lang={lang} mob={vp.mob} enlargeLabel={t.enlarge} onEnlarge={openZoom} />
                  )}
                  {st.kind === 'lanes' && (
                    <Lanes
                      cols={st.cols}
                      lanes={st.lanes}
                      links={st.links}
                      notesLabel={st.notesLabel}
                      caption={st.caption}
                      lang={lang}
                      mob={vp.mob}
                      enlargeLabel={t.enlarge}
                      onEnlarge={openZoom}
                    />
                  )}
                  {st.kind === 'anatomy' && (
                    <Anatomy screen={st.screen} url={st.url} parts={st.parts} caption={st.caption} lang={lang} mob={vp.mob} />
                  )}
                  {st.kind === 'spotlight' && (
                    <Spotlight
                      device={st.device}
                      screen={st.screen}
                      notes={st.notes}
                      caption={st.caption}
                      lang={lang}
                      mob={vp.mob}
                    />
                  )}
                </div>
              ))}

              {s.slots && s.slotLabel && <h3 className="stage__label stage__label--slots">{s.slotLabel[lang]}</h3>}

              {s.slots && (
                <div className={`case-slots${s.stagger ? ' case-slots--stagger' : ''}`} style={{ gridTemplateColumns: s.slotCols }}>
                  {s.slots.map((p, i) => (
                    <Figure
                      key={`${s.key}-${i}`}
                      img={p.img}
                      lang={lang}
                      enlargeLabel={t.enlarge}
                      onEnlarge={openZoom}
                      gridColumn={p.img.span ? (vp.mob ? (p.img.device === 'phone' ? undefined : '1 / -1') : `span ${p.img.span}`) : undefined}
                    />
                  ))}
                </div>
              )}

              {s.note && (
                <div className="note">
                  <span className="note__star" aria-hidden="true">*</span>
                  {s.note}
                </div>
              )}
            </section>
          ))}

          {/* The reviewer is most interested right here, at the end of a case. */}
          <section data-reveal className="reveal cta-band cta-band--case">
            <div>
              <div className="cta-band__label">{t.caseCtaLabel}</div>
              <h2 className="cta-band__heading">{t.ctaHeading}</h2>
            </div>
            <div className="cta-band__actions">
              <RouteLink className="btn btn--primary" href={routeHref('contact')} onNavigate={() => onNavigate('contact')}>
                {t.ctaContact}
              </RouteLink>
              <RouteLink className="btn btn--ghost" href={routeHref('resume')} onNavigate={() => onNavigate('resume')}>
                {t.ctaResume}
              </RouteLink>
            </div>
          </section>

          <nav data-reveal className="reveal reveal--fade case-nav" aria-label={t.nav.work}>
            <RouteLink
              className="btn btn--ghost btn--nav"
              href={routeHref('cs', prevIndex)}
              onNavigate={() => onOpenCase(prevIndex)}
            >
              <span aria-hidden="true">← </span>
              {prev.name}
            </RouteLink>
            <RouteLink
              className="btn btn--ghost btn--nav"
              href={routeHref('cs', nextIndex)}
              onNavigate={() => onOpenCase(nextIndex)}
            >
              {next.name}
              <span aria-hidden="true"> →</span>
            </RouteLink>
          </nav>
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
        <ul role="list" className="sheet__list">
          <IndexButtons
            items={indexItems}
            className="sheet__btn"
            itemClass="sheet__item"
            onPick={(key) => {
              closeSheet();
              jump(`sec-${key}`);
            }}
          />
        </ul>
      </dialog>

      <dialog
        data-noprint
        ref={zoomRef}
        className={`zoom${zoom?.device ? ' zoom--device' : ''}`}
        aria-label={zoom ? pick(zoom.caption, lang) : t.enlarge}
        onClose={() => {
          setZoom(null);
          zoomOpener.current?.focus();
          zoomOpener.current = null;
        }}
        onClick={(e) => {
          if (e.target === zoomRef.current) zoomRef.current?.close();
        }}
      >
        <div className="zoom__head">
          <p className="zoom__cap">{zoom && pick(zoom.caption, lang)}</p>
          <button
            type="button"
            className="sheet__close"
            aria-label={t.close}
            onClick={() => zoomRef.current?.close()}
          >
            ✕
          </button>
        </div>
        {zoom &&
          (zoom.device ? (
            // Screens open in their device at a readable size rather than
            // blown up to the viewport; a screen taller than the device
            // scrolls inside it, the way it would on the real thing.
            <div className={`zoom__body zoom__body--${zoom.device}`}>
              <Device kind={zoom.device} className={`zoom__device${zoom.wire ? ' device--wire' : ''}`}>
                {zoom.device === 'phone' && !zoom.wire && (
                  // The status bar stays put while the screen scrolls under it.
                  <span
                    className="zoom__status"
                    aria-hidden="true"
                    style={{ backgroundImage: `url("${pick((zoom.full ?? zoom).src, lang)}")` }}
                  />
                )}
                <div className="zoom__scroll" tabIndex={0} aria-label={t.scrollScreen} data-thin-scroll>
                  <img
                    className="zoom__screen"
                    src={pick((zoom.full ?? zoom).src, lang)}
                    alt={zoom.alt ? pick(zoom.alt, lang) : ''}
                    width={(zoom.full ?? zoom).w}
                    height={(zoom.full ?? zoom).h}
                  />
                </div>
              </Device>
              {travel(zoom.device, zoom.full ?? zoom) > 0 && <p className="zoom__hint">{t.scrollScreen}</p>}
            </div>
          ) : (
            <div
              className={`zoom__body${zoom.ground ? ' figure__frame--ground' : ''}`}
              style={zoom.ground ? ({ '--glow': zoom.ground } as CSSProperties) : undefined}
            >
              <img
                className="zoom__img"
                src={pick(zoom.src, lang)}
                alt={zoom.alt ? pick(zoom.alt, lang) : ''}
                width={zoom.w}
                height={zoom.h}
              />
            </div>
          ))}
      </dialog>
    </main>
  );
}
