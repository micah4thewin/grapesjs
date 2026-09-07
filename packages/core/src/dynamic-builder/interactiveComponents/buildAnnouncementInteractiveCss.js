const buildAnnouncementInteractiveCss = () => `
.db-announcement {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--db-space-1) var(--db-space-3);
  padding: var(--db-space-2) var(--db-space-4);
  background: var(--db-color-brand);
  color: var(--db-color-brand-contrast);
  font-family: var(--db-font-body);
  font-size: var(--db-type-sm);
}
.db-announcement-text {
  margin: 0;
}
.db-announcement-link {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  margin: calc(-1 * var(--db-space-2)) 0;
  padding: 0 var(--db-space-1);
  border-radius: var(--db-radius-sm);
  color: inherit;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 0.15em;
}
.db-announcement-link:hover {
  background: rgba(255, 255, 255, 0.16);
}
.db-announcement-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  margin: calc(-1 * var(--db-space-2)) 0;
  padding: 0;
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
@media (scripting: enabled) {
  .db-announcement:not([data-db-announcement-ready]) {
    visibility: hidden;
  }
}
`;

export default buildAnnouncementInteractiveCss;
