import type { ReactNode } from 'react';
import type { DesktopShellStatus } from './index';

/** Visual regions supplied by a frontend host or a future shell module. */
export interface DesktopShellProps {
  /** Optional product name shown when the host does not supply a title. */
  readonly title?: string;
  /** Non-sensitive connection state used for presentation only. */
  readonly status?: DesktopShellStatus;
  /** Top bar, system menu, or other persistent header chrome. */
  readonly header?: ReactNode;
  /** Desktop icons, widgets, or an application workspace. */
  readonly children?: ReactNode;
  /** Dock or taskbar rendered below the main workspace. */
  readonly dock?: ReactNode;
  /** Window layer, dialogs, and other host-managed surfaces. */
  readonly overlays?: ReactNode;
  /** Additional styling hook owned by the integrating frontend. */
  readonly className?: string;
}

/**
 * Reusable presentation frame for Personal OS.
 *
 * This component does not load apps, access OS services, or enforce permissions.
 * A future application runtime owns lifecycle and privileged backends enforce
 * authorization. Class names define styling hooks; visual styling will live
 * in the shell's separate stylesheet or shared design system.
 */
export function DesktopShell({
  title = 'Personal OS',
  status,
  header,
  children,
  dock,
  overlays,
  className,
}: DesktopShellProps) {
  const classes = ['pwos-desktop-shell', className].filter(Boolean).join(' ');

  return (
    <div className={classes} data-connection={status?.connection ?? 'unknown'}>
      <header className="pwos-desktop-shell__header" aria-label="Desktop header">
        {header ?? <span className="pwos-desktop-shell__title">{title}</span>}
        {status && (
          <span className="pwos-desktop-shell__status" role="status">
            {status.message ?? status.connection}
          </span>
        )}
      </header>

      <main className="pwos-desktop-shell__workspace" aria-label={`${title} workspace`}>
        {children}
      </main>

      {dock && (
        <nav className="pwos-desktop-shell__dock" aria-label="Desktop dock">
          {dock}
        </nav>
      )}

      {overlays && <div className="pwos-desktop-shell__overlays">{overlays}</div>}
    </div>
  );
}

