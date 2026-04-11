import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    Users,
    MessageSquare,
    Image,
    Activity,
    BookOpenText,
    Building2,
    ClipboardList,
    HeartPulse,
    ArrowUpRight,
} from "lucide-react";
import AdminLayout from "@/Components/AdminLayout";
import useSitePreferences from "@/hooks/useSitePreferences";

function StatCard({ title, value, icon: Icon, accent, note, link }) {
    return (
        <div className={`rounded-3xl border p-6 shadow-lg ${accent}`}>
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm font-medium text-white/80">{title}</p>
                    <h3 className="mt-3 text-3xl font-black text-white">
                        {value}
                    </h3>
                    {note ? (
                        <p className="mt-3 text-xs text-white/75">{note}</p>
                    ) : null}
                </div>
                <div className="rounded-2xl bg-white/15 p-3">
                    <Icon className="h-6 w-6 text-white" />
                </div>
            </div>

            {link ? (
                <div className="mt-5">
                    <Link
                        href={link.href}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white"
                    >
                        {link.label}
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </div>
            ) : null}
        </div>
    );
}

function Panel({ title, children, dark }) {
    return (
        <div
            className={`overflow-hidden rounded-3xl border shadow-lg ${
                dark
                    ? "border-white/10 bg-white/5"
                    : "border-slate-200 bg-white"
            }`}
        >
            <div
                className={`border-b px-6 py-4 ${
                    dark ? "border-white/10" : "border-slate-200"
                }`}
            >
                <h3 className="text-lg font-bold">{title}</h3>
            </div>
            <div className="p-6">{children}</div>
        </div>
    );
}

