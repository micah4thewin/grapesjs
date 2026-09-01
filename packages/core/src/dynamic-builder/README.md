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
| exporter              | applyExportSystem          | Full-document export, multi-page bundles, publish checklist                                |
| persistence           | applyPersistence           | Autosave, save status, named revisions in localStorage                                     |
| shell                 | applyEditorShell           | Top bar, pages manager, tools menu, command palette, theme and sound toggles               |
| experience            | applyExperienceUpgrades    | Interface sounds, haptics, drop animations, touch drag, block search, page templates       |

## Conventions

- Published-site classes use the `db-` prefix; design tokens are `--db-*` custom properties.
- Editor-only UI uses the `gjs-db-` prefix and is themed by the theme module.
- Runtime behaviors are attached through `data-db-*` attributes by self-contained scripts that ship
  with exports, honor reduced motion, and are idempotent.
- Site-wide settings live in the site meta record; per-page settings persist on each Page model and
  travel with project JSON.
- Every module is a directory of single-function ES module files composed by one applier entry.
