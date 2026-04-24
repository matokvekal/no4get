import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/core/auth/index.ts';
import { lazy, Suspense, type ReactNode } from 'react';

import { MainLayout } from '@/layouts/MainLayout.tsx';
import { AuthLayout } from '@/layouts/AuthLayout.tsx';

const OnboardingPage = lazy(() => import('@/pages/OnboardingPage/OnboardingPage.tsx').then((m) => ({ default: m.OnboardingPage })));
const HomePage = lazy(() => import('@/pages/HomePage/HomePage.tsx').then((m) => ({ default: m.HomePage })));
const PeoplePage = lazy(() => import('@/pages/PeoplePage/PeoplePage.tsx').then((m) => ({ default: m.PeoplePage })));
const AddFriendPage = lazy(() => import('@/pages/AddFriendPage/AddFriendPage.tsx').then((m) => ({ default: m.AddFriendPage })));
const GiftSuggestionsPage = lazy(() => import('@/pages/GiftSuggestionsPage/GiftSuggestionsPage.tsx').then((m) => ({ default: m.GiftSuggestionsPage })));
const TimelinePage = lazy(() => import('@/pages/TimelinePage/TimelinePage.tsx').then((m) => ({ default: m.TimelinePage })));
const BasketPage = lazy(() => import('@/pages/BasketPage/BasketPage.tsx').then((m) => ({ default: m.BasketPage })));

function PageLoader() {
  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100dvh', color: 'var(--primary)' }}>Loading…</div>;
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? <>{children}</> : <Navigate to="/onboarding" replace />;
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/onboarding" element={<OnboardingPage />} />
        </Route>

        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route index element={<HomePage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/add-friend" element={<AddFriendPage />} />
          <Route path="/gifts/:personId" element={<GiftSuggestionsPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/basket" element={<BasketPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
