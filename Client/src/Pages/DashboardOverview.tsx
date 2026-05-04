import { 
  FileText, 
  Eye, 
  MessageCircle, 
  Heart, 
  TrendingUp, 
  TrendingDown,
  Clock,
  ChevronRight,
  MoreVertical
} from "lucide-react";

const STATS = [
  { label: "Total Posts", value: "24", icon: FileText, color: "blue", trend: "+12%", trendUp: true },
  { label: "Total Views", value: "145.2k", icon: Eye, color: "purple", trend: "+8.4%", trendUp: true },
  { label: "Total Likes", value: "8,942", icon: Heart, color: "rose", trend: "-2.1%", trendUp: false },
  { label: "Comments", value: "1,240", icon: MessageCircle, color: "orange", trend: "+14%", trendUp: true },
];

const RECENT_POSTS = [
  { id: 1, title: "The Future of AI in Development", status: "Published", views: "12.4k", date: "2 hours ago" },
  { id: 2, title: "Designing for Accessibility", status: "Draft", views: "0", date: "5 hours ago" },
  { id: 3, title: "10 React Best Practices", status: "Published", views: "8.2k", date: "1 day ago" },
];

const ACTIVITIES = [
  { id: 1, type: "like", user: "Sarah Jenkins", post: "AI Future", time: "5 mins ago" },
  { id: 2, type: "comment", user: "Michael Chen", post: "React Tips", time: "12 mins ago" },
  { id: 3, type: "publish", user: "You", post: "Web3 Guide", time: "1 hour ago" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome back, John! 👋</h1>
        <p className="text-slate-500 mt-2 font-medium">Here's what's happening with your blog today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.trendUp ? "text-emerald-500" : "text-rose-500"}`}>
                {stat.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Posts Table */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Recent Posts</h2>
            <button className="text-blue-600 text-sm font-bold hover:underline flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Title</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Views</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {RECENT_POSTS.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900 text-sm line-clamp-1">{post.title}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{post.date}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        post.status === "Published" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-600">{post.views}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {ACTIVITIES.map((activity) => (
              <div key={activity.id} className="flex gap-4 items-start">
                <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${
                  activity.type === 'like' ? 'bg-rose-50 text-rose-500' : 
                  activity.type === 'comment' ? 'bg-blue-50 text-blue-500' : 'bg-emerald-50 text-emerald-500'
                }`}>
                  {activity.type === 'like' ? <Heart className="w-5 h-5 fill-current" /> : 
                   activity.type === 'comment' ? <MessageCircle className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-sm text-slate-600 leading-snug">
                    <span className="font-bold text-slate-900">{activity.user}</span> 
                    {activity.type === 'like' ? ' liked your post ' : 
                     activity.type === 'comment' ? ' commented on ' : ' published '} 
                    <span className="font-bold text-slate-900">"{activity.post}"</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 font-medium">
                    <Clock className="w-3 h-3" /> {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-600 text-sm font-bold transition-all">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}
