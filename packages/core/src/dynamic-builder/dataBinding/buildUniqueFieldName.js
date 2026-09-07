const buildUniqueFieldName = (existingNames) => {
  let fieldNumber = existingNames.length + 1;
  let candidateName = `field${fieldNumber}`;
  while (existingNames.indexOf(candidateName) >= 0) {
    fieldNumber += 1;
    candidateName = `field${fieldNumber}`;
  }
  return candidateName;
};

export default buildUniqueFieldName;
