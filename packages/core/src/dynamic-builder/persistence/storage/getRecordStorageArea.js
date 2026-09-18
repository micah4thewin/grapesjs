import getLocalStorageArea from '../getLocalStorageArea.js';
import readAllRecordEntries from './readAllRecordEntries.js';
import writeRecordEntries from './writeRecordEntries.js';

// IndexedDB is asynchronous, but the save path runs inside a pagehide handler
// where nothing can be awaited. So the records live in a mirror that answers
// synchronously, and the writes land in IndexedDB just behind it.
const mirroredEntries = new Map();
const pendingEntries = new Map();
const flushErrorListeners = new Set();
let usesLocalStorageOnly = false;
let hydratePromise = null;
let flushPromise = null;
let flushTimer = null;

const reportFlushError = (flushError) => flushErrorListeners.forEach((listener) => listener(flushError));

const removeFromLocalStorage = (entryKey) => {
  const storageArea = getLocalStorageArea();
  if (!storageArea) return;
  try {
    storageArea.removeItem(entryKey);
  } catch (removeError) {
    reportFlushError(removeError);
  }
};

const flushPendingEntries = async () => {
  while (pendingEntries.size) {
    const changedEntries = Object.fromEntries(pendingEntries);
    pendingEntries.clear();
    try {
      await writeRecordEntries(changedEntries);
    } catch (writeError) {
      reportFlushError(writeError);
    }
  }
  flushPromise = null;
};

const scheduleFlush = () => {
  if (usesLocalStorageOnly || flushPromise) return;
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    flushPromise = flushPendingEntries();
  }, 0);
};

// A key still sitting in localStorage from an older version is adopted the
// first time it is read, then cleared so it stops taking up that quota.
const adoptLegacyEntry = (entryKey) => {
  const storageArea = getLocalStorageArea();
  if (!storageArea) return null;
  let legacyValue = null;
  try {
    legacyValue = storageArea.getItem(entryKey);
  } catch (readError) {
    return null;
  }
  if (typeof legacyValue !== 'string') return null;
  mirroredEntries.set(entryKey, legacyValue);
  if (!usesLocalStorageOnly) {
    pendingEntries.set(entryKey, legacyValue);
    scheduleFlush();
    try {
      storageArea.removeItem(entryKey);
    } catch (removeError) {
      /* the copy in IndexedDB is what matters */
    }
  }
  return legacyValue;
};

const recordStorageArea = {
  getItem(entryKey) {
    if (mirroredEntries.has(entryKey)) return mirroredEntries.get(entryKey);
    return adoptLegacyEntry(entryKey);
  },
  setItem(entryKey, entryValue) {
    const storedValue = String(entryValue);
    if (usesLocalStorageOnly) {
      // A quota error has to reach the caller here: without it the revision
      // eviction that frees the space would never run. The mirror is only
      // updated once the write has actually gone through.
      const storageArea = getLocalStorageArea();
      if (storageArea) storageArea.setItem(entryKey, storedValue);
      mirroredEntries.set(entryKey, storedValue);
      return;
    }
    mirroredEntries.set(entryKey, storedValue);
    pendingEntries.set(entryKey, storedValue);
    scheduleFlush();
  },
  removeItem(entryKey) {
    mirroredEntries.delete(entryKey);
    if (usesLocalStorageOnly) {
      removeFromLocalStorage(entryKey);
      return;
    }
    pendingEntries.set(entryKey, null);
    scheduleFlush();
  },
};

// The sweep decides a picture is dead when no record names it, so every record
// that still names one has to be in the mirror before it runs. Anything left in
// localStorage from an older version is pulled across here, in one pass.
const adoptTokenBearingRecords = () => {
  const storageArea = getLocalStorageArea();
  if (!storageArea) return;
  let legacyKeys = [];
  try {
    legacyKeys = Object.keys(storageArea);
  } catch (listError) {
    return;
  }
  legacyKeys.forEach((entryKey) => {
    if (mirroredEntries.has(entryKey)) return;
    let legacyValue = null;
    try {
      legacyValue = storageArea.getItem(entryKey);
    } catch (readError) {
      return;
    }
    if (typeof legacyValue !== 'string' || legacyValue.indexOf('db-pooled-asset:') < 0) return;
    // An older asset pool is full of tokens too, but it is not a record: it is
    // moved into the asset store instead, so it is left where it is for now.
    if (entryKey.endsWith(':asset-pool')) return;
    mirroredEntries.set(entryKey, legacyValue);
    pendingEntries.set(entryKey, legacyValue);
    scheduleFlush();
    try {
      storageArea.removeItem(entryKey);
    } catch (removeError) {
      /* the copy in IndexedDB is what matters */
    }
  });
};

export const hydrateRecordStorage = () => {
  if (hydratePromise) return hydratePromise;
  hydratePromise = readAllRecordEntries()
    .then((storedEntries) => {
      if (!storedEntries) {
        // No usable IndexedDB: keep the old localStorage behaviour rather than
        // leaving the editor with nowhere to save.
        usesLocalStorageOnly = true;
        return false;
      }
      Object.keys(storedEntries).forEach((entryKey) => {
        if (!mirroredEntries.has(entryKey)) mirroredEntries.set(entryKey, storedEntries[entryKey]);
      });
      adoptTokenBearingRecords();
      return true;
    })
    .catch(() => {
      usesLocalStorageOnly = true;
      return false;
    });
  return hydratePromise;
};

export const flushRecordStorage = async () => {
  if (usesLocalStorageOnly) return true;
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  if (!flushPromise) flushPromise = flushPendingEntries();
  await flushPromise;
  return true;
};

export const onRecordStorageError = (listener) => {
  flushErrorListeners.add(listener);
  return () => flushErrorListeners.delete(listener);
};

export const isUsingLocalStorageOnly = () => usesLocalStorageOnly;

export const listRecordStorageKeys = () => Array.from(mirroredEntries.keys());

export const resetRecordStorageForTests = () => {
  mirroredEntries.clear();
  pendingEntries.clear();
  flushErrorListeners.clear();
  usesLocalStorageOnly = false;
  hydratePromise = null;
  flushPromise = null;
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = null;
};

const getRecordStorageArea = () => recordStorageArea;

export default getRecordStorageArea;
