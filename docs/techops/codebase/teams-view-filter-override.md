---
sidebar_label: "Teams View Filter Override (Department, Team)"
sidebar_position: 5
title: "Teams View Filter Override — when basecamp's filter loses to Flex defaults"
---

# Teams View Filter Override — when basecamp's filter loses to Flex defaults

## Role / Authority

You are operating as **CTO-Connie**. This is an interim platform fix that touches account-scoped plugin code and a Flex Plugin Service release. Do not perform any deploy without explicit CEO approval (per `~/projects/connie/rtc/basecamp-v26.02/CLAUDE.md` deploy-safety doctrine).

## When this applies

**Symptom on a Connie-managed Flex account:**

- `/teams` (Supervisor) view's **Department** filter dropdown shows Twilio's native defaults (`Customer Service / Finance / General Management / Human Resources / Marketing / Operations / Purchasing / Recruiting / Sales`) instead of the values deployed in `ui_attributes.<account>.json` under `custom_data.common.departments`.
- Same problem can appear on the **Team** filter (native defaults instead of `custom_data.common.teams`).
- Pulling the live Flex Configuration via `GET /v1/Configuration` confirms `custom_data.common.departments` IS set correctly on the account.
- Hard-refresh, incognito, basecamp plugin redeploy — none of them fix it.

If the symptom is "I changed `custom_data.common.departments` and don't see the new values immediately," the Plugin Service config cache is the more likely cause first — wait ~5 min and hard-refresh before assuming this pattern.

## Read first

Before touching anything:

1. **`~/projects/connie/rtc/basecamp-v26.02/CLAUDE.md`** — the deploy-safety protocol, the Template Variable Form Discipline section, and the post-deploy hygiene rule for committing the auto-bumped plugin version.
2. **basecamp source for the broken hook** — `~/projects/connie/rtc/basecamp-v26.02/plugin-flex-ts-template-v2/src/feature-library/teams-view-filters/` (config, filters, flex-hooks). This is the code path that *should* be putting the custom departments into the dropdown but currently is not winning over Flex SDK defaults.
3. **The plugin scaffold** — `~/projects/connie/clients/nss/flex-plugins/nss-teams-filters/` (`README.md` has account SID + deploy steps). For new accounts hitting the same symptom, copy this directory, rename, swap the account SID, deploy.

## Safety rails

| Rule | Why |
|---|---|
| **Do not** `POST /v1/Configuration` directly to "patch" departments. | Per basecamp `CLAUDE.md`: direct Configuration API writes create drift between source files and live, which will regress on the next deploy. The two authorized paths are `/template-admin` + source-file sync, or full deploy pipeline. This issue is a *plugin* problem; do not paper over it with a config write. |
| **Do not** redeploy `plugin-flex-ts-template-v2` to the affected account as the fix. | The `teams_view_filters` feature code on the currently-deployed basecamp release is identical to what's in the local fork (`teams-view-filters` directory has not been touched since the account's last deploy in any case we've audited). A basecamp redeploy ships ~14 new TroubleTracker files and a new SupportTicket channel handler to the account along for the ride — much larger blast radius, no fix. |
| **Do not** edit Worker `attributes.department` to `department_name` to "match the filter." | The basecamp `departmentFilter.tsx` uses `fieldName: 'department_name'` (Flex Insights schema), but Worker TaskRouter attributes use `department`. The override plugin in this runbook uses `fieldName: 'department'` to match the TaskRouter attribute — no Worker rename needed. |
| **Do not** scaffold a generic, all-accounts version of the override plugin without an explicit CEO call. | Per the no-territorial-issue-routing memory and the basecamp-as-shared-base doctrine, fixes that affect every account belong upstream in basecamp's `teams_view_filters` feature. This pattern doc is for account-scoped interim fixes. |

## Diagnosis — 60-second DevTools recipe

Reproduce the symptom in a browser session, open DevTools console, run:

```javascript
(() => {
  const F = window.Twilio?.Flex || window.Flex;
  const filters = F.TeamsView.defaultProps.filters;
  const dept = filters.find(f => f?.fieldName === 'department_name' || /department/i.test(f?.id ?? ''));
  return {
    filter_count: filters.length,
    department_filter_options: dept?.options?.map(o => o?.value ?? o),
    department_field_name: dept?.fieldName,
    department_has_customStructure: !!dept?.customStructure,
  };
})();
```

**Reading the result:**

- `department_filter_options` is a list of Twilio's native defaults (`Customer Service`, `Finance`, etc.) → the override pattern in this doc applies. basecamp's filter is not winning.
- `department_filter_options` is your expected values → not this problem. Look elsewhere (Plugin Service config cache, worker attribute mismatch).
- `department_filter_options` is empty `[]` → basecamp's filter IS winning but `custom_data.common.departments` is unreadable at runtime. Different problem — check `manager.configuration.custom_data` directly and verify the deploy actually shipped the source file.

## Why basecamp's filter loses to native defaults

The basecamp `teams_view_filters` feature registers a `teamsFilterHook` that returns an array of `FilterDefinition` objects (`plugin-flex-ts-template-v2/src/feature-library/teams-view-filters/flex-hooks/teams-filters/TeamsFilters.ts`). In current Flex SDK versions, that registration path does NOT replace `Flex.TeamsView.defaultProps.filters` — Flex's native defaults remain in place and the basecamp filter never reaches the rendered dropdown.

