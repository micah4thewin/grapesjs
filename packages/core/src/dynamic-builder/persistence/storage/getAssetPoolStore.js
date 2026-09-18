import deleteAssetEntries from './deleteAssetEntries.js';
import getRecordStorageArea from './getRecordStorageArea.js';
import listAssetTokens from './listAssetTokens.js';
import readAssetEntries from './readAssetEntries.js';
import readPooledTokenBytes from '../readPooledTokenBytes.js';
import writeAssetEntries from './writeAssetEntries.js';

// Pictures are written from the save path, which can run inside a pagehide
// handler where nothing can be awaited. Turning a picture into its token is
// pure, so the save stays synchronous and only the bytes settle behind it.
const fallbackRecordKey = 'db-asset-pool';
const knownTokens = new Set();
const pendingAssets = new Map();
const writeErrorListeners = new Set();
let usesRecordFallback = false;
let hydratePromise = null;
let flushPromise = null;

const reportWriteError = (writeError) => writeErrorListeners.forEach((listener) => listener(writeError));

const readFallbackRecord = () => {
  try {
    const storedText = getRecordStorageArea().getItem(fallbackRecordKey);
    const parsedRecord = storedText ? JSON.parse(storedText) : null;
    return parsedRecord && typeof parsedRecord === 'object' ? parsedRecord : {};
  } catch (readError) {
    return {};
  }
};

const writeFallbackRecord = (assetRecord) => {
  try {
    getRecordStorageArea().setItem(fallbackRecordKey, JSON.stringify(assetRecord));
  } catch (writeError) {
    reportWriteError(writeError);
  }
};

const flushPendingAssets = async () => {
  while (pendingAssets.size) {
    const writtenAssets = Object.fromEntries(pendingAssets);
    pendingAssets.clear();
    try {
      if (usesRecordFallback) writeFallbackRecord({ ...readFallbackRecord(), ...writtenAssets });
      else await writeAssetEntries(writtenAssets);
    } catch (writeError) {
      Object.keys(writtenAssets).forEach((assetToken) => knownTokens.delete(assetToken));
      reportWriteError(writeError);
    }
  }
  flushPromise = null;
};

export const hydrateAssetPool = () => {
  if (hydratePromise) return hydratePromise;
  hydratePromise = listAssetTokens()
    .then((storedTokens) => {
      if (!storedTokens) {
        usesRecordFallback = true;
        Object.keys(readFallbackRecord()).forEach((assetToken) => knownTokens.add(assetToken));
        return false;
      }
      storedTokens.forEach((assetToken) => knownTokens.add(assetToken));
      return true;
    })
    .catch(() => {
      usesRecordFallback = true;
      return false;
    });
  return hydratePromise;
};

export const queueAssetWrites = (assetAdditions) => {
  let queuedAny = false;
  Object.keys(assetAdditions).forEach((assetToken) => {
    if (knownTokens.has(assetToken)) return;
    knownTokens.add(assetToken);
    pendingAssets.set(assetToken, assetAdditions[assetToken]);
    queuedAny = true;
  });
  if (queuedAny && !flushPromise) flushPromise = flushPendingAssets();
  return queuedAny;
};

export const flushAssetWrites = async () => {
  if (!flushPromise && pendingAssets.size) flushPromise = flushPendingAssets();
  if (flushPromise) await flushPromise;
  return true;
};

// Pictures queued but not yet settled still answer a read, so restoring right
// after a save never sees a gap.
export const readPooledAssets = async (assetTokens) => {
  const wantedTokens = Array.from(new Set(assetTokens)).filter(Boolean);
  if (!wantedTokens.length) return {};
  const assetRecord = {};
  const missingTokens = [];
  wantedTokens.forEach((assetToken) => {
    if (pendingAssets.has(assetToken)) assetRecord[assetToken] = pendingAssets.get(assetToken);
    else missingTokens.push(assetToken);
  });
  if (!missingTokens.length) return assetRecord;
  if (usesRecordFallback) {
    const fallbackRecord = readFallbackRecord();
    missingTokens.forEach((assetToken) => {
      if (typeof fallbackRecord[assetToken] === 'string') assetRecord[assetToken] = fallbackRecord[assetToken];
    });
    return assetRecord;
  }
  const storedAssets = await readAssetEntries(missingTokens);
  return { ...assetRecord, ...(storedAssets || {}) };
};

export const deletePooledAssets = async (assetTokens) => {
  if (!assetTokens.length) return false;
  assetTokens.forEach((assetToken) => {
    knownTokens.delete(assetToken);
    pendingAssets.delete(assetToken);
  });
  if (usesRecordFallback) {
    const keptRecord = readFallbackRecord();
    assetTokens.forEach((assetToken) => delete keptRecord[assetToken]);
    writeFallbackRecord(keptRecord);
    return true;
  }
  await deleteAssetEntries(assetTokens);
  return true;
};

export const listKnownAssetTokens = () => Array.from(knownTokens);

// The pool can report what it holds without reading a single picture back.
export const measureKnownAssetBytes = () =>
  Array.from(knownTokens).reduce((totalBytes, assetToken) => totalBytes + readPooledTokenBytes(assetToken), 0);

export const onAssetPoolError = (listener) => {
  writeErrorListeners.add(listener);
  return () => writeErrorListeners.delete(listener);
};

export const resetAssetPoolForTests = () => {
  knownTokens.clear();
  pendingAssets.clear();
  writeErrorListeners.clear();
  usesRecordFallback = false;
  hydratePromise = null;
  flushPromise = null;
};
