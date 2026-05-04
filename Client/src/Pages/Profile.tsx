import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { getUserProfile, updateUserProfile } from "../Services/User";
import { User as Mail, Calendar, MapPin, Edit3, Camera, Shield, Loader2, Save, X } from "lucide-react";
import { showErrorToast } from "../Elements/ErrorToast";
import { showSuccessToast } from "../Elements/SuccessToast";
import { updateUser } from "../redux/slices/authSlice";

export default function Profile() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getUserProfile(user.id);
      if (response.success) {
        setProfileData(response.user);
        setFullName(response.user.fullName);
        setImagePreview(response.user.profileImage);
      }
    } catch (error: any) {
      showErrorToast(error.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!fullName.trim()) {
      showErrorToast("Full name cannot be empty");
      return;
    }

    try {
      setIsSaving(true);
      const formData = new FormData();
      formData.append("fullName", fullName);
      if (selectedImage) {
        formData.append("profileImage", selectedImage);
      }

      const response = await updateUserProfile(user.id, formData);
      if (response.success) {
        showSuccessToast("Profile updated successfully!");
        setProfileData(response.user);
        dispatch(updateUser({
          fullName: response.user.fullName,
          profileImage: response.user.profileImage
        }));
        setIsEditing(false);
        setSelectedImage(null);
      }
    } catch (error: any) {
      showErrorToast(error.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Header / Banner area */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden mb-8">
        <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute top-6 right-6 p-2.5 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white/30 transition-all border border-white/20 flex items-center gap-2 font-bold text-sm"
            >
              <Edit3 className="w-4 h-4" /> Edit Profile
            </button>
          )}
        </div>
        <div className="px-8 pb-8 flex flex-col md:flex-row gap-6 items-end -mt-12">
          <div className="relative group">
            <div className="w-32 h-32 bg-slate-900 rounded-[32px] border-4 border-white flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-slate-200 overflow-hidden">
              {imagePreview ? (
                <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                profileData?.fullName?.[0] || "U"
              )}
            </div>
            {isEditing && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20 hover:scale-110 transition-all"
              >
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </button>
            )}
          </div>
          <div className="flex-1 mb-2">
            {isEditing ? (
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">{profileData?.fullName}</h1>
                <p className="text-slate-500 font-medium flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4" /> {profileData?.email}
                </p>
              </>
            )}
          </div>
          <div className="flex gap-3 mb-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFullName(profileData.fullName);
                    setImagePreview(profileData.profileImage);
                    setSelectedImage(null);
                  }}
                  className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center gap-2"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </>
            ) : (
              <div className="px-6 py-2.5 bg-emerald-50 text-emerald-600 rounded-xl font-bold border border-emerald-100 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Verified Profile
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Details Section */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" /> Account Details
          </h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <Calendar className="w-6 h-6 text-slate-400" />
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Member Since</p>
                <p className="text-base font-bold text-slate-900">{profileData?.createdAt ? new Date(profileData.createdAt).toLocaleDateString() : "N/A"}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <MapPin className="w-6 h-6 text-slate-400" />
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Location</p>
                <p className="text-base font-bold text-slate-900">New York, USA</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <Shield className="w-6 h-6 text-slate-400" />
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Verification Status</p>
                <p className="text-base font-bold text-blue-600">Verified Premium Author</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-blue-600" /> Performance Overview
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-50/50 p-6 rounded-3xl text-center border border-blue-100">
                <p className="text-4xl font-black text-blue-600 mb-1">24</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Posts</p>
              </div>
              <div className="bg-indigo-50/50 p-6 rounded-3xl text-center border border-indigo-100">
                <p className="text-4xl font-black text-indigo-600 mb-1">1.2k</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Followers</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-slate-900 rounded-[24px] text-white">
            <p className="text-sm font-medium text-slate-400 mb-2">Platform Rank</p>
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold">Top 5% Creator</p>
              <div className="px-3 py-1 bg-blue-600 rounded-lg text-[10px] font-black uppercase">Elite</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
