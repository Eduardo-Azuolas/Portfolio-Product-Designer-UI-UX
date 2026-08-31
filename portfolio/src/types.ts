export type Lang = 'en' | 'pt';

/** A string that exists in both languages. */
export type Localized = { en: string; pt: string };

/** Either a plain string (same in both languages) or a localized pair. */
export type MaybeLocalized = string | Localized;

export type Page = 'home' | 'about' | 'cs' | 'resume' | 'contact';

/** The 13 case-study sections, in sheet order. */
export type SectionKey =
  | 'context'
  | 'problem'
  | 'goals'
  | 'research'
  | 'insights'
  | 'strategy'
  | 'exploration'
  | 'uxflow'
  | 'ui'
  | 'ds'
  | 'validation'
  | 'outcome'
  | 'learnings';

export type Metric = {
  /** Headline value, e.g. "+46%". */
  v: string;
  /** What the value measures. */
  k: Localized;
  /** True when projected from testing rather than measured in production. */
  proj: boolean;
};

export type CaseSpec = {
  role: Localized;
  duration: Localized;
  team: Localized;
  tools: MaybeLocalized;
  platform: MaybeLocalized;
};

export type CaseHighlights = {
  /** Problem solved. */
  p: Localized;
  /** Strategic move. */
  m: Localized;
  /** Outcome. */
  o: Localized;
};

export type CaseSections = Record<SectionKey, Localized> & {
  metrics: Metric[];
  /** Sections deliberately compressed because the engagement did not cover them. */
  thin?: SectionKey[];
};

export type CaseStudy = {
  id: string;
  name: string;
  /** Sheet letter, e.g. "A". */
  code: string;
  year: string;
  kind: Localized;
  line: Localized;
  spec: CaseSpec;
  hi: CaseHighlights;
  s: CaseSections;
};

export type StackGroup = { label: string; items: string[] };

/**
 * A real exported frame that fills a slot. `w`/`h` are the intrinsic pixel size
 * of the asset — they reserve the right aspect ratio so nothing reflows on load.
 */
export type SlotImage = {
  /** Path under the site root. Localized when the frame contains text. */
  src: MaybeLocalized;
  w: number;
  h: number;
  /** Mono caption rendered under the image. */
  caption: MaybeLocalized;
};

/**
 * One exported frame mounted on a plate's band. Placed by hand rather than
 * cropped by `object-fit`: a phone screen and a 1440pt desktop screen need
 * opposite treatments, and only the author knows where a frame stops being
 * worth showing.
 *
 * `x` and `width` are percentages of the band's width; `y` is a percentage of
 * its height. Anything past the band's bottom edge is simply cut, which is how
 * the tall phone frames end on a shared baseline.
 */
export type ThumbShot = {
  /** Path under the site root. Localized when the frame contains text. */
  src: MaybeLocalized;
  w: number;
  h: number;
  x: number;
  width: number;
  y?: number;
};

/**
 * The band that fronts a case on the home sheet. Reuses exported UI shots
 * rather than separate artwork, so re-exporting a case updates its card with
 * it — and so the card never drifts from the work it stands for.
 */
export type Thumb = {
  /** Mounting ground. Defaults to the sheet's own cell surface. */
  ground?: string;
  /** Phone cases run three frames; desktop cases run one, near full width. */
  shots: ThumbShot[];
};

/** Per-case imagery. A section with no image here renders no figure at all. */
export type CaseMedia = {
  /** The frame shown on the home sheet's plate for this case. */
  thumb?: Thumb;
  /** Positional: index i fills slot i of that section. `null` leaves it empty. */
  slots?: Partial<Record<SectionKey, Array<SlotImage | null>>>;
  /**
   * Overrides the section's default grid tracks. Wide artefacts (a comparison
   * table, a persona strip) need the full column to stay legible.
   */
  cols?: Partial<Record<SectionKey, string>>;
};
