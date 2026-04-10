import React, { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { UserCircle2, Lock, Image as ImageIcon, Save } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import AdminLayout from "@/Layouts/AdminLayout";

export default function AdminProfile({ admin, flash = {} }) {
    const { props } = usePage();
    const sharedFlash = flash || props.flash || {};

    useEffect(() => {
        if (sharedFlash?.success) toast.success(sharedFlash.success);
        if (sharedFlash?.error) toast.error(sharedFlash.error);
    }, [sharedFlash]);

    const profileForm = useForm({
        name: admin?.name || "",
        email: admin?.email || "",
        avatar: null,
    });

    const passwordForm = useForm({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const submitProfile = (e) => {
        e.preventDefault();
        profileForm.post(route("admin.profile.update"), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.post(route("admin.profile.password"), {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
        });
    };

    return (
        <AdminLayout title="Profile" auth={{ user: admin }}>
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

            <div className="grid gap-6 xl:grid-cols-2">
                <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7aa7bb]/10 text-[#7aa7bb]">
                            <UserCircle2 size={22} />
                        </div>
                        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                            Profile Information
                        </h2>
                    </div>

                    <form onSubmit={submitProfile} className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="h-20 w-20 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
                                {admin?.avatar ? (
                                    <img
                                        src={admin.avatar}
                                        alt={admin.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                                        <ImageIcon size={24} />
                                    </div>
                                )}
                            </div>

                            <div className="flex-1">
                                <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
                                    Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        profileForm.setData(
                                            "avatar",
                                            e.target.files[0],
                                        )
                                    }
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                />
                                {profileForm.errors.avatar && (
                                    <p className="mt-2 text-xs text-red-500">
                                        {profileForm.errors.avatar}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
                                Name
                            </label>
                            <input
                                type="text"
                                value={profileForm.data.name}
                                onChange={(e) =>
                                    profileForm.setData("name", e.target.value)
                                }
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#7aa7bb] dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                            {profileForm.errors.name && (
                                <p className="mt-2 text-xs text-red-500">
                                    {profileForm.errors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
                                Email
                            </label>
                            <input
                                type="email"
                                value={profileForm.data.email}
                                onChange={(e) =>
                                    profileForm.setData("email", e.target.value)
                                }
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#7aa7bb] dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                            {profileForm.errors.email && (
                                <p className="mt-2 text-xs text-red-500">
                                    {profileForm.errors.email}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={profileForm.processing}
                            className="inline-flex items-center gap-2 rounded-2xl bg-[#7aa7bb] px-5 py-3 text-sm font-bold text-white hover:bg-[#6797ab]"
                        >
                            <Save size={16} />
                            Save changes
                        </button>
                    </form>
                </section>

                <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7aa7bb]/10 text-[#7aa7bb]">
                            <Lock size={22} />
                        </div>
                        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                            Change Password
                        </h2>
                    </div>

                    <form onSubmit={submitPassword} className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
                                Current password
                            </label>
                            <input
                                type="password"
                                value={passwordForm.data.current_password}
                                onChange={(e) =>
                                    passwordForm.setData(
                                        "current_password",
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#7aa7bb] dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                            {passwordForm.errors.current_password && (
                                <p className="mt-2 text-xs text-red-500">
                                    {passwordForm.errors.current_password}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
                                New password
                            </label>
                            <input
                                type="password"
                                value={passwordForm.data.new_password}
                                onChange={(e) =>
                                    passwordForm.setData(
                                        "new_password",
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#7aa7bb] dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                            {passwordForm.errors.new_password && (
                                <p className="mt-2 text-xs text-red-500">
                                    {passwordForm.errors.new_password}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
                                Confirm password
                            </label>
                            <input
                                type="password"
                                value={
                                    passwordForm.data.new_password_confirmation
                                }
                                onChange={(e) =>
                                    passwordForm.setData(
                                        "new_password_confirmation",
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#7aa7bb] dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={passwordForm.processing}
                            className="inline-flex items-center gap-2 rounded-2xl bg-[#7aa7bb] px-5 py-3 text-sm font-bold text-white hover:bg-[#6797ab]"
                        >
                            <Save size={16} />
                            Update password
                        </button>
                    </form>
                </section>
            </div>
        </AdminLayout>
    );
}
