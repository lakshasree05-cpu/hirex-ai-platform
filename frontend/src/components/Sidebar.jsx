import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HirexLogo } from './HirexLogo';

const navItems = [
  { icon: '⊞', label: 'Dashboard', path: '/candidate/dashboard' },
  { icon: '🎯', label: 'Test Rounds', path: '/candidate/test-rounds' },
  { icon: '🤖', label: 'AI Interview', path: '/candidate/ai-interview' },
  { icon: '📈', label: 'My Performance', path: '/candidate/performance' },
  { icon: '📄', label: 'My Reports', path: '/candidate/reports' },
  { icon: '💬', label: 'Messages', path: '/candidate/messages', badge: 2 },
  { icon: '🔔', label: 'Notifications', path: '/candidate/notifications', badge: 4 },
  { icon: '👤', label: 'Profile', path: '/candidate/profile' },
  { icon: '❓', label: 'Help & Support', path: '/candidate/help' },
];

const Sidebar = ({ onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const go = (path) => { navigate(path); onNavigate?.(); };

  return (
    <aside style={{
      width: collapsed ? 64 : 'var(--sidebar-width)',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0e28 0%, #0d1340 100%)',
      borderRight: '1px solid rgba(255,255,255,0.07)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      transition: 'width 0.25s ease',
      position: 'sticky',
      top: 0,
      overflow: 'hidden',
    }}>
      {/* Logo area */}
      <div style={{ padding: collapsed ? '20px 12px' : '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between' }}>
        {!collapsed && <HirexLogo size="sm" />}
        {collapsed && (
          <div style={{ width: 32, height: 32 }}>
            <svg viewBox="0 0 52 62" fill="none"><defs><linearGradient id="sl1" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#7c6ff7"/><stop offset="1" stopColor="#4f46e5"/></linearGradient></defs><rect x="0" y="0" width="17" height="62" rx="3" fill="url(#sl1)"/><rect x="35" y="0" width="17" height="62" rx="3" fill="#7c3aed"/><rect x="17" y="22" width="18" height="18" rx="1" fill="#6366f1"/></svg>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => go(item.path)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center',
                gap: 12, padding: collapsed ? '12px 0' : '12px 20px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                background: active ? 'linear-gradient(90deg, rgba(91,95,255,0.2), rgba(91,95,255,0.05))' : 'transparent',
                borderLeft: active ? '3px solid var(--blue-primary)' : '3px solid transparent',
                border: 'none',
                color: active ? 'white' : 'rgba(255,255,255,0.55)',
                fontSize: 14, fontWeight: active ? 600 : 400,
                cursor: 'pointer', transition: 'all 0.2s ease',
                position: 'relative',
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; } }}
            >
              <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
              {!collapsed && <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>}
              {!collapsed && item.badge && (
                <span style={{ background: '#ef4444', color: 'white', fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 10, minWidth: 18, textAlign: 'center' }}>{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* AI-Powered Assessments promo card */}
      {!collapsed && (
        <div style={{ margin: '12px 14px', padding: '16px', background: 'linear-gradient(135deg, rgba(91,95,255,0.15), rgba(147,51,234,0.15))', border: '1px solid rgba(91,95,255,0.2)', borderRadius: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#a5b4fc', marginBottom: 4 }}>
            <span className="gradient-text">AI-Powered</span> Assessments
          </div>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, marginBottom: 10 }}>
            Smart evaluation for a smarter tomorrow.
          </p>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #5b5fff, #9333ea)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', boxShadow: '0 0 20px rgba(91,95,255,0.4)' }}>
            <span style={{ fontSize: 22 }}>🤖</span>
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#818cf8', textAlign: 'center', marginTop: 8 }}>AI</div>
        </div>
      )}

      {/* Logout */}
      <div style={{ padding: '12px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 12,
            padding: collapsed ? '12px 0' : '12px 20px', justifyContent: collapsed ? 'center' : 'flex-start',
            background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.45)', fontSize: 14, cursor: 'pointer', transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
        >
          <span style={{ fontSize: 16 }}>↩</span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
