import React from 'react';

export const HirexIcon = ({ size = 52 }) => (
  <svg width={size} height={size} viewBox="0 0 52 62" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hLeft" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7c6ff7" />
        <stop offset="100%" stopColor="#4f46e5" />
      </linearGradient>
      <linearGradient id="hRight" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <linearGradient id="hBar" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    {/* Left pillar */}
    <rect x="0" y="0" width="17" height="62" rx="3" fill="url(#hLeft)" filter="url(#glow)" />
    {/* Right pillar */}
    <rect x="35" y="0" width="17" height="62" rx="3" fill="url(#hRight)" filter="url(#glow)" />
    {/* Cross bar */}
    <rect x="17" y="22" width="18" height="18" rx="1" fill="url(#hBar)" />
  </svg>
);

export const HirexLogo = ({ size = 'md', white = false }) => {
  const iconSizes = { sm: 32, md: 48, lg: 64 };
  const textSizes = { sm: '18px', md: '24px', lg: '32px' };
  const subSizes = { sm: '8px', md: '9px', lg: '11px' };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: size === 'sm' ? 8 : 12 }}>
      <HirexIcon size={iconSizes[size]} />
      <div>
        <div style={{
          fontFamily: "'Space Grotesk', 'Inter', sans-serif",
          fontSize: textSizes[size],
          fontWeight: 800,
          color: white ? '#fff' : 'var(--text-primary)',
          letterSpacing: '0.5px',
          lineHeight: 1,
        }}>
          HIREX
        </div>
        <div style={{
          fontSize: subSizes[size],
          fontWeight: 500,
          color: 'var(--text-secondary)',
          letterSpacing: '0.15em',
          marginTop: 2,
          textTransform: 'uppercase',
        }}>
          AI Interview Platform
        </div>
      </div>
    </div>
  );
};

export default HirexLogo;
