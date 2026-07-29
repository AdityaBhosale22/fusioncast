import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import ToastProvider from './components/common/ToastProvider';
import Loader from './components/common/Loader';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Lazy loaded page components for optimal performance
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const VideoPage = lazy(() => import('./pages/VideoPage'));
const UploadPage = lazy(() => import('./pages/UploadPage'));
const SubscriptionsPage = lazy(() => import('./pages/SubscriptionsPage'));
const PlaylistsPage = lazy(() => import('./pages/PlaylistsPage'));
const PlaylistDetailsPage = lazy(() => import('./pages/PlaylistDetailsPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <ToastProvider />
          <Suspense fallback={<Loader fullScreen text="Loading FusionCast..." />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected App Routes enclosed in Layout */}
              <Route
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile/:username" element={<ProfilePage />} />
                <Route path="/video/:id" element={<VideoPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/subscriptions" element={<SubscriptionsPage />} />
                <Route path="/playlists" element={<PlaylistsPage />} />
                <Route path="/playlist/:id" element={<PlaylistDetailsPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>

              {/* 404 Catch-all */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
