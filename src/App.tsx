// src/App.tsx
import React, { JSX } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Layout from "./components/Layout";

import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import DashboardPage from "./pages/DashBoard";
import PublicStorePage from "./pages/PublicStorePage";
import PrivateStorePage from "./pages/PrivateStorePage";

import Metrics from "./pages/Metrics";
import Level from "./pages/Level";
import Challenges from "./pages/Challenges";
import Tournaments from "./pages/Tournaments";
import Coach from "./pages/Coach";
import Achievements from "./pages/Achievements";
import ContentHub from "./pages/ContentHub";
import Attendence from "./pages/Attendence";
import SettingsPage from "./pages/SettingsPage";

// 🔒 Auth guard
const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* 🟢 PUBLIC ROUTES */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Public Store (no sidebar) */}
          <Route path="/store" element={<PublicStorePage />} />

          {/* 🔐 PRIVATE ROUTES */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <DashboardPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Private Store (WITH sidebar) */}
          <Route
            path="/app/store"
            element={
              <ProtectedRoute>
                <PrivateStorePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/metrics"
            element={
              <ProtectedRoute>
                <Layout>
                  <Metrics />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/level"
            element={
              <ProtectedRoute>
                <Layout>
                  <Level />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/challenges"
            element={
              <ProtectedRoute>
                <Layout>
                  <Challenges />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/tournaments"
            element={
              <ProtectedRoute>
                <Layout>
                  <Tournaments />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/coach"
            element={
              <ProtectedRoute>
                <Layout>
                  <Coach />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/achievements"
            element={
              <ProtectedRoute>
                <Layout>
                  <Achievements />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/content"
            element={
              <ProtectedRoute>
                <Layout>
                  <ContentHub />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/attendence"
            element={
              <ProtectedRoute>
                <Layout>
                  <Attendence />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Layout>
                  <SettingsPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
