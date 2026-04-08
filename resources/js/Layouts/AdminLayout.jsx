import React, { useEffect, useMemo, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import {
    LayoutDashboard,
    Users,
    CalendarCheck2,
    BrainCircuit,
    LineChart,
    ClipboardList,
    Moon,
    Sun,
    Languages,
    LogOut,
    Menu,
    X,
} from "lucide-react";

export default function AdminLayout({
    title = "Dashboard",
    children,
    auth = null,
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true",
    );
    const [locale, setLocale] = useState(
        localStorage.getItem("mindgate_locale") || "en",
    );

    useEffect(() => {
        localStorage.setItem("darkMode", darkMode ? "true" : "false");

        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    useEffect(() => {
        localStorage.setItem("mindgate_locale", locale);
        document.documentElement.lang = locale;
        document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    }, [locale]);

    const isArabic = locale === "ar";

    const t = useMemo(
        () => ({
            dashboard: isArabic ? "لوحة التحكم" : "Dashboard",
            overview: isArabic ? "نظرة عامة" : "Overview",
            users: isArabic ? "المستخدمون" : "Users",
            appointments: isArabic ? "المواعيد" : "Appointments",
            assessments: isArabic ? "التقييمات" : "Assessments",
            analytics: isArabic ? "التحليلات" : "Analytics",
            reports: isArabic ? "التقارير" : "Reports",
            logout: isArabic ? "تسجيل الخروج" : "Logout",
            welcome: isArabic ? "مرحباً" : "Welcome",
            adminPanel: isArabic ? "لوحة الإدارة" : "Admin Panel",
            home: isArabic ? "الرئيسية" : "Home",
            dark: isArabic ? "داكن" : "Dark",
            light: isArabic ? "فاتح" : "Light",
        }),
        [isArabic],
    );

    const navItems = [
        {
            label: t.overview,
            icon: LayoutDashboard,
            href: route("admin.dashboard"),
            active: true,
        },
        {
            label: t.users,
            icon: Users,
            href: "#",
            active: false,
        },
        {
            label: t.appointments,
            icon: CalendarCheck2,
            href: "#",
            active: false,
        },
        {
            label: t.assessments,
            icon: BrainCircuit,
            href: "#",
            active: false,
        },
        {
            label: t.analytics,
            icon: LineChart,
            href: "#",
            active: false,
        },
        {
            label: t.reports,
            icon: ClipboardList,
            href: "#",
            active: false,
        },
    ];

    return (
        <div
            dir={isArabic ? "rtl" : "ltr"}
            className="min-h-screen bg-[#f5f8fb] text-slate-800 dark:bg-[#0f1720] dark:text-slate-100"
        >
            <Head title={`${title} - Mind Gate`} />

            <div className="flex min-h-screen">
                {/* Sidebar Overlay Mobile */}
                {sidebarOpen && (
                    <button
                        type="button"
                        aria-label="close sidebar"
                        className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px] lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={`fixed top-0 z-50 h-screen w-[280px] border-slate-200/80 bg-white/95 shadow-2xl backdrop-blur-xl transition-all duration-300 dark:border-slate-800 dark:bg-[#111827]/95 lg:static lg:z-auto lg:translate-x-0 lg:border-l ${
                        isArabic
                            ? sidebarOpen
                                ? "right-0"
                                : "right-[-320px]"
                            : sidebarOpen
                              ? "left-0"
                              : "left-[-320px]"
                    }`}
                >
                    <div className="flex h-full flex-col">
                        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 dark:border-slate-800">
                            <div>
                                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                                    Mind Gate
                                </h2>
                                <p className="text-xs font-medium text-[#7aa7bb]">
                                    {t.adminPanel}
                                </p>
                            </div>

                            <button
                                type="button"
                                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 py-5">
                            <nav className="space-y-2">
                                {navItems.map((item, index) => {
                                    const Icon = item.icon;

                                    return (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                                                item.active
                                                    ? "bg-[#7aa7bb] text-white shadow-lg shadow-[#7aa7bb]/30"
                                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                                            }`}
                                        >
                                            <Icon size={18} />
                                            <span>{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                            >
                                <LogOut size={16} />
                                {t.logout}
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* Main */}
                <div className="flex min-h-screen flex-1 flex-col">
                    {/* Topbar */}
                    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-[#111827]/80">
                        <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    className="rounded-2xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
                                    onClick={() => setSidebarOpen(true)}
                                >
                                    <Menu size={18} />
                                </button>

                                <div>
                                    <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
                                        {title}
                                    </h1>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {t.dashboard}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setLocale(isArabic ? "en" : "ar")
                                    }
                                    className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 sm:text-sm"
                                >
                                    <Languages size={15} />
                                    {isArabic ? "EN" : "AR"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setDarkMode((prev) => !prev)}
                                    className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 sm:text-sm"
                                >
                                    {darkMode ? (
                                        <>
                                            <Sun size={15} />
                                            {t.light}
                                        </>
                                    ) : (
                                        <>
                                            <Moon size={15} />
                                            {t.dark}
                                        </>
                                    )}
                                </button>

                                <Link
                                    href="/"
                                    className="rounded-2xl bg-[#7aa7bb] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#7aa7bb]/25 transition hover:bg-[#6797ab] sm:text-sm"
                                >
                                    {t.home}
                                </Link>
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
