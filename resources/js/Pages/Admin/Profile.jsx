import React, { useMemo, useState } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import { User, Mail, Camera, Lock, Save, Shield } from "lucide-react";
import AdminLayout from "@/Components/AdminLayout";
import useSitePreferences from "@/hooks/useSitePreferences";

function Flash({ flash, dark }) {
    if (!flash?.success && !flash?.error) return null;

    return (
        <div className="mb-6 space-y-3">
            {flash.success && (
                <div
                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
                        dark
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                            : "border-emerald-200 bg-emerald-50 text-emerald-700"
                    }`}
                >
                    {flash.success}
                </div>
            )}

            {flash.error && (
                <div
                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
                        dark
                            ? "border-red-500/20 bg-red-500/10 text-red-300"
                            : "border-red-200 bg-red-50 text-red-700"
                    }`}
                >
                    {flash.error}
                </div>
            )}
        </div>
    );
}

export default function Profile() {
    const { props } = usePage();
    const { isDark, isArabic } = useSitePreferences();

    const admin = props.admin || {};
    const flash = props.flash || {};

    const [preview, setPreview] = useState(admin.avatar || null);

    const profileForm = useForm({
        name: admin.name || "",
        email: admin.email || "",
        avatar: null,
    });

    const passwordForm = useForm({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const t = useMemo(
        () => ({
            basicInfo: isArabic ? "المعلومات الأساسية" : "Basic Information",
            security: isArabic ? "الأمان وكلمة المرور" : "Security & Password",
            save: isArabic ? "حفظ التعديلات" : "Save Changes",
            updatePassword: isArabic ? "تحديث كلمة المرور" : "Update Password",
            currentPassword: isArabic
                ? "كلمة المرور الحالية"
                : "Current Password",
            newPassword: isArabic ? "كلمة المرور الجديدة" : "New Password",
            confirmPassword: isArabic
                ? "تأكيد كلمة المرور"
                : "Confirm Password",
            fullName: isArabic ? "الاسم الكامل" : "Full Name",
            email: isArabic ? "البريد الإلكتروني" : "Email Address",
        }),
        [isArabic],
    );

    const inputClass = isDark
        ? "border-white/10 bg-white/5 text-white placeholder:text-white/35"
        : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400";

    const handleAvatar = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        profileForm.setData("avatar", file);
        setPreview(URL.createObjectURL(file));
    };

    const submitProfile = (e) => {
        e.preventDefault();

        profileForm
            .transform((data) => data)
            .post(route("admin.profile.update"), {
                forceFormData: true,
                preserveScroll: true,
            });
    };

    const submitPassword = (e) => {
        e.preventDefault();

        passwordForm.post(route("admin.profile.password"), {
            preserveScroll: true,
            onSuccess: () => {
                passwordForm.reset();
            },
        });
    };

    return (
        <>
            <Head title="Admin Profile - Mind Gate" />

            <AdminLayout
                title={isArabic ? "الملف الشخصي" : "Admin Profile"}
                subtitle={
                    isArabic
                        ? "تعديل بيانات الأدمن وكلمة المرور"
                        : "Update admin information and password"
                }
            >
                <Flash flash={flash} dark={isDark} />

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[380px_1fr]">
                    <div
                        className={`rounded-3xl border p-6 shadow-lg ${
                            isDark
                                ? "border-white/10 bg-white/5"
                                : "border-slate-200 bg-white"
                        }`}
                    >
                        <div className="text-center">
                            <div className="relative mx-auto mb-5 h-36 w-36">
                                <img
                                    src={preview || "/images/avatar.webp"}
                                    alt={admin.name || "Admin"}
                                    className="h-full w-full rounded-full object-cover border-4 border-[#7aa7bb]"
                                />
                                <label className="absolute bottom-2 right-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] text-white shadow-lg">
                                    <Camera className="h-4 w-4" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleAvatar}
                                    />
                                </label>
                            </div>

                            <h2 className="text-xl font-black">
                                {profileForm.data.name || "Admin"}
                            </h2>
                            <p
                                className={`mt-1 text-sm ${isDark ? "text-white/60" : "text-slate-500"}`}
                            >
                                {profileForm.data.email || "admin@mindgate.com"}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <form
                            onSubmit={submitProfile}
                            className={`rounded-3xl border p-6 shadow-lg ${
                                isDark
                                    ? "border-white/10 bg-white/5"
                                    : "border-slate-200 bg-white"
                            }`}
                        >
                            <div className="mb-6 flex items-center gap-3">
                                <div className="rounded-2xl bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] p-3 text-white">
                                    <User className="h-5 w-5" />
                                </div>
                                <h3 className="text-xl font-bold">
                                    {t.basicInfo}
                                </h3>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        {t.fullName}
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            value={profileForm.data.name}
                                            onChange={(e) =>
                                                profileForm.setData(
                                                    "name",
                                                    e.target.value,
                                                )
                                            }
                                            className={`w-full rounded-2xl border py-3 pl-10 pr-4 outline-none ${inputClass}`}
                                        />
                                    </div>
                                    {profileForm.errors.name && (
                                        <p className="mt-1 text-sm text-red-400">
                                            {profileForm.errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        {t.email}
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="email"
                                            value={profileForm.data.email}
                                            onChange={(e) =>
                                                profileForm.setData(
                                                    "email",
                                                    e.target.value,
                                                )
                                            }
                                            className={`w-full rounded-2xl border py-3 pl-10 pr-4 outline-none ${inputClass}`}
                                        />
                                    </div>
                                    {profileForm.errors.email && (
                                        <p className="mt-1 text-sm text-red-400">
                                            {profileForm.errors.email}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={profileForm.processing}
                                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] px-5 py-3 font-semibold text-white shadow-lg disabled:opacity-50"
                                >
                                    <Save className="h-4 w-4" />
                                    {profileForm.processing
                                        ? "Saving..."
                                        : t.save}
                                </button>
                            </div>
                        </form>

                        <form
                            onSubmit={submitPassword}
                            className={`rounded-3xl border p-6 shadow-lg ${
                                isDark
                                    ? "border-white/10 bg-white/5"
                                    : "border-slate-200 bg-white"
                            }`}
                        >
                            <div className="mb-6 flex items-center gap-3">
                                <div className="rounded-2xl bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] p-3 text-white">
                                    <Shield className="h-5 w-5" />
                                </div>
                                <h3 className="text-xl font-bold">
                                    {t.security}
                                </h3>
                            </div>

                            <div className="grid gap-5 md:grid-cols-3">
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        {t.currentPassword}
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="password"
                                            value={
                                                passwordForm.data
                                                    .current_password
                                            }
                                            onChange={(e) =>
                                                passwordForm.setData(
                                                    "current_password",
                                                    e.target.value,
                                                )
                                            }
                                            className={`w-full rounded-2xl border py-3 pl-10 pr-4 outline-none ${inputClass}`}
                                        />
                                    </div>
                                    {passwordForm.errors.current_password && (
                                        <p className="mt-1 text-sm text-red-400">
                                            {
                                                passwordForm.errors
                                                    .current_password
                                            }
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        {t.newPassword}
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="password"
                                            value={
                                                passwordForm.data.new_password
                                            }
                                            onChange={(e) =>
                                                passwordForm.setData(
                                                    "new_password",
                                                    e.target.value,
                                                )
                                            }
                                            className={`w-full rounded-2xl border py-3 pl-10 pr-4 outline-none ${inputClass}`}
                                        />
                                    </div>
                                    {passwordForm.errors.new_password && (
                                        <p className="mt-1 text-sm text-red-400">
                                            {passwordForm.errors.new_password}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        {t.confirmPassword}
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="password"
                                            value={
                                                passwordForm.data
                                                    .new_password_confirmation
                                            }
                                            onChange={(e) =>
                                                passwordForm.setData(
                                                    "new_password_confirmation",
                                                    e.target.value,
                                                )
                                            }
                                            className={`w-full rounded-2xl border py-3 pl-10 pr-4 outline-none ${inputClass}`}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={passwordForm.processing}
                                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] px-5 py-3 font-semibold text-white shadow-lg disabled:opacity-50"
                                >
                                    <Lock className="h-4 w-4" />
                                    {passwordForm.processing
                                        ? "Updating..."
                                        : t.updatePassword}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
