import React, { useEffect, useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { Search, Power, Users as UsersIcon } from "lucide-react";
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

export default function Users() {
    const { props } = usePage();
    const { isDark, isArabic } = useSitePreferences();

    const users = props.users || {
        data: [],
        total: 0,
        current_page: 1,
        last_page: 1,
        from: 0,
        to: 0,
    };
    const flash = props.flash || {};
    const supportsStatusToggle = props.supports_status_toggle ?? true;
    const filters = props.filters || { search: "", status: "" };

    const [search, setSearch] = useState(filters.search || "");
    const [status, setStatus] = useState(filters.status || "");

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                route("admin.users.index"),
                { search, status },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        }, 350);

        return () => clearTimeout(timer);
    }, [search, status]);

    return (
        <>
            <Head title="Admin Users - Mind Gate" />

            <AdminLayout
                title={isArabic ? "إدارة المستخدمين" : "Users Management"}
                subtitle={
                    isArabic
                        ? "عرض المستخدمين والبحث عنهم وتفعيلهم أو تعطيلهم"
                        : "Browse users, search, and activate or deactivate accounts"
                }
            >
                <Flash flash={flash} dark={isDark} />

                <div
                    className={`overflow-hidden rounded-3xl border shadow-lg ${
                        isDark
                            ? "border-white/10 bg-white/5"
                            : "border-slate-200 bg-white"
                    }`}
                >
                    <div
                        className={`flex flex-col gap-4 border-b p-6 lg:flex-row lg:items-center lg:justify-between ${
                            isDark ? "border-white/10" : "border-slate-200"
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="rounded-2xl bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] p-3 text-white">
                                <UsersIcon className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">
                                    {isArabic
                                        ? "قائمة المستخدمين"
                                        : "Users List"}
                                </h2>
                                <p
                                    className={`text-sm ${isDark ? "text-white/60" : "text-slate-500"}`}
                                >
                                    {users.total || 0}{" "}
                                    {isArabic ? "مستخدم" : "users"}
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-3 md:grid-cols-[1fr_180px]">
                            <div className="relative">
                                <Search
                                    className={`absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 ${
                                        isDark
                                            ? "text-white/45"
                                            : "text-slate-400"
                                    }`}
                                />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder={
                                        isArabic
                                            ? "ابحث بالاسم أو البريد..."
                                            : "Search by name or email..."
                                    }
                                    className={`w-full rounded-2xl border py-3 pl-10 pr-4 outline-none ${
                                        isDark
                                            ? "border-white/10 bg-white/5 text-white placeholder:text-white/35"
                                            : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400"
                                    }`}
                                />
                            </div>

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className={`rounded-2xl border px-4 py-3 outline-none ${
                                    isDark
                                        ? "border-white/10 bg-white/5 text-white"
                                        : "border-slate-200 bg-slate-50 text-slate-900"
                                }`}
                            >
                                <option value="">
                                    {isArabic ? "كل الحالات" : "All statuses"}
                                </option>
                                <option value="active">
                                    {isArabic ? "نشط" : "Active"}
                                </option>
                                <option value="inactive">
                                    {isArabic ? "معطل" : "Inactive"}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead
                                className={
                                    isDark ? "bg-white/5" : "bg-slate-50"
                                }
                            >
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                        {isArabic ? "المستخدم" : "User"}
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                        {isArabic ? "الحالة" : "Status"}
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                        {isArabic ? "التاريخ" : "Created"}
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                        {isArabic ? "الإجراء" : "Action"}
                                    </th>
                                </tr>
                            </thead>

                            <tbody
                                className={
                                    isDark
                                        ? "divide-y divide-white/10"
                                        : "divide-y divide-slate-200"
                                }
                            >
                                {users.data?.length ? (
                                    users.data.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] font-bold text-white">
                                                        {(item.name || "?")
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">
                                                            {item.name ||
                                                                "Unknown"}
                                                        </p>
                                                        <p
                                                            className={`text-sm ${isDark ? "text-white/60" : "text-slate-500"}`}
                                                        >
                                                            {item.email ||
                                                                "No email"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                        item.is_active
                                                            ? "bg-emerald-500/15 text-emerald-400"
                                                            : "bg-red-500/15 text-red-400"
                                                    }`}
                                                >
                                                    {item.is_active
                                                        ? isArabic
                                                            ? "نشط"
                                                            : "Active"
                                                        : isArabic
                                                          ? "معطل"
                                                          : "Inactive"}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-sm">
                                                {item.created_at
                                                    ? new Date(
                                                          item.created_at,
                                                      ).toLocaleDateString()
                                                    : "—"}
                                            </td>

                                            <td className="px-6 py-4">
                                                {supportsStatusToggle ? (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            router.post(
                                                                route(
                                                                    "admin.users.toggle-status",
                                                                    item.id,
                                                                ),
                                                                {},
                                                                {
                                                                    preserveScroll: true,
                                                                },
                                                            )
                                                        }
                                                        className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold ${
                                                            item.is_active
                                                                ? "bg-red-500/10 text-red-400 hover:bg-red-500/15"
                                                                : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/15"
                                                        }`}
                                                    >
                                                        <Power className="h-4 w-4" />
                                                        {item.is_active
                                                            ? isArabic
                                                                ? "تعطيل"
                                                                : "Deactivate"
                                                            : isArabic
                                                              ? "تفعيل"
                                                              : "Activate"}
                                                    </button>
                                                ) : (
                                                    <span
                                                        className={`text-sm ${isDark ? "text-white/55" : "text-slate-500"}`}
                                                    >
                                                        —
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className={`px-6 py-16 text-center text-sm ${
                                                isDark
                                                    ? "text-white/60"
                                                    : "text-slate-500"
                                            }`}
                                        >
                                            {isArabic
                                                ? "لا يوجد مستخدمون مطابقون."
                                                : "No matching users found."}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div
                        className={`flex flex-col gap-4 border-t px-6 py-4 md:flex-row md:items-center md:justify-between ${
                            isDark ? "border-white/10" : "border-slate-200"
                        }`}
                    >
                        <p
                            className={`text-sm ${isDark ? "text-white/60" : "text-slate-500"}`}
                        >
                            {isArabic
                                ? `عرض ${users.from || 0} إلى ${users.to || 0} من ${users.total || 0}`
                                : `Showing ${users.from || 0} to ${users.to || 0} of ${users.total || 0}`}
                        </p>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                disabled={users.current_page <= 1}
                                onClick={() =>
                                    router.get(
                                        route("admin.users.index"),
                                        {
                                            search,
                                            status,
                                            page: users.current_page - 1,
                                        },
                                        {
                                            preserveState: true,
                                            preserveScroll: true,
                                        },
                                    )
                                }
                                className={`rounded-2xl px-4 py-2 text-sm font-semibold disabled:opacity-40 ${
                                    isDark
                                        ? "bg-white/5 text-white"
                                        : "bg-slate-100 text-slate-700"
                                }`}
                            >
                                {isArabic ? "السابق" : "Previous"}
                            </button>

                            <button
                                type="button"
                                disabled={users.current_page >= users.last_page}
                                onClick={() =>
                                    router.get(
                                        route("admin.users.index"),
                                        {
                                            search,
                                            status,
                                            page: users.current_page + 1,
                                        },
                                        {
                                            preserveState: true,
                                            preserveScroll: true,
                                        },
                                    )
                                }
                                className={`rounded-2xl px-4 py-2 text-sm font-semibold disabled:opacity-40 ${
                                    isDark
                                        ? "bg-white/5 text-white"
                                        : "bg-slate-100 text-slate-700"
                                }`}
                            >
                                {isArabic ? "التالي" : "Next"}
                            </button>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
