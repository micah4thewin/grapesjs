const buildNavbarInteractiveCss = () => `
.db-navbar {
  position: relative;
  font-family: var(--db-font-body);
  background: var(--db-color-surface);
  border-bottom: 1px solid var(--db-color-line);
}
.db-navbar[data-db-sticky="true"] {
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: var(--db-shadow-sm);
}
.db-navbar-nav {
  display: flex;
  align-items: center;
  gap: var(--db-space-4);
  max-width: 72rem;
  margin: 0 auto;
  padding: var(--db-space-3) var(--db-space-4);
}
.db-navbar-brand {
  font-size: var(--db-type-lg);
  font-weight: 700;
  color: var(--db-color-text);
  text-decoration: none;
}
.db-navbar-links {
  display: flex;
  gap: var(--db-space-4);
  margin: 0 0 0 auto;
  padding: 0;
  list-style: none;
}
.db-navbar-links a {
  font-size: var(--db-type-sm);
  font-weight: 500;
  color: var(--db-color-text-muted);
  text-decoration: none;
  padding: var(--db-space-1) 0;
}
.db-navbar-links a:hover {
  color: var(--db-color-text);
}
.db-navbar-burger {
  display: none;
  margin-left: auto;
  padding: var(--db-space-2);
  background: transparent;
  border: 0;
  border-radius: var(--db-radius-sm);
  cursor: pointer;
  color: var(--db-color-text);
}
.db-navbar-burger-icon {
  display: inline-flex;
}
.db-navbar-burger-icon svg + svg {
  display: none;
}
@media (max-width: 768px) {
  .db-navbar-nav {
    flex-wrap: wrap;
  }
  .db-navbar-burger {
    display: inline-flex;
  }
  .db-navbar-links {
    display: none;
    flex-basis: 100%;
    flex-direction: column;
    gap: var(--db-space-2);
    padding: var(--db-space-2) 0 var(--db-space-3);
  }
  .db-navbar[data-db-open="true"] .db-navbar-links {
    display: flex;
  }
  .db-navbar[data-db-open="true"] .db-navbar-burger-icon svg:first-child {
    display: none;
  }
  .db-navbar[data-db-open="true"] .db-navbar-burger-icon svg + svg {
    display: inline-flex;
  }
}
`;

export default buildNavbarInteractiveCss;
