import React, { useEffect, useMemo, useState } from "react";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { Search, Mail, Power, Users, Filter } from "lucide-react";
import AdminLayout from "@/Layouts/AdminLayout";

function FlashBanner({ flash }) {
    if (!flash?.success && !flash?.error) return null;

    const isError = !!flash.error;
    const text = flash.error || flash.success;

    return (
        <div
            className={`mb-6 rounded-2xl border px-4 py-3 text-sm font-semibold ${
                isError
                    ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/40 dark:bg-red-500/10 dark:text-red-300"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-500/10 dark:text-emerald-300"
            }`}
        >
            {text}
        </div>
    );
}

export default function AdminUsers({ auth, users }) {
    const { props } = usePage();
    const flash = props.flash || {};

    const locale =
        typeof window !== "undefined"
            ? localStorage.getItem("mindgate_locale") || "en"
            : "en";

    const isArabic = locale === "ar";

    const t = useMemo(
        () => ({
            title: isArabic ? "المستخدمون" : "Users",
            search: isArabic ? "ابحث عن مستخدم..." : "Search users...",
            all: isArabic ? "الكل" : "All",
            active: isArabic ? "نشط" : "Active",
            inactive: isArabic ? "معطل" : "Inactive",
            user: isArabic ? "المستخدم" : "User",
            email: isArabic ? "البريد الإلكتروني" : "Email",
            created: isArabic ? "تاريخ الإنشاء" : "Created",
            status: isArabic ? "الحالة" : "Status",
            actions: isArabic ? "الإجراءات" : "Actions",
            noUsers: isArabic ? "لا يوجد مستخدمون." : "No users found.",
            activate: isArabic ? "تفعيل" : "Activate",
            deactivate: isArabic ? "تعطيل" : "Deactivate",
            results: isArabic ? "عدد النتائج" : "Results",
        }),
        [isArabic],
    );

    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const toggleForm = useForm({});
    const rows = users?.data || [];
    const admin = auth?.user || {};

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                route("admin.users.index"),
                { search: searchQuery, status: filterStatus },
                { preserveState: true, preserveScroll: true, replace: true },
            );
        }, 320);

        return () => clearTimeout(timer);
    }, [searchQuery, filterStatus]);

    const toggleUserStatus = (userId) => {
        toggleForm.post(route("admin.users.toggle-status", userId), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title={t.title} auth={auth}>
            <Head title={`${t.title} - Mind Gate`} />
            <FlashBanner flash={flash} />

            <div className="space-y-6">
                <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#7aa7bb]/10 px-3 py-1 text-xs font-extrabold text-[#7aa7bb]">
                                <Users size={14} />
                                Mind Gate
                            </div>

                            <h2 className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white">
                                {t.title}
                            </h2>
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                {t.results}: {users?.total ?? 0}
                            </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-[1fr_180px] xl:w-[520px]">
                            <div className="relative">
                                <Search
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={18}
                                />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    placeholder={t.search}
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#7aa7bb] dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                />
                            </div>

                            <div className="relative">
                                <Filter
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={16}
                                />
                                <select
                                    value={filterStatus}
                                    onChange={(e) =>
                                        setFilterStatus(e.target.value)
                                    }
                                    className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#7aa7bb] dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                >
                                    <option value="">{t.all}</option>
                                    <option value="active">{t.active}</option>
                                    <option value="inactive">
                                        {t.inactive}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="rounded-[30px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
                    <div className="hidden xl:block overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                        {t.user}
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                        {t.email}
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                        {t.created}
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                        {t.status}
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                        {t.actions}
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {rows.length > 0 ? (
                                    rows.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="border-b border-slate-100 transition hover:bg-slate-50/80 dark:border-slate-800 dark:hover:bg-slate-900/60"
                                        >
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7aa7bb] to-[#6797ab] font-bold text-white">
                                                        {(user.name || "?")
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="truncate font-bold text-slate-900 dark:text-white">
                                                            {user.name ||
                                                                "Unknown User"}
                                                        </p>
                                                        <p className="text-xs text-slate-400">
                                                            ID: {user.id}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                                    <Mail size={14} />
                                                    {user.email || "No email"}
                                                </div>
                                            </td>

                                            <td className="px-6 py-5 text-sm text-slate-500 dark:text-slate-400">
                                                {user.created_at
                                                    ? new Date(
                                                          user.created_at,
                                                      ).toLocaleDateString()
                                                    : "-"}
                                            </td>

                                            <td className="px-6 py-5">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                                                        user.is_active
                                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                                            : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                                                    }`}
                                                >
                                                    {user.is_active
                                                        ? t.active
                                                        : t.inactive}
                                                </span>
                                            </td>

                                            <td className="px-6 py-5">
                                                <button
                                                    onClick={() =>
                                                        toggleUserStatus(
                                                            user.id,
                                                        )
                                                    }
                                                    disabled={
                                                        user.id === admin.id ||
                                                        toggleForm.processing
                                                    }
                                                    className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-bold transition ${
                                                        user.is_active
                                                            ? user.id ===
                                                              admin.id
                                                                ? "cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-500"
                                                                : "bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-500/10 dark:text-rose-400"
                                                            : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400"
                                                    }`}
                                                >
                                                    <Power size={14} />
                                                    {user.is_active
                                                        ? t.deactivate
                                                        : t.activate}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-6 py-12 text-center text-sm text-slate-400"
                                        >
                                            {t.noUsers}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid gap-4 p-4 xl:hidden">
                        {rows.length > 0 ? (
                            rows.map((user) => (
                                <div
                                    key={user.id}
                                    className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/60"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7aa7bb] to-[#6797ab] font-bold text-white">
                                                {(user.name || "?")
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white">
                                                    {user.name ||
                                                        "Unknown User"}
                                                </p>
                                                <p className="text-xs text-slate-400">
                                                    ID: {user.id}
                                                </p>
                                            </div>
                                        </div>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                                                user.is_active
                                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                                    : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                                            }`}
                                        >
                                            {user.is_active
                                                ? t.active
                                                : t.inactive}
                                        </span>
                                    </div>

                                    <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                                        <div>{user.email || "No email"}</div>
                                        <div>
                                            {user.created_at
                                                ? new Date(
                                                      user.created_at,
                                                  ).toLocaleDateString()
                                                : "-"}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() =>
                                            toggleUserStatus(user.id)
                                        }
                                        disabled={
                                            user.id === admin.id ||
                                            toggleForm.processing
                                        }
                                        className={`mt-4 inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-bold transition ${
                                            user.is_active
                                                ? user.id === admin.id
                                                    ? "cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-500"
                                                    : "bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-500/10 dark:text-rose-400"
                                                : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400"
                                        }`}
                                    >
                                        <Power size={14} />
                                        {user.is_active
                                            ? t.deactivate
                                            : t.activate}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="rounded-3xl border border-dashed border-slate-300 px-4 py-10 text-center text-sm text-slate-400 dark:border-slate-700">
                                {t.noUsers}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
}
