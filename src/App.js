import React, { Suspense } from 'react'; // Import Suspense
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './styles/global.css';
import Navbar from './components/Navbar/Navbar';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'; // Your loading indicator

// Lazy load page components
const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage/ProjectsPage'));
const ProjectDetailPage = React.lazy(() => import('./pages/ProjectDetailPage/ProjectDetailPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage/ContactPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage/NotFoundPage')); // Lazy load Not Found page too

// Define a reusable fallback component or style
const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 100px)', paddingTop: '2rem' }}>
    <LoadingSpinner />
  </div>
);


function App() {
  return (
    <Router>
      <Navbar />
      {/* Wrap Routes with Suspense and provide a fallback UI */}
      <Suspense fallback={<LoadingFallback />}>
        <AnimatePresence mode='wait'>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </Router>
  );
}

export default App;