import syncButtonFullMobileClass from './syncButtonFullMobileClass.js';
import syncButtonRelFromTarget from './syncButtonRelFromTarget.js';
import syncCalloutRoleFromVariant from './syncCalloutRoleFromVariant.js';
import syncHeadingTagFromLevel from './syncHeadingTagFromLevel.js';
import syncTextVariantClassFromAttribute from './syncTextVariantClassFromAttribute.js';

const watchContentComponentUpdates = (editor) => {
  const runAllContentSyncs = (component) => {
    syncHeadingTagFromLevel(component);
    syncCalloutRoleFromVariant(component);
    syncTextVariantClassFromAttribute(component);
    syncButtonRelFromTarget(component);
    syncButtonFullMobileClass(component);
  };
  editor.on('component:update:attributes:data-db-level', (component) => syncHeadingTagFromLevel(component));
  editor.on('component:update:attributes:data-db-variant', (component) => {
    syncCalloutRoleFromVariant(component);
    syncTextVariantClassFromAttribute(component);
  });
  editor.on('component:update:attributes:target', (component) => syncButtonRelFromTarget(component));
  editor.on('component:update:attributes:data-db-full-mobile', (component) => syncButtonFullMobileClass(component));
  editor.on('component:add', (component) => runAllContentSyncs(component));
};

export default watchContentComponentUpdates;
