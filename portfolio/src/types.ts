export type Lang = 'en' | 'pt';

/** A string that exists in both languages. */
export type Localized = { en: string; pt: string };

/** Either a plain string (same in both languages) or a localized pair. */
export type MaybeLocalized = string | Localized;

export type Page = 'home' | 'about' | 'cs' | 'resume' | 'contact' | 'notfound';

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
  /** Headline value, e.g. "+46%". Localized only when it contains words. */
  v: MaybeLocalized;
  /** What the value measures. */
  k: Localized;
  /** True when the value was not measured in production. */
  proj: boolean;
  /** A success target set before any test, rather than a projection of one. */
  basis?: 'target';
};

export type CaseSpec = {
  role: Localized;
  /** Omitted when there is no honest number to give; the row is then hidden. */
  duration?: Localized;
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
  /** Where the work stands: client and shipped, client brief, concept. Shown on the plate and the sheet. */
  status: Localized;
  /** Shown on the home sheet and in the prev/next loop. The rest stay reachable by URL. */
  featured?: boolean;
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
  /**
   * Text alternative for frames whose content the caption and body do not
   * already carry — tables, journeys, personas. Screens the section body
   * describes leave it out and stay decorative.
   */
  alt?: MaybeLocalized;
  /** Mounts the frame in a device instead of showing it bare. */
  device?: DeviceKind;
  /**
   * The whole screen, when `src` is cut to the device viewport (a pinned
   * action bar over content that scrolls). The modal scrolls through this one.
   */
  full?: Screen;
  /** Grid columns the figure spans on desktop. Full width below 900px. */
  span?: number;
  /**
   * Mounts a transparent frame on the drafting ground the hero scene uses,
   * glowing in this colour. For sheets whose swatches vanish on the bare page.
   */
  ground?: string;
  /** Drawn in the plain wireframe outline rather than a realistic device. */
  wire?: boolean;
};


/** Which device a screen is mounted in. */
export type DeviceKind = 'phone' | 'browser';

/**
 * One exported screen. `w`/`h` are the asset's own pixels. A phone screen can
 * be taller than the 390×844 viewport; the device crops it from the top.
 */
export type Screen = {
  src: MaybeLocalized;
  w: number;
  h: number;
};

/**
 * A device placed in a composed scene. `x`, `y` and `width` are percentages of
 * the scene box; `depth` lifts it towards the viewer (0 is the back plane).
 */
export type SceneShot = Screen & {
  device: DeviceKind;
  x: number;
  y: number;
  width: number;
  depth?: number;
  /** Degrees, for the fanned layout: each phone turns about a point below it. */
  rotate?: number;
  /** Mono tag above the device, for the stacked layout. */
  tag?: Localized;
};

/** Several devices composed in perspective, settling flat as they scroll in. */
export type Scene = {
  shots: SceneShot[];
  /** Width over height of the scene box. */
  ratio: number;
  /** Colour of the glow behind the devices — the product's own accent. */
  glow?: string;
  caption?: MaybeLocalized;
  /** Browser address shown in the chrome of any browser shot. */
  url?: string;
  /**
   * `perspective` tilts the rig in 3D and settles it on scroll; `fan` keeps
   * the devices flat and turns them out from a shared pivot, like a hand of
   * cards, over a ground of orbit rings.
   */
  layout?: 'perspective' | 'fan' | 'stack';
};

export type SequenceStep = {
  screen: Screen;
  /** Mono label, e.g. "STEP 2 · RISK PROFILE". */
  title: Localized;
  /** One or two sentences: the decision this screen carries. */
  body: Localized;
};

/** A callout on a spotlit screen. `y` is a percentage of the device height. */
export type SpotNote = {
  y: number;
  side: 'l' | 'r';
  text: Localized;
};

/** One side of a before/after pair: the screen and the mode it belongs to. */
export type PairSide = {
  screen: Screen;
  /** Mono tag above the device, e.g. "PRACTICE · NOTHING IS SENT". */
  tag: Localized;
  /** `calm` takes the accent; `alert` takes amber. */
  tone: 'calm' | 'alert';
};

/** One view of a tabbed switcher: its label, the screen and what it answers. */
export type SwitchTab = { label: Localized; screen: Screen; note: Localized };

/**
 * A detail pulled out of a screen and shown enlarged beside it. `x`, `y`, `w`
 * and `h` are percentages of the screen image.
 */
export type Lens = { x: number; y: number; w: number; h: number; text: Localized };

/** A difference between the two screens of a pair, at `y`% of the device height. */
export type PairNote = { y: number; text: Localized };

/**
 * The same screen in two themes, one over the other, split by a handle the
 * reader drags. `before` sits underneath on the left; `after` is revealed to
 * the right of the handle.
 */
export type ThemeCompare = {
  before: Screen;
  after: Screen;
  /** Tags pinned to the two lower corners: the before and after themes. */
  labels: [Localized, Localized];
  url?: string;
  caption?: MaybeLocalized;
};

/**
 * One component outlined on a screen. `x`, `y`, `w` and `h` are percentages
 * of the screen image; `layer` sets the outline colour and the chip.
 */
export type AnatomyPart = {
  x: number;
  y: number;
  w: number;
  h: number;
  name: MaybeLocalized;
  layer: 'atomic' | 'composite';
  text: Localized;
};

/** A numbered marker on a wireframe tile, as percentages of the tile. */
export type WirePin = { n: number; x: number; y: number };

/**
 * One tile in a wireframe grid. A tile with no screen is a ghost: a screen the
 * round did not have yet, drawn as a dashed outline with its own note.
 */
export type WireTile = {
  screen?: Screen;
  caption: MaybeLocalized;
  ghost?: Localized;
  pins?: WirePin[];
};

