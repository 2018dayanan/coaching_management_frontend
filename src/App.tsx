import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/admin/Index";
import NotFound from "./pages/admin/NotFound";
import Users from "./pages/admin/users/Users";
import Batches from "./pages/admin/Batches";
import Classes from "./pages/admin/Classes";
import Security from "./pages/admin/Security";
import Settings from "./pages/admin/Settings";
import ModelProvider from "./providers/ModelProvider";
import SuperAdminLogin from "./pages/auth/login";
import TeacherLogin from "./pages/auth/TeacherLogin";
import TeacherDashboard from "./pages/teacher/Dashboard";
import { DashboardLayout } from "./components/layouts/DashboardLayout";
import { SidebarProvider } from "./components/ui/sidebar";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import AuthProvider from "./providers/AuthProvider";
import UserDetail from "./pages/admin/users/user_profile";
import AdminProfile from "./pages/admin/AdminProfile";
import ClassDetail from "./pages/admin/ClassDetail";
import Teachers from "./pages/admin/Teachers";
import TeacherStudentList from "./pages/teacher/students/StudentList";
import TeacherStudentDetail from "./pages/teacher/students/StudentDetail";
import TaskManagement from "./pages/teacher/tasks/TaskManagement";
import TeacherBatchList from "./pages/teacher/batches/BatchList";
import TeacherClassList from "./pages/teacher/classes/ClassList";
import LandingPage from "./pages/home/LandingPage";
import StudentLogin from "./pages/auth/StudentLogin";
import StudentDashboard from "./pages/student/Dashboard";
import StudentProfilePage from "./pages/student/Profile";
import StudentCoursesPage from "./pages/student/Courses";
import StudentTaskListPage from "./pages/student/Tasks/TaskList";
import StudentTaskDetailPage from "./pages/student/Tasks/TaskDetail";
import StudentAcademicPage from "./pages/student/AcademicDetails";
import StudentGuardianPage from "./pages/student/GuardianDetails";
import StudentNotificationsPage from "./pages/student/Notifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <ModelProvider />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/admin/auth/login" element={<SuperAdminLogin />} />
            <Route path="/auth/login" element={<TeacherLogin />} />
            <Route path="/teacher/auth/login" element={<TeacherLogin />} />
            <Route path="/auth/student/login" element={<StudentLogin />} />
            <Route path="/" element={<LandingPage />} />
            <Route element={<ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]} />}>
              <Route
                path="/admin"
                element={
                  <SidebarProvider>
                    <DashboardLayout />
                  </SidebarProvider>
                }
              >
                <Route index element={<Index />} />
                <Route path="users" element={<Users />} />
                <Route path="users/:id" element={<UserDetail />} />
                <Route path="teachers" element={<Teachers />} />
                <Route path="batches" element={<Batches />} />
                <Route path="classes" element={<Classes />} />
                <Route path="classes/:id" element={<ClassDetail />} />
                <Route path="security" element={<Security />} />
                <Route path="settings" element={<Settings />} />
                <Route path="profile" element={<AdminProfile />} />
              </Route>
            </Route>

            {/* Teacher Routes */}
            <Route element={<ProtectedRoute allowedRoles={["TEACHER"]} />}>
              <Route path="/teacher" element={<Navigate to="/teacher/dashboard" replace />} />
              <Route
                path="/teacher/dashboard"
                element={
                  <SidebarProvider>
                    <DashboardLayout />
                  </SidebarProvider>
                }
              >
                <Route index element={<TeacherDashboard />} />
                <Route path="users" element={<TeacherStudentList />} />
                <Route path="students" element={<TeacherStudentList />} />
                <Route path="students/:id" element={<TeacherStudentDetail />} />
                <Route path="batches" element={<TeacherBatchList />} />
                <Route path="tasks" element={<TaskManagement />} />
                <Route path="classes" element={<TeacherClassList />} />
                <Route path="classes/:id" element={<ClassDetail />} />
                <Route path="profile" element={<AdminProfile />} />
              </Route>
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            {/* Student Routes */}
            <Route element={<ProtectedRoute allowedRoles={["STUDENT"]} />}>
              <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
              <Route
                path="/student/dashboard"
                element={
                  <SidebarProvider>
                    <DashboardLayout />
                  </SidebarProvider>
                }
              >
                <Route index element={<StudentDashboard />} />
                <Route path="profile" element={<StudentProfilePage />} />
                <Route path="courses" element={<StudentCoursesPage />} />
                <Route path="tasks" element={<StudentTaskListPage />} />
                <Route path="tasks/:id" element={<StudentTaskDetailPage />} />
                <Route path="academic" element={<StudentAcademicPage />} />
                <Route path="guardian" element={<StudentGuardianPage />} />
                <Route path="notifications" element={<StudentNotificationsPage />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
