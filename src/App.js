import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './styles/global.css';
import Navbar from './components/Navbar/Navbar';
import SEO from './components/SEO/SEO';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { NotificationProvider } from './context/NotificationContext';
import Notification from './components/Notification/Notification';

// Lazy load components
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage/ProjectDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage/ContactPage'));
const Login = lazy(() => import('./components/Auth/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <NotificationProvider>
            <Router>
              <SEO />
              <Navbar />
              <Suspense fallback={<LoadingSpinner />}>
                <AnimatePresence mode='wait'>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route 
                      path="/dashboard" 
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      } 
                    />
                  </Routes>
                </AnimatePresence>
              </Suspense>
              <ThemeToggle />
              <Notification />
            </Router>
          </NotificationProvider>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;