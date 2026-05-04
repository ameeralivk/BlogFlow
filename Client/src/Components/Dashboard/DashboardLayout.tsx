import { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type{ RootState } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";
import { apiRequest } from "../../api/apiRequest";
import { HTTP_METHOD } from "../../constants/httpMethod";
import { API_ROUTES } from "../../constants/ApiRoutes";
import { showSuccessToast } from "../../Elements/SuccessToast";
import { showErrorToast } from "../../Elements/ErrorToast";
import {
  FileText,
  PlusCircle,
  LogOut,
  Bell,
  Menu,
  NewspaperIcon,
  ChevronDown,
  User
} from "lucide-react";

const NAV_ITEMS = [
  { icon: NewspaperIcon, label: "Explore Blogs", path: "/dashboard" },
  { icon: FileText, label: "My Posts", path: "/dashboard/my-posts" },
  { icon: PlusCircle, label: "Create Post", path: "/dashboard/create" },
  { icon: User, label: "Profile", path: "/dashboard/profile" },
];

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await apiRequest(HTTP_METHOD.POST, API_ROUTES.AUTH.LOGOUT);
      dispatch(logout());
      showSuccessToast("Logged out successfully");
      navigate("/login");
    } catch (error: any) {
      showErrorToast(error.message || "Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-slate-200 transform transition-all duration-300 ease-in-out ${isSidebarOpen
            ? "w-72 translate-x-0"
            : "w-20 -translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-20 flex items-center px-8 border-b border-slate-50">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                <FileText className="w-6 h-6" />
              </div>
              {isSidebarOpen && (
                <span className="text-xl font-black text-slate-900 tracking-tight">BlogFlow</span>
              )}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-8 space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400 group-hover:text-blue-600"}`} />
                  {isSidebarOpen && <span className="font-bold text-sm tracking-wide">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="p-6 border-t border-slate-50">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-4 px-4 py-3.5 w-full text-rose-500 hover:bg-rose-50 rounded-2xl transition-all group"
            >
              <LogOut className="w-5 h-5" />
              {isSidebarOpen && <span className="font-bold text-sm tracking-wide">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-xl transition-all"
            >
              <Menu className="w-6 h-6 text-slate-600" />
            </button>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2.5 text-slate-400 hover:bg-slate-100 rounded-xl transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </button>

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-2xl transition-all"
              >
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-sm overflow-hidden">
                  {user?.profileImage ? (
                    <img src={user.profileImage} alt={user.fullName} className="w-full h-full object-cover" />
                  ) : (
                    user?.fullName?.split(" ").map((n: string) => n[0]).join("") || "U"
                  )}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-bold text-slate-900 leading-none">{user?.fullName || "User"}</p>
                  <p className="text-xs text-slate-400 mt-1">Reader</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-2 z-50">
                  <Link to="/dashboard/profile" className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 rounded-xl transition-all text-sm font-bold text-slate-600">
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <div className="h-px bg-slate-50 my-2 mx-2" />
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-rose-50 w-full text-left rounded-xl transition-all text-sm font-bold text-rose-500"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
