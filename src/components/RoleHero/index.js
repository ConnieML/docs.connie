import React from 'react';

/**
 * RoleHero — uniform "your role" banner shown at the top of each audience's
 * Getting Started page (Administrators, Supervisors, Staff Agents). Keeps the
 * three sections visually consistent: circular role avatar + role name + a
 * one-line description.
 *
 * Usage (MDX):
 *   import RoleHero from '@site/src/components/RoleHero';
 *   <RoleHero avatar="/img/avatars/admin-avatar.png" role="CBO Administrator">
 *     One-line description of the role.
 *   </RoleHero>
 */
export default function RoleHero({avatar, role, eyebrow = 'Your Role', children}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        padding: '20px 24px',
        margin: '24px 0 32px',
        background: 'var(--ifm-color-emphasis-100)',
        borderRadius: '12px',
        borderLeft: '4px solid var(--ifm-color-primary)',
        flexWrap: 'wrap',
      }}>
      <img
        src={avatar}
        alt={role}
        width="96"
        height="96"
        style={{
          borderRadius: '50%',
          flexShrink: 0,
          objectFit: 'cover',
          border: '3px solid var(--ifm-background-surface-color)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        }}
      />
      <div style={{flex: '1 1 320px'}}>
        <div
          style={{
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            color: 'var(--ifm-color-emphasis-600)',
            fontWeight: 700,
          }}>
          {eyebrow}
        </div>
        <div style={{fontSize: '1.45rem', fontWeight: 700, margin: '2px 0 6px'}}>{role}</div>
        <div style={{margin: 0, color: 'var(--ifm-color-emphasis-800)'}}>{children}</div>
      </div>
    </div>
  );
}
