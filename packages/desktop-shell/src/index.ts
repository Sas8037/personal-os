/**
 * Public entry point for the reusable Personal OS desktop shell.
 *
 * The shell is designed to be hosted by a browser or another frontend later.
 * It does not depend on an existing apps/web implementation.
 *
 * Components will be exported from this file when implemented. Until then,
 * only a small, presentation-only status contract is available.
 */

/** Host-observed connectivity for display only; never an authorization signal. */
export type DesktopConnectionState = 'connecting' | 'connected' | 'offline';

/** Non-sensitive status supplied by a host adapter for shell presentation. */
export interface DesktopShellStatus {
  readonly connection: DesktopConnectionState;
  readonly message?: string;
}
