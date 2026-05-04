import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ChevronRight,
  Clock,
  Plus,
  Share2,
  Loader2,
} from "lucide-react";
import { getAllPosts } from "../Services/Post";
import { showErrorToast } from "../Elements/ErrorToast";

const CATEGORIES = [
  "All",
  "Technology",
  "Design",
  "Business",
  "Lifestyle",
  "Health",
  "Food",
];

export default function ExploreBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await getAllPosts();
      if (response.success) {
        setBlogs(response.posts);
      }
    } catch (error: any) {
      showErrorToast(error.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const blogCategory = (blog.category || "Technology").toLowerCase();
    const activeCatLower = activeCategory.toLowerCase();

    const matchesCategory =
      activeCategory === "All" || blogCategory === activeCatLower;

    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      blog.title.toLowerCase().includes(searchLower) ||
      blog.content.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  const handleShare = async (id: string, title: string) => {
    const url = `${window.location.origin}/blogs/${id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="">
      <main className="w-full px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header Section */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Explore <span className="text-blue-600">Insights</span>
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl">
              Discover the latest stories, tutorials, and insights from our
              community of creators.
            </p>
          </div>
          <Link
            to="/dashboard/create"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" /> Create New Post
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>

          <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto gap-2 no-scrollbar">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${activeCategory === category
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full">
          {/* Main Content: Blog Feed */}
          <div className="space-y-10 flex flex-col items-center">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                <p className="text-slate-500 font-medium">
                  Discovering latest insights...
                </p>
              </div>
            ) : filteredBlogs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-12 w-full">
                  {filteredBlogs.map((blog) => (
                    <article
                      key={blog._id}
                      className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row h-auto md:h-72"
                    >
                      {/* Left Side: Image */}
                      <Link
                        to={`/blogs/${blog._id}`}
                        className="relative w-full md:w-[40%] h-48 md:h-full overflow-hidden"
                      >
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-emerald-600/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-1.5">
                            <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                            {blog.category || "Technology"}
                          </span>
                        </div>
                      </Link>

                      {/* Right Side: Content */}
                      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-4">
                            <span className="flex items-center gap-1.5 text-emerald-600">
                              <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                              {blog.author?.fullName || "Anonymous"}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              {new Date(blog.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <Link to={`/blogs/${blog._id}`}>
                            <h3 className="text-xl md:text-2xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors mb-3 leading-tight line-clamp-2">
                              {blog.title}
                            </h3>
                          </Link>

                          <p className="text-slate-500 text-sm md:text-base mb-6 line-clamp-2 font-medium leading-relaxed">
                            {blog.content}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                          <Link
                            to={`/blogs/${blog._id}`}
                            className="bg-[#065F46] text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#047857] transition-all shadow-lg shadow-emerald-900/10"
                          >
                            Read Full Story <ChevronRight className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => handleShare(blog._id, blog.title)}
                            className="p-2.5 text-slate-400 hover:text-slate-600 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 text-sm font-bold px-4"
                          >
                            <Share2 className="w-4 h-4" /> Share
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-2 pt-8">
                  <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-400 cursor-not-allowed">
                    Previous
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-600/20">
                    1
                  </button>
                  <button className="w-10 h-10 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
                    2
                  </button>
                  <button className="w-10 h-10 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
                    3
                  </button>
                  <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                <div className="w-6xl h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  No articles found
                </h3>
                <p className="text-slate-500">
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchQuery("");
                  }}
                  className="mt-6 text-blue-600 font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
