export function Footer () {
  const cols = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Resources"],
    },
    {
      title: "Resources",
      links: ["Blog", "Help Center", "Community"],
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "Cookies"],
    },
  ];

  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <p className="font-bold text-slate-900 text-base font-['Sora',sans-serif]">
              EditorialFlow
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-[180px]">
              Empowering voices with professional-grade editorial management
              tools.
            </p>
            <div className="flex gap-2 text-slate-400">
              <span className="text-sm cursor-pointer hover:text-blue-500 transition-colors">🌐</span>
              <span className="text-sm cursor-pointer hover:text-blue-500 transition-colors">↗️</span>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title} className="space-y-3">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 hover:text-slate-700 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-6 border-t border-slate-100 gap-2">
          <p className="text-xs text-slate-400">
            © 2024 EditorialFlow. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
              Status
            </a>
            <a href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};