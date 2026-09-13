import { Routes, Route, Navigate } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";

import Home from "./pages/Home";
import ClassWork from "./pages/ClassWork";
import ProjectDetails from "./pages/ProjectDetails";
import NotFound from "./pages/NotFound";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminClassWork from "./pages/admin/AdminClassWork";
import AdminExperience from "./pages/admin/AdminExperience";
import AdminEducation from "./pages/admin/AdminEducation";
import AdminSkills from "./pages/admin/AdminSkills";
import AdminCertificates from "./pages/admin/AdminCertificates";
import AdminResume from "./pages/admin/AdminResume";
import AdminSettings from "./pages/admin/AdminSettings";

function App() {
  return (
    <ToastProvider>
      <Routes>
        {/* Public portfolio */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/class-work" element={<ClassWork />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
        </Route>

        {/* Admin auth */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin panel */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />

          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="class-work" element={<AdminClassWork />} />
          <Route path="experience" element={<AdminExperience />} />
          <Route path="education" element={<AdminEducation />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="certificates" element={<AdminCertificates />} />
          <Route path="resume" element={<AdminResume />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ToastProvider>
  );
}

export default App;
