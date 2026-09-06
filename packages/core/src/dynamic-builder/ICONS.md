# Icon library

The builder ships 452 icons that are available to every project, with no network
request, no third party script, and no font file. Every icon is inline SVG, so the
icons keep working in exported sites that are opened straight from disk.

## Licensing

The icon artwork in `support/*IconPaths.js` was drawn for this repository and is
covered by the repository BSD-3-Clause license, which allows free commercial and
personal use, modification, and redistribution.

The drawings follow the 24x24 stroke conventions popularised by two permissively
licensed open source icon sets, Feather (MIT) and Lucide (ISC): a 24 by 24 view
box, no fill, `currentColor` strokes, round caps and joins, and a default stroke
width of 1.75. Matching those conventions means an icon from either project can be
dropped in later without any visual mismatch.

Icons in the Social category are simplified glyphs used to link to third party
services. The glyphs themselves fall under the repository license, but the brands
they represent are trademarks of their respective owners. Use them to link to a
profile on those services, not to imply that a service endorses a site.

## Structure

Each file under `support/` exports one category as a map of icon name to inner SVG
markup. `getIconPathLibrary.js` merges them into the single lookup used by
`getIconMarkup`. `icons/getIconCategoryRecords.js` reuses the same per category
getters to drive the picker, so a new icon appears in the picker as soon as it is
added to a category file, with no second list to update.

## Adding an icon

Add one entry to the category file that fits it best, keeping the name in
camelCase and unique across every category file. Draw inside the 24 by 24 box with
no `fill`, `stroke`, or `stroke-width` attributes, since `createSvgIconMarkup`
applies those. Add synonyms to `icons/getIconSearchAliases.js` when people are
likely to search for a word that is not in the name, such as `email` for `mail`.
