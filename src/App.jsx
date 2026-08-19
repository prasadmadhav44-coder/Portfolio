import { Routes, Route } from 'react-router-dom';

import PortfolioHome from './PortfolioHome.jsx';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

import AdminLogin from './components/admin/AdminLogin.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import AdminDashboard from './components/admin/AdminDashboard.jsx';
import ProtectedRoute from './components/admin/ProtectedRoute.jsx';
import ProjectsManager from './components/admin/managers/ProjectsManager.jsx';
import AboutManager from './components/admin/managers/AboutManager.jsx';
import TechStackManager from './components/admin/managers/TechStackManager.jsx';
import ExperienceManager from './components/admin/managers/ExperienceManager.jsx';
import EducationManager from './components/admin/managers/EducationManager.jsx';
import CertificationsManager from './components/admin/managers/CertificationsManager.jsx';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PortfolioHome />} />

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="projects" element={<ProjectsManager />} />
            <Route path="about" element={<AboutManager />} />
            <Route path="tech-stack" element={<TechStackManager />} />
            <Route path="experience" element={<ExperienceManager />} />
            <Route path="education" element={<EducationManager />} />
            <Route path="certifications" element={<CertificationsManager />} />
          </Route>

          {/* Unknown routes fall back to the portfolio home */}
          <Route path="*" element={<PortfolioHome />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
