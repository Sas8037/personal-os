/**
 * Public entry point for the reusable Personal OS desktop shell.
 *
 * The shell is designed to be hosted by a browser or another frontend later.
 * It does not depend on an existing apps/web implementation.
 *
 * Hosts import the desktop frame and its public types from this entry point,
 * without depending on private implementation paths.
 */

/** Host-observed connectivity for display only; never an authorization signal. */
export type DesktopConnectionState = 'connecting' | 'connected' | 'offline';

/** Non-sensitive status supplied by a host adapter for shell presentation. */
export interface DesktopShellStatus {
  readonly connection: DesktopConnectionState;
  readonly message?: string;
}

export { DesktopShell } from './DesktopShell';
export type { DesktopShellProps } from './DesktopShell';