import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    Mail,
    Pen,
    Save,
    Camera,
    FileText,
    Phone,
    Lock,
    AlertTriangle,
    X,
    Eye,
    EyeOff,
    CheckCircle,
    Shield,
    Sparkles,
    Settings,
} from "lucide-react";
import NavBar from "@/Components/NavBar";
import Footer from "@/Components/Footer";
import useSitePreferences from "@/hooks/useSitePreferences";
import toast, { Toaster } from "react-hot-toast";

const UserProfile = () => {
    const { isDark } = useSitePreferences();

    const [isEditing, setIsEditing] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const [showDeactivationSuccessModal, setShowDeactivationSuccessModal] =
        useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showDeactivatePassword, setShowDeactivatePassword] = useState(false);
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [processingPw, setProcessingPw] = useState(false);
    const [processingDeactivate, setProcessingDeactivate] = useState(false);
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        name: "",
        email: "",
        avatar: null,
        bio: "",
        phone: "",
    });

    const [pwData, setPwData] = useState({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const [deactivateData, setDeactivateData] = useState({
        password: "",
        deactivation_reason: "",
    });

    const getCsrfToken = () => {
        const meta = document.querySelector('meta[name="csrf-token"]');
        return meta ? meta.content : "";
    };

    const pageClass = isDark
        ? "bg-[#081018] text-white"
        : "bg-[#f7fafc] text-slate-900";
    const cardClass = isDark
        ? "bg-white/5 border-white/10 text-white"
        : "bg-white/90 border-slate-200 text-slate-900";
    const inputClass = isDark
        ? "bg-white/5 border-white/10 text-white placeholder:text-white/35"
        : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400";
    const mutedClass = isDark ? "text-white/65" : "text-slate-500";
    const softClass = isDark ? "bg-white/5" : "bg-slate-50";

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);

            try {
                const response = await fetch("/api/profile", {
                    headers: {
                        Accept: "application/json",
                        "X-CSRF-TOKEN": getCsrfToken(),
                    },
                    credentials: "same-origin",
                });

                const result = await response.json();

                if (response.ok && result.status === "success") {
                    setUser(result.user);
                    setData({
                        name: result.user.name || "",
                        email: result.user.email || "",
                        avatar: null,
                        bio: result.user.bio || "",
                        phone: result.user.phone || "",
                    });
                } else {
                    toast.error(result.message || "Failed to load profile.");
                }
            } catch {
                toast.error("Error loading profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: null }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPwData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: null }));
    };

    const handleDeactivateChange = (e) => {
        const { name, value } = e.target;
        setDeactivateData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: null }));
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/gif",
            "image/webp",
        ];
        if (!validTypes.includes(file.type)) {
            toast.error("Invalid file type. Please upload a valid image.");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error(
                "File too large. Please upload an image smaller than 2MB.",
            );
            return;
        }

        setData((prev) => ({ ...prev, avatar: file }));

        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const formData = new FormData();
        formData.append("name", data.name || "");
        formData.append("email", data.email || "");
        formData.append("bio", data.bio || "");
        formData.append("phone", data.phone || "");

        if (data.avatar) {
            formData.append("avatar", data.avatar);
        }

        try {
            const response = await fetch("/api/profile", {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": getCsrfToken(),
                    Accept: "application/json",
                },
                credentials: "same-origin",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setUser(result.user);
                setData({
                    name: result.user.name || "",
                    email: result.user.email || "",
                    avatar: null,
                    bio: result.user.bio || "",
                    phone: result.user.phone || "",
                });
                setIsEditing(false);
                setPreviewImage(null);
                toast.success(result.status || "Profile updated successfully.");
            } else {
                setErrors(
                    result.errors || { general: "Failed to update profile." },
                );
                toast.error("Failed to update profile.");
            }
        } catch {
            toast.error("Error updating profile.");
        } finally {
            setProcessing(false);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setProcessingPw(true);
        setErrors({});

        try {
            const response = await fetch("/api/profile/password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                },
                credentials: "same-origin",
                body: JSON.stringify(pwData),
            });

            const result = await response.json();

            if (response.ok) {
                setPwData({
                    current_password: "",
                    password: "",
                    password_confirmation: "",
                });
                toast.success(
                    result.status || "Password updated successfully.",
                );
            } else {
                setErrors(
                    result.errors || { general: "Failed to update password." },
                );
                toast.error("Failed to update password.");
            }
        } catch {
            toast.error("Error updating password.");
        } finally {
            setProcessingPw(false);
        }
    };

    const handleDeactivateAccount = async (e) => {
        e.preventDefault();
        setProcessingDeactivate(true);
        setErrors({});

        try {
            const response = await fetch("/api/profile/deactivate", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                },
                credentials: "same-origin",
                body: JSON.stringify(deactivateData),
            });

            const result = await response.json();

            if (response.ok) {
                setShowDeactivateModal(false);
                setShowDeactivationSuccessModal(true);
            } else {
                setErrors(
                    result.errors || {
                        general: "Failed to deactivate account.",
                    },
                );
                toast.error("Failed to deactivate account.");
            }
        } catch {
            toast.error("Error deactivating account.");
        } finally {
            setProcessingDeactivate(false);
        }
    };

    const handleDeactivationSuccessClose = () => {
        setShowDeactivationSuccessModal(false);
        window.location.href = "/";
    };

    const displayAvatar =
        previewImage || user?.avatar_url || "/images/avatar.webp";

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "security", label: "Security", icon: Lock },
        { id: "account", label: "Account", icon: Settings },
    ];

    return (
        <div className={`min-h-screen ${pageClass}`}>
            <Toaster position="top-right" />
            <NavBar />

            <section className="relative overflow-hidden pt-32 pb-12">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-emerald-600/15 blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-600/15 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">
                            <Sparkles className="h-4 w-4 text-emerald-400" />
                            <span className="text-sm font-semibold text-emerald-400">
                                Your Account
                            </span>
                        </div>

                        <h1 className="mb-4 text-4xl md:text-5xl font-extrabold">
                            Profile{" "}
                            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                                Settings
                            </span>
                        </h1>

                        <p className={`text-xl ${mutedClass}`}>
                            Manage your account and preferences
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 pb-20">
                <div className="grid gap-8 lg:grid-cols-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1"
                    >
                        <div
                            className={`sticky top-24 rounded-3xl border p-6 shadow-xl ${cardClass}`}
                        >
                            <div className="mb-6 text-center">
                                <div className="relative mb-4 inline-block">
                                    <img
                                        src={displayAvatar}
                                        alt="Profile Avatar"
                                        className="h-32 w-32 rounded-full object-cover border-4 border-emerald-500 shadow-lg shadow-emerald-500/20"
                                    />
                                    {isEditing && activeTab === "profile" && (
                                        <label className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity hover:opacity-100">
                                            <Camera className="h-8 w-8 text-white" />
                                            <input
                                                type="file"
                                                accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                                                className="hidden"
                                                onChange={handleAvatarUpload}
                                            />
                                        </label>
                                    )}
                                </div>

                                <h2 className="mb-1 text-xl font-bold">
                                    {data.name || "User"}
                                </h2>
                                <p className={`text-sm ${mutedClass}`}>
                                    {data.email || "No email"}
                                </p>
                            </div>

                            <div className="space-y-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => {
                                            setActiveTab(tab.id);
                                            setIsEditing(false);
                                        }}
                                        className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 font-medium transition-all ${
                                            activeTab === tab.id
                                                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                                                : isDark
                                                  ? "text-white/75 hover:bg-white/5 hover:text-white"
                                                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                        }`}
                                    >
                                        <tab.icon className="h-5 w-5" />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {user?.created_at && (
                                <div
                                    className={`mt-6 border-t pt-6 text-center text-sm ${mutedClass} ${isDark ? "border-white/10" : "border-slate-200"}`}
                                >
                                    <p>Member since</p>
                                    <p className="mt-1 font-semibold text-current">
                                        {new Date(
                                            user.created_at,
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-3"
                    >
                        <div
                            className={`rounded-3xl border p-8 shadow-xl ${cardClass}`}
                        >
                            {loading ? (
                                <div className="py-20 text-center">
                                    <p className={mutedClass}>
                                        Loading profile...
                                    </p>
                                </div>
                            ) : (
                                <>
                                    {activeTab === "profile" && (
                                        <div className="space-y-6">
                                            <div className="mb-8 flex items-center justify-between">
                                                <h2 className="text-2xl font-bold">
                                                    Profile Information
                                                </h2>

                                                {!isEditing ? (
                                                    <button
                                                        onClick={() =>
                                                            setIsEditing(true)
                                                        }
                                                        className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 font-semibold text-white shadow-lg"
                                                    >
                                                        <Pen className="h-4 w-4" />
                                                        Edit Profile
                                                    </button>
                                                ) : (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setIsEditing(
                                                                    false,
                                                                );
                                                                setPreviewImage(
                                                                    null,
                                                                );
                                                                setData(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        avatar: null,
                                                                    }),
                                                                );
                                                            }}
                                                            className={`rounded-2xl px-4 py-2.5 font-semibold ${
                                                                isDark
                                                                    ? "bg-white/5 text-white"
                                                                    : "bg-slate-100 text-slate-800"
                                                            }`}
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            onClick={
                                                                handleSaveProfile
                                                            }
                                                            disabled={
                                                                processing
                                                            }
                                                            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 font-semibold text-white shadow-lg disabled:opacity-50"
                                                        >
                                                            <Save className="h-4 w-4" />
                                                            {processing
                                                                ? "Saving..."
                                                                : "Save Changes"}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            {isEditing ? (
                                                <>
                                                    <div>
                                                        <label className="mb-2 block text-sm font-medium">
                                                            Full Name
                                                        </label>
                                                        <div className="relative">
                                                            <User
                                                                className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${mutedClass}`}
                                                            />
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                value={
                                                                    data.name
                                                                }
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                                className={`w-full rounded-2xl border py-3 pl-10 pr-4 outline-none ${inputClass}`}
                                                            />
                                                        </div>
                                                        {errors.name && (
                                                            <p className="mt-1 text-sm text-red-400">
                                                                {errors.name}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label className="mb-2 block text-sm font-medium">
                                                            Email Address
                                                        </label>
                                                        <div className="relative">
                                                            <Mail
                                                                className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${mutedClass}`}
                                                            />
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                value={
                                                                    data.email
                                                                }
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                                className={`w-full rounded-2xl border py-3 pl-10 pr-4 outline-none ${inputClass}`}
                                                            />
                                                        </div>
                                                        {errors.email && (
                                                            <p className="mt-1 text-sm text-red-400">
                                                                {errors.email}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label className="mb-2 block text-sm font-medium">
                                                            Phone Number
                                                        </label>
                                                        <div className="relative">
                                                            <Phone
                                                                className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${mutedClass}`}
                                                            />
                                                            <input
                                                                type="text"
                                                                name="phone"
                                                                value={
                                                                    data.phone
                                                                }
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                                className={`w-full rounded-2xl border py-3 pl-10 pr-4 outline-none ${inputClass}`}
                                                            />
                                                        </div>
                                                        {errors.phone && (
                                                            <p className="mt-1 text-sm text-red-400">
                                                                {errors.phone}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label className="mb-2 block text-sm font-medium">
                                                            Bio
                                                        </label>
                                                        <div className="relative">
                                                            <FileText
                                                                className={`absolute left-3 top-3 h-5 w-5 ${mutedClass}`}
                                                            />
                                                            <textarea
                                                                name="bio"
                                                                rows="4"
                                                                value={data.bio}
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                                className={`w-full rounded-2xl border py-3 pl-10 pr-4 outline-none resize-none ${inputClass}`}
                                                                placeholder="Tell us about yourself..."
                                                            />
                                                        </div>
                                                        {errors.bio && (
                                                            <p className="mt-1 text-sm text-red-400">
                                                                {errors.bio}
                                                            </p>
                                                        )}
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="space-y-5">
                                                    <div
                                                        className={`flex items-center gap-4 rounded-2xl p-4 ${softClass}`}
                                                    >
                                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15">
                                                            <User className="h-6 w-6 text-emerald-400" />
                                                        </div>
                                                        <div>
                                                            <p
                                                                className={`text-sm ${mutedClass}`}
                                                            >
                                                                Full Name
                                                            </p>
                                                            <p className="text-lg font-semibold">
                                                                {data.name ||
                                                                    "—"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={`flex items-center gap-4 rounded-2xl p-4 ${softClass}`}
                                                    >
                                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15">
                                                            <Mail className="h-6 w-6 text-emerald-400" />
                                                        </div>
                                                        <div>
                                                            <p
                                                                className={`text-sm ${mutedClass}`}
                                                            >
                                                                Email Address
                                                            </p>
                                                            <p className="text-lg font-semibold">
                                                                {data.email ||
                                                                    "—"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={`flex items-center gap-4 rounded-2xl p-4 ${softClass}`}
                                                    >
                                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15">
                                                            <Phone className="h-6 w-6 text-emerald-400" />
                                                        </div>
                                                        <div>
                                                            <p
                                                                className={`text-sm ${mutedClass}`}
                                                            >
                                                                Phone Number
                                                            </p>
                                                            <p className="text-lg font-semibold">
                                                                {data.phone ||
                                                                    "Not provided"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={`flex items-start gap-4 rounded-2xl p-4 ${softClass}`}
                                                    >
                                                        <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15">
                                                            <FileText className="h-6 w-6 text-emerald-400" />
                                                        </div>
                                                        <div>
                                                            <p
                                                                className={`text-sm ${mutedClass}`}
                                                            >
                                                                Bio
                                                            </p>
                                                            <p className="text-base leading-7">
                                                                {data.bio ||
                                                                    "No bio available"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {activeTab === "security" && (
                                        <div>
                                            <h2 className="mb-8 flex items-center gap-2 text-2xl font-bold">
                                                <Lock className="h-6 w-6 text-emerald-400" />
                                                Change Password
                                            </h2>

                                            <form
                                                onSubmit={handleUpdatePassword}
                                                className="space-y-6"
                                            >
                                                <div>
                                                    <label className="mb-2 block text-sm font-medium">
                                                        Current Password
                                                    </label>
                                                    <div className="relative">
                                                        <Lock
                                                            className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${mutedClass}`}
                                                        />
                                                        <input
                                                            type={
                                                                showCurrentPassword
                                                                    ? "text"
                                                                    : "password"
                                                            }
                                                            name="current_password"
                                                            value={
                                                                pwData.current_password
                                                            }
                                                            onChange={
                                                                handlePasswordChange
                                                            }
                                                            className={`w-full rounded-2xl border py-3 pl-10 pr-12 outline-none ${inputClass}`}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setShowCurrentPassword(
                                                                    !showCurrentPassword,
                                                                )
                                                            }
                                                            className={`absolute right-3 top-1/2 -translate-y-1/2 ${mutedClass}`}
                                                        >
                                                            {showCurrentPassword ? (
                                                                <EyeOff className="h-5 w-5" />
                                                            ) : (
                                                                <Eye className="h-5 w-5" />
                                                            )}
                                                        </button>
                                                    </div>
                                                    {errors.current_password && (
                                                        <p className="mt-1 text-sm text-red-400">
                                                            {
                                                                errors.current_password
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="mb-2 block text-sm font-medium">
                                                        New Password
                                                    </label>
                                                    <div className="relative">
                                                        <Lock
                                                            className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${mutedClass}`}
                                                        />
                                                        <input
                                                            type={
                                                                showNewPassword
                                                                    ? "text"
                                                                    : "password"
                                                            }
                                                            name="password"
                                                            value={
                                                                pwData.password
                                                            }
                                                            onChange={
                                                                handlePasswordChange
                                                            }
                                                            className={`w-full rounded-2xl border py-3 pl-10 pr-12 outline-none ${inputClass}`}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setShowNewPassword(
                                                                    !showNewPassword,
                                                                )
                                                            }
                                                            className={`absolute right-3 top-1/2 -translate-y-1/2 ${mutedClass}`}
                                                        >
                                                            {showNewPassword ? (
                                                                <EyeOff className="h-5 w-5" />
                                                            ) : (
                                                                <Eye className="h-5 w-5" />
                                                            )}
                                                        </button>
                                                    </div>
                                                    {errors.password && (
                                                        <p className="mt-1 text-sm text-red-400">
                                                            {errors.password}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="mb-2 block text-sm font-medium">
                                                        Confirm New Password
                                                    </label>
                                                    <div className="relative">
                                                        <Lock
                                                            className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${mutedClass}`}
                                                        />
                                                        <input
                                                            type={
                                                                showConfirmPassword
                                                                    ? "text"
                                                                    : "password"
                                                            }
                                                            name="password_confirmation"
                                                            value={
                                                                pwData.password_confirmation
                                                            }
                                                            onChange={
                                                                handlePasswordChange
                                                            }
                                                            className={`w-full rounded-2xl border py-3 pl-10 pr-12 outline-none ${inputClass}`}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setShowConfirmPassword(
                                                                    !showConfirmPassword,
                                                                )
                                                            }
                                                            className={`absolute right-3 top-1/2 -translate-y-1/2 ${mutedClass}`}
                                                        >
                                                            {showConfirmPassword ? (
                                                                <EyeOff className="h-5 w-5" />
                                                            ) : (
                                                                <Eye className="h-5 w-5" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={processingPw}
                                                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 font-semibold text-white shadow-lg disabled:opacity-50"
                                                >
                                                    <Shield className="h-5 w-5" />
                                                    {processingPw
                                                        ? "Updating..."
                                                        : "Update Password"}
                                                </button>
                                            </form>
                                        </div>
                                    )}

                                    {activeTab === "account" && (
                                        <div>
                                            <h2 className="mb-8 flex items-center gap-2 text-2xl font-bold">
                                                <Settings className="h-6 w-6 text-emerald-400" />
                                                Account Management
                                            </h2>

                                            <div className="rounded-3xl border border-red-500/25 bg-red-500/10 p-6">
                                                <div className="mb-6 flex items-start gap-4">
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20">
                                                        <AlertTriangle className="h-6 w-6 text-red-400" />
                                                    </div>
                                                    <div>
                                                        <h3 className="mb-2 text-lg font-bold text-red-400">
                                                            Deactivate Account
                                                        </h3>
                                                        <p className="text-sm leading-7 text-gray-300">
                                                            Deactivating your
                                                            account will make
                                                            your profile and
                                                            content
                                                            inaccessible.
                                                        </p>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() =>
                                                        setShowDeactivateModal(
                                                            true,
                                                        )
                                                    }
                                                    className="w-full rounded-2xl border-2 border-red-500 px-4 py-3 font-semibold text-red-400 transition hover:bg-red-500/10"
                                                >
                                                    Deactivate Account
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            <AnimatePresence>
                {showDeactivateModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        onClick={() => setShowDeactivateModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.92, opacity: 0 }}
                            className={`w-full max-w-md rounded-3xl border p-6 shadow-2xl ${cardClass}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20">
                                    <AlertTriangle className="h-6 w-6 text-red-400" />
                                </div>
                                <h3 className="text-xl font-bold">
                                    Deactivate Account
                                </h3>
                            </div>

                            <form
                                onSubmit={handleDeactivateAccount}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Lock
                                            className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${mutedClass}`}
                                        />
                                        <input
                                            type={
                                                showDeactivatePassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="password"
                                            value={deactivateData.password}
                                            onChange={handleDeactivateChange}
                                            required
                                            className={`w-full rounded-2xl border py-3 pl-10 pr-12 outline-none ${inputClass}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowDeactivatePassword(
                                                    !showDeactivatePassword,
                                                )
                                            }
                                            className={`absolute right-3 top-1/2 -translate-y-1/2 ${mutedClass}`}
                                        >
                                            {showDeactivatePassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-400">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Reason for Deactivation (Optional)
                                    </label>
                                    <textarea
                                        name="deactivation_reason"
                                        value={
                                            deactivateData.deactivation_reason
                                        }
                                        onChange={handleDeactivateChange}
                                        rows="3"
                                        className={`w-full rounded-2xl border px-4 py-3 outline-none resize-none ${inputClass}`}
                                        placeholder="Tell us why you're leaving..."
                                    />
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowDeactivateModal(false)
                                        }
                                        className={`flex-1 rounded-2xl px-4 py-3 font-semibold ${
                                            isDark
                                                ? "bg-white/5 text-white"
                                                : "bg-slate-100 text-slate-800"
                                        }`}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={processingDeactivate}
                                        className="flex-1 rounded-2xl bg-red-600 px-4 py-3 font-semibold text-white disabled:opacity-50"
                                    >
                                        {processingDeactivate
                                            ? "Processing..."
                                            : "Deactivate"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showDeactivationSuccessModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.92, opacity: 0 }}
                            className={`w-full max-w-md rounded-3xl border p-8 text-center shadow-2xl ${cardClass}`}
                        >
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20">
                                <CheckCircle className="h-10 w-10 text-emerald-400" />
                            </div>

                            <h3 className="mb-4 text-2xl font-bold">
                                Account Deactivated
                            </h3>
                            <p
                                className={`mb-6 text-sm leading-7 ${mutedClass}`}
                            >
                                Your account has been successfully deactivated.
                            </p>

                            <button
                                onClick={handleDeactivationSuccessClose}
                                className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 font-semibold text-white shadow-lg"
                            >
                                OK
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default UserProfile;
