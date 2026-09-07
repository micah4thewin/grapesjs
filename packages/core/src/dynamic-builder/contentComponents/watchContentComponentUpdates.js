import stripLegacyContentClasses from './stripLegacyContentClasses.js';
import syncButtonRelFromTarget from './syncButtonRelFromTarget.js';
import syncCalloutVariant from './syncCalloutVariant.js';
import syncHeadingTagFromLevel from './syncHeadingTagFromLevel.js';

const watchContentComponentUpdates = (editor) => {
  editor.on('component:update:attributes:data-db-level', (component) => syncHeadingTagFromLevel(component));
  editor.on('component:update:attributes:data-db-variant', (component) => syncCalloutVariant(component));
  editor.on('component:update:attributes:target', (component) => syncButtonRelFromTarget(component));
  editor.on('component:add', (component, options) => {
    if (options && options.temporary) return;
    syncHeadingTagFromLevel(component);
    syncCalloutVariant(component);
    syncButtonRelFromTarget(component);
    stripLegacyContentClasses(component);
  });
};

export default watchContentComponentUpdates;
