
import { useState } from "react";
const GlowOrb = ({ className }: { className?: string }) => (
  <div
    className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
  />
);
export function CTASection(){
  const [email, setEmail] = useState("");

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-2xl mx-auto bg-slate-900 rounded-3xl p-12 text-center space-y-6 relative overflow-hidden">
        <GlowOrb className="w-64 h-64 bg-blue-500 -top-10 -right-10" />
        <GlowOrb className="w-48 h-48 bg-indigo-600 -bottom-10 -left-10" />

        <div className="relative z-10 space-y-4">
          <h2 className="text-3xl font-bold text-white font-['Sora',sans-serif] leading-tight">
            Ready to start your story?
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
            Join over 10,000 writers and teams who use EditorialFlow to manage
            their content empires.
          </p>

          {/* Email form */}
          <div className="flex gap-2 max-w-sm mx-auto mt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap">
              Try It Free
            </button>
          </div>
          <p className="text-slate-500 text-xs">
            No credit card required. 14-day free trial.
          </p>
        </div>
      </div>
    </section>
  );
};
