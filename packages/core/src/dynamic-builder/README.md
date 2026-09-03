# Dynamic Builder

A governed website-builder plugin suite that ships with this GrapesJS build. It turns the raw editor
into a complete dynamic site builder: a themed app shell, a curated block library, accessible
component types, reusable components that stay in step across pages, scroll animations, no-code
interaction flows, design tokens, responsive devices, a full style manager, SEO and structured-data
managers, quality audits, data binding, persistence with revisions, a real code editor for custom
code, and a static export pipeline.

## Usage

```js
const editor = grapesjs.init({
  container: '#gjs',
  plugins: [grapesjs.dynamicBuilder],
});
```

Or with options:

```js
import grapesjs, { dynamicBuilder } from 'grapesjs';

grapesjs.init({
  container: '#gjs',
  plugins: [(editor) => dynamicBuilder(editor, { theme: { mode: 'dark' }, shell: { brandLabel: 'My Studio' } })],
});
```

## Modules

| Module                | Entry                      | Provides                                                                                   |
| --------------------- | -------------------------- | ------------------------------------------------------------------------------------------ |
| support               | applySiteMetaFoundation    | Site meta record wired into `project:get` / `project:load` and editor change tracking      |
| theme                 | applyEditorTheme           | Soft-UI editor chrome, light/dark/auto, shared UI primitives                               |
| icons                 | applyIconSystem            | 24x24 stroke icon library, db-icon component, SVG upload sanitization                      |
| designTokens          | applyDesignTokens          | `--db-*` CSS custom properties, token manager modal                                        |
| devices               | applyResponsiveDevices     | Six device presets, per-device visibility utilities                                        |
| styleSectors          | applyStyleSectors          | Layout, flex, grid, spacing, sizing, typography, backgrounds, borders, effects sectors     |
| typography            | applyTypographySystem      | Fluid type scale, tracking presets, prose styles, RTE actions, Google Fonts opt-in         |
| traits                | applyTraitTypes            | Slider, textarea, url, asset, date, json, analytics, binding, condition, aria-label traits |
| layoutComponents      | applyLayoutComponents      | Section, container, columns, column, spacer, divider                                       |
| contentComponents     | applyContentComponents     | Heading, text, quote, callout, button, button group, list                                  |
| mediaComponents       | applyMediaComponents       | Image, gallery with lightbox, carousel, click-to-load video and map                        |
| interactiveComponents | applyInteractiveComponents | Accordion, tabs, countdown, navbar, breadcrumb, social links, announcement                 |
| marketingComponents   | applyMarketingComponents   | Hero, features, cards, testimonial, logos, stats, pricing, team, contact, footer           |
| formComponents        | applyFormComponents        | Accessible form kit with validation, honeypot, consent                                     |
| dataBinding           | applyDataBinding           | Data source registry, `{{db:path}}` tokens, repeater, conditional display                  |
| customCode            | applyCustomCode            | Sanitized custom HTML/CSS, gated custom scripts, site code slots                           |
| codeEditor            | (used by traits)           | CodeMirror surfaces, snippets, live validation, the `db-code` trait                        |
| animations            | applyScrollAnimations      | Animate-on-scroll traits, effect CSS, IntersectionObserver runtime, canvas preview         |
| interactions          | applyInteractionFlows      | Trigger/action flow builder, SweetAlert2 dialogs, `db-alert-button`, flow runtime          |
| symbols               | applyReusableComponents    | Reusable components: one master, synced instances, library modal, per-symbol blocks        |
| blockPreviews         | (used by blocks)           | Wireframe illustrations used as block card media                                           |
| blocks                | applyBlockLibrary          | The curated block library across all categories                                            |
| seo                   | applySeoManager            | Site and page SEO settings, previews, head/robots/sitemap builders                         |
| schema                | applySchemaManager         | JSON-LD manager with validation for common schema.org types                                |
| audits                | applyQualityAudits         | Accessibility, performance, and SEO audits with a report modal                             |
| exporter              | applyExportSystem          | Full-document export, zip bundles, publish checklist                                       |
| persistence           | applyPersistence           | Autosave, save status, named revisions in localStorage                                     |
| shell                 | applyEditorShell           | Top bar, pages manager, tools menu, command palette, theme and sound toggles               |
| experience            | applyExperienceUpgrades    | Interface sounds, haptics, drop animations, touch drag, block search, page templates       |

## Options

Every module reads its options from a key of the same name on the plugin options object. Options not
listed here are not read by any module.

