import getSocialNetworkRecords from './getSocialNetworkRecords.js';

const resolveSocialNetworkRecord = (networkName) => {
  const networkRecords = getSocialNetworkRecords();
  return networkRecords.filter((networkRecord) => networkRecord.networkName === networkName)[0] || networkRecords[0];
};

export default resolveSocialNetworkRecord;
