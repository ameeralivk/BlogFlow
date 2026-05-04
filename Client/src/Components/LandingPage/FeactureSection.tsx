export function FeaturesSection (){
  return (
    <section id="features" className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          <h2 className="text-4xl font-bold text-slate-900 font-['Sora',sans-serif]">
            Crafting Excellence at Scale
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
            Everything you need to manage a high-performance content team
            without the friction of traditional CMS tools.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Intuitive Editor */}
          <div className="border border-slate-100 rounded-2xl p-6 space-y-3 hover:shadow-lg hover:shadow-slate-100 transition-all group">
            <div className="w-8 h-8 text-blue-500">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-800 text-sm">
              Intuitive Editor
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Distraction-free writing experience with built-in SEO tools and
              rich media support. Focus on the story, not the formatting.
            </p>
            {/* Mini code/editor preview */}
            <div className="rounded-xl bg-slate-900 p-3 space-y-1.5 mt-2">
              {[70, 50, 85, 40].map((w, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <div
                    className={`h-1.5 rounded-full ${
                      i % 2 === 0 ? "bg-blue-400" : "bg-orange-400"
                    }`}
                    style={{ width: `${w}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Analytics – accent */}
          <div className="bg-blue-600 rounded-2xl p-6 space-y-3 hover:bg-blue-700 transition-all group">
            <div className="w-8 h-8 text-blue-200">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <rect
                  x="2"
                  y="3"
                  width="20"
                  height="14"
                  rx="2"
                  strokeLinecap="round"
                />
                <path d="M8 21h8M12 17v4" strokeLinecap="round" />
                <path
                  d="M6 13l3-4 3 2 3-5 3 3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-white text-sm">
              Real-time Analytics
            </h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              Track performance as it happens. Understand engagement metrics and
              audience growth in real-time dashboards.
            </p>
            {/* Sparkline */}
            <svg viewBox="0 0 200 60" className="w-full h-14 mt-2">
              <polyline
                points="0,50 40,35 80,40 120,20 160,28 200,10"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
              />
              <polyline
                points="0,50 40,35 80,40 120,20 160,28 200,10 200,60 0,60"
                fill="rgba(255,255,255,0.08)"
              />
            </svg>
          </div>

          {/* Seamless Publishing */}
          <div className="border border-slate-100 rounded-2xl p-6 space-y-3 hover:shadow-lg hover:shadow-slate-100 transition-all">
            <div className="w-8 h-8 text-blue-500">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-800 text-sm">
              Seamless Publishing
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              One-click distribution to multiple channels including Web, Social,
              and Newsletter platforms.
            </p>
            {/* Channel icons */}
            <div className="flex gap-2 mt-2">
              {["🌐", "✉️", "↗️"].map((icon, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-lg border border-slate-100 flex items-center justify-center text-sm bg-slate-50 hover:bg-blue-50 hover:border-blue-100 transition-colors cursor-pointer"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Media Management */}
          <div className="border border-slate-100 rounded-2xl p-6 space-y-3 hover:shadow-lg hover:shadow-slate-100 transition-all">
            <div className="w-8 h-8 text-orange-400">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-800 text-sm">
              Media Management
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Centralized digital asset management. Organize, edit, and optimize
              your media library in one place.
            </p>
            {/* Media thumbnails */}
            <div className="flex gap-2 mt-2">
              <div className="w-16 h-14 rounded-lg bg-gradient-to-br from-emerald-200 to-teal-400 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-white/30 blur-sm" />
              </div>
              <div className="w-16 h-14 rounded-lg bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center text-2xl">
                🐻
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};