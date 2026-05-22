import React from 'react';

const rounds = [
  {
    num: '01', title: 'Aptitude Test', color: '#818cf8', bg: 'rgba(129,140,248,0.1)', border: 'rgba(129,140,248,0.3)',
    desc: 'Measure your quantitative, logical and analytical ability.',
    time: '60 min', questions: '40 Questions', done: true,
    emoji: '🧠',
  },
  {
    num: '02', title: 'Reasoning Test', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.3)',
    desc: 'Assess your logical thinking, problem solving and reasoning.',
    time: '60 min', questions: '40 Questions', done: true,
    emoji: '💡',
  },
  {
    num: '03', title: 'Coding Test', color: '#34d399', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.3)',
    desc: 'Evaluate your programming skills and coding knowledge.',
    time: '90 min', questions: '2 Problems', done: true,
    emoji: '⌨️',
  },
  {
    num: '04', title: 'Typing Test', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)',
    desc: 'Check your typing speed and accuracy.',
    time: '10 min', questions: '1 Session', done: true,
    emoji: '⌚',
  },
  {
    num: '05', title: 'Group Discussion', color: '#f472b6', bg: 'rgba(244,114,182,0.1)', border: 'rgba(244,114,182,0.3)',
    desc: 'Collaborate, communicate and present your ideas.',
    time: '30 min', questions: '1 Session', done: true,
    emoji: '👥',
  },
  {
    num: '06', title: 'AI Interview', color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.35)',
    desc: 'Face the AI panel and showcase your skills & confidence.',
    time: '30-40 min', questions: '1 Session', done: false, upcoming: true,
    emoji: '🤖',
  },
];

const whatsNext = [
  { num: 1, title: 'Shortlist to HR', color: '#34d399', desc: 'Based on your performance across all rounds, you will be shortlisted and sent to the HR team.', time: 'After AI Interview' },
  { num: 2, title: 'HR Review & Final Evaluation', color: '#60a5fa', desc: 'HR will review your profile, performance and conduct a final evaluation.', time: 'HR Round' },
  { num: 3, title: 'Job Selection', color: '#a78bfa', desc: 'Choose your preferred role and start your exciting journey with us!', time: 'Offer & Onboarding' },
];

const footerStats = [
  { icon: '🎯', label: 'AI Accuracy', desc: 'Smart evaluation with high accuracy.' },
  { icon: '✅', label: 'Fair & Transparent', desc: 'Unbiased assessment for every candidate.' },
  { icon: '📡', label: 'Real-time Insights', desc: 'Track your progress and improve continuously.' },
  { icon: '🔒', label: 'Secure & Confidential', desc: 'Your data is 100% secure and confidential.' },
  { icon: '⭐', label: 'Keep Going!', desc: "You've done great so far. All the best for the final stage! 💪", color: '#f59e0b' },
];

const TestRoundsPage = () => {
  const completedCount = rounds.filter(r => r.done).length;
  const progress = completedCount / rounds.length;
  const circumference = 2 * Math.PI * 45;
  const offset = circumference * (1 - progress);

  return (
    <div style={{ padding: '32px 28px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>
            You're in the Final Stage! 🚀
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
            Almost there! Ace the AI Interview and take the final step towards your dream job.
          </p>
        </div>

        {/* Progress card */}
        <div className="card" style={{ padding: '20px 28px', display: 'flex', alignItems: 'center', gap: 20, background: 'linear-gradient(135deg, rgba(10,14,40,0.9), rgba(13,19,64,0.9))', border: '1px solid rgba(255,255,255,0.1)', minWidth: 300 }}>
          {/* Circular progress */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <svg width={100} height={100} style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="45" fill="none"
                stroke="url(#progressGrad)" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: 'stroke-dashoffset 1s ease', filter: 'drop-shadow(0 0 6px rgba(52,211,153,0.5))' }}
              />
              <defs>
                <linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop stopColor="#34d399" /><stop offset="1" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: '#34d399' }}>100%</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Overall Progress</div>
            <div style={{ fontSize: 13, color: '#34d399', fontWeight: 600, marginBottom: 6 }}>All Rounds Completed 🎉</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>6/6 rounds complete</div>
            {/* Trophy */}
            <div style={{ fontSize: 32, marginTop: 4 }}>🏆</div>
          </div>
        </div>
      </div>

      {/* Your Journey */}
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Your Journey</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 16, marginBottom: 40, position: 'relative' }}>
        {rounds.map((r, i) => (
          <div key={i} style={{ position: 'relative' }}>
            {/* Connector line */}
            {i < rounds.length - 1 && (
              <div style={{
                position: 'absolute', right: -8, top: '40%', width: 16, height: 2, zIndex: 2,
                background: r.done ? 'linear-gradient(90deg, rgba(52,211,153,0.7), rgba(52,211,153,0.2))' : 'rgba(255,255,255,0.1)',
                borderTop: r.done ? 'none' : '2px dashed rgba(255,255,255,0.15)',
              }} />
            )}

            <div
              className="card"
              style={{
                padding: '20px 16px', textAlign: 'center', position: 'relative',
                background: r.upcoming ? 'linear-gradient(135deg, rgba(167,139,250,0.08), rgba(91,95,255,0.08))' : r.bg,
                border: `1.5px solid ${r.done ? 'rgba(52,211,153,0.3)' : r.border}`,
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 32px ${r.bg}`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {/* Round number */}
              <div style={{ position: 'absolute', top: 10, left: 12, width: 28, height: 28, borderRadius: 8, background: `${r.color}22`, border: `1px solid ${r.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: r.color }}>
                {r.num}
              </div>

              {/* NEW badge */}
              {r.upcoming && (
                <div style={{ position: 'absolute', top: 10, right: 10, background: '#5b5fff', color: 'white', fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 4, letterSpacing: '0.05em' }}>NEW</div>
              )}

              {/* Emoji */}
              <div style={{ fontSize: 40, marginTop: 8, marginBottom: 12, filter: r.done ? 'none' : 'grayscale(0.3)' }}>
                {r.emoji}
              </div>

              <div style={{ fontSize: 14, fontWeight: 700, color: r.color, marginBottom: 6 }}>{r.title}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 12 }}>{r.desc}</div>

              {/* Time & questions */}
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 10, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {r.time}
                </span>
                <span style={{ fontSize: 10, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  {r.questions}
                </span>
              </div>

              {/* Status */}
              {r.done ? (
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', boxShadow: '0 0 12px rgba(16,185,129,0.4)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '7px 14px', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.25)', borderRadius: 8, color: '#a78bfa', fontSize: 12, fontWeight: 600 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Upcoming
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* What's Next */}
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>What's Next?</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 32, position: 'relative' }}>
        {whatsNext.map((item, i) => (
          <div key={i} style={{ position: 'relative' }}>
            {/* Dashed connector */}
            {i < whatsNext.length - 1 && (
              <div style={{ position: 'absolute', right: -8, top: '35%', width: 16, height: 2, zIndex: 2, borderTop: '2px dashed rgba(255,255,255,0.15)' }} />
            )}
            <div className="card" style={{ padding: '24px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', border: `2px solid ${item.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, color: item.color, flexShrink: 0 }}>
                  {item.num}
                </div>
                <span style={{ fontSize: 15, fontWeight: 700, color: item.color }}>{item.title}</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 14 }}>{item.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: 8, width: 'fit-content' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer stats bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
        {footerStats.map((s, i) => (
          <div key={i} className="card" style={{ padding: '14px 16px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 20 }}>{s.icon}</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: s.color || 'rgba(255,255,255,0.8)', marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestRoundsPage;
