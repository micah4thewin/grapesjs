import buildIconSvgMarkup from './buildIconSvgMarkup.js';
import getIconMarkupCache from './getIconMarkupCache.js';
import readIconTraitValues from './readIconTraitValues.js';

const rebuildIconComponentMarkup = (editor, iconComponent) => {
  const markupCache = getIconMarkupCache(editor);
  const nextMarkup = buildIconSvgMarkup(readIconTraitValues(iconComponent));
  const knownMarkup = markupCache.get(iconComponent) || String(iconComponent.getInnerHTML() || '').trim();
  markupCache.set(iconComponent, nextMarkup);
  if (knownMarkup === nextMarkup) return;
  iconComponent.components(nextMarkup);
};

export default rebuildIconComponentMarkup;
