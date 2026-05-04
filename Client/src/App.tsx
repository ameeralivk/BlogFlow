import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./Pages/LandingPage";
import EditorialFlowLogin from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ExploreBlogs from "./Pages/ExploreBlogs";
import BlogDetails from "./Pages/BlogDetails";
import DashboardLayout from "./Components/Dashboard/DashboardLayout";
// DashboardOverview import removed
import MyPosts from "./Pages/MyPosts";
import CreateBlog from "./Pages/CreateBlog";
import EditBlog from "./Pages/EditBlog";
import Profile from "./Pages/Profile";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import PublicRoute from "./Components/Auth/PublicRoute";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Auth Routes - Redirect to dashboard if already logged in */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<EditorialFlowLogin />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route path="/blogs/:id" element={<BlogDetails />} />

        {/* Dashboard Routes - Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<ExploreBlogs />} />
            <Route path="my-posts" element={<MyPosts />} />
            <Route path="create" element={<CreateBlog />} />
            <Route path="edit/:id" element={<EditBlog />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;

