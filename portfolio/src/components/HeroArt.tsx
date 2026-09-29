import type { CSSProperties } from 'react';

/** Stroke that draws itself, then flies in from one edge. */
function draw(enter: string, delay: number, drawS = 0.7): CSSProperties {
  return {
    animationName: `pbStroke, ${enter}`,
    animationDuration: `${drawS}s, .95s`,
    animationDelay: `${delay}s, ${delay}s`,
    animationTimingFunction: 'cubic-bezier(.62,.03,.3,1), cubic-bezier(.16,.84,.3,1)',
    animationFillMode: 'both, both',
  };
}

const LINE = 'rgba(150,180,205,.46)';
const LINE_SOFT = 'rgba(150,180,205,.32)';
const LINE_FAINT = 'rgba(150,180,205,.24)';
const ANNO: CSSProperties = {
  fontFamily: "'IBM Plex Mono',monospace",
  fontSize: '9px',
  letterSpacing: '.18em',
  fill: '#5E7386',
};

/**
 * The technical drawing beside the hero title: a titleblock frame, dimension
 * annotations, a receding wireframe and a UI sketch on top.
 */
export function HeroArt({ show, showAnnotations }: { show: boolean; showAnnotations: boolean }) {
  if (!show) return null;

  return (
    <div data-noprint data-hero-art data-parallax className="hero__art" aria-hidden="true">
      <svg viewBox="0 0 520 520" fill="none" preserveAspectRatio="xMidYMid meet">
        <g
          style={{
            transform: 'translate(calc(var(--pbx,0) * -6px), calc(var(--pby,0) * -5px))',
            transition: 'transform 1s cubic-bezier(.2,.7,.2,1)',
          }}
        >
          {/* Outer frame */}
          <path d="M120,120 H376" pathLength={1} stroke={LINE} strokeWidth={1} strokeDasharray="1" style={draw('pbInDown', 0.1)} />
          <path d="M400,144 V400" pathLength={1} stroke={LINE} strokeWidth={1} strokeDasharray="1" style={draw('pbInRight', 0.28)} />
          <path d="M400,400 H120" pathLength={1} stroke={LINE} strokeWidth={1} strokeDasharray="1" style={draw('pbInUp', 0.16)} />
          <path d="M120,400 V120" pathLength={1} stroke={LINE} strokeWidth={1} strokeDasharray="1" style={draw('pbInLeft', 0.22)} />
          <path
            d="M376,120 A24,24 0 0 1 400,144"
            pathLength={1}
            stroke={LINE}
            strokeWidth={1}
            strokeDasharray="1"
            style={draw('pbInRight', 0.68, 0.4)}
          />
          <path d="M260,60 V138" pathLength={1} stroke={LINE_SOFT} strokeWidth={1} strokeDasharray="1" style={draw('pbInDown', 0.42, 0.5)} />
          <path d="M260,386 V460" pathLength={1} stroke={LINE_SOFT} strokeWidth={1} strokeDasharray="1" style={draw('pbInUp', 0.48, 0.5)} />

          {/* Detail circle */}
          <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'pbInPop .85s cubic-bezier(.16,.84,.3,1) .55s both' }}>
            <path
              d="M416,300 A24,24 0 0 1 464,300 A24,24 0 0 1 416,300"
              pathLength={1}
              stroke="rgba(63,208,255,.55)"
              strokeWidth={1}
              strokeDasharray="1"
              style={{ animation: 'pbStroke .7s cubic-bezier(.62,.03,.3,1) .55s both' }}
            />
          </g>

          {/* Dimension annotations */}
          {showAnnotations && (
            <g>
              <path d="M120,88 H400" pathLength={1} stroke={LINE_SOFT} strokeWidth={1} strokeDasharray="1" style={draw('pbInLeft', 0.8, 0.55)} />
              <path d="M120,80 V96" pathLength={1} stroke={LINE} strokeWidth={1} strokeDasharray="1" style={draw('pbInLeft', 0.9, 0.3)} />
              <path d="M400,80 V96" pathLength={1} stroke={LINE} strokeWidth={1} strokeDasharray="1" style={draw('pbInLeft', 0.9, 0.3)} />
              <text x={260} y={84} textAnchor="middle" style={{ ...ANNO, animation: 'pbAnno .7s cubic-bezier(.16,.84,.3,1) 1.1s both' }}>
                A—A
              </text>

              <path d="M120,432 V448" pathLength={1} stroke={LINE} strokeWidth={1} strokeDasharray="1" style={draw('pbInLeft', 0.95, 0.3)} />
              <path d="M400,432 V448" pathLength={1} stroke={LINE} strokeWidth={1} strokeDasharray="1" style={draw('pbInLeft', 0.95, 0.3)} />
              <path d="M120,440 H236" pathLength={1} stroke={LINE_SOFT} strokeWidth={1} strokeDasharray="1" style={draw('pbInLeft', 1, 0.4)} />
              <path d="M284,440 H400" pathLength={1} stroke={LINE_SOFT} strokeWidth={1} strokeDasharray="1" style={draw('pbInLeft', 1, 0.4)} />
              <text x={260} y={443} textAnchor="middle" style={{ ...ANNO, animation: 'pbAnno .7s cubic-bezier(.16,.84,.3,1) 1.18s both' }}>
                120 mm
              </text>

              <path
                d="M400,300 H412"
                pathLength={1}
                stroke={LINE_FAINT}
                strokeWidth={1}
                strokeDasharray="1"
                style={{
                  animationName: 'pbStroke, pbInRight, pbBreathe',
                  animationDuration: '.3s, .95s, 9s',
                  animationDelay: '1.28s, 1.28s, 3.4s',
                  animationTimingFunction: 'cubic-bezier(.62,.03,.3,1), cubic-bezier(.16,.84,.3,1), ease-in-out',
                  animationFillMode: 'both, both, none',
                  animationIterationCount: '1, 1, 3',
                }}
              />
              <text x={440} y={266} textAnchor="middle" style={{ ...ANNO, animation: 'pbInRight .7s cubic-bezier(.16,.84,.3,1) 1.34s both' }}>
                Ø48
              </text>

              <path d="M394,130 L440,106" pathLength={1} stroke={LINE_FAINT} strokeWidth={1} strokeDasharray="1" style={draw('pbInRight', 1.38, 0.35)} />
              <text x={444} y={104} textAnchor="start" style={{ ...ANNO, animation: 'pbInRight .7s cubic-bezier(.16,.84,.3,1) 1.44s both' }}>
                R24
              </text>

              <g style={{ animation: 'pbNudge 11s ease-in-out 3s 3' }}>
                <text x={132} y={144} textAnchor="start" style={{ ...ANNO, animation: 'pbAnno .7s cubic-bezier(.16,.84,.3,1) 1.5s both' }}>
                  01
                </text>
              </g>
            </g>
          )}

          {/* Wireframe boxes that recede once the UI sketch lands */}
          <g style={{ opacity: 0.3, animation: 'pbRecede .8s ease 1.75s both' }}>
            <path d="M150,150 H370 V206 H150 Z" pathLength={1} stroke={LINE} strokeWidth={1} strokeDasharray="1" style={draw('pbInDown', 1.12)} />
            <path d="M150,222 H370 V318 H150 Z" pathLength={1} stroke={LINE} strokeWidth={1} strokeDasharray="1" style={draw('pbInLeft', 1.22)} />
            <path d="M150,334 H370 V374 H150 Z" pathLength={1} stroke={LINE} strokeWidth={1} strokeDasharray="1" style={draw('pbInUp', 1.32)} />
          </g>

          {/* UI sketch */}
          <g className="hero-ui" style={{ pointerEvents: 'auto', opacity: 0.82, animation: 'pbUiIn .75s cubic-bezier(.16,.84,.3,1) 1.78s both' }}>
            <rect x={150} y={150} width={220} height={56} rx={9} stroke="rgba(150,180,205,.55)" strokeWidth={1} />
            <rect x={166} y={172} width={44} height={8} rx={4} fill="rgba(150,180,205,.34)" />
            <circle cx={332} cy={176} r={2.5} fill="rgba(150,180,205,.4)" />
            <circle cx={342} cy={176} r={2.5} fill="rgba(150,180,205,.4)" />
            <circle cx={352} cy={176} r={2.5} fill="rgba(150,180,205,.4)" />
            <rect x={150} y={222} width={220} height={96} rx={11} stroke="rgba(150,180,205,.55)" strokeWidth={1} fill="rgba(150,180,205,.035)" />
            <circle cx={180} cy={252} r={11} stroke="rgba(150,180,205,.4)" strokeWidth={1} />
            <rect x={202} y={243} width={86} height={7} rx={3.5} fill="rgba(150,180,205,.3)" />
            <rect x={202} y={257} width={52} height={7} rx={3.5} fill="rgba(150,180,205,.2)" />
            <rect x={168} y={288} width={184} height={6} rx={3} fill="rgba(150,180,205,.16)" />
            <rect x={150} y={334} width={116} height={40} rx={20} fill="rgba(63,208,255,.85)" />
            <rect x={176} y={351} width={64} height={6} rx={3} fill="#04080D" />
          </g>

          {/* Crosshair, drifting with the pointer */}
          <g
            style={{
              transform: 'translate(calc(var(--pbx,0) * 24px), calc(var(--pby,0) * 20px))',
              transition: 'transform 1.15s cubic-bezier(.16,.84,.3,1)',
            }}
          >
            <g style={{ animation: 'pbCrossDrift 16s ease-in-out 3s 2' }}>
              <g
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                  opacity: 0.32,
                  animation: 'pbInPop .7s cubic-bezier(.16,.84,.3,1) 1.9s both, pbPulse 6s ease-in-out 3s 3',
                }}
              >
                <path d="M440,286 V314" stroke="#3FD0FF" strokeWidth={1} />
                <path d="M426,300 H454" stroke="#3FD0FF" strokeWidth={1} />
                <circle cx={440} cy={300} r={5} stroke="#3FD0FF" strokeWidth={1} />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
