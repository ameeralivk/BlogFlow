import type{ StatItem } from "../../types/LandingPage/landingPage";
export function StatsBar (){
  const stats: StatItem[] = [
    { value: "10k+", label: "Active Creators" },
    { value: "2M+", label: "Monthly Reads" },
    { value: "150+", label: "Top Brands" },
    { value: "99.9%", label: "Uptime Reliability" },
  ];

  return (
    <section className="bg-white border-y border-slate-100 py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label} className="space-y-1">
            <p className="text-3xl font-bold text-blue-600 font-['Sora',sans-serif]">
              {s.value}
            </p>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};