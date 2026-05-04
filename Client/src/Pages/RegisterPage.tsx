import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Reusable/Navbar";
import { Register, VerifyOtp, ResendOtp } from "../Services/Auth";
import OtpModal from "../Components/Reusable/OtpModal";
import { showErrorToast } from "../Elements/ErrorToast";
import { showSuccessToast } from "../Elements/SuccessToast";
import { validateRegister } from "../Validation/userRegisterValidation";

// ─── Icons ────────────────────────────────────────────────────────────────────
// ... (icons remain same, I'll keep them)
const UserIcon = () => (
  <svg
    className="w-4 h-4 text-slate-400"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

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
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    const data = {
      fullName: name,
      email,
      password,
    };
    const validation = validateRegister(data);
    if (validation.length) {
      setError(validation[0].message);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await Register(data);
      console.log(result, "res");
      if (result.success) {
        setShowOtpModal(true);
      }
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    setIsVerifying(true);
    setError("");
    try {
      const result = await VerifyOtp(email, otp);
      if (result.success) {
        // Success! Redirect to login or dashboard
        navigate("/login");
      } else {
        setError(result.message || "Invalid OTP");
      }
    } catch (err: any) {
      showErrorToast(err.message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const result = await ResendOtp(email,name,password);
      if (result.success) {
        showSuccessToast(result.message || "OTP resent successfully");
      } else {
        showErrorToast(result.message || "Failed to resend OTP");
      }
    } catch (err: any) {
      showErrorToast(err.message || "An unexpected error occurred");
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
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
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
                  Start your
                  <br />
                  creative journey.
                </h2>
                <p className="text-blue-100 text-sm leading-relaxed max-w-[260px]">
                  Join thousands of teams using EditorialFlow to streamline
                  their content operations.
                </p>
              </div>
            </div>

            {/* Feature list instead of testimonial for variety */}
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3 text-white/90 text-sm font-medium">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                Collaborative Workspaces
              </div>
              <div className="flex items-center gap-3 text-white/90 text-sm font-medium">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                Advanced Editorial Calendars
              </div>
              <div className="flex items-center gap-3 text-white/90 text-sm font-medium">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                Smart Content Automation
              </div>
            </div>
          </div>

          {/* ── Right panel ── */}
          <div className="fade-in-delay p-10 flex flex-col justify-center space-y-6">
            {/* Header */}
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-slate-900">
                Create an account
              </h1>
              <p className="text-slate-400 text-sm">
                Join EditorialFlow and transform your workflow.
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm font-medium animate-shake">
                  {error}
                </div>
              )}
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
                    <UserIcon />
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    disabled={isLoading}
                    className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all disabled:bg-slate-50"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
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
                    disabled={isLoading}
                    className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all disabled:bg-slate-50"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
                    <LockIcon />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={isLoading}
                    className="w-full border border-slate-200 rounded-xl pl-10 pr-11 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all disabled:bg-slate-50"
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

              {/* Terms */}
              <label className="flex items-start gap-2.5 cursor-pointer group">
                <div
                  onClick={() => !isLoading && setAgreeTerms(!agreeTerms)}
                  className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center transition-all flex-shrink-0 ${
                    agreeTerms
                      ? "bg-blue-600 border-blue-600"
                      : "border-slate-300 bg-white group-hover:border-blue-400"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {agreeTerms && (
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-xs text-slate-500 leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 font-medium">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 font-medium">
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
            </div>

            {/* Sign up button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-blue-200"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
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
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-100" />
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            {/* Sign in link */}
            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Sign in
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

      {showOtpModal && (
        <OtpModal
          email={email}
          onVerify={handleVerifyOtp}
          onResend={handleResendOtp}
          onClose={() => setShowOtpModal(false)}
          isLoading={isVerifying}
        />
      )}
    </>
  );
}
