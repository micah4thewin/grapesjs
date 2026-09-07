import getPageLevelComponentTypes from '../support/getPageLevelComponentTypes.js';

const passThroughTypes = ['db-symbol', 'db-custom-css', 'db-custom-script'];

const needsSectionWrap = (candidateComponent, wrapperComponent) => {
  const parentComponent = candidateComponent && candidateComponent.parent && candidateComponent.parent();
  if (!parentComponent || parentComponent !== wrapperComponent) return false;
  const typeName = String(candidateComponent.get('type') || '');
  return getPageLevelComponentTypes().indexOf(typeName) < 0 && passThroughTypes.indexOf(typeName) < 0;
};

const wrapRootLevelComponents = (editor, addedComponents) => {
  const componentList = (Array.isArray(addedComponents) ? addedComponents : [addedComponents]).filter(Boolean);
  const wrapperComponent = editor.getWrapper();
  const rootLevelList = componentList.filter((candidate) => needsSectionWrap(candidate, wrapperComponent));
  if (!rootLevelList.length) return null;
  const [sectionComponent] = wrapperComponent.append(
    { type: 'db-section', components: [{ type: 'db-container', components: [] }] },
    { at: rootLevelList[0].index() },
  );
  const containerComponent = sectionComponent.components().at(0);
  containerComponent.append(rootLevelList);
  return sectionComponent;
};

export default wrapRootLevelComponents;
