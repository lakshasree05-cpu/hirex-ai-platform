import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { HirexLogo } from '../components/HirexLogo';
import TopBar from '../components/TopBar';

const hrNav = [
  { icon: '⊞', label: 'Dashboard', path: '/hr/dashboard' },
  { icon: '💼', label: 'Manage Jobs', path: '/hr/jobs' },
  { icon: '👥', label: 'View Candidates', path: '/hr/candidates' },
  { icon: '⭐', label: 'Shortlisted', path: '/hr/shortlisted' },
  { icon: '📊', label: 'Reports', path: '/hr/reports' },
  { icon: '🔔', label: 'Notifications', path: '/hr/notifications', badge: 2 },
  { icon: '⚙️', label: 'Settings', path: '/hr/settings' },
];

const HRSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <aside style={{ width: 'var(--sidebar-width)', minHeight: '100vh', background: 'linear-gradient(180deg,#0a0e28 0%,#0d1340 100%)', borderRight: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <HirexLogo size="sm" />
        <div style={{ marginTop: 10 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#34d399', background: 'rgba(16,185,129,0.1)', padding: '3px 8px', borderRadius: 4 }}>HR / ADMIN</span>
        </div>
      </div>
      <nav style={{ flex: 1, padding: '12px 0' }}>
        {hrNav.map(item => {
          const active = location.pathname === item.path;
          return (
            <button key={item.path} onClick={() => navigate(item.path)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', background: active ? 'linear-gradient(90deg,rgba(91,95,255,0.2),rgba(91,95,255,0.05))' : 'transparent', borderLeft: `3px solid ${active ? 'var(--blue-primary)' : 'transparent'}`, border: 'none', color: active ? 'white' : 'rgba(255,255,255,0.55)', fontSize: 14, fontWeight: active ? 600 : 400, cursor: 'pointer', transition: 'all 0.2s', position: 'relative' }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; } }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
              {item.badge && <span style={{ background: '#ef4444', color: 'white', fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 10 }}>{item.badge}</span>}
            </button>
          );
        })}
      </nav>
      <div style={{ padding: '12px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button onClick={() => navigate('/')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.45)', fontSize: 14, cursor: 'pointer' }}
          onMouseEnter={e => e.currentTarget.style.color = '#f87171'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
        >
          <span>↩</span> Logout
        </button>
      </div>
    </aside>
  );
};

const HRTopBar = () => (
  <header style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(10,14,40,0.8)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 50 }}>
    <div style={{ fontSize: 16, fontWeight: 700 }}>HR Dashboard</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <button style={{ position: 'relative', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.7)' }}>
        🔔<span className="notif-dot" style={{ width: 16, height: 16, fontSize: 9 }}>2</span>
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '6px 10px', borderRadius: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#34d399,#10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Hello, Admin</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>hr@company.com</div>
        </div>
      </div>
    </div>
  </header>
);

const HROverview = () => {
  const navigate = useNavigate();
  const stats = [
    { label: 'Active Jobs', value: '12', color: '#5b5fff', icon: '💼', delta: '+3 this week' },
    { label: 'Total Candidates', value: '248', color: '#60a5fa', icon: '👥', delta: '+18 today' },
    { label: 'Shortlisted', value: '34', color: '#34d399', icon: '⭐', delta: '+5 new' },
    { label: 'Hired This Month', value: '8', color: '#f59e0b', icon: '🏆', delta: 'Great progress!' },
  ];

  const candidates = [
    { name: 'Rahul Sharma', role: 'Software Engineer', score: 94, status: 'Shortlisted', avatar: 'RS' },
    { name: 'Priya Patel', role: 'Data Analyst', score: 89, status: 'In Review', avatar: 'PP' },
    { name: 'Amit Kumar', role: 'Product Manager', score: 76, status: 'Pending', avatar: 'AK' },
    { name: 'Neha Singh', role: 'UX Designer', score: 91, status: 'Shortlisted', avatar: 'NS' },
    { name: 'Vikram Rao', role: 'Backend Developer', score: 83, status: 'In Review', avatar: 'VR' },
  ];

  const statusColor = { 'Shortlisted': '#34d399', 'In Review': '#f59e0b', 'Pending': '#94a3b8' };

  return (
    <div style={{ padding: '28px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>HR Dashboard 📊</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 28 }}>Manage your hiring pipeline and evaluate candidates.</p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
        {stats.map((s, i) => (
          <div key={i} className="card" style={{ padding: '20px 22px', borderTop: `3px solid ${s.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: s.color, fontWeight: 500 }}>{s.delta}</div>
              </div>
              <span style={{ fontSize: 28 }}>{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Candidates */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 20 }}>
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Recent Candidates</h3>
            <button onClick={() => navigate('/hr/candidates')} style={{ background: 'none', border: 'none', color: 'var(--blue-light)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>View All →</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {candidates.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.2s', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(91,95,255,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
              >
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#5b5fff,#9333ea)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white', flexShrink: 0 }}>{c.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{c.role}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: c.score >= 90 ? '#34d399' : c.score >= 80 ? '#f59e0b' : 'var(--text-secondary)' }}>{c.score}%</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: statusColor[c.status] }}>{c.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Post New Job', icon: '➕', color: '#5b5fff' },
              { label: 'View Reports', icon: '📊', color: '#60a5fa' },
              { label: 'Shortlist Candidates', icon: '⭐', color: '#34d399' },
              { label: 'Schedule Interviews', icon: '📅', color: '#f59e0b' },
              { label: 'Export Data', icon: '📥', color: '#a78bfa' },
            ].map((a, i) => (
              <button key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: `${a.color}11`, border: `1px solid ${a.color}22`, borderRadius: 10, color: 'white', fontSize: 13, fontWeight: 500, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = `${a.color}22`; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${a.color}11`; }}
              >
                <span>{a.icon}</span> {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PlaceholderPage = ({ title }) => (
  <div style={{ padding: '60px 28px', textAlign: 'center' }}>
    <div style={{ fontSize: 64, marginBottom: 16 }}>🚧</div>
    <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{title}</h2>
    <p style={{ color: 'var(--text-secondary)' }}>This section is coming soon.</p>
  </div>
);

const HRDashboard = () => (
  <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
    <HRSidebar />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
      <HRTopBar />
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <Routes>
          <Route index element={<HROverview />} />
          <Route path="dashboard" element={<HROverview />} />
          <Route path="jobs" element={<PlaceholderPage title="Manage Jobs" />} />
          <Route path="candidates" element={<PlaceholderPage title="View Candidates" />} />
          <Route path="shortlisted" element={<PlaceholderPage title="Shortlisted Candidates" />} />
          <Route path="reports" element={<PlaceholderPage title="Reports" />} />
          <Route path="notifications" element={<PlaceholderPage title="Notifications" />} />
          <Route path="settings" element={<PlaceholderPage title="Settings" />} />
        </Routes>
      </main>
    </div>
  </div>
);

export default HRDashboard;