| Option                              | Default                            | Effect                                                                                                    |
| ----------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `theme.mode`                        | `'auto'`                           | `'light'`, `'dark'`, or `'auto'`. Only `'auto'` lets the stored user toggle win.                          |
| `shell.brandLabel`                  | `'Dynamic Builder'`                | Text shown in the top bar.                                                                                |
| `icons.defaultIconName`             | `'star'`                           | Icon used by newly dropped `db-icon` components.                                                          |
| `icons.defaultSize`                 | `24`                               | Default icon size in pixels.                                                                              |
| `icons.defaultStrokeWidth`          | `1.75`                             | Default icon stroke width.                                                                                |
| `designTokens.tokens`               | `{}`                               | Token overrides merged over the baseline token record.                                                    |
| `devices.containerWidths`           | built-in presets                   | Per-device container widths.                                                                              |
| `typography.googleFonts`            | `[]`                               | Google Fonts to import. Opting in sends requests to Google on the published site.                         |
| `styleSectors.extra`                | `[]`                               | Extra Style Manager sectors appended after the governed set.                                              |
| `blocks.excludeBlockIds`            | `[]`                               | Block ids removed from the library.                                                                       |
| `dataBinding.sources`               | sample data                        | Seed data sources merged under the site meta record.                                                      |
| `dataBinding.extraBindingPaths`     | `[]`                               | Extra paths offered by the binding trait.                                                                 |
| `customCode.allowScripts`           | `false`                            | Seeds the "allow script tags" gate the first time the plugin runs.                                        |
| `symbols.presets`                   | `{}`                               | Reusable components seeded on first run, keyed by id: `{ name, components }`.                             |
| `interactions.sweetAlert.enabled`   | `true`                             | Load SweetAlert2 for dialog steps. When off, the built-in dialog is always used.                          |
| `interactions.sweetAlert.scriptUrl` | pinned jsDelivr URL                | Where SweetAlert2 is loaded from. Set `''` to never fetch it.                                             |
| `interactions.sweetAlert.styleUrl`  | `''`                               | Optional stylesheet for a self-hosted SweetAlert2 build.                                                  |
| `interactions.sweetAlert.integrity` | `''`                               | Subresource integrity hash applied to the SweetAlert2 script tag.                                         |
| `seo.siteDefaults`                  | `{}`                               | Seed values for the site SEO record.                                                                      |
| `audits.autoOpenReport`             | `true`                             | Whether running an audit command also opens the report modal.                                             |
| `exporter.publishBuildOptions`      | `{ separateAssets: true }`         | Build options used by `db:download-site` and `db:publish-site`.                                           |
| `persistence.storageKey`            | derived from path and container id | localStorage key for the autosaved project. Set this per site.                                            |
| `persistence.autosaveDelay`         | `2000`                             | Idle milliseconds before an autosave.                                                                     |
| `persistence.maxRevisions`          | `25`                               | Revisions kept before the oldest is dropped.                                                              |
| `persistence.autoload`              | `true`                             | Restore the stored snapshot on load. Skipped when the host supplies `projectData` or uses remote storage. |
| `mediaComponents.maxImageDimension` | `1600`                             | Longest edge used when re-encoding uploaded images.                                                       |
| `experience.sound`                  | `true`                             | Mounts the sound toggle. Playback stays off until the user turns it on.                                   |
| `experience.haptics`                | `true`                             | Vibration feedback where the device supports it.                                                          |
| `experience.touch`                  | `true`                             | Long-press drag translation on touch devices.                                                             |
| `experience.dropAnimations`         | `true`                             | Settle animation after a block drop.                                                                      |
| `experience.blockSearch`            | `true`                             | Search field above the block library.                                                                     |
| `experience.autoOpenBlocks`         | `true`                             | Opens the blocks panel once the editor is ready.                                                          |

## Reusable components

Build a nav, header or footer once and reuse it on every page.

1. Select it on the canvas and choose **Make reusable** from its toolbar (or run `db:create-symbol`).
2. Drop it anywhere from the **Reusable** block category, or open **Tools → Reusable components** and
   use **Add to every page**.
3. To change it, select any copy and choose **Edit everywhere**. The copy unlocks, and **Done** writes
   your edits back to the master and refreshes every other copy. **Detach this copy** turns one
   instance back into ordinary components.

Instances render the master's components and stay locked until you open one for editing, so a copy
can never drift out of step by accident. Definitions live under `dbSiteMeta.symbols`, so they travel
inside `editor.getProjectData()` and through any storage manager. Styles that were bound to a
component id are copied onto a generated `db-sym-*` class when the symbol is created, so per-element
styling survives the move to a shared definition.

## Animate on scroll

Every component has an **Animate on scroll** trait group: effect, duration, delay, easing, trigger
offset and play-once. **Preview on canvas** (also `db:preview-animations`) replays the whole page in
the editor.

The published page uses one small `IntersectionObserver` runtime shipped only when something on the
site animates. The "from" state is gated behind `data-db-aos-ready` on `<html>`, which the runtime
sets at boot, so content is never left invisible when JavaScript fails. `prefers-reduced-motion:
reduce` skips the runtime entirely and the CSS forces the finished state.

## Interaction flows

The **Interactions** trait group opens a flow builder (`db:open-flow-builder`) where a flow is one
trigger plus an ordered list of steps.

Triggers: click, hover in, hover out, page load, after a delay, on an interval, scrolled into view,
form submit, value change, key press, and leave intent.

Steps: show a dialog, toggle/add/remove a class, show, hide, show-or-hide, scroll to, go to a link,
change some text, set an attribute, submit a form, copy to the clipboard, replay the scroll
animation, wait, and run custom JavaScript.

