import React, { useEffect, useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { Search, MessageSquare, CheckCircle2 } from "lucide-react";
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

export default function ContactsView() {
    const { props } = usePage();
    const { isDark, isArabic } = useSitePreferences();

    const messages = props.messages || {
        data: [],
        total: 0,
        current_page: 1,
        last_page: 1,
        from: 0,
        to: 0,
    };
    const flash = props.flash || {};
    const filters = props.filters || { search: "" };

    const [search, setSearch] = useState(filters.search || "");

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                route("admin.messages"),
                { search },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        }, 350);

        return () => clearTimeout(timer);
    }, [search]);

    return (
        <>
            <Head title="Admin Messages - Mind Gate" />

            <AdminLayout
                title={isArabic ? "إدارة الرسائل" : "Messages Management"}
                subtitle={
                    isArabic
                        ? "عرض رسائل التواصل والبحث عنها وتعليمها كمقروءة"
                        : "Browse contact messages, search them, and mark them as read"
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
                                <MessageSquare className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">
                                    {isArabic
                                        ? "رسائل التواصل"
                                        : "Contact Messages"}
                                </h2>
                                <p
                                    className={`text-sm ${isDark ? "text-white/60" : "text-slate-500"}`}
                                >
                                    {messages.total || 0}{" "}
                                    {isArabic ? "رسالة" : "messages"}
                                </p>
                            </div>
                        </div>

                        <div className="relative w-full lg:w-80">
                            <Search
                                className={`absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 ${
                                    isDark ? "text-white/45" : "text-slate-400"
                                }`}
                            />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={
                                    isArabic
                                        ? "ابحث بالاسم أو البريد أو العنوان..."
                                        : "Search by name, email, or subject..."
                                }
                                className={`w-full rounded-2xl border py-3 pl-10 pr-4 outline-none ${
                                    isDark
                                        ? "border-white/10 bg-white/5 text-white placeholder:text-white/35"
                                        : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400"
                                }`}
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 p-6">
                        {messages.data?.length ? (
                            messages.data.map((message) => (
                                <div
                                    key={message.id}
                                    className={`rounded-3xl border p-5 ${
                                        isDark
                                            ? "border-white/10 bg-white/5"
                                            : "border-slate-200 bg-slate-50"
                                    }`}
                                >
                                    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold">
                                                {message.subject ||
                                                    (isArabic
                                                        ? "بدون عنوان"
                                                        : "No subject")}
                                            </h3>
                                            <p
                                                className={`mt-1 text-sm ${isDark ? "text-white/60" : "text-slate-500"}`}
                                            >
                                                {message.name || "Unknown"} •{" "}
                                                {message.email || "No email"}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {message.is_read ? (
                                                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
                                                    {isArabic
                                                        ? "مقروءة"
                                                        : "Read"}
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-400">
                                                    {isArabic
                                                        ? "غير مقروءة"
                                                        : "Unread"}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <p
                                        className={`text-sm leading-8 ${isDark ? "text-white/75" : "text-slate-700"}`}
                                    >
                                        {message.message || ""}
                                    </p>

                                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                                        <p
                                            className={`text-xs ${isDark ? "text-white/50" : "text-slate-500"}`}
                                        >
                                            {message.created_at
                                                ? new Date(
                                                      message.created_at,
                                                  ).toLocaleString()
                                                : "—"}
                                        </p>

                                        {!message.is_read && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    router.patch(
                                                        route(
                                                            "admin.messages.read",
                                                            message.id,
                                                        ),
                                                        {},
                                                        {
                                                            preserveScroll: true,
                                                        },
                                                    )
                                                }
                                                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/15"
                                            >
                                                <CheckCircle2 className="h-4 w-4" />
                                                {isArabic
                                                    ? "تعليم كمقروءة"
                                                    : "Mark as read"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div
                                className={`rounded-3xl border p-10 text-center ${isDark ? "border-white/10 bg-white/5 text-white/60" : "border-slate-200 bg-slate-50 text-slate-500"}`}
                            >
                                {isArabic
                                    ? "لا توجد رسائل مطابقة."
                                    : "No matching messages found."}
                            </div>
                        )}
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
                                ? `عرض ${messages.from || 0} إلى ${messages.to || 0} من ${messages.total || 0}`
                                : `Showing ${messages.from || 0} to ${messages.to || 0} of ${messages.total || 0}`}
                        </p>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                disabled={messages.current_page <= 1}
                                onClick={() =>
                                    router.get(
                                        route("admin.messages"),
                                        {
                                            search,
                                            page: messages.current_page - 1,
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
                                disabled={
                                    messages.current_page >= messages.last_page
                                }
                                onClick={() =>
                                    router.get(
                                        route("admin.messages"),
                                        {
                                            search,
                                            page: messages.current_page + 1,
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
