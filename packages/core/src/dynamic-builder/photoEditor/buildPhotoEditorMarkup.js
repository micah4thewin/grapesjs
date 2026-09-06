import buildPhotoControlMarkup from './buildPhotoControlMarkup.js';

const buildPhotoEditorMarkup = (editState) =>
  [
    '<div class="gjs-db-form gjs-db-photo-editor">',
    '<div class="gjs-db-photo-layout">',
    '<div class="gjs-db-photo-stage">',
    '<div class="gjs-db-photo-canvas-host" data-db-photo-preview></div>',
    '<p class="gjs-db-muted gjs-db-photo-readout-line"><span data-db-photo-dimensions>Loading photo</span><span data-db-photo-size></span></p>',
    '</div>',
    buildPhotoControlMarkup(editState),
    '</div>',
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button" data-db-photo-reset>Reset</button>',
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-photo-apply>Apply to image</button>',
    '</div>',
    '</div>',
  ].join('');

export default buildPhotoEditorMarkup;
