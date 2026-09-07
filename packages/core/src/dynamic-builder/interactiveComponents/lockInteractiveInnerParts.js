import getInertChildFlags from '../customCode/getInertChildFlags.js';
import getInteractiveInnerPartRules from './getInteractiveInnerPartRules.js';
import matchesInnerPartRule from './matchesInnerPartRule.js';
import walkComponentTree from '../support/walkComponentTree.js';

const applyFlagRecord = (component, flagRecord) => {
  if (!component || typeof component.set !== 'function') return;
  component.set(flagRecord, { avoidStore: true });
};

const applyRuleToComponent = (component, rule) => {
  const flagRecord = { ...rule.flags };
  if (rule.name) flagRecord.name = rule.name;
  applyFlagRecord(component, flagRecord);
  if (!rule.lockSubtree || typeof component.components !== 'function') return;
  component
    .components()
    .forEach((childComponent) =>
      walkComponentTree(childComponent, (nestedComponent) => applyFlagRecord(nestedComponent, getInertChildFlags())),
    );
};

const lockInteractiveInnerParts = (rootComponent) => {
  const rootType = rootComponent && typeof rootComponent.get === 'function' ? String(rootComponent.get('type')) : '';
  const ruleList = getInteractiveInnerPartRules()[rootType] || [];
  if (!ruleList.length) return 0;
  let lockedCount = 0;
  walkComponentTree(rootComponent, (currentComponent) => {
    if (currentComponent === rootComponent) return;
    const matchingRule = ruleList.find((rule) => matchesInnerPartRule(currentComponent, rule));
    if (!matchingRule) return;
    applyRuleToComponent(currentComponent, matchingRule);
    lockedCount += 1;
  });
  return lockedCount;
};

export default lockInteractiveInnerParts;
