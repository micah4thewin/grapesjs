const registerTraitTypeSet = (editor, traitTypeDefinitions) =>
  Object.entries(traitTypeDefinitions).forEach(([traitTypeName, traitTypeDefinition]) =>
    editor.TraitManager.addType(traitTypeName, traitTypeDefinition),
  );

export default registerTraitTypeSet;
