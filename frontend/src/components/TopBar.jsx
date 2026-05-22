import React, { useState } from 'react';

const TopBar = ({ title, subtitle }) => {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header style={{
      height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px', borderBottom: '1px solid rgba(255,255,255,0.07)',
      background: 'rgba(10,14,40,0.8)', backdropFilter: 'blur(12px)',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', padding: 8, borderRadius: 8, display: 'flex', alignItems: 'center' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>

      <div style={{ flex: 1, padding: '0 16px' }}>
        {/* Breadcrumb / page info shown on mobile */}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Notification bell */}
        <button
          onClick={() => setNotifOpen(!notifOpen)}
          style={{ position: 'relative', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', transition: 'all 0.2s' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span className="notif-dot" style={{ width: 16, height: 16, fontSize: 9 }}>3</span>
        </button>

        {/* Divider */}
        <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.1)' }} />

        {/* User avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '6px 10px', borderRadius: 10, transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #5b5fff, #9333ea)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Hello, Candidate</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>candidate@email.com</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
