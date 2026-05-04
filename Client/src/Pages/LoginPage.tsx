import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Reusable/Navbar";
import { validateLoginPage } from "../Validation/ValidateLoginPage";
import {
  Login,
  ForgotPassword,
  VerifyForgotPasswordOtp,
  ResetPassword,
} from "../Services/Auth";
import { showSuccessToast } from "../Elements/SuccessToast";
import { showErrorToast } from "../Elements/ErrorToast";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";

// ─── Icons ────────────────────────────────────────────────────────────────────
const MailIcon = () => (
  <svg
    className="w-4 h-4 text-slate-400"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" strokeLinecap="round" />
  </svg>
);

const LockIcon = () => (
  <svg
    className="w-4 h-4 text-slate-400"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 018 0v4" strokeLinecap="round" />
  </svg>
);

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg
    className="w-4 h-4 text-slate-400"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path
          d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
          strokeLinecap="round"
        />
        <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" />
      </>
    )}
  </svg>
);

const LogoIcon = () => (
  <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center border border-white/30">
    <svg
      className="w-5 h-5 text-white"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 8h10M7 12h7M7 16h5" strokeLinecap="round" />
    </svg>
  </div>
);

// const GoogleIcon = () => (
//   <svg className="w-5 h-5" viewBox="0 0 24 24">
//     <path
//       d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//       fill="#4285F4"
//     />
//     <path
//       d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//       fill="#34A853"
//     />
//     <path
//       d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//       fill="#FBBC05"
//     />
//     <path
//       d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//       fill="#EA4335"
//     />
//   </svg>
// );