The canonical pattern in Twilio's own support documentation is **direct reassignment** of `Flex.TeamsView.defaultProps.filters` at plugin init, which is what this override does. Until basecamp's hook contract is repaired upstream (or Flex SDK behavior changes back), direct reassignment is the only reliable override path.

## Fix — account-scoped Flex plugin

**Reference implementation:** `~/projects/connie/clients/nss/flex-plugins/nss-teams-filters/` (NSS account, currently the only Connie account exhibiting the symptom).

The plugin's `init()` does, in this order:

1. Reads `Flex.Manager.getInstance().configuration.custom_data.common.{departments,teams}` at boot.
2. Locates a sibling working **select** filter in the existing `Flex.TeamsView.defaultProps.filters` array (Team filter is reliable) to copy its `customStructure` field — Flex needs that renderer hint or the dropdown renders blank.
3. Builds new Department + Team filter definitions from the config arrays using the copied `customStructure`.
4. Reassigns `Flex.TeamsView.defaultProps.filters` to the new array.

Full source: `src/NSSTeamsFiltersPlugin.tsx` in the plugin directory.

### Critical detail — `customStructure` is required

A `FilterDefinition` without `customStructure` renders the heading but no input control. The override copies `customStructure` from a sibling working select filter (Team) at runtime. This is the difference between a working dropdown and a visually-empty Department row.

### The plugin reads config, not hardcoded values

The override does NOT hardcode `[RAMP, PCA, H2H, ...]`. It reads the same `custom_data.common.departments` that lives in `flex-config/ui_attributes.<account>.json`. So when departments change, the existing flex-config deploy path handles it — no plugin redeploy needed for value changes.

## Deploy

Spelled out in the plugin's `README.md`. Summary:

1. From the plugin directory: `npm install` (first time).
2. Confirm Twilio CLI profile is the target account: `twilio profiles:list && twilio profiles:use <ACCOUNT>`.
3. `npm run deploy && npm run release`.
4. Commit the auto-bumped `package.json` version (post-deploy hygiene rule).
5. Smoke test on the live URL.

## Definition of Done

End-to-end on the affected account:

- [ ] DevTools `Flex.TeamsView.defaultProps.filters[<dept index>].options` returns the values from `custom_data.common.departments` (NOT the Twilio defaults).
- [ ] `/teams` Filter pane → Department dropdown shows the configured values.
- [ ] Selecting one value + Apply drops the worker count to only workers whose TaskRouter `attributes.department` matches.
- [ ] The plugin's release shows up in the account's Plugin Service Releases tab.
- [ ] Plugin's `package.json` version bump is committed to git.

## Reference smoke evidence (NSS, 2026-05-15)

NSS is the first Connie account to hit this. Before the override, `/teams` Department dropdown showed Twilio's 9 native defaults. After the in-session DevTools test of the same override pattern (proving the approach works), the dropdown showed NSS's 6 configured departments (`RAMP / PCA / H2H / ADC-Jones / ADC-Henderson / Admin`) and selecting `PCA` correctly dropped the worker list from 24 → 7 workers matching `attributes.department=PCA` exactly per the NSS Department Grid.

## When to retire this plugin

The plugin is interim. Retire as soon as basecamp's `teams_view_filters` feature is fixed upstream so that registered filters actually replace `Flex.TeamsView.defaultProps.filters` again. Test for that condition on any basecamp plugin upgrade by:

1. Deploying the upgraded basecamp plugin to a test account.
2. Running the diagnosis recipe above.
3. If `department_filter_options` shows the configured values without the override plugin loaded → the upstream fix has landed.
4. Archive the override plugin in the Plugin Service console, then remove the directory from `clients/<account>/flex-plugins/`.

## If a different account hits the same symptom

The override is config-driven, so the same plugin code works for any account once retargeted:

1. Copy the plugin directory: `cp -r ~/projects/connie/clients/nss/flex-plugins/nss-teams-filters/ ~/projects/connie/clients/<account>/flex-plugins/<account>-teams-filters/`.
2. In the copy: rename `PLUGIN_NAME` in `src/<NewName>Plugin.tsx`, update `name` and `description` in `package.json`, update the account SID in `README.md`.
3. Ensure `flex-config/ui_attributes.<account>.json` includes `custom_data.common.departments` (and `.teams` if used) with the desired values, and that config has been deployed.
4. Deploy per the steps above against the new account's Twilio CLI profile.

## Related

- [Authoring & Publishing Runbooks](/techops/troubleshooting/authoring-runbooks) — when a single-feature runbook set would be a better fit than this pattern doc.
- [Common Issues](/techops/troubleshooting/common-issues) — symptom-driven catalogue; this doc is linked from there under "Teams View."
- basecamp source: `~/projects/connie/rtc/basecamp-v26.02/plugin-flex-ts-template-v2/src/feature-library/teams-view-filters/`
- Plugin scaffold: `~/projects/connie/clients/nss/flex-plugins/nss-teams-filters/`
