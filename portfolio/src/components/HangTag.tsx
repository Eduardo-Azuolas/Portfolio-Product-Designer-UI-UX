import { pick } from '../i18n/pick';
import type { HangTag as HangTagProps, Lang } from '../types';
import { Device, ScreenImg } from './Device';

type Props = HangTagProps & { lang: Lang; eager?: boolean };

/**
 * The product page in a browser, with the grade it shows tied to the window
 * as a paper hang tag — the thing a physical thrift store does, which is what
 * the grade is standing in for online. The tag carries the whole scale with
 * the chosen grade punched out, so the one word on the page reads as a
 * position on a fixed ladder. It sways a little on its string; it hangs still
 * when motion is reduced. Decorative: the section text says the same.
 */
export function HangTag({ screen, url, eyebrow, grade, level, scale, note, caption, lang, eager }: Props) {
  return (
    <figure className="tag">
      <div className="tag__stage">
        <div className="tag__browser">
          <Device kind="browser" url={url} fit={{ w: screen.w, h: screen.h }}>
            <ScreenImg screen={screen} lang={lang} eager={eager} />
          </Device>
        </div>
        <div className="tag__hang" aria-hidden="true">
          <svg className="tag__string" viewBox="0 0 100 120" preserveAspectRatio="none">
            <path d="M 3 2 C 20 70, 70 40, 99 118" />
          </svg>
          <span className="tag__pin" />
          <div className="tag__card">
            <span className="tag__hole" />
            <p className="tag__eyebrow">{eyebrow[lang]}</p>
            <p className="tag__grade">{grade[lang]}</p>
            <p className="tag__meter">
              {[0, 1, 2, 3].map((i) => (
                <i key={i} className={i < level ? 'is-on' : undefined} />
              ))}
            </p>
            <ol className="tag__scale">
              {scale.map((s, i) => (
                <li key={i} className={scale.length - i === level ? 'is-picked' : undefined}>
                  <span>{s[lang]}</span>
                </li>
              ))}
            </ol>
            <p className="tag__note">{note[lang]}</p>
          </div>
        </div>
      </div>
      {caption && <figcaption className="figure__cap">{pick(caption, lang)}</figcaption>}
    </figure>
  );
}