// ─── Dot pattern ──────────────────────────────────────────────────────────────
const DotPattern = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id="dots"
        x="0"
        y="0"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="2" cy="2" r="1" fill="white" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" />
  </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function EditorialFlowLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Forgot password states
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState<1 | 2 | 3>(1);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const [forgotNewPassword, setForgotNewPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      showErrorToast("Please enter your email");
      return;
    }
    setForgotLoading(true);
    try {
      const res = await ForgotPassword(forgotEmail);
      if (res.success) {
        showSuccessToast(res.message);
        setForgotPasswordStep(2);
      }
    } catch (err: any) {
      showErrorToast(err.message || "Failed to send OTP");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleVerifyForgotOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotOtp) {
      showErrorToast("Please enter the OTP");
      return;
    }
    setForgotLoading(true);
    try {
      const res = await VerifyForgotPasswordOtp(forgotEmail, forgotOtp);
      if (res.success) {
        showSuccessToast(res.message);
        setResetToken(res.resetToken);
        setForgotPasswordStep(3);
      }
    } catch (err: any) {
      showErrorToast(err.message || "Invalid OTP");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotNewPassword) {
      showErrorToast("Please enter a new password");
      return;
    }
    setForgotLoading(true);
    try {
      const res = await ResetPassword({
        email: forgotEmail,
        newPassword: forgotNewPassword,
        resetToken,
      });
      if (res.success) {
        showSuccessToast(res.message);
        setForgotPasswordOpen(false);
        setForgotPasswordStep(1);
        setForgotEmail("");
        setForgotOtp("");
        setForgotNewPassword("");
        setResetToken("");
      }
    } catch (err: any) {
      showErrorToast(err.message || "Failed to reset password");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    const validate = validateLoginPage(data);
    if (validate.length) {
      setError(validate[0].message);
      return;
    }
    setError("");

    try {
      const response = await Login(data);
  
      if (response.success) {
        showSuccessToast(response.message);
        dispatch(setCredentials({ user: response.user }));
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error("Login failed", err);
      showErrorToast(err.message || "Login failed");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,700&display=swap');

        * { font-family: 'Sora', sans-serif; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeIn 0.5s ease both; }
        .fade-in-delay { animation: fadeIn 0.5s 0.15s ease both; opacity: 0; }
      `}</style>

      {/* Page bg */}
      <div className="min-h-screen bg-[#EEF0FA] flex flex-col items-center justify-center px-4 py-12">
        <Navbar />
        {/* Card */}
        <div className="fade-in w-full max-w-[900px] mt-9 bg-white rounded-3xl shadow-2xl shadow-slate-200/60 overflow-hidden grid grid-cols-1 md:grid-cols-[420px_1fr]">
          {/* ── Left panel ── */}
          <div className="relative bg-blue-600 p-8 flex flex-col justify-between min-h-[520px] overflow-hidden">
            <DotPattern />

            {/* Top */}
            <div className="relative z-10 space-y-8">
              {/* Logo */}
              <div className="flex items-center gap-2.5">
                <LogoIcon />
                <span className="text-white font-bold text-lg tracking-tight">
                  EditorialFlow
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-3 pt-4">
                <h2 className="text-3xl font-bold text-white leading-tight">
                  Elevate your
                  <br />
                  content engine.
                </h2>
                <p className="text-blue-100 text-sm leading-relaxed max-w-[260px]">
                  The most intuitive editorial-first management system for
                  high-performing teams.
                </p>
              </div>
            </div>

            {/* Testimonial card */}
            <div className="relative z-10 bg-white/10 border border-white/20 rounded-2xl p-4 space-y-3 backdrop-blur-sm">
              <p className="text-white/90 text-sm italic leading-relaxed font-['Playfair_Display',serif]">
                "EditorialFlow transformed our daily publishing cycle. Essential
                for any modern newsroom."
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-slate-800 border-2 border-white/20 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  M
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">
                    Marcus Sterling
                  </p>
                  <p className="text-blue-200 text-xs">
                    Head of Digital, Global News
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right panel ── */}
          <div className="fade-in-delay p-10 flex flex-col justify-center space-y-6">
            {/* Header */}
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-slate-900">
                Welcome back
              </h1>
              <p className="text-slate-400 text-sm">
                Please enter your details to access the workspace.
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm font-medium animate-shake">
                    {error}
                  </div>
                )}
                <label className="text-sm font-semibold text-slate-700">
                  Email address
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
                    <MailIcon />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setForgotPasswordOpen(true);
                    }}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
                    <LockIcon />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-slate-200 rounded-xl pl-10 pr-11 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
              </div>
            </div>

            {/* Sign in button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-blue-200"
            >
              Sign in to Dashboard
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Divider */}
            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-100" />
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            {/* Google */}
            {/* <button className="w-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-xl flex items-center justify-center gap-2.5 transition-all">
              <GoogleIcon />
              Continue with Google
            </button> */}

            {/* Sign up */}
            <p className="text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer links */}
        <div className="mt-8 flex items-center gap-3 text-xs text-slate-400">
          <a href="#" className="hover:text-slate-600 transition-colors">
            Privacy Policy
          </a>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <a href="#" className="hover:text-slate-600 transition-colors">
            Terms of Service
          </a>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <a href="#" className="hover:text-slate-600 transition-colors">
            Help Center
          </a>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">
                {forgotPasswordStep === 1 && "Reset Password"}
                {forgotPasswordStep === 2 && "Enter OTP"}
                {forgotPasswordStep === 3 && "New Password"}
              </h3>
              <button
                onClick={() => {
                  setForgotPasswordOpen(false);
                  setForgotPasswordStep(1);
                }}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              {forgotPasswordStep === 1 && (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <p className="text-sm text-slate-500 mb-4">
                    Enter your email address and we'll send you an OTP to reset
                    your password.
                  </p>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1 block">
                      Email address
                    </label>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      placeholder="name@company.com"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-70"
                  >
                    {forgotLoading ? "Sending..." : "Send OTP"}
                  </button>
                </form>
              )}
              {forgotPasswordStep === 2 && (
                <form onSubmit={handleVerifyForgotOtp} className="space-y-4">
                  <p className="text-sm text-slate-500 mb-4">
                    Enter the OTP sent to <strong>{forgotEmail}</strong>.
                  </p>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1 block">
                      OTP
                    </label>
                    <input
                      type="text"
                      required
                      value={forgotOtp}
                      onChange={(e) => setForgotOtp(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      placeholder="123456"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-70"
                  >
                    {forgotLoading ? "Verifying..." : "Verify OTP"}
                  </button>
                </form>
              )}
              {forgotPasswordStep === 3 && (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <p className="text-sm text-slate-500 mb-4">
                    Please enter your new password.
                  </p>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1 block">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={forgotNewPassword}
                      onChange={(e) => setForgotNewPassword(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      placeholder="••••••••"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-70"
                  >
                    {forgotLoading ? "Resetting..." : "Reset Password"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
