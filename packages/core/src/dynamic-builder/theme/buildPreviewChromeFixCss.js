const eyeOffDataUri =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'" +
  " stroke='%238a9099' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E" +
  "%3Cpath d='m4 4 16 16M9.9 5.2A9.8 9.8 0 0 1 12 5c6 0 10 7 10 7a17.4 17.4 0 0 1-3.3 3.9" +
  'M6.1 6.1A16.9 16.9 0 0 0 2 12s4 7 10 7a9.9 9.9 0 0 0 4-.8\'/%3E%3C/svg%3E")';

const buildPreviewChromeFixCss = () => `
.gjs-off-prv {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: var(--gjs-db-r-pill);
  background-color: var(--gjs-db-panel);
  box-shadow: var(--gjs-db-lift-2);
  color: transparent;
  overflow: hidden;
  background-image: ${eyeOffDataUri};
  background-repeat: no-repeat;
  background-position: center;
  background-size: 18px 18px;
  cursor: pointer;
}
.gjs-off-prv:hover {
  box-shadow: var(--gjs-db-lift-3);
}
.gjs-toolbar-item.fa-pencil {
  color: transparent;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23e7eaee' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 20h4L20 8l-4-4L4 16z'/%3E%3Cpath d='m14 6 4 4'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 13px 13px;
}
`;

export default buildPreviewChromeFixCss;
