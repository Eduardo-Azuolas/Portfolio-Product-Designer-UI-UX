/**
 * The EA monogram, rebuilt as vector from the construction sheet in
 * assets/Logo.jpg — that file is a JPG of the spec drawing, with the dimension
 * callouts and a fake transparency checkerboard baked into the pixels, so it
 * could not be traced automatically.
 *
 * Geometry, on a 64 x 42 field:
 *   E     stem plus three arms, each cut off parallel to the A's leading edge
 *         and held 2.5 units clear of it, which is the gap the sheet draws.
 *   A     two legs splaying from a shared 9.5-wide apex; the triangular counter
 *         opens where the inner edges part and is closed by the crossbar.
 *
 * Fill is currentColor, so it takes the brand button's hover and press states
 * with no extra rules.
 */
export function Logo({ height = 20 }: { height?: number }) {
  return (
    <svg
      className="logo"
      viewBox="0 0 64 42"
      height={height}
      width={(height * 64) / 42}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {/* E — stem, then the three arms, sheared along the A's diagonal. */}
      <path d="M0 0h9v42H0z" />
      <path d="M0 0h40l-4.95 8H0z" />
      <path d="M0 17h29.5l-5 8H0z" />
      <path d="M0 34h19l-5 8H0z" />

      {/* A — the legs share the apex edge, so the counter opens on its own. */}
      <path d="M42.5 0H52L26 42h-9.5z" />
      <path d="M42.5 0H52l12 42h-9.5z" />
      <path d="M26.4 26h33l2.3 8H21.45z" />
    </svg>
  );
}
