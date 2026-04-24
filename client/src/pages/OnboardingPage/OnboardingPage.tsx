import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/index.ts';
import { useAuth } from '@/core/auth/index.ts';
import './OnboardingPage.css';

type Mode = 'welcome' | 'login' | 'register';

export function OnboardingPage() {
  const [mode, setMode] = useState<Mode>('welcome');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login: storeLogin, register, loading, error } = useAuthStore();
  const { login: ctxLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await storeLogin(email, password);
      ctxLogin(user);
      navigate('/');
    } catch { /* error shown via store */ }
  };

  const handleRegister = async () => {
    try {
      const user = await register(name, email, password);
      ctxLogin(user);
      navigate('/');
    } catch { /* error shown via store */ }
  };

  if (mode === 'welcome') {
    return (
      <div className="onboarding">
        {/* Header */}
        <header className="onboarding__header">
          <div style={{ width: '2rem' }} />
          <span className="top-bar__logo">No4Get</span>
          <div style={{ width: '2rem' }} />
        </header>

        <main className="onboarding__main">
          <div className="onboarding__glow">
            <div className="onboarding__glow-circle" />
          </div>

          {/* Illustration */}
          <div className="onboarding__illustration">
            <span className="material-symbols-outlined">person_add</span>
            <div className="onboarding__floating-badge">
              <span className="material-symbols-outlined">favorite</span>
            </div>
          </div>

          {/* Copy */}
          <div className="onboarding__content">
            <h2 className="onboarding__title">Your Circle is Quiet</h2>
            <p className="onboarding__subtitle">
              Start by adding the people who matter most. We'll help you find the perfect gifts for their special moments.
            </p>
          </div>

          {/* Actions */}
          <div className="onboarding__actions">
            <button className="btn btn-primary w-full" onClick={() => setMode('register')}>
              Add Someone Manually
            </button>
            <button className="btn btn-ghost w-full" onClick={() => setMode('login')}>
              I already have an account
            </button>
            <button
              className="btn onboarding__dev-login w-full"
              onClick={async () => {
                const user = await storeLogin('rotem@example.com', 'password123');
                ctxLogin(user);
                navigate('/');
              }}
            >
              ⚡ Dev Login
            </button>
          </div>

          <p className="onboarding__hint">Curating meaningful connections since 2024</p>
        </main>
      </div>
    );
  }

  const isLogin = mode === 'login';

  return (
    <div className="onboarding">
      <header className="onboarding__header">
        <button className="onboarding__back" onClick={() => setMode('welcome')}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="top-bar__logo">No4Get</span>
        <div style={{ width: '2.5rem' }} />
      </header>

      <div className="onboarding__form-screen">
        <div className="onboarding__form-header">
          <span className="onboarding__step-label">
            {isLogin ? 'Step 01 — Return' : 'Step 01 — Curation'}
          </span>
          <h2 className="onboarding__form-title">
            {isLogin ? (
              <>Welcome<br /><em>back.</em></>
            ) : (
              <>Define a new<br /><em>perspective.</em></>
            )}
          </h2>
        </div>

        <div className="onboarding__form">
          {!isLogin && (
            <div className="field">
              <label className="field__label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="field__input"
                  placeholder="e.g. Rotem Cohen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="field__underline" />
              </div>
            </div>
          )}

          <div className="field">
            <label className="field__label">Email</label>
            <div style={{ position: 'relative' }}>
              <input
                className="field__input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="field__underline" />
            </div>
          </div>

          <div className="field">
            <label className="field__label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                className="field__input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="field__underline" />
            </div>
          </div>

          {error && <p className="onboarding__error">{error}</p>}

          <div className="onboarding__submit">
            <button
              className="btn btn-primary w-full"
              disabled={loading}
              onClick={isLogin ? handleLogin : handleRegister}
            >
              {loading ? 'Loading…' : isLogin ? 'Sign In' : 'Build Profile'}
            </button>
            <button className="btn btn-ghost w-full" style={{ marginTop: '1.5rem', fontSize: '0.7rem' }} onClick={() => setMode('welcome')}>
              Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
