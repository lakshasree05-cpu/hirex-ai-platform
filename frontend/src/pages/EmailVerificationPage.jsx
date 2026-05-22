import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { HirexLogo } from '../components/HirexLogo';

const TIMER_SECS = 45;

const LeftPanel = () => (
  <div style={{ flex: 1, padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'linear-gradient(160deg, #070b1f 0%, #0d1140 100%)', position: 'relative', overflow: 'hidden' }}>
    {/* Decorative blobs */}
    <div style={{ position: 'absolute', bottom: -60, left: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,95,255,0.15) 0%, transparent 70%)', animation: 'float 6s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', top: '30%', right: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(147,51,234,0.12) 0%, transparent 70%)', animation: 'floatReverse 8s ease-in-out infinite' }} />

    <div style={{ position: 'relative', zIndex: 2 }}>
      <HirexLogo size="sm" />
      <div style={{ marginTop: 48 }}>
        <h1 style={{ fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 800, lineHeight: 1.25, marginBottom: 16 }}>
          One Step Closer to Your{' '}
          <span className="gradient-text">Dream Job!</span>
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 340, marginBottom: 36 }}>
          Verify your email to access personalized interviews, AI-powered evaluations and better career opportunities.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            { icon: '🛡️', bg: '#1e2d5a', title: 'Secure & Trusted', desc: 'Your data is protected with enterprise-grade security.' },
            { icon: '🤖', bg: '#1a2050', title: 'AI-Powered Evaluation', desc: 'Smart assessment across multiple rounds to find the best talent.' },
            { icon: '📊', bg: '#1e2450', title: 'Insightful Reports', desc: 'Detailed performance reports to track your progress.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: item.bg, border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18 }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* 3D envelope illustration */}
    <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center', margin: '32px 0' }}>
      <div style={{ position: 'relative', animation: 'float 4s ease-in-out infinite' }}>
        <svg width="140" height="120" viewBox="0 0 140 120" fill="none">
          <defs>
            <linearGradient id="envGrad1" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#7c6ff7"/><stop offset="1" stopColor="#4f46e5"/></linearGradient>
            <linearGradient id="envGrad2" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#9333ea"/><stop offset="1" stopColor="#7c3aed"/></linearGradient>
          </defs>
          {/* Envelope body */}
          <rect x="10" y="30" width="120" height="80" rx="8" fill="url(#envGrad1)" opacity="0.9"/>
          <rect x="10" y="30" width="120" height="80" rx="8" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
          {/* Envelope flap */}
          <path d="M10 38 L70 75 L130 38" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none"/>
          {/* Fold lines */}
          <line x1="10" y1="110" x2="55" y2="65" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
          <line x1="130" y1="110" x2="85" y2="65" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
          {/* Check badge */}
          <circle cx="95" cy="90" r="18" fill="#10b981"/>
          <polyline points="88,90 93,95 103,83" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          {/* Glow */}
          <circle cx="70" cy="70" r="55" fill="rgba(91,95,255,0.08)"/>
        </svg>
        {/* Sparkles */}
        {[{x:20,y:15},{x:120,y:20},{x:10,y:60},{x:130,y:55}].map((s,i)=>(
          <div key={i} style={{position:'absolute',left:s.x,top:s.y,width:6,height:6,borderRadius:'50%',background:'rgba(99,102,241,0.8)',animation:`pulse-glow ${1.5+i*0.3}s ease-in-out infinite`}}/>
        ))}
      </div>
    </div>

    {/* Quote */}
    <div style={{ position: 'relative', zIndex: 2, padding: '20px 24px', background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ fontSize: 32, color: 'var(--blue-light)', lineHeight: 1, marginBottom: 8, fontFamily: 'Georgia, serif' }}>"</div>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 8 }}>
        The future belongs to those who believe in the beauty of their dreams.
      </p>
      <p style={{ fontSize: 12, color: 'var(--blue-light)', fontWeight: 600 }}>– Eleanor Roosevelt</p>
    </div>
  </div>
);

const EmailVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'example@gmail.com';
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(TIMER_SECS);
  const [canResend, setCanResend] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const id = setTimeout(() => setTimer(t => t - 1), 1000);
      return () => clearTimeout(id);
    } else setCanResend(true);
  }, [timer]);

  const handleOtpChange = (i, val) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) inputRefs.current[i - 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const next = [...otp];
    text.split('').forEach((c, i) => { next[i] = c; });
    setOtp(next);
    if (text.length < 6) inputRefs.current[text.length]?.focus();
  };

  const handleResend = () => {
    setTimer(TIMER_SECS); setCanResend(false); setOtp(['','','','','','']);
  };

  const handleContinue = async (role) => {
    setSelectedRole(role); setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    if (role === 'candidate') navigate('/candidate/test-rounds');
    else navigate('/hr/dashboard');
  };

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#070b1f' }}>
      {/* Left Panel */}
      <div style={{ display: 'none', flex: 1 }} className="left-panel-lg">
        <LeftPanel />
      </div>
      <LeftPanel />

      {/* Right Panel */}
      <div style={{ flex: 1, background: '#0d1140', display: 'flex', flexDirection: 'column', position: 'relative', minWidth: 0 }}>
        {/* Top bar */}
        <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'flex-end' }}>
          <ThemeToggle />
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 24px 40px' }}>
          <div style={{ width: '100%', maxWidth: 500, animation: 'slideUp 0.6s ease forwards' }}>

            {/* Envelope icon */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(91,95,255,0.2), rgba(147,51,234,0.2))', border: '2px solid rgba(91,95,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div style={{ position: 'absolute', bottom: -2, right: -2, width: 26, height: 26, borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
              </div>
            </div>

            {/* Title */}
            <h2 style={{ textAlign: 'center', fontSize: 26, fontWeight: 800, marginBottom: 8 }}>
              <span className="gradient-text">Verify Your Email</span>
            </h2>
            <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-secondary)', marginBottom: 6 }}>
              We've sent a 6-digit OTP to
            </p>

            {/* Email display */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 14, fontWeight: 500 }}>
                {email}
              </div>
              <button onClick={() => navigate('/auth')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
            </div>

            <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>
              Enter the OTP below to continue
            </p>

            {/* OTP Inputs */}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 24 }}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={el => inputRefs.current[i] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                  style={{
                    width: 52, height: 58, textAlign: 'center', fontSize: 22, fontWeight: 700,
                    background: 'rgba(255,255,255,0.05)', borderRadius: 12,
                    border: `2px solid ${digit ? 'var(--blue-primary)' : 'rgba(255,255,255,0.1)'}`,
                    color: 'white', outline: 'none', transition: 'all 0.2s ease',
                    cursor: 'text',
                    boxShadow: digit ? '0 0 12px rgba(91,95,255,0.3)' : 'none',
                  }}
                />
              ))}
            </div>

            {/* Timer / Resend */}
            <div style={{ textAlign: 'center', marginBottom: 28, fontSize: 13, color: 'var(--text-secondary)' }}>
              Didn't receive the code?{' '}
              {canResend ? (
                <button onClick={handleResend} style={{ background: 'none', border: 'none', color: '#6366f1', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>
                  Resend OTP
                </button>
              ) : (
                <span>
                  <span style={{ color: '#6366f1', fontWeight: 700 }}>Resend OTP</span>
                  {' '}in <span style={{ fontWeight: 700 }}>{fmt(timer)}</span>
                </span>
              )}
            </div>

            {/* Verify button */}
            <button
              className="btn btn-primary"
              style={{ width: '100%', marginBottom: 24 }}
              onClick={() => handleContinue(selectedRole || 'candidate')}
              disabled={otp.join('').length < 6 || loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            {/* OR Continue As */}
            <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: 16 }}>
              OR CONTINUE AS
            </div>

            {/* Role Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {/* Candidate */}
              <div className="card" style={{ padding: '20px 16px', textAlign: 'center', border: '2px solid rgba(91,95,255,0.25)', background: 'rgba(91,95,255,0.06)', cursor: 'pointer', transition: 'all 0.25s ease' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(91,95,255,0.6)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(91,95,255,0.25)'}
              >
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(91,95,255,0.15)', border: '2px solid rgba(91,95,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Candidate</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 14, lineHeight: 1.4 }}>I'm here to take tests and grow my career</div>
                <button className="btn btn-primary" style={{ width: '100%', padding: '11px 8px', fontSize: 13 }} onClick={() => handleContinue('candidate')} disabled={loading}>
                  Continue as Candidate →
                </button>
              </div>

              {/* HR Admin */}
              <div className="card" style={{ padding: '20px 16px', textAlign: 'center', border: '2px solid rgba(16,185,129,0.25)', background: 'rgba(16,185,129,0.06)', cursor: 'pointer', transition: 'all 0.25s ease' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(16,185,129,0.6)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(16,185,129,0.25)'}
              >
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '2px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>HR / Admin</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 14, lineHeight: 1.4 }}>I'm here to hire and find the best talent</div>
                <button className="btn btn-green" style={{ width: '100%', padding: '11px 8px', fontSize: 13 }} onClick={() => handleContinue('hr')} disabled={loading}>
                  Continue as HR / Admin →
                </button>
              </div>
            </div>

            {/* Security note */}
            <div style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Your information is <strong style={{ color: '#34d399' }}>100% secure</strong> and encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
