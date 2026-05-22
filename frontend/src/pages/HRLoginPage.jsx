import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HirexLogo } from '../components/HirexLogo';

const EyeIcon = ({ open }) => open ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
) : (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
);

const HRLoginPage = () => {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    navigate('/hr/dashboard');
  };

  const features = [
    { icon: '💼', color: '#5b5fff', title: 'Manage Jobs', desc: 'Create jobs, set test rounds and customize criteria.' },
    { icon: '👥', color: '#8b5cf6', title: 'Evaluate Candidates', desc: 'View applications, test scores and AI analysis.' },
    { icon: '📊', color: '#06b6d4', title: 'Smart Reports', desc: 'Get detailed insights and performance reports.' },
    { icon: '🛡️', color: '#10b981', title: 'Secure & Reliable', desc: 'Enterprise-grade security to protect your data.' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#070b1f' }}>
      {/* Left Panel */}
      <div style={{ flex: 1, padding: '40px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'linear-gradient(160deg, #070b1f 0%, #0d1140 100%)', position: 'relative', overflow: 'hidden' }}>
        {/* Blobs */}
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,95,255,0.12) 0%, transparent 70%)', animation: 'float 7s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '20%', right: -60, width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(147,51,234,0.1) 0%, transparent 70%)', animation: 'floatReverse 9s ease-in-out infinite' }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: 40, display: 'block' }}>
            <HirexLogo size="sm" />
          </button>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(91,95,255,0.12)', border: '1px solid rgba(91,95,255,0.2)', borderRadius: 20, fontSize: 12, fontWeight: 600, color: '#818cf8', marginBottom: 24 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            HR / ADMIN PORTAL
          </div>

          <h1 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 900, lineHeight: 1.2, marginBottom: 16 }}>
            Smarter Hiring.<br />
            Stronger <span className="gradient-text">Teams.</span>
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 360, marginBottom: 40 }}>
            Access your dashboard to manage jobs, evaluate candidates, track performance and hire the best talent with AI.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {features.map((f, i) => (
              <div key={i} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12 }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{f.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: f.color, marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard screenshot illustration */}
        <div style={{ position: 'relative', zIndex: 2, marginTop: 32 }}>
          <div style={{ background: 'rgba(13,19,64,0.8)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '16px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 24, height: 24, borderRadius: 4, background: 'linear-gradient(135deg,#5b5fff,#9333ea)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: 'white' }}>H</div>
              <span style={{ fontSize: 11, fontWeight: 700 }}>HIREX</span>
              <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-muted)' }}>Dashboard</span>
            </div>
            {/* Mini chart bars */}
            <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 50, marginBottom: 8 }}>
              {[35, 55, 40, 70, 50, 80, 60, 75, 45, 85].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', background: `linear-gradient(180deg, ${i % 2 === 0 ? '#5b5fff' : '#9333ea'}, rgba(91,95,255,0.2))` }} />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {['Candidates','Shortlisted','Hired','Reports'].map((l,i)=>(<span key={i} style={{fontSize:9,color:'var(--text-muted)'}}>{l}</span>))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form (white card look) */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', background: 'linear-gradient(160deg, #0d1140 0%, #1a0d40 100%)' }}>
        <div style={{ width: '100%', maxWidth: 460, animation: 'scaleIn 0.5s ease forwards' }}>
          <div style={{ background: 'white', borderRadius: 20, padding: '44px 40px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
            {/* Avatar */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#f0f2ff', border: '3px solid #e8ebff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
            </div>

            <h2 style={{ textAlign: 'center', fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>HR / Admin Login</h2>
            <p style={{ textAlign: 'center', fontSize: 14, color: '#64748b', marginBottom: 32 }}>Welcome back! Please login to your account.</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="input-group">
                <label style={{ color: '#374151', fontSize: 13, fontWeight: 600 }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </span>
                  <input className="input-field input-field-light" type="email" placeholder="Enter your email address" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required style={{ paddingLeft: 42 }} />
                </div>
              </div>

              <div className="input-group">
                <label style={{ color: '#374151', fontSize: 13, fontWeight: 600 }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </span>
                  <input className="input-field input-field-light" type={showPwd ? 'text' : 'password'} placeholder="Enter your password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required style={{ paddingLeft: 42, paddingRight: 44 }} />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>
                    <EyeIcon open={showPwd} />
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: '#374151' }}>
                  <input type="checkbox" checked={form.remember} onChange={e => setForm({...form, remember: e.target.checked})} style={{ width: 16, height: 16, accentColor: '#4f46e5' }} />
                  Remember me
                </label>
                <button type="button" style={{ background: 'none', border: 'none', color: '#4f46e5', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Forgot Password?</button>
              </div>

              <button type="submit" disabled={loading} style={{
                width: '100%', padding: '15px', borderRadius: 12, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #5b5fff, #9333ea)', color: 'white', fontSize: 15, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: '0 4px 20px rgba(91,95,255,0.3)', transition: 'all 0.25s ease',
              }}>
                {loading ? 'Logging in...' : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                    Login to Dashboard
                  </>
                )}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
                <span style={{ fontSize: 12, color: '#94a3b8' }}>or</span>
                <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
              </div>

              <button type="button" style={{
                width: '100%', padding: '14px', borderRadius: 12, border: '2px solid #e2e8f0', cursor: 'pointer',
                background: 'white', color: '#374151', fontSize: 14, fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.25s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#c7d2fe'; e.currentTarget.style.background = '#f0f2ff'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = 'white'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Login with SSO
              </button>

              <p style={{ textAlign: 'center', fontSize: 13, color: '#64748b' }}>
                Don't have an account?{' '}
                <button type="button" style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
                  Contact Super Admin
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRLoginPage;
