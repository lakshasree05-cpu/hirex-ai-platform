import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import ThemeToggle from '../components/ThemeToggle';
import { HirexLogo } from '../components/HirexLogo';

const EyeIcon = ({ open }) => open ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
) : (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
);

const AuthPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (mode === 'signup' && form.password !== form.confirm) {
      setError('Passwords do not match.'); return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    navigate('/verify-email', { state: { email: form.email, mode } });
  };

  return (
    <div className="page-full" style={{ background: 'linear-gradient(135deg, #070b1f 0%, #0d1140 50%, #0a0820 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <AnimatedBackground />

      <div style={{ position: 'absolute', top: 24, left: 28, zIndex: 10 }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <HirexLogo size="sm" />
        </button>
      </div>
      <div style={{ position: 'absolute', top: 24, right: 28, zIndex: 10 }}>
        <ThemeToggle />
      </div>

      <div style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: 460, padding: '0 20px', animation: 'scaleIn 0.5s ease forwards' }}>
        <div className="card" style={{ padding: '40px 36px' }}>
          {/* Tab toggle */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 4, marginBottom: 32 }}>
            {['login', 'signup'].map(m => (
              <button key={m} onClick={() => { setMode(m); setError(''); }} style={{
                flex: 1, padding: '10px', borderRadius: 9, border: 'none', fontWeight: 600, fontSize: 14,
                background: mode === m ? 'linear-gradient(135deg, #5b5fff, #9333ea)' : 'transparent',
                color: mode === m ? 'white' : 'var(--text-secondary)',
                transition: 'all 0.25s ease', cursor: 'pointer',
              }}>
                {m === 'login' ? 'Login' : 'Sign Up'}
              </button>
            ))}
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>
            {mode === 'login' ? 'Welcome back!' : 'Create your account'}
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28 }}>
            {mode === 'login' ? 'Login to continue your journey.' : 'Join HIREX and start your career journey.'}
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {mode === 'signup' && (
              <div className="input-group">
                <label>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </span>
                  <input className="input-field" type="text" placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={{ paddingLeft: 42 }} />
                </div>
              </div>
            )}

            <div className="input-group">
              <label>Email Address</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </span>
                <input className="input-field" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required style={{ paddingLeft: 42 }} />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
                <input className="input-field" type={showPwd ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required style={{ paddingLeft: 42, paddingRight: 44 }} />
                <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <EyeIcon open={showPwd} />
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div className="input-group">
                <label>Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </span>
                  <input className="input-field" type="password" placeholder="••••••••" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} required style={{ paddingLeft: 42 }} />
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="button" style={{ background: 'none', border: 'none', color: 'var(--blue-light)', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>
                  Forgot Password?
                </button>
              </div>
            )}

            {error && (
              <div style={{ padding: '10px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, fontSize: 13, color: '#f87171' }}>
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', marginTop: 4, padding: '15px' }}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin-slow 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                  Processing...
                </span>
              ) : mode === 'login' ? 'Login to Account' : 'Create Account'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }} />
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>OR</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }} />
            </div>

            <button type="button" className="btn btn-outline" onClick={() => navigate('/hr-login')} style={{ width: '100%' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              Login as HR / Admin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
