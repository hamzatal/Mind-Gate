import React, { useMemo } from "react";
import {
    Users,
    Mail,
    Image as ImageIcon,
    TrendingUp,
    CircleDot,
    Sparkles,
    Activity,
    Clock3,
} from "lucide-react";
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

function StatCard({ title, value, note, icon: Icon, gradient }) {
    return (
        <div className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-[#111827]">
            <div
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-90"
                style={{ backgroundImage: gradient }}
            />
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                        {title}
                    </p>
                    <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        {value}
                    </h3>
                    <p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                        {note}
                    </p>
                </div>

                <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg"
                    style={{ backgroundImage: gradient }}
                >
                    <Icon size={20} />
                </div>
            </div>
        </div>
    );
}

function SmoothChart({
    title,
    subtitle,
    data = [],
    stroke = "#7aa7bb",
    fill = "rgba(122,167,187,0.16)",
}) {
    const width = 480;
    const height = 220;
    const padX = 22;
    const padY = 22;
    const chartW = width - padX * 2;
    const chartH = height - padY * 2;

    const values = data.map((d) => Number(d.value || 0));
    const max = Math.max(...values, 1);

    const points = data.map((item, index) => {
        const x =
            padX +
            (data.length === 1
                ? chartW / 2
                : (index * chartW) / (data.length - 1));
        const y = padY + chartH - (Number(item.value || 0) / max) * chartH;
        return { ...item, x, y };
    });

    const linePath = points
        .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
        .join(" ");

    const areaPath =
        points.length > 0
            ? `M ${points[0].x} ${padY + chartH} ${points
                  .map((p) => `L ${p.x} ${p.y}`)
                  .join(
                      " ",
                  )} L ${points[points.length - 1].x} ${padY + chartH} Z`
            : "";

    return (
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
            <div className="mb-5">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {title}
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {subtitle}
                </p>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-56">
                    <defs>
                        <linearGradient
                            id={`area-${title.replace(/\s+/g, "")}`}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor={stroke}
                                stopOpacity="0.28"
                            />
                            <stop
                                offset="100%"
                                stopColor={stroke}
                                stopOpacity="0.02"
                            />
                        </linearGradient>
                    </defs>

                    {[0, 1, 2, 3].map((step) => {
                        const y = padY + (chartH / 3) * step;
                        return (
                            <line
                                key={step}
                                x1={padX}
                                x2={width - padX}
                                y1={y}
                                y2={y}
                                stroke="currentColor"
                                className="text-slate-200 dark:text-slate-800"
                                strokeWidth="1"
                            />
                        );
                    })}

                    {areaPath && (
                        <path
                            d={areaPath}
                            fill={`url(#area-${title.replace(/\s+/g, "")})`}
                        />
                    )}

                    {linePath && (
                        <path
                            d={linePath}
                            fill="none"
                            stroke={stroke}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    )}

                    {points.map((p, idx) => (
                        <g key={idx}>
                            <circle cx={p.x} cy={p.y} r="4.5" fill={stroke} />
                            <text
                                x={p.x}
                                y={height - 6}
                                textAnchor="middle"
                                className="fill-slate-500 dark:fill-slate-400"
                                fontSize="11"
                                fontWeight="600"
                            >
                                {p.label}
                            </text>
                        </g>
                    ))}
                </svg>
            </div>
        </div>
    );
}

function HeroStatusCard({ data = [], locale = "en" }) {
    const isArabic = locale === "ar";
    const active = Number(data.find((d) => d.label === "Active")?.value || 0);
    const inactive = Number(
        data.find((d) => d.label === "Inactive")?.value || 0,
    );
    const total = active + inactive || 1;
    const activePercent = Math.round((active / total) * 100);
    const inactivePercent = Math.round((inactive / total) * 100);

    return (
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
            <div className="mb-5">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {isArabic ? "حالة أقسام الهيرو" : "Hero section status"}
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {isArabic
                        ? "توزيع الأقسام المفعّلة وغير المفعّلة."
                        : "Distribution of active and inactive hero sections."}
                </p>
            </div>

            <div className="space-y-5">
                <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                    <div className="mb-2 flex items-center justify-between text-sm font-semibold">
                        <span className="text-slate-700 dark:text-slate-200">
                            {isArabic ? "النشطة" : "Active"}
                        </span>
                        <span className="text-emerald-600 dark:text-emerald-400">
                            {active} · {activePercent}%
                        </span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                            style={{ width: `${activePercent}%` }}
                        />
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                    <div className="mb-2 flex items-center justify-between text-sm font-semibold">
                        <span className="text-slate-700 dark:text-slate-200">
                            {isArabic ? "غير النشطة" : "Inactive"}
                        </span>
                        <span className="text-amber-600 dark:text-amber-400">
                            {inactive} · {inactivePercent}%
                        </span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                            style={{ width: `${inactivePercent}%` }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/60">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {isArabic ? "الإجمالي" : "Total"}
                        </p>
                        <p className="mt-1 text-xl font-extrabold text-slate-900 dark:text-white">
                            {active + inactive}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/60">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {isArabic ? "المفعّل الآن" : "Currently active"}
                        </p>
                        <p className="mt-1 text-xl font-extrabold text-slate-900 dark:text-white">
                            {active}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MiniList({ title, icon: Icon, items = [], renderItem, emptyText }) {
    return (
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
            <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#7aa7bb]/10 text-[#7aa7bb]">
                    <Icon size={18} />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {title}
                </h3>
            </div>

            <div className="space-y-3">
                {items.length > 0 ? (
                    items.map(renderItem)
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        {emptyText}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Dashboard({
    auth,
    stats = {},
    latestUsers = [],
    latestMessages = [],
    latestHeroSections = [],
    usersChart = [],
    messagesChart = [],
    heroChart = [],
    flash = {},
}) {
    const locale =
        typeof window !== "undefined"
            ? localStorage.getItem("mindgate_locale") || "en"
            : "en";

    const isArabic = locale === "ar";

    const t = useMemo(
        () => ({
            title: isArabic ? "لوحة التحكم" : "Dashboard",
            summary: isArabic
                ? "نظرة شاملة ومرتبة على أهم مؤشرات منصة Mind Gate."
                : "A clearer and more organized overview of Mind Gate platform metrics.",
            users: isArabic ? "المستخدمون" : "Users",
            messages: isArabic ? "الرسائل" : "Messages",
            hero: isArabic ? "الهيرو" : "Hero sections",
            active: isArabic ? "النشطون" : "Active",
            inactive: isArabic ? "المعطلون" : "Inactive",
            unread: isArabic ? "غير المقروءة" : "Unread",
            activeHero: isArabic ? "النشطة" : "Active",
            chartUsers: isArabic ? "تسجيل المستخدمين" : "User signups",
            chartUsersSub: isArabic
                ? "خلال آخر 7 أيام"
                : "during the last 7 days",
            chartMessages: isArabic ? "رسائل التواصل" : "Contact messages",
            chartMessagesSub: isArabic
                ? "خلال آخر 7 أيام"
                : "during the last 7 days",
            recentUsers: isArabic ? "آخر المستخدمين" : "Latest users",
            recentMessages: isArabic ? "آخر الرسائل" : "Latest messages",
            recentHero: isArabic ? "آخر الهيرو" : "Latest hero sections",
            noUsers: isArabic ? "لا يوجد مستخدمون." : "No users available.",
            noMessages: isArabic ? "لا توجد رسائل." : "No messages available.",
            noHero: isArabic
                ? "لا توجد أقسام هيرو."
                : "No hero sections available.",
        }),
        [isArabic],
    );

    const cards = [
        {
            title: t.users,
            value: stats.users ?? 0,
            note: `${t.active}: ${stats.active_users ?? 0} • ${t.inactive}: ${stats.inactive_users ?? 0}`,
            icon: Users,
            gradient: "linear-gradient(135deg, #7aa7bb 0%, #6797ab 100%)",
        },
        {
            title: t.messages,
            value: stats.messages ?? 0,
            note: `${t.unread}: ${stats.unread_messages ?? 0}`,
            icon: Mail,
            gradient: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
        },
        {
            title: t.hero,
            value: stats.hero_sections ?? 0,
            note: `${t.activeHero}: ${stats.active_hero_sections ?? 0}`,
            icon: ImageIcon,
            gradient: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
        },
        {
            title: isArabic ? "الحالة العامة" : "System pulse",
            value:
                (stats.users ?? 0) +
                (stats.messages ?? 0) +
                (stats.hero_sections ?? 0),
            note: isArabic
                ? "إجمالي العناصر المرتبطة باللوحة"
                : "Total tracked dashboard entities",
            icon: Sparkles,
            gradient: "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
        },
    ];

    return (
        <AdminLayout title={t.title} auth={auth}>
            <FlashBanner flash={flash} />

            <div className="space-y-6">
                <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
                    <div className="relative px-6 py-7 sm:px-8 sm:py-8">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(122,167,187,0.14),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.10),transparent_28%)]" />
                        <div className="relative flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                            <div className="max-w-3xl">
                                <div className="inline-flex items-center gap-2 rounded-full bg-[#7aa7bb]/10 px-3 py-1 text-xs font-extrabold text-[#7aa7bb]">
                                    <CircleDot size={13} />
                                    Mind Gate Admin
                                </div>

                                <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                                    {isArabic
                                        ? "لوحة حديثة وواضحة لإدارة المنصة"
                                        : "A cleaner and more focused admin dashboard"}
                                </h2>

                                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                                    {t.summary}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                <div className="rounded-2xl border border-slate-100 bg-slate-50/90 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/60">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {t.users}
                                    </p>
                                    <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                                        {stats.users ?? 0}
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-slate-100 bg-slate-50/90 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/60">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {t.active}
                                    </p>
                                    <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                                        {stats.active_users ?? 0}
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-slate-100 bg-slate-50/90 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/60">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {t.messages}
                                    </p>
                                    <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                                        {stats.messages ?? 0}
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-slate-100 bg-slate-50/90 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/60">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {t.hero}
                                    </p>
                                    <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                                        {stats.hero_sections ?? 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {cards.map((item, index) => (
                        <StatCard key={index} {...item} />
                    ))}
                </section>

                <section className="grid gap-6 xl:grid-cols-[1.2fr_1.2fr_0.8fr]">
                    <SmoothChart
                        title={t.chartUsers}
                        subtitle={t.chartUsersSub}
                        data={usersChart}
                        stroke="#7aa7bb"
                    />
                    <SmoothChart
                        title={t.chartMessages}
                        subtitle={t.chartMessagesSub}
                        data={messagesChart}
                        stroke="#f59e0b"
                    />
                    <HeroStatusCard data={heroChart} locale={locale} />
                </section>

            </div>
        </AdminLayout>
    );
}
