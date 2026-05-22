import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { HirexLogo } from '../components/HirexLogo';

const API_BASE = 'https://hirex-api-bgm9.onrender.com';

const TIMER_SECS = 45;

const LeftPanel = () => (
  <div style={{ flex: 1, padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'linear-gradient(160deg, #070b1f 0%, #0d1140 100%)' }}>
    <div>
      <HirexLogo size="sm" />

      <div style={{ marginTop: 48 }}>
        <h1 style={{ fontSize: 34, fontWeight: 800 }}>
          Verify Your Email
        </h1>

        <p style={{ marginTop: 12, color: '#aaa', lineHeight: 1.6 }}>
          Enter the OTP sent to your email to continue.
        </p>
      </div>
    </div>

    <div>
      <p style={{ color: '#777', fontSize: 13 }}>
        HIREX AI Interview Platform
      </p>
    </div>
  </div>
);

const EmailVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || '';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(TIMER_SECS);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const id = setTimeout(() => setTimer((t) => t - 1), 1000);
      return () => clearTimeout(id);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOtpChange = (i, val) => {
    if (!/^\d*$/.test(val)) return;

    const next = [...otp];
    next[i] = val.slice(-1);

    setOtp(next);

    if (val && i < 5) {
      inputRefs.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);

    const next = [...otp];

    pasted.split('').forEach((c, i) => {
      next[i] = c;
    });

    setOtp(next);
  };

  const handleResend = async () => {
    try {
      setError('');
      setSuccess('');

      const response = await fetch(`${API_BASE}/api/auth/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to resend OTP');
      }

      setSuccess('OTP resent successfully');

      setTimer(TIMER_SECS);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const enteredOtp = otp.join('');

      const response = await fetch(`${API_BASE}/api/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp: enteredOtp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Invalid OTP');
      }

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userName', data.name);

      setSuccess('OTP verified successfully');

      setTimeout(() => {
        if (data.role === 'candidate') {
          navigate('/candidate/test-rounds');
        } else {
          navigate('/hr/dashboard');
        }
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fmt = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(
      s % 60
    ).padStart(2, '0')}`;

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#070b1f',
      }}
    >
      <LeftPanel />

      <div
        style={{
          flex: 1,
          background: '#0d1140',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            padding: '20px 24px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <ThemeToggle />
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <div style={{ width: '100%', maxWidth: 500 }}>
            <h2
              style={{
                textAlign: 'center',
                fontSize: 28,
                fontWeight: 800,
                marginBottom: 10,
              }}
            >
              Verify OTP
            </h2>

            <p
              style={{
                textAlign: 'center',
                color: '#aaa',
                marginBottom: 24,
              }}
            >
              OTP sent to <strong>{email}</strong>
            </p>

            {error && (
              <div
                style={{
                  background: '#ff4d4f22',
                  color: '#ff7875',
                  padding: 12,
                  borderRadius: 8,
                  marginBottom: 16,
                  textAlign: 'center',
                }}
              >
                {error}
              </div>
            )}

            {success && (
              <div
                style={{
                  background: '#52c41a22',
                  color: '#73d13d',
                  padding: 12,
                  borderRadius: 8,
                  marginBottom: 16,
                  textAlign: 'center',
                }}
              >
                {success}
              </div>
            )}

            <div
              style={{
                display: 'flex',
                gap: 10,
                justifyContent: 'center',
                marginBottom: 24,
              }}
            >
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                  style={{
                    width: 55,
                    height: 60,
                    textAlign: 'center',
                    fontSize: 24,
                    borderRadius: 12,
                    border: '1px solid #555',
                    background: '#11183f',
                    color: '#fff',
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleVerifyOTP}
              disabled={otp.join('').length < 6 || loading}
              style={{
                width: '100%',
                height: 50,
                borderRadius: 10,
                border: 'none',
                background: '#6366f1',
                color: 'white',
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
              }}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <div
              style={{
                textAlign: 'center',
                marginTop: 20,
                color: '#aaa',
              }}
            >
              {canResend ? (
                <button
                  onClick={handleResend}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#818cf8',
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
                >
                  Resend OTP
                </button>
              ) : (
                <>
                  Resend OTP in{' '}
                  <span style={{ color: '#fff' }}>{fmt(timer)}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
