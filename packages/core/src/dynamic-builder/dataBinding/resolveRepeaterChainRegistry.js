import buildItemRegistry from './buildItemRegistry.js';
import resolveRepeaterItems from './resolveRepeaterItems.js';

const resolveRepeaterChainRegistry = (registry, settingsList) => {
  let currentRegistry = registry;
  const safeList = Array.isArray(settingsList) ? settingsList : [];
  for (const repeaterSettings of safeList) {
    const sourceItems = resolveRepeaterItems(currentRegistry, repeaterSettings);
    if (!sourceItems.length) return null;
    currentRegistry = buildItemRegistry(currentRegistry, repeaterSettings, sourceItems[0], 1, sourceItems.length);
  }
  return currentRegistry;
};

export default resolveRepeaterChainRegistry;
