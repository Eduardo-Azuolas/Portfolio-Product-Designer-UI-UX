import type { CSSProperties } from 'react';
import { pick } from '../i18n/pick';
import type { Lang, SlotImage } from '../types';
import { Device } from './Device';

type Props = {
  /** Nothing renders without an image — a missing figure leaves no gap. */
  img?: SlotImage | null;
  lang: Lang;
  /** Accessible name of the enlarge control, e.g. "Enlarge figure". */
  enlargeLabel: string;
  /** Opens the frame at full size. */
  onEnlarge: (img: SlotImage) => void;
  /** Grid placement, decided by the page since it depends on the viewport. */
  gridColumn?: string;
};

/**
 * One exported frame on a case-study sheet, with its mono caption beneath.
 * Most frames are 1936px documents shown in a column a third of that, so a
 * transparent button over the frame opens it at full size. The button sits
 * beside the image rather than around it, so the image keeps its own alt.
 */
export function Figure({ img, lang, enlargeLabel, onEnlarge, gridColumn }: Props) {
  if (!img) return null;

  const caption = pick(img.caption, lang);
  // Frames the body copy already describes stay decorative; the caption names
  // them. Tables and diagrams carry their content in `alt`.
  const alt = img.alt ? pick(img.alt, lang) : '';

  const image = (
    <img
      className={img.device ? 'device__img' : 'figure__img'}
      src={pick(img.src, lang)}
      alt={alt}
      width={img.w}
      height={img.h}
      loading="lazy"
      decoding="async"
    />
  );
  const zoom = (
    <button
      type="button"
      className="figure__zoom"
      aria-label={`${enlargeLabel}: ${caption}`}
      onClick={() => onEnlarge(img)}
    />
  );

  const style = gridColumn ? { gridColumn } : undefined;

  return (
    <figure className={`figure${img.device ? ' figure--device' : ''}`} style={style}>
      {img.device ? (
        // The device crops a tall screen to its viewport; the zoom opens the
        // whole frame.
        <div className="figure__frame figure__frame--device">
          <Device kind={img.device}>{image}</Device>
          {zoom}
        </div>
      ) : (
        <div
          className={`figure__frame${img.ground ? ' figure__frame--ground' : ''}`}
          style={{ aspectRatio: `${img.w} / ${img.h}`, ...(img.ground ? { '--glow': img.ground } : {}) } as CSSProperties}
        >
          {image}
          {zoom}
        </div>
      )}
      <figcaption className="figure__cap">{caption}</figcaption>
    </figure>
  );
}