export default function Dashboard() {
    const { props } = usePage();
    const { isDark, isArabic } = useSitePreferences();

    const admin = props.admin || {};
    const stats = props.stats || {};
    const latestUsers = props.latest_users || [];
    const latestMessages = props.latest_messages || [];

    return (
        <>
            <Head title="Admin Dashboard - Mind Gate" />

            <AdminLayout
                title={isArabic ? "لوحة التحكم" : "Dashboard"}
                subtitle={
                    isArabic
                        ? "نظرة عامة على بيانات المنصة والإدارة"
                        : "A full overview of platform and admin data"
                }
            >
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        title={isArabic ? "المستخدمون" : "Users"}
                        value={stats.users || 0}
                        icon={Users}
                        note={`${isArabic ? "غير النشطين" : "Inactive"}: ${
                            stats.inactive_users || 0
                        }`}
                        accent="bg-gradient-to-br from-blue-600 to-blue-800"
                        link={{
                            href: route("admin.users.index"),
                            label: isArabic
                                ? "إدارة المستخدمين"
                                : "Manage users",
                        }}
                    />

                    <StatCard
                        title={isArabic ? "الرسائل" : "Messages"}
                        value={stats.messages || 0}
                        icon={MessageSquare}
                        note={`${isArabic ? "غير المقروءة" : "Unread"}: ${
                            stats.unread_messages || 0
                        }`}
                        accent="bg-gradient-to-br from-amber-500 to-orange-700"
                        link={{
                            href: route("admin.messages"),
                            label: isArabic ? "عرض الرسائل" : "View messages",
                        }}
                    />

                    <StatCard
                        title={isArabic ? "المختصون" : "Specialists"}
                        value={stats.specialists || 0}
                        icon={HeartPulse}
                        note={isArabic ? "السجلات النشطة" : "Active records"}
                        accent="bg-gradient-to-br from-emerald-600 to-emerald-800"
                    />

                    <StatCard
                        title={isArabic ? "الموارد" : "Resources"}
                        value={stats.resources || 0}
                        icon={BookOpenText}
                        note={
                            isArabic ? "المحتوى المنشور" : "Published content"
                        }
                        accent="bg-gradient-to-br from-violet-600 to-violet-800"
                    />

                    <StatCard
                        title={isArabic ? "التقييمات" : "Assessments"}
                        value={stats.assessments || 0}
                        icon={ClipboardList}
                        note={
                            isArabic ? "النماذج المحفوظة" : "Stored assessments"
                        }
                        accent="bg-gradient-to-br from-pink-600 to-pink-800"
                    />

                    <StatCard
                        title={
                            isArabic ? "المتابعات اليومية" : "Daily Check-ins"
                        }
                        value={stats.checkins || 0}
                        icon={Activity}
                        note={isArabic ? "سجلات المتابعة" : "Tracking records"}
                        accent="bg-gradient-to-br from-cyan-600 to-cyan-800"
                    />

                    <StatCard
                        title={isArabic ? "المؤسسات" : "Organizations"}
                        value={stats.organizations || 0}
                        icon={Building2}
                        note={
                            isArabic
                                ? "الجهات المسجلة"
                                : "Registered organizations"
                        }
                        accent="bg-gradient-to-br from-green-600 to-green-800"
                    />

                    <StatCard
                        title={isArabic ? "الهيرو سكشن" : "Hero Sections"}
                        value={stats.hero_sections || 0}
                        icon={Image}
                        note={
                            isArabic
                                ? "شرائح الصفحة الرئيسية"
                                : "Homepage hero slides"
                        }
                        accent="bg-gradient-to-br from-indigo-600 to-indigo-800"
                        link={{
                            href: route("admin.hero.index"),
                            label: isArabic ? "إدارة الهيرو" : "Manage hero",
                        }}
                    />
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <Panel
                        title={isArabic ? "آخر المستخدمين" : "Latest Users"}
                        dark={isDark}
                    >
                        {latestUsers.length > 0 ? (
                            <div className="space-y-4">
                                {latestUsers.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`flex items-center justify-between rounded-2xl p-4 ${
                                            isDark
                                                ? "bg-white/5"
                                                : "bg-slate-50"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] font-bold text-white">
                                                {(item.name || "?")
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold">
                                                    {item.name ||
                                                        "Unknown User"}
                                                </p>
                                                <p
                                                    className={`text-sm ${isDark ? "text-white/60" : "text-slate-500"}`}
                                                >
                                                    {item.email || "No email"}
                                                </p>
                                            </div>
                                        </div>

                                        <div
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
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p
                                className={
                                    isDark ? "text-white/60" : "text-slate-500"
                                }
                            >
                                {isArabic
                                    ? "لا يوجد مستخدمون بعد."
                                    : "No users found yet."}
                            </p>
                        )}
                    </Panel>

                    <Panel
                        title={isArabic ? "آخر الرسائل" : "Latest Messages"}
                        dark={isDark}
                    >
                        {latestMessages.length > 0 ? (
                            <div className="space-y-4">
                                {latestMessages.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`rounded-2xl p-4 ${
                                            isDark
                                                ? "bg-white/5"
                                                : "bg-slate-50"
                                        }`}
                                    >
                                        <div className="mb-2 flex items-center justify-between gap-3">
                                            <div>
                                                <p className="font-semibold">
                                                    {item.name || "Unknown"}
                                                </p>
                                                <p
                                                    className={`text-sm ${isDark ? "text-white/60" : "text-slate-500"}`}
                                                >
                                                    {item.email || "No email"}
                                                </p>
                                            </div>

                                            {!item.is_read && (
                                                <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-400">
                                                    {isArabic ? "جديدة" : "New"}
                                                </span>
                                            )}
                                        </div>

                                        <p className="font-medium">
                                            {item.subject ||
                                                (isArabic
                                                    ? "بدون عنوان"
                                                    : "No subject")}
                                        </p>
                                        <p
                                            className={`mt-2 line-clamp-2 text-sm ${isDark ? "text-white/65" : "text-slate-600"}`}
                                        >
                                            {item.message || ""}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p
                                className={
                                    isDark ? "text-white/60" : "text-slate-500"
                                }
                            >
                                {isArabic
                                    ? "لا توجد رسائل."
                                    : "No messages found."}
                            </p>
                        )}
                    </Panel>
                </div>
            </AdminLayout>
        </>
    );
}
