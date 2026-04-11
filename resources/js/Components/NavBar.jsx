import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Menu,
    X,
    Moon,
    Sun,
    Languages,
    User,
    LayoutDashboard,
    LogIn,
    ChevronDown,
    LogOut,
} from "lucide-react";
import useSitePreferences from "@/hooks/useSitePreferences";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function NavBar() {
    const { props, url } = usePage();
    const { auth = {} } = props;

    const { isDark, isArabic, toggleTheme, toggleLocale } =
        useSitePreferences();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const dropdownRef = useRef(null);

    const user = auth?.user || null;
    const admin = auth?.admin || null;
    const isGuest = !user && !admin;

    const currentName = user?.name || admin?.name || "";
    const currentEmail = user?.email || admin?.email || "";
    const initial = (currentName || "U").charAt(0).toUpperCase();

    const t = useMemo(
        () => ({
            home: isArabic ? "الرئيسية" : "Home",
            about: isArabic ? "من نحن" : "About Us",
            specialists: isArabic ? "المختصون" : "Specialists",
            resources: isArabic ? "الموارد" : "Resources",
            assessment: isArabic ? "التقييم الأولي" : "Quick Assessment",
            contact: isArabic ? "تواصل معنا" : "Contact",
            login: isArabic ? "تسجيل الدخول" : "Login",
            admin: isArabic ? "لوحة الإدارة" : "Admin",
            profile: isArabic ? "الملف الشخصي" : "Profile",
            dashboard: isArabic ? "لوحة التحكم" : "Dashboard",
            logout: isArabic ? "تسجيل الخروج" : "Logout",
            lang: isArabic ? "EN" : "AR",
            theme: isDark
                ? isArabic
                    ? "فاتح"
                    : "Light"
                : isArabic
                  ? "داكن"
                  : "Dark",
        }),
        [isArabic, isDark],
    );

    const navItems = [
        { label: t.home, href: route("home") },
        { label: t.about, href: route("about-us") },
        { label: t.specialists, href: route("specialists.index") },
        { label: t.resources, href: route("resources.index") },
        { label: t.assessment, href: route("assessment.quick.page") },
        { label: t.contact, href: route("ContactPage") },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setMobileOpen(false);
        setProfileOpen(false);
    }, [url]);

    const isActive = (href) => {
        try {
            const target = new URL(href, window.location.origin).pathname;
            return url === target;
        } catch {
            return false;
        }
    };

    const navShell = isDark
        ? "border-white/10 bg-[#081018]/80 text-white"
        : "border-slate-200 bg-white/85 text-slate-900";

    const buttonShell = isDark
        ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100";

    return (
        <header
            className={cn(
                "fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl",
                navShell,
            )}
        >
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
                <Link href={route("home")} className="flex items-center gap-3">
                    <img
                        src="/images/logo.png"
                        alt="Mind Gate"
                        className="h-14 w-auto object-contain"
                    />
                </Link>

                <nav className="hidden lg:flex items-center gap-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "rounded-full px-4 py-2 text-sm font-bold transition",
                                isActive(item.href)
                                    ? "bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] text-white shadow-lg"
                                    : isDark
                                      ? "text-white/75 hover:bg-white/5 hover:text-white"
                                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden lg:flex items-center gap-2">
                    <button
                        type="button"
                        onClick={toggleLocale}
                        className={cn(
                            "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition",
                            buttonShell,
                        )}
                    >
                        <Languages className="h-4 w-4" />
                        {t.lang}
                    </button>

                    <button
                        type="button"
                        onClick={toggleTheme}
                        className={cn(
                            "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition",
                            buttonShell,
                        )}
                    >
                        {isDark ? (
                            <Sun className="h-4 w-4" />
                        ) : (
                            <Moon className="h-4 w-4" />
                        )}
                        {t.theme}
                    </button>

                    {isGuest ? (
                        <>
                            <Link
                                href={route("login")}
                                className={cn(
                                    "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold transition",
                                    buttonShell,
                                )}
                            >
                                <LogIn className="h-4 w-4" />
                                {t.login}
                            </Link>

                            <Link
                                href={route("admin.login")}
                                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] px-5 py-2.5 text-sm font-bold text-white shadow-lg"
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                {t.admin}
                            </Link>
                        </>
                    ) : (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                type="button"
                                onClick={() => setProfileOpen((prev) => !prev)}
                                className={cn(
                                    "inline-flex items-center gap-2 rounded-full border px-3 py-2 transition",
                                    buttonShell,
                                )}
                            >
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] text-sm font-bold text-white">
                                    {initial}
                                </div>
                                <ChevronDown className="h-4 w-4" />
                            </button>

                            {profileOpen && (
                                <div
                                    className={cn(
                                        "absolute end-0 mt-3 w-72 rounded-3xl border shadow-2xl overflow-hidden",
                                        isDark
                                            ? "border-white/10 bg-[#0b1620] text-white"
                                            : "border-slate-200 bg-white text-slate-900",
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "px-5 py-4 border-b",
                                            isDark
                                                ? "border-white/10"
                                                : "border-slate-200",
                                        )}
                                    >
                                        <p className="font-bold text-base">
                                            {currentName}
                                        </p>
                                        <p
                                            className={cn(
                                                "text-sm mt-1",
                                                isDark
                                                    ? "text-white/60"
                                                    : "text-slate-500",
                                            )}
                                        >
                                            {currentEmail}
                                        </p>
                                    </div>

                                    <div className="p-2">
                                        {admin ? (
                                            <>
                                                <Link
                                                    href={route(
                                                        "admin.dashboard",
                                                    )}
                                                    className={cn(
                                                        "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                                                        isDark
                                                            ? "hover:bg-white/5"
                                                            : "hover:bg-slate-100",
                                                    )}
                                                >
                                                    <LayoutDashboard className="h-4 w-4" />
                                                    {t.dashboard}
                                                </Link>

                                                <Link
                                                    href={route("admin.logout")}
                                                    method="post"
                                                    as="button"
                                                    className={cn(
                                                        "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                                                        isDark
                                                            ? "hover:bg-white/5"
                                                            : "hover:bg-slate-100",
                                                    )}
                                                >
                                                    <LogOut className="h-4 w-4" />
                                                    {t.logout}
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    href={route("UserProfile")}
                                                    className={cn(
                                                        "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                                                        isDark
                                                            ? "hover:bg-white/5"
                                                            : "hover:bg-slate-100",
                                                    )}
                                                >
                                                    <User className="h-4 w-4" />
                                                    {t.profile}
                                                </Link>

                                                <Link
                                                    href={route("logout")}
                                                    method="post"
                                                    as="button"
                                                    className={cn(
                                                        "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                                                        isDark
                                                            ? "hover:bg-white/5"
                                                            : "hover:bg-slate-100",
                                                    )}
                                                >
                                                    <LogOut className="h-4 w-4" />
                                                    {t.logout}
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => setMobileOpen(true)}
                    className={cn(
                        "lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border",
                        buttonShell,
                    )}
                >
                    <Menu className="h-5 w-5" />
                </button>
            </div>

            {mobileOpen && (
                <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden">
                    <div
                        className={cn(
                            "absolute top-0 h-full w-[86%] max-w-sm shadow-2xl",
                            isArabic ? "right-0" : "left-0",
                            isDark
                                ? "bg-[#081018] text-white"
                                : "bg-white text-slate-900",
                        )}
                    >
                        <div
                            className={cn(
                                "flex items-center justify-between p-5 border-b",
                                isDark ? "border-white/10" : "border-slate-200",
                            )}
                        >
                            <img
                                src="/images/logo.png"
                                alt="Mind Gate"
                                className="h-12 w-auto object-contain"
                            />
                            <button
                                type="button"
                                onClick={() => setMobileOpen(false)}
                                className="rounded-xl p-2"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-3 p-5">
                            {!isGuest && (
                                <div
                                    className={cn(
                                        "rounded-2xl border p-4",
                                        isDark
                                            ? "border-white/10 bg-white/5"
                                            : "border-slate-200 bg-slate-50",
                                    )}
                                >
                                    <p className="font-bold">{currentName}</p>
                                    <p
                                        className={cn(
                                            "text-sm mt-1",
                                            isDark
                                                ? "text-white/60"
                                                : "text-slate-500",
                                        )}
                                    >
                                        {currentEmail}
                                    </p>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={toggleLocale}
                                    className={cn(
                                        "rounded-2xl border px-4 py-3 text-sm font-bold",
                                        buttonShell,
                                    )}
                                >
                                    {t.lang}
                                </button>

                                <button
                                    type="button"
                                    onClick={toggleTheme}
                                    className={cn(
                                        "rounded-2xl border px-4 py-3 text-sm font-bold",
                                        buttonShell,
                                    )}
                                >
                                    {t.theme}
                                </button>
                            </div>

                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={cn(
                                        "block rounded-2xl px-4 py-3 text-sm font-bold transition",
                                        isActive(item.href)
                                            ? "bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] text-white"
                                            : isDark
                                              ? "bg-white/5 text-white"
                                              : "bg-slate-50 text-slate-800",
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}

                            {isGuest ? (
                                <>
                                    <Link
                                        href={route("login")}
                                        onClick={() => setMobileOpen(false)}
                                        className={cn(
                                            "block rounded-2xl border px-4 py-3 text-center text-sm font-bold",
                                            buttonShell,
                                        )}
                                    >
                                        {t.login}
                                    </Link>

                                    <Link
                                        href={route("admin.login")}
                                        onClick={() => setMobileOpen(false)}
                                        className="block rounded-2xl bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] px-4 py-3 text-center text-sm font-bold text-white"
                                    >
                                        {t.admin}
                                    </Link>
                                </>
                            ) : admin ? (
                                <>
                                    <Link
                                        href={route("admin.dashboard")}
                                        onClick={() => setMobileOpen(false)}
                                        className="block rounded-2xl bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] px-4 py-3 text-center text-sm font-bold text-white"
                                    >
                                        {t.dashboard}
                                    </Link>

                                    <Link
                                        href={route("admin.logout")}
                                        method="post"
                                        as="button"
                                        onClick={() => setMobileOpen(false)}
                                        className={cn(
                                            "block w-full rounded-2xl border px-4 py-3 text-center text-sm font-bold",
                                            buttonShell,
                                        )}
                                    >
                                        {t.logout}
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route("UserProfile")}
                                        onClick={() => setMobileOpen(false)}
                                        className="block rounded-2xl bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] px-4 py-3 text-center text-sm font-bold text-white"
                                    >
                                        {t.profile}
                                    </Link>

                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        onClick={() => setMobileOpen(false)}
                                        className={cn(
                                            "block w-full rounded-2xl border px-4 py-3 text-center text-sm font-bold",
                                            buttonShell,
                                        )}
                                    >
                                        {t.logout}
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