Flows are stored as JSON on the component's `data-db-flows` attribute, so they travel with the
markup and are read back by a runtime that ships only when a page actually uses a flow. Steps run in
order; a dialog step that the visitor cancels stops the rest of the flow.

**Run custom JavaScript** stays inert until **Allow script tags** is on in Custom code — the runtime
is compiled with that gate baked in. Link and attribute steps refuse `javascript:`, `data:` and
`vbscript:` values, and `on*` attributes cannot be set.

## Dialogs (SweetAlert2)

The **Dialog button** block drops a button that opens a dialog on click; its traits cover style,
title, message, both button labels and what happens after confirming (nothing, follow a link, or
submit a form). The same dialog is available as a step in any flow, on any trigger.

At runtime `window.dbShowDialog(options)` resolves SweetAlert2 if the page already has it, otherwise
it loads the pinned build from `interactions.sweetAlert.scriptUrl`. If that fetch fails or you set
`enabled: false`, a built-in dialog is used instead — same API, keyboard dismissable, focus moved to
the confirm button. **No integrity hash ships by default**: set `interactions.sweetAlert.integrity`,
or self-host the library and point `scriptUrl` and `styleUrl` at your own copy, if you want the
script tag pinned by hash.

## Writing custom code

Custom HTML, CSS and script components open a full editor from their settings panel, and **Tools →
Custom code** puts the three site slots behind tabs instead of stacking them.

Each editor is a CodeMirror surface with syntax highlighting, line numbers, bracket matching, Tab and
Shift-Tab indentation (Escape releases focus for keyboard users), a snippet menu for the language,
an expand toggle, and a live status line that names the first structural problem — an unclosed block,
an unterminated comment, more closing tags than opening ones, or the JSON parse error. Where
CodeMirror cannot render, the field degrades to a textarea that keeps the snippets, Tab handling and
validation.

## Commands

`db:open-command-palette`, `db:open-shortcut-help`, `db:add-page`, `db:open-seo-settings`,
`db:open-schema-manager`, `db:open-token-manager`, `db:open-design-kits`, `db:open-data-sources`,
`db:open-custom-code`, `db:open-audit-report`, `db:run-accessibility-audit`,
`db:run-performance-audit`, `db:run-seo-audit`, `db:open-revisions`, `db:save-revision`,
`db:open-history`, `db:open-export`, `db:open-site-settings`, `db:download-site`, `db:publish-site`,
`db:open-symbols`, `db:create-symbol`, `db:edit-symbol`, `db:detach-symbol`, `db:open-flow-builder`,
`db:preview-animations`.

## Events

`db:site-meta:update`, `db:page-meta:update`, `db:save-status`, `db:revision:saved`,
`db:revision:restored`, `db:project:restored`, `db:export:complete`, `db:custom-code:update`,
`db:data-sources:update`, `db:schema:update`, `db:theme:update`, `db:sound:update`,
`db:page:added`, `db:asset:rejected`, `db:symbols:update`, `db:symbol:editing`, `db:flows:update`.

## Conventions

- Published-site classes use the `db-` prefix; design tokens are `--db-*` custom properties.
- Editor-only UI uses the `gjs-db-` prefix and is themed by the theme module.
- Runtime behaviors are attached through `data-db-*` attributes by self-contained scripts that ship
  with exports, honor reduced motion, and are idempotent.
- Site-wide settings live in the site meta record, which is written into project data under
  `dbSiteMeta`, so it round-trips through `editor.getProjectData()` and any storage manager.
- Per-page settings persist on each Page model and travel with project JSON.
- One page path rule is shared by the exporter, canonical URLs, the sitemap and JSON-LD: the main
  page is `index.html` at the site root, every other page uses its slug with a numeric suffix on
  collision.
- Every module is a directory of single-function ES module files composed by one applier entry.
- Feature runtimes (animations, flows, dialogs) register themselves with a detector and only ship on
  pages that actually use them; the same detectors trim their CSS out of the exported stylesheet.

## Security notes

- Custom HTML, SVG uploads and the head/body code slots are sanitized with a two-pass DOM parse that
  removes scripts, event handlers, `srcdoc`, non-image `data:` URIs and mutation-XSS carriers.
- Iframes are only kept where a caller opts in, and are always sandboxed without `allow-same-origin`.
- Turning on "allow script tags" stores the slots raw. External `<script src>` in those slots is then
  restricted to the origins listed in the allowlist.
- `project.json` and `design-tokens.json` are excluded from export bundles unless the "Include
  project backup files" option is ticked, because they contain the whole editor project.
- Interaction flows are data, not code: the runtime only dispatches the action types it knows, and
  unknown types are dropped when a flow is parsed. The one step that evaluates a string, "Run custom
  JavaScript", is compiled out unless "allow script tags" is on.
- SweetAlert2 is fetched from a pinned CDN URL only when a page uses a dialog step. No integrity hash
  is set by default, so pin one with `interactions.sweetAlert.integrity` or self-host the library if
  your threat model needs it. `interactions.sweetAlert.enabled: false` never contacts the CDN.