/**
 * One phone of a sync pair. `mark` is the band of the screen, in percentages
 * of its height, where the shared order shows up on that side.
 */
export type SyncSide = { screen: Screen; tag: Localized; mark: { y: number; h: number } };

/**
 * The same order on two phones — the customer's and the baker's — linked
 * through the one calendar event both of them receive.
 */
export type SyncScene = {
  left: SyncSide;
  right: SyncSide;
  event: {
    /** Short weekday, day number and short month, e.g. SAT · 12 · SEP. */
    weekday: Localized;
    day: string;
    month: Localized;
    time: Localized;
    title: Localized;
    lines: Localized[];
    /** Who the event landed on, one chip each. */
    guests: Localized[];
    source: Localized;
  };
  caption?: MaybeLocalized;
};

/** A screen in one lane of a swimlane board, placed in a numbered column. */
export type LaneShot = { screen: Screen; caption: Localized; col: number };

/** One lane: whose app it is and the screens it runs, by column. */
export type Lane = { tag: Localized; shots: LaneShot[] };

/** A link between the two lanes at one column, numbered, explained below. */
export type LaneLink = { col: number; text: Localized };

/**
 * A hang tag clipped to the hero browser: the grade the product page shows,
 * written the way a thrift shop would tie it to the garment.
 */
export type HangTag = {
  screen: Screen;
  url?: string;
  eyebrow: Localized;
  grade: Localized;
  /** Filled dots out of four. */
  level: number;
  scale: Localized[];
  note: Localized;
  caption?: MaybeLocalized;
};

/**
 * One stop of a badge trail: a crop of a screen around the same badge.
 * `crop.x`, `crop.y` and `crop.w` and every `mark` value are percentages of
 * the screen; the crop is 4:3.
 */
export type TrailStop = {
  screen: Screen;
  crop: { x: number; y: number; w: number };
  mark: { x: number; y: number; w: number; h: number };
  /** Where the badge sits in the PT screen, when the longer word moves it. */
  markPt?: { x: number; y: number; w: number; h: number };
  side: Localized;
  title: Localized;
  caption: MaybeLocalized;
};

/**
 * Presentational blocks that run between a section's body and its figure grid.
 * Each carries its own mono label so the section reads as a sequence of views.
 */
export type Stage =
  | { kind: 'scene'; label?: Localized; scene: Scene }
  | { kind: 'sequence'; label?: Localized; steps: SequenceStep[] }
  | {
      kind: 'wires';
      label?: Localized;
      tiles: WireTile[];
      /** Tiles per row on desktop. Defaults to 4. */
      cols?: number;
      /** Desktop wireframes draw as a flat sheet at the image's own ratio. */
      device?: DeviceKind;
      /** Heading of the list that explains the pins. */
      notesLabel?: Localized;
      /** A note without `n` has no pin: it describes a screen the round lacked. */
      notes: { n?: number; text: Localized }[];
    }
  | { kind: 'strip'; label?: Localized; steps: SequenceStep[] }
  | {
      kind: 'tabs';
      label?: Localized;
      device: DeviceKind;
      url?: string;
      /** Numbered tabs read as steps; plain tabs read as alternatives. */
      numbered?: boolean;
      tabs: SwitchTab[];
      caption?: MaybeLocalized;
    }
  | {
      kind: 'lens';
      label?: Localized;
      screen: Screen;
      url?: string;
      lenses: Lens[];
      caption?: MaybeLocalized;
    }
  | {
      kind: 'pair';
      label?: Localized;
      left: PairSide;
      right: PairSide;
      notes: PairNote[];
      caption?: MaybeLocalized;
    }
  | {
      kind: 'anatomy';
      label?: Localized;
      screen: Screen;
      url?: string;
      parts: AnatomyPart[];
      caption?: MaybeLocalized;
    }
  | {
      kind: 'lanes';
      label?: Localized;
      /** Columns on desktop; phones scroll sideways below 900px. */
      cols: number;
      lanes: [Lane, Lane];
      links: LaneLink[];
      notesLabel?: Localized;
      caption?: MaybeLocalized;
    }
  | {
      kind: 'trail';
      label?: Localized;
      stops: TrailStop[];
      caption?: MaybeLocalized;
    }
  | {
      kind: 'spotlight';
      label?: Localized;
      device: DeviceKind;
      screen: Screen;
      notes: SpotNote[];
      caption?: MaybeLocalized;
    };

/** Per-case imagery. A section with no image here renders no figure at all. */
export type CaseMedia = {
  /** Composed device scene under the case title. */
  hero?: Scene;
  /** In place of a scene: one screen in two themes behind a drag handle. */
  heroCompare?: ThemeCompare;
  /** In place of a scene: one order on two phones, linked by its calendar event. */
  heroSync?: SyncScene;
  /** In place of a scene: the product page with its grade tied on as a tag. */
  heroTag?: HangTag;
  /** Presentational blocks per section, rendered before the figure grid. */
  stages?: Partial<Record<SectionKey, Stage[]>>;
  /** Sections whose figure grid drops every other column, for a looser rhythm. */
  stagger?: Partial<Record<SectionKey, boolean>>;
  /** Mono label above a section's figure grid, when stages come before it. */
  slotLabels?: Partial<Record<SectionKey, Localized>>;
  /** Positional: index i fills slot i of that section. `null` leaves it empty. */
  slots?: Partial<Record<SectionKey, Array<SlotImage | null>>>;
  /**
   * Overrides the section's default grid tracks. Wide artefacts (a comparison
   * table, a persona strip) need the full column to stay legible.
   */
  cols?: Partial<Record<SectionKey, string>>;
};
