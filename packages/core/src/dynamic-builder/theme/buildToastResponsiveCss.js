const buildToastResponsiveCss = () => `
@media (max-width: 640px) {
  .gjs-db-toast-host {
    left: 12px;
    right: 12px;
    transform: none;
    max-width: none;
    align-items: stretch;
  }
  .gjs-db-toast {
    max-width: none;
    border-radius: var(--gjs-db-r-3);
    white-space: normal;
    text-align: left;
    line-height: var(--gjs-db-lh);
  }
}
`;

export default buildToastResponsiveCss;
