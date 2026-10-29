import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { DesktopShell } from '@personal-os/desktop-shell';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Personal OS initialization failed: missing #root element.');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <DesktopShell
      title="Personal OS"
      header={<h1>Personal OS</h1>}
      status={{
        connection: 'offline',
        message: 'Preview only — no backend services connected.',
      }}
    >
      <section aria-labelledby="desktop-preview-title">
        <h2 id="desktop-preview-title">Desktop preview</h2>
        <p>The reusable Personal OS shell is hosted by this browser application.</p>
        <p>
          Private backend, file service, persistent storage, and local AI are not
          connected. This preview provides the desktop frame only.
        </p>
      </section>
    </DesktopShell>
  </React.StrictMode>,
);
