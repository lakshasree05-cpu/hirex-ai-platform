import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import CandidateDashboard from './pages/CandidateDashboard';
import HRLoginPage from './pages/HRLoginPage';
import HRDashboard from './pages/HRDashboard';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route path="/hr-login" element={<HRLoginPage />} />
          <Route path="/candidate/*" element={<CandidateDashboard />} />
          <Route path="/hr/*" element={<HRDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
