const resolveBaseModelConstructor = (backboneModel) => {
  let currentPrototype = backboneModel ? Object.getPrototypeOf(backboneModel) : null;
  let baseConstructor = null;
  while (currentPrototype && typeof currentPrototype.set === 'function') {
    baseConstructor = currentPrototype.constructor;
    currentPrototype = Object.getPrototypeOf(currentPrototype);
  }
  return typeof baseConstructor === 'function' ? baseConstructor : null;
};

export default resolveBaseModelConstructor;
