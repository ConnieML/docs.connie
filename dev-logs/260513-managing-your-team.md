---
sprint: Managing Your Team — Admin/Supervisor docs gap fill
date: 2026-05-13
owner: CDO
status: In Progress
related: CTO seed (display-name explainer), CON-TBD (runbook migration head)
---

# Sprint: Managing Your Team — Admin/Supervisor docs gap fill

## Why

CEO + CDO audit of docs.connie.one (2026-05-13) found the Administrators and Supervisors sections are largely placeholder. The site has nothing public on **adding, skilling, removing agents** or **managing teams**. The closest existing content is `/getting-started/roles-permissions` (a concepts page).

This sprint fills the first slice: the display-name explainer (CTO seed) + a scaffolded **Managing Your Team** section with screenshot anchors for Andrea Lavado to populate.

## Scope (Phase 1 — this sprint)

- **NEW** `docs/end-users/administrators/managing-your-team/`
  - `_category_.json`
  - `index.md` — landing, what an admin can do here
  - `display-names.md` — **fully authored** (CTO seed, refined + placed)
  - `add-an-agent.md` — stub, scope visible
  - `assign-skills.md` — stub
  - `manage-teams-queues.md` — stub
  - `remove-or-deactivate.md` — stub
- **EDIT** `docs/end-users/supervisors/overview.md` — cross-link to display-names + retire stale "CBO Admin guides" pointer
- Screenshot placeholders use a loud quote-block pattern visible to Andrea
- PeoplePerson task filed under Andrea Lavado (Connie tenant) AFTER deploy succeeds + deep-links validated

## Out of scope (Phase 2 — future)

The four stub pages (`add-an-agent`, `assign-skills`, `manage-teams-queues`, `remove-or-deactivate`) need authoritative source content. Two options surface that source:
1. The CON runbook migration head (Connie runbooks → vault.connie.one) — internal source we can lift from
2. CTO-Connie walkthrough of the basecamp v26.02 admin UI

Phase 2 sprint should sequence after one of those lands. Don't write fictional documentation.

## Deliverable URLs (post-deploy, to validate)

- https://docs.connie.one/end-users/administrators/managing-your-team/
- https://docs.connie.one/end-users/administrators/managing-your-team/display-names
- https://docs.connie.one/end-users/administrators/managing-your-team/add-an-agent
- https://docs.connie.one/end-users/administrators/managing-your-team/assign-skills
- https://docs.connie.one/end-users/administrators/managing-your-team/manage-teams-queues
- https://docs.connie.one/end-users/administrators/managing-your-team/remove-or-deactivate

## Pre-deploy gates

- `npm run build` clean
- No broken links
- Mobile rendering checked
- All placeholder blocks visually loud

## Sprint close

(Filled at close — deploy run ID, validated URLs, PP task ID for Andrea.)
