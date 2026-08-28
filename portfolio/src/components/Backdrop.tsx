/** Fixed drafting grid, coarse overlay and vignette that sit behind every page. */
export function Backdrop() {
  return (
    <>
      <div data-noprint data-scroll-plot className="scroll-plot" aria-hidden="true" />
      <div className="backdrop backdrop--fine" aria-hidden="true" />
      <div className="backdrop backdrop--coarse" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
    </>
  );
}
