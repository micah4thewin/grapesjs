import lockComponentSubtree from '../support/lockComponentSubtree.js';
import buildCalloutGlyphMarkup from './buildCalloutGlyphMarkup.js';
import resolveCalloutVariantName from './resolveCalloutVariantName.js';

const syncCalloutVariant = (component) => {
  if (!component || !component.get || component.get('type') !== 'db-callout') return;
  const attributeRecord = component.getAttributes();
  if (attributeRecord.role !== 'note') component.addAttributes({ role: 'note' });
  const variantName = resolveCalloutVariantName(attributeRecord['data-db-variant']);
  const iconComponent = component
    .components()
    .find((childComponent) => childComponent.getClasses().indexOf('db-callout-icon') >= 0);
  if (!iconComponent) return;
  const glyphMatches = iconComponent.getAttributes()['data-db-glyph'] === variantName;
  if (!glyphMatches) {
    iconComponent.components(buildCalloutGlyphMarkup(variantName));
    iconComponent.addAttributes({ 'data-db-glyph': variantName });
  }
  lockComponentSubtree(iconComponent);
};

export default syncCalloutVariant;
