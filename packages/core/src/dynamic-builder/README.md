# Dynamic Builder

A governed website-builder plugin suite that ships with this GrapesJS build. It turns the raw editor
into a complete dynamic site builder: a themed app shell, a curated block library, accessible
component types, design tokens, responsive devices, a full style manager, SEO and structured-data
managers, quality audits, data binding, persistence with revisions, governed custom code, and a
static export pipeline.

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

## Commands

`db:open-command-palette`, `db:open-shortcut-help`, `db:add-page`, `db:open-seo-settings`,
`db:open-schema-manager`, `db:open-token-manager`, `db:open-design-kits`, `db:open-data-sources`,
`db:open-custom-code`, `db:open-audit-report`, `db:run-accessibility-audit`,
`db:run-performance-audit`, `db:run-seo-audit`, `db:open-revisions`, `db:save-revision`,
`db:open-history`, `db:open-export`, `db:open-site-settings`, `db:download-site`, `db:publish-site`.

## Events

`db:site-meta:update`, `db:page-meta:update`, `db:save-status`, `db:revision:saved`,
`db:revision:restored`, `db:project:restored`, `db:export:complete`, `db:custom-code:update`,
`db:data-sources:update`, `db:schema:update`, `db:theme:update`, `db:sound:update`,
`db:page:added`, `db:asset:rejected`.

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

## Security notes

- Custom HTML, SVG uploads and the head/body code slots are sanitized with a two-pass DOM parse that
  removes scripts, event handlers, `srcdoc`, non-image `data:` URIs and mutation-XSS carriers.
- Iframes are only kept where a caller opts in, and are always sandboxed without `allow-same-origin`.
- Turning on "allow script tags" stores the slots raw. External `<script src>` in those slots is then
  restricted to the origins listed in the allowlist.
- `project.json` and `design-tokens.json` are excluded from export bundles unless the "Include
  project backup files" option is ticked, because they contain the whole editor project.
