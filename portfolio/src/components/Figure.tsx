import { pick } from '../i18n/pick';
import type { Lang, SlotImage } from '../types';

type Props = {
  /** Nothing renders without an image — a missing figure leaves no gap. */
  img?: SlotImage | null;
  lang: Lang;
};

/** One exported frame on a case-study sheet, with its mono caption beneath. */
export function Figure({ img, lang }: Props) {
  if (!img) return null;

  const caption = pick(img.caption, lang);

  return (
    <figure className="figure">
      <div className="figure__frame" style={{ aspectRatio: `${img.w} / ${img.h}` }}>
        <img
          className="figure__img"
          src={pick(img.src, lang)}
          // The figcaption below states this; a matching alt reads it twice.
          alt=""
          width={img.w}
          height={img.h}
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption className="figure__cap">{caption}</figcaption>
    </figure>
  );
}
