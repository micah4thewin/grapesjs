import openSeoSettingsModal from './openSeoSettingsModal.js';
import runSeoHealthCheck from './runSeoHealthCheck.js';

const mountSeoHealthChip = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  const slotElement = containerElement && containerElement.querySelector('[data-db-seo-health-slot]');
  if (!slotElement || slotElement.querySelector('[data-db-seo-health-chip]')) return;
  const chipElement = slotElement.ownerDocument.createElement('button');
  chipElement.type = 'button';
  chipElement.className = 'gjs-db-seo-health-chip';
  chipElement.setAttribute('data-db-seo-health-chip', 'true');
  chipElement.innerHTML = 'SEO <span class="gjs-db-seo-health-score" data-db-seo-health-score>--</span>';
  chipElement.addEventListener('click', () => openSeoSettingsModal(editor, { tabName: 'page' }));
  slotElement.appendChild(chipElement);
  runSeoHealthCheck(editor, null);
};

export default mountSeoHealthChip;
