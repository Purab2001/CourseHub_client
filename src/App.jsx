import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import NotFound from "./pages/NotFound";
import DashboardOverview from "./pages/Dashboard/DashboardOverview";
import StudentDashboard from "./pages/Dashboard/Student/StudentDashboard";
import MyCourses from "./pages/Dashboard/Student/MyCourses";
import Payments from "./pages/Dashboard/Student/Payments";
import InstructorDashboard from "./pages/Dashboard/Instructor/InstructorDashboard";
import AdminDashboard from "./pages/Dashboard/Admin/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes with MainLayout */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />
        <Route
          path="/register"
          element={
            <MainLayout>
              <Register />
            </MainLayout>
          }
        />

        {/* Protected dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          {/* Dashboard Overview */}
          <Route index element={<DashboardOverview />} />

          {/* Student Routes */}
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="payments" element={<Payments />} />

          {/* Instructor Routes */}
          <Route path="add-course" element={<InstructorDashboard />} />
          <Route path="instructor-courses" element={<InstructorDashboard />} />
          <Route
            path="students/:courseId"
            element={
              <div className="p-6">
                <h2 className="text-2xl font-bold">
                  Course Students - Coming Soon
                </h2>
                <p>View and manage students enrolled in your courses.</p>
              </div>
            }
          />

          {/* Admin Routes */}
          <Route path="all-users" element={<AdminDashboard />} />
          <Route path="all-courses" element={<AdminDashboard />} />
          <Route path="transactions" element={<AdminDashboard />} />
        </Route>

        {/* Catch all route */}
        <Route
          path="*"
          element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
