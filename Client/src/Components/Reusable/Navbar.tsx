import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-slate-100"
        : "bg-white"
        }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-slate-900 font-bold text-lg tracking-tight font-['Sora',sans-serif]"
        >
          EditorialFlow
        </Link>

        {/* CTA */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-1.5 rounded-xl font-bold transition-colors border border-blue-100"
            >
              Dashboard
              <div className="w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-[10px] overflow-hidden ml-1">
                {user?.profileImage ? (
                  <img src={user.profileImage} alt={user.fullName} className="w-full h-full object-cover" />
                ) : (
                  user?.fullName?.split(" ").map((n: string) => n[0]).join("") || "U"
                )}
              </div>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-sm shadow-blue-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

