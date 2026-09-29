import type { CSSProperties, ReactNode } from 'react';

type Props = {
  /** e.g. "SELECTED WORK" */
  label: ReactNode;
  /**
   * Drafting numbering, e.g. "FIG. 02". Shown, but hidden from screen readers:
   * read aloud before every heading it only clutters the headings list.
   */
  prefix?: string;
  /** Right-hand annotation, e.g. "06 SHEETS" or a coordinate. */
  meta?: ReactNode;
  /** Smaller, dimmer meta — used for section coordinates. */
  metaDim?: boolean;
  /** Cyan label, used once on the hero. */
  accent?: boolean;
  /** Lighter weight variant used on the resume sheet. */
  tight?: boolean;
  /**
   * Render the label as a heading. Section rules should — they are the only
   * titles those sections have. An eyebrow sitting above an `h1` should not.
   */
  as?: 'h2' | 'h3';
  className?: string;
  style?: CSSProperties;
};

/** The "FIG. NN — LABEL ————" rule that heads every section. */
export function FigRule({ label, prefix, meta, metaDim, accent, tight, as, className, style }: Props) {
  const classes = ['fig', tight && 'fig--tight', className].filter(Boolean).join(' ');
  const Label = as ?? 'span';
  return (
    <div className={classes} style={style}>
      <Label className={accent ? 'fig__label fig__label--accent' : 'fig__label'}>
        {prefix && <span aria-hidden="true">{prefix} — </span>}
        {label}
      </Label>
      <span data-line className="fig__line" />
      <span className="fig__cap" />
      {meta != null && <span className={metaDim ? 'fig__meta fig__meta--dim' : 'fig__meta'}>{meta}</span>}
    </div>
  );
}
