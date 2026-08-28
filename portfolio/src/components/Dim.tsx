import type { CSSProperties } from 'react';

/**
 * Drafting dimension rulers. The measured value is written into the label by
 * `useDims`; the draw animation is driven by CSS.
 */

/** Vertical ruler pinned to the left gutter of a positioned container. */
export function DimV({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div data-noprint data-dim="v" className="dim-v" style={{ display: 'flex' }} aria-hidden="true">
      <span data-dimtick className="dim__tick" />
      <span data-dimline="y" className="dim__line" />
      <span data-dim-val className="dim__val" />
      <span data-dimline="y" className="dim__line" />
      <span data-dimtick className="dim__tick" />
    </div>
  );
}

/** Horizontal ruler that measures the width of the block above it. */
export function DimH({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div
      data-noprint
      data-dim="h"
      className={className ? `dim-h ${className}` : 'dim-h'}
      style={style}
      aria-hidden="true"
    >
      <span data-dimtick className="dim__tick" />
      <span data-dimline="x" className="dim__line" />
      <span data-dim-val className="dim__val" />
      <span data-dimline="x" className="dim__line" />
      <span data-dimtick className="dim__tick" />
    </div>
  );
}
