const buildAnnouncementInteractiveCss = () => `
.db-announcement {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--db-space-3);
  padding: var(--db-space-2) var(--db-space-4);
  background: var(--db-color-brand);
  color: var(--db-color-brand-contrast);
  font-family: var(--db-font-body);
  font-size: var(--db-type-sm);
}
.db-announcement-text {
  margin: 0;
}
.db-announcement-close {
  display: inline-flex;
  padding: var(--db-space-1);
  background: transparent;
  border: 0;
  border-radius: var(--db-radius-sm);
  cursor: pointer;
  color: inherit;
}
.db-announcement-close:hover {
  background: rgba(255, 255, 255, 0.16);
}
.db-announcement:not([data-db-dismissible="true"]) .db-announcement-close {
  display: none;
}
`;

export default buildAnnouncementInteractiveCss;
