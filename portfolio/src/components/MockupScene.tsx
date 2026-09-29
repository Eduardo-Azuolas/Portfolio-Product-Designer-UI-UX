import type { CSSProperties } from 'react';
import { pick } from '../i18n/pick';
import type { Lang, Scene } from '../types';
import { Device, ScreenImg } from './Device';

type Props = {
  scene: Scene;
  lang: Lang;
  /** The hero scene loads with the page; others wait for the scroll. */
  eager?: boolean;
};

/**
 * Devices composed in perspective on a drafting ground. The rig starts tilted
 * and settles as the scene scrolls into view (a CSS scroll-driven animation,
 * so browsers without it and reduced motion both get the settled pose).
 * Decorative: the caption names the screens, the section text explains them.
 */
export function MockupScene({ scene, lang, eager }: Props) {
  const ground = { '--glow': scene.glow ?? 'rgba(63, 208, 255, 0.18)' } as CSSProperties;

  return (
    <figure className={`scene scene--${scene.layout ?? 'perspective'}${eager ? ' scene--intro' : ''}`}>
      <div data-parallax className="scene__box" style={{ aspectRatio: String(scene.ratio), ...ground }} aria-hidden="true">
        <div className="scene__ground" />
        <div className="scene__tilt">
          <div className="scene__rig">
            {scene.shots.map((shot, i) => (
              <div
                key={i}
                className={`scene__shot scene__shot--${shot.device}`}
                style={
                  {
                    left: `${shot.x}%`,
                    top: `${shot.y}%`,
                    width: `${shot.width}%`,
                    '--depth': shot.depth ?? 0,
                    '--rot': `${shot.rotate ?? 0}deg`,
                  } as CSSProperties
                }
              >
                {shot.tag && <span className="scene__tag">{shot.tag[lang]}</span>}
                <Device kind={shot.device} url={scene.url}>
                  <ScreenImg screen={shot} lang={lang} eager={eager} />
                </Device>
              </div>
            ))}
          </div>
        </div>
      </div>
      {scene.caption && <figcaption className="figure__cap">{pick(scene.caption, lang)}</figcaption>}
    </figure>
  );
}
