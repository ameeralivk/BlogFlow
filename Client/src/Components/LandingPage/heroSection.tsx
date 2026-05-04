

const GlowOrb = ({ className }: { className?: string }) => (
  <div
    className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
  />
);
export function HeroSection (){
  return (
    <section className="relative min-h-screen bg-[#F4F5FF] overflow-hidden flex items-center pt-14">
      {/* Background glows */}
      <GlowOrb className="w-96 h-96 bg-blue-400 -top-20 -left-20" />
      <GlowOrb className="w-72 h-72 bg-indigo-300 top-1/2 right-0" />

      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
        {/* Left copy */}
        <div className="space-y-7 animate-[fadeInUp_0.7s_ease_both]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-blue-100 rounded-full px-3 py-1.5 text-xs font-semibold text-blue-600 shadow-sm">
            <span className="text-blue-500">✦</span>
            NEW: AI-POWERED EDITING FLOWS
          </div>

          {/* Headline */}
          <h1 className="text-5xl xl:text-6xl font-bold text-slate-900 leading-tight font-['Sora',sans-serif]">
            Empower{" "}
            <em className="not-italic text-blue-500 italic font-['Playfair_Display',serif]">
              Your Voice
            </em>
            <br />
            with Precision.
          </h1>

          {/* Sub */}
          <p className="text-slate-500 text-base leading-relaxed max-w-md">
            The ultimate editorial engine designed for modern publishing teams.
            Streamline your workflow from ideation to distribution with authority
            and ease.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4 flex-wrap">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-md shadow-blue-200 transition-all hover:scale-[1.02] active:scale-[0.98]">
              Get Started Free
            </button>
            <button className="flex items-center gap-2 text-sm text-slate-700 font-medium border border-slate-200 bg-white px-5 py-3 rounded-xl hover:border-slate-300 transition-all">
              <span className="w-5 h-5 rounded-full border-2 border-slate-400 flex items-center justify-center">
                <span className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-slate-400 ml-0.5" />
              </span>
              View Demo
            </button>
          </div>
        </div>

        {/* Right – dashboard mockup */}
        <div className="relative animate-[fadeInUp_0.9s_ease_both]">
          {/* Dark screen */}
          <div className="relative rounded-2xl bg-slate-900 shadow-2xl shadow-slate-400/30 overflow-hidden border border-slate-700">
            {/* Fake window chrome */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-700/60">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            {/* Fake editor UI */}
            <div className="p-5 space-y-3 min-h-[280px]">
              <div className="flex gap-3 items-center">
                {["Draft", "Review", "Published", "Analytics"].map((t, i) => (
                  <span
                    key={t}
                    className={`text-xs px-2.5 py-1 rounded font-medium ${
                      i === 0
                        ? "bg-blue-600 text-white"
                        : "text-slate-400 hover:text-slate-200 cursor-pointer"
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
              {[80, 60, 95, 45, 70].map((w, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full bg-slate-700 overflow-hidden`}
                  style={{ width: `${w}%` }}
                >
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full"
                    style={{ width: i === 2 ? "100%" : `${w + 10}%` }}
                  />
                </div>
              ))}
              <div className="mt-4 bg-slate-800 rounded-lg p-3 space-y-2">
                {[100, 75, 90].map((w, i) => (
                  <div
                    key={i}
                    className="h-1.5 rounded-full bg-slate-600"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
              <div className="h-px bg-slate-700 my-2" />
              <div className="flex gap-2">
                <div className="h-8 w-20 rounded bg-red-500/20 border border-red-500/30" />
                <div className="flex-1 h-8 rounded bg-slate-700/50" />
              </div>
            </div>
          </div>

          {/* Floating readability badge */}
          <div className="absolute -bottom-5 right-6 bg-white rounded-2xl shadow-xl shadow-slate-200 px-5 py-3.5 flex items-center gap-3 border border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center text-white text-sm">
              📈
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                Readability Score
              </p>
              <p className="text-xl font-bold text-slate-900 font-['Sora',sans-serif]">
                94%{" "}
                <span className="text-sm font-semibold text-green-500">
                  Excellent
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};