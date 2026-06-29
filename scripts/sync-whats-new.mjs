#!/usr/bin/env node
/**
 * sync-whats-new.mjs
 *
 * Single source of truth = connie-vault/Changelog.md (internal, gated).
 * This script generates the PUBLIC "What's New" page (docs/whats-new.md) from it,
 * filtering out internal-only bits (gated /operations links, the "how to add an
 * entry" template, behind-the-scenes notes, vault-local images).
 *
 * Runs automatically on `npm run build` (via the "prebuild" hook) and on demand
 * via `npm run sync-whats-new`.
 *
 * CI-SAFE: if the vault changelog isn't present (e.g. GitHub Actions, where only
 * docs.connie is checked out), it NO-OPS and keeps the committed page. It must
 * NEVER fail a build — any error exits 0.
 */
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Source: env override (for CI with a vault checkout) or the local sibling repo.
const SRC =
  process.env.CONNIE_VAULT_CHANGELOG ||
  path.resolve(__dirname, '../../../vault/connie-vault/Changelog.md');
const OUT = path.resolve(__dirname, '../docs/whats-new.md');

const HEADER = `---
title: "What's New"
sidebar_label: "What's New"
sidebar_position: 1
description: "The latest Connie features and improvements — what changed, and where to learn more."
hide_table_of_contents: true
---

{/* ⚠️ AUTO-GENERATED — do not edit by hand.
    Source of truth: connie-vault/Changelog.md (internal).
    Regenerate locally: npm run sync-whats-new  (also runs on npm run build). */}

# 🎉 What's New in Connie

The latest Connie features and improvements — newest first. Each item links to the full guide in these docs.

---
`;

async function main() {
  let raw;
  try {
    raw = await fs.readFile(SRC, 'utf8');
  } catch {
    console.warn(`[sync-whats-new] vault changelog not found at ${SRC} — keeping committed whats-new.md (no-op).`);
    return;
  }

  const startIdx = raw.search(/^## \d{4}-\d{2}-\d{2}/m);
  if (startIdx === -1) {
    console.warn('[sync-whats-new] no dated entries found — no-op.');
    return;
  }
  const endIdx = raw.search(/^## How to add an entry/m);
  let body = raw.slice(startIdx, endIdx === -1 ? undefined : endIdx);

  // Strip internal-only "Behind the scenes … — Documentation" blocks.
  body = body.replace(/### 🔒 Behind the scenes[\s\S]*?\*— Documentation\*\s*/g, '');

  // Line-level strips.
  body = body
    .split('\n')
    .filter((line) => {
      const t = line.trim();
      // Keep images that point to a public, fully-qualified asset (e.g. a gif/screenshot
      // hosted at https://docs.connie.one/img/...), so they render on the public page.
      // Strip vault-local images (./changelog-assets/...) — those are internal-only.
      if (t.startsWith('![')) return /\]\(https?:\/\//.test(t);
      if (t.includes('](/operations')) return false; // gated vault links
      if (/^\*—\s/.test(t)) return false; // leftover author signatures
      return true;
    })
    .join('\n');

  // Bulletproof MDX: escape stray "<" so a future entry can't break the build.
  body = body.replace(/</g, '&lt;');

  // Tidy: collapse blank runs, drop leading + trailing orphan separators.
  body = body
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\s*---\s*\n/, '')
    .replace(/\n\s*-{3,}\s*$/, '')
    .trim();

  const footer = `

---

*Looking for help with a feature? See [Get Support](/get-support/overview).*
`;

  const out = `${HEADER}\n${body}\n${footer}`;
  await fs.writeFile(OUT, out, 'utf8');
  console.log(`[sync-whats-new] wrote ${path.relative(process.cwd(), OUT)} (${out.length} bytes) from vault changelog.`);
}

main().catch((e) => {
  console.warn('[sync-whats-new] non-fatal error, keeping committed page:', e.message);
  process.exit(0);
});
