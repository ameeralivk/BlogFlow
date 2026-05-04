import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Heart, Bookmark, Share2, MessageCircle, ArrowLeft, Clock, Hash, Send, Loader2 } from "lucide-react";
import Navbar from "../Components/Reusable/Navbar";
import { Footer } from "../Components/Reusable/Footer";
import { getPostById } from "../Services/Post";
import { showErrorToast } from "../Elements/ErrorToast";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (id) {
      fetchPostDetails();
    }
  }, [id]);

  const fetchPostDetails = async () => {
    try {
      setLoading(true);
      const response = await getPostById(id as string);
      if (response.success) {
        setPost(response.post);
      }
    } catch (error: any) {
      showErrorToast(error.message || "Failed to load post details");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-24 pb-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs & Back */}
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </Link>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-40">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
              <p className="text-slate-500 font-medium">Fetching the story...</p>
            </div>
          ) : post ? (
            <>
              {/* Header */}
              <header className="mb-10">
                <div className="flex items-center gap-2 mb-6">
                  <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-100">
                    {post.category || "Technology"}
                  </span>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
                    <Clock className="w-4 h-4" />
                    5 min read
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-8">
                  {post.title}
                </h1>

                <div className="flex items-center justify-between border-y border-slate-100 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                      {post.author?.profileImage ? (
                        <img src={post.author.profileImage} alt={post.author.fullName} className="w-full h-full object-cover" />
                      ) : (
                        post.author?.fullName?.[0] || "U"
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{post.author?.fullName || "Anonymous"}</p>
                      <p className="text-slate-500 text-sm">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`p-2.5 rounded-xl transition-all border ${isLiked ? "bg-rose-50 border-rose-100 text-rose-500" : "bg-slate-50 border-slate-100 text-slate-400 hover:text-slate-600"}`}
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                    </button>
                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`p-2.5 rounded-xl transition-all border ${isBookmarked ? "bg-blue-50 border-blue-100 text-blue-600" : "bg-slate-50 border-slate-100 text-slate-400 hover:text-slate-600"}`}
                    >
                      <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
                    </button>
                    <button className="p-2.5 bg-slate-50 border border-slate-100 text-slate-400 rounded-xl hover:text-slate-600 transition-all">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              <div className="rounded-3xl overflow-hidden mb-12 shadow-2xl shadow-slate-200">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto object-cover max-h-[500px]"
                />
              </div>

              {/* Content Body */}
              <div
                className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed whitespace-pre-line"
              >
                {post.content}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-semibold border border-slate-100 hover:bg-slate-100 transition-colors cursor-pointer">
                      <Hash className="w-3.5 h-3.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author Bio */}
              <section className="mt-16 p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                <div className="w-24 h-24 rounded-2xl bg-slate-900 flex-shrink-0 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-slate-300 overflow-hidden">
                  {post.author?.profileImage ? (
                    <img src={post.author.profileImage} alt={post.author.fullName} className="w-full h-full object-cover" />
                  ) : (
                    post.author?.fullName?.[0] || "U"
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Written by {post.author?.fullName || "Anonymous"}</h3>
                  <p className="text-blue-600 text-sm font-bold mb-4">Content Creator</p>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {post.author?.fullName} is a passionate writer sharing insights on {post.category || "General"} topics.
                  </p>
                  <button className="text-blue-600 font-bold hover:underline">Follow Author</button>
                </div>
              </section>

              {/* Comments Section (Simplified) */}
              <section className="mt-20">
                <div className="flex items-center gap-3 mb-8">
                  <MessageCircle className="w-6 h-6 text-slate-900" />
                  <h2 className="text-2xl font-bold text-slate-900">Comments</h2>
                </div>

                <div className="mb-10 p-6 bg-white border border-slate-100 rounded-3xl shadow-sm focus-within:border-blue-300 transition-all">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="What are your thoughts?"
                    className="w-full bg-transparent border-none focus:ring-0 text-slate-700 placeholder:text-slate-400 resize-none h-24"
                  />
                  <div className="flex justify-end mt-4 pt-4 border-t border-slate-50">
                    <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                      <Send className="w-4 h-4" />
                      Post Comment
                    </button>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-500">Post not found.</p>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
