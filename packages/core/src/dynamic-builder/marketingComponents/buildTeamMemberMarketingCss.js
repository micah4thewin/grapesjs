const buildTeamMemberMarketingCss = () => `
.db-team-member {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--db-space-3, 0.75rem);
  margin: 0;
  text-align: center;
}
.db-team-avatar {
  width: 7.5rem;
  height: 7.5rem;
  border-radius: var(--db-radius-pill, 999px);
  object-fit: cover;
}
.db-team-caption { display: flex; flex-direction: column; align-items: center; gap: var(--db-space-1, 0.25rem); }
.db-team-name { margin: 0; font-family: var(--db-font-display, inherit); font-size: var(--db-type-lg, 1.2rem); }
.db-team-role { margin: 0; color: var(--db-color-text-muted, #5b6472); font-size: var(--db-type-sm, 0.9rem); }
.db-team-member .db-social-row { justify-content: center; margin-top: var(--db-space-2, 0.5rem); }
`;

export default buildTeamMemberMarketingCss;
