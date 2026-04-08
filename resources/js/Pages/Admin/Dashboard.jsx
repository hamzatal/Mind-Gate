import React, { useMemo } from "react";
import {
    Users,
    CalendarCheck2,
    BrainCircuit,
    HeartPulse,
    TrendingUp,
    UserCheck,
    Clock3,
    Activity,
    ArrowUpRight,
} from "lucide-react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Dashboard({ auth }) {
    const locale = localStorage.getItem("mindgate_locale") || "en";
    const isArabic = locale === "ar";

    const t = useMemo(
        () => ({
            title: isArabic ? "لوحة التحكم" : "Dashboard",
            welcome: isArabic ? "مرحباً بعودتك" : "Welcome back",
            summary: isArabic
                ? "هذه نظرة عامة على مؤشرات المنصة والخدمات الأساسية."
                : "Here is an overview of the main platform indicators and core services.",
            totalUsers: isArabic ? "إجمالي المستخدمين" : "Total users",
            totalDoctors: isArabic ? "إجمالي المختصين" : "Total specialists",
            appointments: isArabic
                ? "المواعيد المحجوزة"
                : "Booked appointments",
            assessments: isArabic
                ? "التقييمات المنجزة"
                : "Completed assessments",
            recentActivity: isArabic ? "آخر النشاطات" : "Recent activity",
            performance: isArabic ? "ملخص الأداء" : "Performance summary",
            todayStats: isArabic ? "إحصائيات اليوم" : "Today statistics",
            activeUsers: isArabic ? "المستخدمون النشطون" : "Active users",
            upcomingSessions: isArabic
                ? "الجلسات القادمة"
                : "Upcoming sessions",
            moodTracking: isArabic ? "متابعة الحالة" : "Mood tracking",
            aiUsage: isArabic ? "استخدام الذكاء الاصطناعي" : "AI usage",
            viewDetails: isArabic ? "عرض التفاصيل" : "View details",
            high: isArabic ? "مرتفع" : "High",
            medium: isArabic ? "متوسط" : "Medium",
            stable: isArabic ? "مستقر" : "Stable",
            completed: isArabic ? "مكتمل" : "Completed",
            userManagement: isArabic ? "إدارة المستخدمين" : "User management",
            appointmentFlow: isArabic ? "سير المواعيد" : "Appointment flow",
            assessmentsTitle: isArabic ? "حالة التقييمات" : "Assessment status",
            insights: isArabic ? "مؤشرات سريعة" : "Quick insights",
        }),
        [isArabic],
    );

    const stats = [
        {
            title: t.totalUsers,
            value: "1,284",
            icon: Users,
            color: "from-[#7aa7bb] to-[#6797ab]",
            note: isArabic ? "+12% هذا الشهر" : "+12% this month",
        },
        {
            title: t.totalDoctors,
            value: "48",
            icon: UserCheck,
            color: "from-emerald-500 to-teal-600",
            note: isArabic ? "8 مختصين جدد" : "8 new specialists",
        },
        {
            title: t.appointments,
            value: "326",
            icon: CalendarCheck2,
            color: "from-violet-500 to-indigo-600",
            note: isArabic ? "67 قيد المتابعة" : "67 under follow-up",
        },
        {
            title: t.assessments,
            value: "942",
            icon: BrainCircuit,
            color: "from-amber-500 to-orange-500",
            note: isArabic ? "95 اليوم" : "95 today",
        },
    ];

    const activity = [
        {
            title: isArabic
                ? "تم إنشاء موعد جديد مع أحد المختصين"
                : "A new appointment was created with a specialist",
            time: isArabic ? "منذ 10 دقائق" : "10 minutes ago",
            icon: CalendarCheck2,
        },
        {
            title: isArabic
                ? "تمت إضافة تقييم أولي جديد"
                : "A new initial assessment was added",
            time: isArabic ? "منذ 24 دقيقة" : "24 minutes ago",
            icon: BrainCircuit,
        },
        {
            title: isArabic
                ? "تم تسجيل حالة مزاجية يومية"
                : "A daily mood log was submitted",
            time: isArabic ? "منذ 40 دقيقة" : "40 minutes ago",
            icon: HeartPulse,
        },
    ];

    const quickCards = [
        {
            title: t.activeUsers,
            value: "842",
            icon: Activity,
            status: t.high,
        },
        {
            title: t.upcomingSessions,
            value: "58",
            icon: Clock3,
            status: t.medium,
        },
        {
            title: t.moodTracking,
            value: "76%",
            icon: HeartPulse,
            status: t.stable,
        },
        {
            title: t.aiUsage,
            value: "91%",
            icon: TrendingUp,
            status: t.completed,
        },
    ];

    return (
        <AdminLayout title={t.title} auth={auth}>
            <div className="space-y-6">
                {/* Welcome */}
                <section className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-white via-[#f7fbfd] to-[#edf5f9] p-6 shadow-sm dark:border-slate-800 dark:from-[#111827] dark:via-[#131d2a] dark:to-[#0f172a] sm:p-8">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <span className="inline-flex rounded-full bg-[#7aa7bb]/10 px-3 py-1 text-xs font-extrabold text-[#7aa7bb]">
                                Mind Gate
                            </span>

                            <h2 className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
                                {t.welcome}
                                {auth?.user?.name ? `، ${auth.user.name}` : ""}
                            </h2>

                            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                                {t.summary}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {quickCards.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/80"
                                    >
                                        <div className="mb-3 flex items-center justify-between">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7aa7bb]/10 text-[#7aa7bb]">
                                                <Icon size={18} />
                                            </div>
                                            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                                                {item.status}
                                            </span>
                                        </div>

                                        <p className="text-lg font-extrabold text-slate-900 dark:text-white">
                                            {item.value}
                                        </p>
                                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                            {item.title}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Main Stats */}
                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {stats.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={index}
                                className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 dark:border-slate-800 dark:bg-[#111827]"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                                            {item.title}
                                        </p>
                                        <h3 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white">
                                            {item.value}
                                        </h3>
                                    </div>

                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-md ${item.color}`}
                                    >
                                        <Icon size={20} />
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                        {item.note}
                                    </span>

                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-1 text-xs font-bold text-[#7aa7bb] transition hover:text-[#6797ab]"
                                    >
                                        {t.viewDetails}
                                        <ArrowUpRight size={14} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </section>

                {/* Lower Grid */}
                <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                    {/* Recent Activity */}
                    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                                    {t.recentActivity}
                                </h3>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    {t.insights}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {activity.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/70"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7aa7bb]/10 text-[#7aa7bb]">
                                            <Icon size={18} />
                                        </div>

                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                                {item.title}
                                            </p>
                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                {item.time}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid gap-6">
                        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
                            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                                {t.performance}
                            </h3>
                            <div className="mt-5 space-y-4">
                                <div>
                                    <div className="mb-2 flex items-center justify-between text-sm">
                                        <span className="font-semibold text-slate-600 dark:text-slate-300">
                                            {t.userManagement}
                                        </span>
                                        <span className="font-bold text-[#7aa7bb]">
                                            82%
                                        </span>
                                    </div>
                                    <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-700">
                                        <div className="h-2.5 w-[82%] rounded-full bg-[#7aa7bb]" />
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between text-sm">
                                        <span className="font-semibold text-slate-600 dark:text-slate-300">
                                            {t.appointmentFlow}
                                        </span>
                                        <span className="font-bold text-emerald-500">
                                            68%
                                        </span>
                                    </div>
                                    <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-700">
                                        <div className="h-2.5 w-[68%] rounded-full bg-emerald-500" />
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between text-sm">
                                        <span className="font-semibold text-slate-600 dark:text-slate-300">
                                            {t.assessmentsTitle}
                                        </span>
                                        <span className="font-bold text-violet-500">
                                            91%
                                        </span>
                                    </div>
                                    <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-700">
                                        <div className="h-2.5 w-[91%] rounded-full bg-violet-500" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-[#7aa7bb] to-[#6797ab] p-6 text-white shadow-lg shadow-[#7aa7bb]/25">
                            <p className="text-sm font-semibold text-white/80">
                                {t.todayStats}
                            </p>
                            <h3 className="mt-3 text-3xl font-extrabold">
                                124
                            </h3>
                            <p className="mt-2 text-sm leading-7 text-white/85">
                                {isArabic
                                    ? "تم تسجيل 124 نشاطًا جديدًا داخل المنصة اليوم بين مواعيد، تقييمات، ومتابعة حالة."
                                    : "124 new activities were recorded today across appointments, assessments, and mood tracking."}
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
}
