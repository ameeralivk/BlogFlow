import { useState } from "react";
import {
  Send,
  Image as ImageIcon,
  X,
  Plus,
  Type,
  Hash,
  Layers,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createPost } from "../Services/Post";
import { showSuccessToast } from "../Elements/SuccessToast";
import { showErrorToast } from "../Elements/ErrorToast";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handlePublish = async () => {
    if (!title || !content || !image || !category) {
      showErrorToast("Please fill all required fields and upload an image.");
      return;
    }

    try {
      setIsPublishing(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("image", image);
      formData.append("author", user?.id || "");
      formData.append("tags", JSON.stringify(tags));

      const response = await createPost(formData);
      if (response.success) {
        showSuccessToast("Post published successfully!");
        navigate("/dashboard/my-posts");
      }
    } catch (error: any) {
      showErrorToast(error.message || "Failed to publish post");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard/my-posts"
            className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-600 transition-all border border-transparent hover:border-slate-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Create New Post
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-70"
          >
            {isPublishing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {isPublishing ? "Publishing..." : "Publish Post"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Side */}
        <div className="lg:col-span-8 space-y-6">
          {/* Title Input */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-slate-400">
              <Type className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Post Title
              </span>
            </div>
            <textarea
              placeholder="Enter a catchy title..."
              className="w-full text-3xl font-black text-slate-900 placeholder:text-slate-200 border-none focus:ring-0 p-0 resize-none min-h-[60px]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Content Editor */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
            <label className="px-8 pt-6 text-sm font-medium text-slate-500">
              Story Content
            </label>

            <textarea
              placeholder="Write your story here..."
              className="flex-1 w-full p-8 text-slate-700 leading-relaxed placeholder:text-slate-200 border-none focus:ring-0 resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="lg:col-span-4 space-y-6">
          {/* Image Upload */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-blue-600" /> Featured Image
            </h3>

            {imagePreview ? (
              <div className="relative group rounded-2xl overflow-hidden aspect-video border border-slate-100">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-slate-200 rounded-2xl hover:border-blue-400 hover:bg-blue-50/30 cursor-pointer transition-all">
                <ImageIcon className="w-8 h-8 text-slate-300 mb-2" />
                <span className="text-xs font-bold text-slate-500">
                  Click to upload
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </label>
            )}
          </div>

          {/* Category */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" /> Category
            </h3>
            <select
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Design">Design</option>
              <option value="Business">Business</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Health">Health</option>
              <option value="Food">Food</option>
            </select>
          </div>

          {/* Tags */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Hash className="w-4 h-4 text-blue-600" /> Tags
            </h3>
            <div className="space-y-4">
              <div className="flex gap-2 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5">
                <Plus className="w-4 h-4 text-slate-400 mt-0.5" />
                <input
                  type="text"
                  placeholder="Add a tag..."
                  className="bg-transparent border-none focus:ring-0 text-sm placeholder:text-slate-400 w-full p-0 font-semibold"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold border border-blue-100"
                  >
                    {tag}
                    <button onClick={() => removeTag(tag)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
