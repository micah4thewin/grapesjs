import getPhotoEditState from './getPhotoEditState.js';
import readPhotoControlChange from './readPhotoControlChange.js';
import renderPhotoPreview from './renderPhotoPreview.js';

const wirePhotoEditorEvents = (modalElement, imageElement, originalBytes, onApply) => {
  const session = { editState: getPhotoEditState(), dataUrl: '', renderTimer: 0 };
  const scheduleRender = () => {
    clearTimeout(session.renderTimer);
    session.renderTimer = setTimeout(() => {
      session.dataUrl = renderPhotoPreview(modalElement, imageElement, session.editState, originalBytes);
    }, 60);
  };
  const setActiveChip = (selector, attributeName, activeValue) =>
    modalElement
      .querySelectorAll(selector)
      .forEach((chip) => chip.classList.toggle('gjs-db-chip-active', chip.getAttribute(attributeName) === activeValue));
  modalElement.addEventListener('input', (inputEvent) => {
    const control =
      inputEvent.target && inputEvent.target.closest ? inputEvent.target.closest('[data-db-photo-control]') : null;
    if (!control) return;
    session.editState = readPhotoControlChange(session.editState, control);
    const readout = modalElement.querySelector(`[data-db-photo-readout="${control.getAttribute('name')}"]`);
    if (readout) readout.textContent = control.value + (readout.textContent.endsWith('px') ? 'px' : '%');
    scheduleRender();
  });
  modalElement.addEventListener('click', (clickEvent) => {
    const target = clickEvent.target && clickEvent.target.closest ? clickEvent.target : null;
    if (!target) return;
    const aspectChip = target.closest('[data-db-photo-aspect]');
    const filterChip = target.closest('[data-db-photo-filter]');
    const rotateButton = target.closest('[data-db-photo-rotate]');
    const flipButton = target.closest('[data-db-photo-flip]');
    if (aspectChip) {
      session.editState = { ...session.editState, aspectId: aspectChip.getAttribute('data-db-photo-aspect') };
      setActiveChip('[data-db-photo-aspect]', 'data-db-photo-aspect', session.editState.aspectId);
    } else if (filterChip) {
      session.editState = { ...session.editState, filterId: filterChip.getAttribute('data-db-photo-filter') };
      setActiveChip('[data-db-photo-filter]', 'data-db-photo-filter', session.editState.filterId);
    } else if (rotateButton) {
      session.editState = {
        ...session.editState,
        rotation: (session.editState.rotation + Number(rotateButton.getAttribute('data-db-photo-rotate')) + 360) % 360,
      };
    } else if (flipButton) {
      const flipKey = flipButton.getAttribute('data-db-photo-flip') === 'vertical' ? 'flipVertical' : 'flipHorizontal';
      session.editState = { ...session.editState, [flipKey]: !session.editState[flipKey] };
    } else if (target.closest('[data-db-photo-reset]')) {
      session.editState = getPhotoEditState();
      modalElement.querySelectorAll('[data-db-photo-control]').forEach((control) => {
        const name = control.getAttribute('name');
        const value =
          name === 'cropWidth' || name === 'cropX' || name === 'cropY'
            ? Math.round(session.editState[name] * 100)
            : session.editState[name];
        control.value = String(value);
      });
      setActiveChip('[data-db-photo-aspect]', 'data-db-photo-aspect', 'free');
      setActiveChip('[data-db-photo-filter]', 'data-db-photo-filter', 'none');
    } else if (target.closest('[data-db-photo-apply]')) {
      onApply(session.dataUrl || renderPhotoPreview(modalElement, imageElement, session.editState, originalBytes));
      return;
    } else return;
    scheduleRender();
  });
  scheduleRender();
};

export default wirePhotoEditorEvents;
