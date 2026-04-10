import React, { useEffect, useMemo, useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import {
    LayoutDashboard,
    Users,
    Mail,
    Image as ImageIcon,
    Home,
    Sun,
    Moon,
    Menu,
    X,
    LogOut,
    Languages,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const BRAND = {
    primary: "#7aa7bb",
    primaryDark: "#6797ab",
    bgLight: "#f5f8fb",
    bgDark: "#0c1420",
};

export default function AdminLayout({
    title = "Dashboard",
    children,
    auth = null,
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
        if (typeof window === "undefined") return false;
        return localStorage.getItem("admin_sidebar_collapsed") === "true";
    });

    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window === "undefined") return false;
        return localStorage.getItem("darkMode") === "true";
    });

    const [locale, setLocale] = useState(() => {
        if (typeof window === "undefined") return "en";
        return localStorage.getItem("mindgate_locale") || "en";
    });

    useEffect(() => {
        localStorage.setItem("darkMode", darkMode ? "true" : "false");
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    useEffect(() => {
        localStorage.setItem(
            "admin_sidebar_collapsed",
            sidebarCollapsed ? "true" : "false",
        );
    }, [sidebarCollapsed]);

    useEffect(() => {
        localStorage.setItem("mindgate_locale", locale);
        document.documentElement.lang = locale;
        document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    }, [locale]);

    const isArabic = locale === "ar";
    const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "";

    const t = useMemo(
        () => ({
            panel: isArabic ? "لوحة الإدارة" : "Admin Panel",
            dashboard: isArabic ? "لوحة التحكم" : "Dashboard",
            users: isArabic ? "المستخدمون" : "Users",
            messages: isArabic ? "الرسائل" : "Messages",
            hero: isArabic ? "الهيرو" : "Hero Sections",
            home: isArabic ? "الرئيسية" : "Home",
            logout: isArabic ? "تسجيل الخروج" : "Logout",
            lang: isArabic ? "EN" : "AR",
            dark: isArabic ? "داكن" : "Dark",
            light: isArabic ? "فاتح" : "Light",
        }),
        [isArabic],
    );

    const navItems = [
        {
            label: t.dashboard,
            href: route("admin.dashboard"),
            icon: LayoutDashboard,
        },
        {
            label: t.users,
            href: route("admin.users.index"),
            icon: Users,
        },
        {
            label: t.messages,
            href: route("admin.messages"),
            icon: Mail,
        },
        {
            label: t.hero,
            href: route("admin.hero.index"),
            icon: ImageIcon,
        },
    ];

    const doLogout = () => {
        router.post(route("admin.logout"));
    };

    const SidebarLinks = ({ compact = false }) => (
        <div className="space-y-2">
            {navItems.map((item, index) => {
                const Icon = item.icon;
                const pathname =
                    typeof window !== "undefined"
                        ? new URL(item.href, window.location.origin).pathname
                        : "";

                const active = currentPath === pathname;

                return (
                    <Link
                        key={index}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-200 ${
                            compact ? "justify-center" : ""
                        } ${
                            active
                                ? "bg-[#7aa7bb] text-white shadow-lg shadow-[#7aa7bb]/20"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                        }`}
                        title={compact ? item.label : undefined}
                    >
                        <Icon size={18} />
                        {!compact && <span>{item.label}</span>}
                    </Link>
                );
            })}
        </div>
    );

    return (
        <div
            dir={isArabic ? "rtl" : "ltr"}
            className="min-h-screen"
            style={{
                backgroundColor: darkMode ? BRAND.bgDark : BRAND.bgLight,
            }}
        >
            <Head title={`${title} - Mind Gate`} />

            <div className="flex min-h-screen">
                {sidebarOpen && (
                    <button
                        type="button"
                        className="fixed inset-0 z-40 bg-slate-900/45 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                <aside
                    className={`fixed top-0 z-50 h-screen border-e border-slate-200 bg-white/95 shadow-2xl backdrop-blur-xl transition-all duration-300 dark:border-slate-800 dark:bg-[#101826]/95 lg:static lg:z-auto ${
                        sidebarCollapsed ? "w-[92px]" : "w-[280px]"
                    } ${
                        isArabic
                            ? sidebarOpen
                                ? "right-0"
                                : "right-[-320px]"
                            : sidebarOpen
                              ? "left-0"
                              : "left-[-320px]"
                    } lg:translate-x-0`}
                >
                    <div className="flex h-full flex-col">
                        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-5 dark:border-slate-800">
                            <div
                                className={`flex items-center gap-3 ${
                                    sidebarCollapsed
                                        ? "justify-center w-full"
                                        : ""
                                }`}
                            >
                                <img
                                    src="/images/logo.png"
                                    alt="Mind Gate"
                                    className="h-12 w-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                    }}
                                />

                                {!sidebarCollapsed && (
                                    <div>
                                        <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                                            Mind Gate
                                        </h2>
                                        <p className="text-xs font-medium text-[#7aa7bb]">
                                            {t.panel}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <X size={18} />
                                </button>

                                <button
                                    type="button"
                                    className="hidden lg:inline-flex rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                                    onClick={() =>
                                        setSidebarCollapsed((prev) => !prev)
                                    }
                                >
                                    {sidebarCollapsed ? (
                                        <ChevronRight size={18} />
                                    ) : (
                                        <ChevronLeft size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 py-5">
                            <SidebarLinks compact={sidebarCollapsed} />
                        </div>

                        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
                            <Link
                                href={route("welcome")}
                                className={`mb-3 flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 ${
                                    sidebarCollapsed ? "px-0" : ""
                                }`}
                                title={sidebarCollapsed ? t.home : undefined}
                            >
                                <Home size={16} />
                                {!sidebarCollapsed && <span>{t.home}</span>}
                            </Link>

                            <button
                                type="button"
                                onClick={doLogout}
                                className={`flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 ${
                                    sidebarCollapsed ? "px-0" : ""
                                }`}
                                title={sidebarCollapsed ? t.logout : undefined}
                            >
                                <LogOut size={16} />
                                {!sidebarCollapsed && <span>{t.logout}</span>}
                            </button>
                        </div>
                    </div>
                </aside>

                <div className="flex min-h-screen flex-1 flex-col">
                    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-[#101826]/80">
                        <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                            <div className="flex items-center gap-3 min-w-0">
                                <button
                                    type="button"
                                    className="rounded-2xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
                                    onClick={() => setSidebarOpen(true)}
                                >
                                    <Menu size={18} />
                                </button>

                                <div className="min-w-0">
                                    <h1 className="text-xl font-extrabold text-slate-900 dark:text-white truncate">
                                        {title}
                                    </h1>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Mind Gate Admin Experience
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
                                    {t.lang}
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
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
