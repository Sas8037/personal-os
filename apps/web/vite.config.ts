import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const codespaceName = process.env.CODESPACE_NAME;
const forwardingDomain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN;
const dnsLabel = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i;
const forwardedHost =
  codespaceName && forwardingDomain
    ? `${codespaceName}-5173.${forwardingDomain}`
    : '';

// Accept one exact DNS hostname, never a wildcard or a URL from the environment.
const allowedHosts =
  codespaceName &&
  dnsLabel.test(codespaceName) &&
  forwardingDomain &&
  forwardingDomain.split('.').length > 1 &&
  forwardedHost.length <= 253 &&
  forwardedHost.split('.').every((label) => dnsLabel.test(label))
    ? [forwardedHost]
    : [];

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts,
  },
});
