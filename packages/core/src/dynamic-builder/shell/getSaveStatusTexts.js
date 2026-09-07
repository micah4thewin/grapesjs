import formatStatusTimeText from './formatStatusTimeText.js';

const getSaveStatusTexts = (statusState, savedAtIso, errorMessage) => {
  const autosaveHint = 'Autosaved in this browser. Download or save a snapshot to keep a copy elsewhere.';
  const openHint = 'Click to see saved snapshots.';
  const textsByState = {
    idle: { label: 'Autosave on', title: `${autosaveHint} ${openHint}` },
    dirty: { label: 'Unsaved changes', title: `Changes save automatically in a moment. ${autosaveHint}` },
    saving: { label: 'Saving\u2026', title: autosaveHint },
    saved: { label: `Saved ${formatStatusTimeText(savedAtIso)}`, title: `${autosaveHint} ${openHint}` },
    error: {
      label: 'Not saved',
      title: `${errorMessage || 'Saving failed.'} Download the site or save a snapshot to keep your work.`,
    },
  };
  return textsByState[statusState] || textsByState.idle;
};

export default getSaveStatusTexts;
