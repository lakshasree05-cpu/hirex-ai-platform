import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import TestRoundsPage from './TestRoundsPage';

const OverviewPage = () => {
  const navigate = useNavigate();
  const stats = [
    { label: 'Tests Completed', value: '5/6', color: '#34d399', icon: '✅' },
    { label: 'Overall Score', value: '87%', color: '#60a5fa', icon: '📊' },
    { label: 'Rank', value: '#12', color: '#f59e0b', icon: '🏆' },
    { label: 'Next Round', value: 'AI Interview', color: '#a78bfa', icon: '🤖' },
  ];

  return (
    <div style={{ padding: '28px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Welcome back, Candidate! 👋</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 28 }}>Here's your performance overview.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
        {stats.map((s, i) => (
          <div key={i} className="card" style={{ padding: '20px 22px', borderLeft: `3px solid ${s.color}` }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 24 }}>
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Round Performance</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { name: 'Aptitude Test', score: 82, color: '#818cf8' },
              { name: 'Reasoning Test', score: 90, color: '#60a5fa' },
              { name: 'Coding Test', score: 95, color: '#34d399' },
              { name: 'Typing Test', score: 88, color: '#f59e0b' },
              { name: 'Group Discussion', score: 78, color: '#f472b6' },
            ].map((r, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13 }}>{r.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: r.color }}>{r.score}%</span>
                </div>
                <div style={{ height: 8, background: 'rgba(255,255,255,0.07)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${r.score}%`, height: '100%', background: `linear-gradient(90deg, ${r.color}, ${r.color}88)`, borderRadius: 4, transition: 'width 1.2s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Go to Test Rounds', icon: '🎯', action: () => navigate('/candidate/test-rounds') },
              { label: 'View My Reports', icon: '📄', action: () => {} },
              { label: 'Update Profile', icon: '👤', action: () => {} },
              { label: 'Contact Support', icon: '❓', action: () => {} },
            ].map((a, i) => (
              <button key={i} onClick={a.action} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, color: 'white', fontSize: 13, fontWeight: 500, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(91,95,255,0.12)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
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

const CandidateDashboard = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopBar />
        <main style={{ flex: 1, overflowY: 'auto' }}>
          <Routes>
            <Route index element={<OverviewPage />} />
            <Route path="dashboard" element={<OverviewPage />} />
            <Route path="test-rounds" element={<TestRoundsPage />} />
            <Route path="ai-interview" element={<PlaceholderPage title="AI Interview" />} />
            <Route path="performance" element={<PlaceholderPage title="My Performance" />} />
            <Route path="reports" element={<PlaceholderPage title="My Reports" />} />
            <Route path="messages" element={<PlaceholderPage title="Messages" />} />
            <Route path="notifications" element={<PlaceholderPage title="Notifications" />} />
            <Route path="profile" element={<PlaceholderPage title="Profile" />} />
            <Route path="help" element={<PlaceholderPage title="Help & Support" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default CandidateDashboard;
