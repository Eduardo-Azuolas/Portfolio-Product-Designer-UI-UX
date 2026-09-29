import type { AnchorHTMLAttributes, MouseEvent } from 'react';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  /** Runs the in-app navigation for a plain left click. */
  onNavigate: () => void;
};

/**
 * A real link that the app routes itself on a plain left click. Anything else
 * — middle click, Cmd/Ctrl-click, "open in new tab", "copy link" — is left to
 * the browser, which is the point of rendering an anchor at all.
 */
export function RouteLink({ onNavigate, onClick, ...rest }: Props) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    onNavigate();
  };

  return <a {...rest} onClick={handle} />;
}
