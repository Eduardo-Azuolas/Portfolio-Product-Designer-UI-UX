import type { CSSProperties, ReactNode } from 'react';
import { pick } from '../i18n/pick';
import type { DeviceKind, Lang, Screen } from '../types';

/** The viewport each device shows, in points. Taller screens are cropped. */
const VIEWPORT: Record<DeviceKind, { w: number; h: number }> = {
  phone: { w: 390, h: 844 },
  browser: { w: 1440, h: 900 },
};

type DeviceProps = {
  kind: DeviceKind;
  /** Address shown in the browser chrome. */
  url?: string;
  className?: string;
  style?: CSSProperties;
  /** Shows the whole screen at its own ratio instead of the device viewport. */
  fit?: { w: number; h: number };
  children: ReactNode;
};

/**
 * A phone or browser drawn in CSS, sized entirely from its own width so the
 * same markup works as a 70px thumbnail and a 1000px hero. Everything inside
 * is decorative: the device never carries meaning the page text does not.
 */
export function Device({ kind, url, className, style, fit, children }: DeviceProps) {
  const vp = VIEWPORT[kind];
  return (
    <div className={`device device--${kind}${className ? ` ${className}` : ''}`} style={style}>
      <div className="device__body">
        {kind === 'browser' && (
          <div className="device__bar" aria-hidden="true">
            <i />
            <i />
            <i />
            {url && <span className="device__url">{url}</span>}
          </div>
        )}
        <div className="device__screen" style={{ aspectRatio: fit ? `${fit.w} / ${fit.h}` : `${vp.w} / ${vp.h}` }}>
          {children}
        </div>
        {kind === 'phone' && <span className="device__island" aria-hidden="true" />}
      </div>
    </div>
  );
}

type ScreenImgProps = {
  screen: Screen;
  lang: Lang;
  alt?: string;
  eager?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Hidden from assistive tech, e.g. a screen that is not the active step. */
  hidden?: boolean;
};

/** An exported screen filling a device's width, anchored to its top. */
export function ScreenImg({ screen, lang, alt = '', eager, className, style, hidden }: ScreenImgProps) {
  return (
    <img
      className={`device__img${className ? ` ${className}` : ''}`}
      src={pick(screen.src, lang)}
      alt={alt}
      width={screen.w}
      height={screen.h}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      style={style}
      aria-hidden={hidden || undefined}
    />
  );
}

/**
 * How far a tall screen has to travel to show its bottom inside the device,
 * as a percentage of the image's own height. Zero when it already fits.
 */
export function travel(kind: DeviceKind, screen: Screen): number {
  const vp = VIEWPORT[kind];
  const ratio = screen.h / screen.w;
  const fit = vp.h / vp.w;
  return ratio > fit ? ((ratio - fit) / ratio) * 100 : 0;
}
