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

/** Per-case imagery. A section with no image here renders no figure at all. */
export type CaseMedia = {
  /** Positional: index i fills slot i of that section. `null` leaves it empty. */
  slots?: Partial<Record<SectionKey, Array<SlotImage | null>>>;
  /**
   * Overrides the section's default grid tracks. Wide artefacts (a comparison
   * table, a persona strip) need the full column to stay legible.
   */
  cols?: Partial<Record<SectionKey, string>>;
};
