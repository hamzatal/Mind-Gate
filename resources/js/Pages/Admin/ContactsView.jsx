import React, { useEffect, useMemo, useState } from "react";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { Search, Mail, CheckCircle2, Circle } from "lucide-react";
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

export default function ContactsView({ auth, messages = { data: [] } }) {
    const { props } = usePage();
    const flash = props.flash || {};

    const locale =
        typeof window !== "undefined"
            ? localStorage.getItem("mindgate_locale") || "en"
            : "en";

    const isArabic = locale === "ar";

    const t = useMemo(
        () => ({
            title: isArabic ? "الرسائل" : "Messages",
            search: isArabic ? "ابحث في الرسائل..." : "Search messages...",
            name: isArabic ? "الاسم" : "Name",
            email: isArabic ? "البريد" : "Email",
            subject: isArabic ? "الموضوع" : "Subject",
            message: isArabic ? "الرسالة" : "Message",
            status: isArabic ? "الحالة" : "Status",
            action: isArabic ? "الإجراء" : "Action",
            read: isArabic ? "مقروءة" : "Read",
            unread: isArabic ? "جديدة" : "Unread",
            markRead: isArabic ? "تحديد كمقروءة" : "Mark as read",
            noMessages: isArabic ? "لا توجد رسائل." : "No messages found.",
            prev: isArabic ? "السابق" : "Previous",
            next: isArabic ? "التالي" : "Next",
        }),
        [isArabic],
    );

    const [searchQuery, setSearchQuery] = useState("");
    const form = useForm({});
    const filteredMessages = Array.isArray(messages.data)
        ? messages.data.filter((message) => {
              const q = searchQuery.toLowerCase().trim();
              if (!q) return true;

              return (
                  (message.name || "").toLowerCase().includes(q) ||
                  (message.email || "").toLowerCase().includes(q) ||
                  (message.subject || "").toLowerCase().includes(q) ||
                  (message.message || "").toLowerCase().includes(q)
              );
          })
        : [];

    const handleMarkAsRead = (id) => {
        form.patch(route("admin.messages.read", id), {
            preserveScroll: true,
        });
    };

    const handlePageChange = (page) => {
        router.get(
            route("admin.messages"),
            { page, search: searchQuery },
            { preserveState: true, preserveScroll: true },
        );
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
                                <Mail size={14} />
                                Mind Gate
                            </div>

                            <h2 className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white">
                                {t.title}
                            </h2>
                        </div>

                        <div className="relative xl:w-[360px]">
                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                size={18}
                            />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t.search}
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#7aa7bb] dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                        </div>
                    </div>
                </section>

                <section className="rounded-[30px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
                    <div className="hidden xl:block overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                        {t.name}
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                        {t.email}
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                        {t.subject}
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                        {t.message}
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                        {t.status}
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                        {t.action}
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredMessages.length > 0 ? (
                                    filteredMessages.map((message) => (
                                        <tr
                                            key={message.id}
                                            className="border-b border-slate-100 transition hover:bg-slate-50/80 dark:border-slate-800 dark:hover:bg-slate-900/60"
                                        >
                                            <td className="px-6 py-5 font-bold text-slate-900 dark:text-white">
                                                {message.name}
                                            </td>
                                            <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300">
                                                {message.email}
                                            </td>
                                            <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300">
                                                {message.subject}
                                            </td>
                                            <td className="px-6 py-5 text-sm text-slate-500 dark:text-slate-400 max-w-[340px]">
                                                <div className="line-clamp-2">
                                                    {message.message}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span
                                                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${
                                                        message.is_read
                                                            ? "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                                                            : "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                                                    }`}
                                                >
                                                    {message.is_read ? (
                                                        <CheckCircle2
                                                            size={12}
                                                        />
                                                    ) : (
                                                        <Circle size={12} />
                                                    )}
                                                    {message.is_read
                                                        ? t.read
                                                        : t.unread}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                {!message.is_read && (
                                                    <button
                                                        onClick={() =>
                                                            handleMarkAsRead(
                                                                message.id,
                                                            )
                                                        }
                                                        className="rounded-2xl bg-[#7aa7bb]/10 px-4 py-2 text-sm font-bold text-[#6797ab] transition hover:bg-[#7aa7bb]/20"
                                                    >
                                                        {t.markRead}
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="px-6 py-12 text-center text-sm text-slate-400"
                                        >
                                            {t.noMessages}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid gap-4 p-4 xl:hidden">
                        {filteredMessages.length > 0 ? (
                            filteredMessages.map((message) => (
                                <div
                                    key={message.id}
                                    className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/60"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white">
                                                {message.name}
                                            </p>
                                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                                {message.email}
                                            </p>
                                        </div>

                                        <span
                                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${
                                                message.is_read
                                                    ? "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                                                    : "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                                            }`}
                                        >
                                            {message.is_read
                                                ? t.read
                                                : t.unread}
                                        </span>
                                    </div>

                                    <div className="mt-4">
                                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                            {message.subject}
                                        </p>
                                        <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                            {message.message}
                                        </p>
                                    </div>

                                    {!message.is_read && (
                                        <button
                                            onClick={() =>
                                                handleMarkAsRead(message.id)
                                            }
                                            className="mt-4 rounded-2xl bg-[#7aa7bb]/10 px-4 py-2 text-sm font-bold text-[#6797ab] transition hover:bg-[#7aa7bb]/20"
                                        >
                                            {t.markRead}
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="rounded-3xl border border-dashed border-slate-300 px-4 py-10 text-center text-sm text-slate-400 dark:border-slate-700">
                                {t.noMessages}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 dark:border-slate-800">
                        <div className="text-sm text-slate-400">
                            {messages.from || 0} - {messages.to || 0} /{" "}
                            {messages.total || 0}
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() =>
                                    handlePageChange(
                                        (messages.current_page || 1) - 1,
                                    )
                                }
                                disabled={(messages.current_page || 1) === 1}
                                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                            >
                                {t.prev}
                            </button>

                            <button
                                onClick={() =>
                                    handlePageChange(
                                        (messages.current_page || 1) + 1,
                                    )
                                }
                                disabled={
                                    (messages.current_page || 1) ===
                                    (messages.last_page || 1)
                                }
                                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                            >
                                {t.next}
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
}
