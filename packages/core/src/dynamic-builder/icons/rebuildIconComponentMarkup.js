import buildIconStateKey from './buildIconStateKey.js';
import buildIconSvgMarkup from './buildIconSvgMarkup.js';
import getIconMarkupCache from './getIconMarkupCache.js';
import readIconTraitValues from './readIconTraitValues.js';

const rebuildIconComponentMarkup = (editor, iconComponent) => {
  const markupCache = getIconMarkupCache(editor);
  const iconSettings = readIconTraitValues(iconComponent);
  const nextStateKey = buildIconStateKey(iconSettings);
  const knownStateKey = markupCache.get(iconComponent);
  const hasRenderedSvg = String(iconComponent.getInnerHTML() || '').indexOf('<svg') >= 0;
  markupCache.set(iconComponent, nextStateKey);
  if (knownStateKey === nextStateKey) return;
  if (knownStateKey === undefined && hasRenderedSvg) return;
  iconComponent.components(buildIconSvgMarkup(iconSettings));
};

export default rebuildIconComponentMarkup;
