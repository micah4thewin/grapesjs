import listPooledTokensInText from './listPooledTokensInText.js';

// Tokens survive serialization as exact substrings, so the serialized payload
// answers which pictures a restore needs without walking the record.
const collectPayloadAssetTokens = (payloadValue) => {
  try {
    return Array.from(listPooledTokensInText(JSON.stringify(payloadValue)));
  } catch (serializeError) {
    return [];
  }
};

export default collectPayloadAssetTokens;
