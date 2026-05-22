import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import ThemeToggle from '../components/ThemeToggle';
import { HirexIcon } from '../components/HirexLogo';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-full" style={{ background: 'linear-gradient(135deg, #070b1f 0%, #0d1140 50%, #0a0820 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <AnimatedBackground />

      {/* Theme Toggle */}
      <div style={{ position: 'absolute', top: 24, right: 28, zIndex: 10 }}>
        <ThemeToggle />
      </div>

      {/* Center Content */}
      <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, padding: '0 20px', animation: 'slideUp 0.8s ease forwards' }}>

        {/* Logo */}
        <div style={{ marginBottom: 20, filter: 'drop-shadow(0 0 40px rgba(91,95,255,0.5))' }}>
          <HirexIcon size={90} />
        </div>

        {/* Brand Name */}
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(52px, 8vw, 88px)',
          fontWeight: 900,
          color: 'white',
          letterSpacing: '4px',
          lineHeight: 1,
          marginBottom: 8,
          textShadow: '0 0 60px rgba(91,95,255,0.4)',
        }}>
          HIREX
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(10px, 1.5vw, 13px)',
          fontWeight: 600,
          letterSpacing: '0.35em',
          color: 'rgba(255,255,255,0.55)',
          textTransform: 'uppercase',
          marginBottom: 16,
        }}>
          AI &nbsp; INTERVIEW &nbsp; PLATFORM
        </p>

        {/* Gradient divider */}
        <div className="gradient-divider" style={{ marginBottom: 20 }} />

        {/* Tagline */}
        <p style={{
          fontSize: 'clamp(16px, 2vw, 20px)',
          color: 'rgba(255,255,255,0.75)',
          fontWeight: 400,
          marginBottom: 40,
          letterSpacing: '0.02em',
        }}>
          Smarter Interviews. Better Hiring.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/auth')}
            style={{ minWidth: 200, fontSize: 16, padding: '16px 36px' }}
          >
            Get Started
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button
            className="btn btn-outline"
            style={{ minWidth: 180, fontSize: 16, padding: '16px 36px' }}
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Features section (scroll target) */}
      <section id="features" style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: 1100, padding: '80px 24px 60px', marginTop: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {[
            { icon: '🎯', title: 'AI-Powered Assessments', desc: 'Smart evaluation across aptitude, coding, typing, and interview rounds with real-time AI analysis.' },
            { icon: '📊', title: 'Insightful Reports', desc: 'Detailed performance analytics and candidate comparison dashboards for smarter hiring decisions.' },
            { icon: '🔒', title: 'Anti-Cheat Monitoring', desc: 'Face detection, tab-switching alerts, eye tracking and background noise detection built-in.' },
            { icon: '⚡', title: 'Instant Results', desc: 'Auto-evaluated scores published instantly after each round with transparent scoring criteria.' },
          ].map((f, i) => (
            <div key={i} className="card" style={{ padding: '28px 24px', animation: `slideUp ${0.5 + i * 0.1}s ease forwards`, opacity: 0, animationDelay: `${0.3 + i * 0.1}s`, animationFillMode: 'forwards' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: 'white' }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
