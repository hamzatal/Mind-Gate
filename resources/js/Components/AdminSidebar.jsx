import React, { useEffect, useMemo, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    Users,
    MessageSquare,
    Image,
    UserCircle2,
    LogOut,
    Menu,
    X,
    ShieldCheck,
    ChevronRight,
    Home,
} from "lucide-react";
import useSitePreferences from "@/hooks/useSitePreferences";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function AdminSidebar() {
    const { props, url } = usePage();
    const { isDark, isArabic } = useSitePreferences();

    const admin = props?.admin ||
        props?.auth?.admin ||
        props?.auth?.user || {
            name: "Admin",
            email: "admin@mindgate.com",
        };

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const t = useMemo(
        () => ({
            brand: "Mind Gate",
            panel: isArabic ? "لوحة الإدارة" : "Admin Panel",
            dashboard: isArabic ? "لوحة التحكم" : "Dashboard",
            users: isArabic ? "المستخدمون" : "Users",
            messages: isArabic ? "الرسائل" : "Messages",
            hero: isArabic ? "الهيرو سكشن" : "Hero Sections",
            profile: isArabic ? "الملف الشخصي" : "Profile",
            website: isArabic ? "الموقع الرئيسي" : "Main Website",
            logout: isArabic ? "تسجيل الخروج" : "Logout",
            open: isArabic ? "فتح القائمة" : "Open menu",
            close: isArabic ? "إغلاق القائمة" : "Close menu",
        }),
        [isArabic],
    );

    useEffect(() => {
        setSidebarOpen(false);
    }, [url]);

    const navItems = [
        {
            key: "dashboard",
            label: t.dashboard,
            href: route("admin.dashboard"),
            icon: LayoutDashboard,
            active: url === "/admin/dashboard",
        },
        {
            key: "users",
            label: t.users,
            href: route("admin.users.index"),
            icon: Users,
            active: url.startsWith("/admin/users"),
        },
        {
            key: "messages",
            label: t.messages,
            href: route("admin.messages"),
            icon: MessageSquare,
            active: url.startsWith("/admin/messages"),
        },
        {
            key: "hero",
            label: t.hero,
            href: route("admin.hero.index"),
            icon: Image,
            active: url.startsWith("/admin/hero"),
        },
        {
            key: "profile",
            label: t.profile,
            href: route("admin.profile"),
            icon: UserCircle2,
            active: url.startsWith("/admin/profile"),
        },
    ];

    const sidebarShell = isDark
        ? "bg-[#0b1620] border-white/10 text-white"
        : "bg-white border-slate-200 text-slate-900";

    const softText = isDark ? "text-white/65" : "text-slate-500";
    const hoverBg = isDark ? "hover:bg-white/5" : "hover:bg-slate-100";

    const adminName = admin?.name || "Admin";
    const adminEmail = admin?.email || "admin@mindgate.com";
    const adminInitial = adminName.charAt(0).toUpperCase() || "A";

    return (
        <>
            <button
                type="button"
                aria-label={t.open}
                onClick={() => setSidebarOpen(true)}
                className={cn(
                    "fixed top-5 left-5 z-50 inline-flex h-11 w-11 items-center justify-center rounded-2xl border shadow-lg lg:hidden",
                    isDark
                        ? "border-white/10 bg-[#0b1620] text-white"
                        : "border-slate-200 bg-white text-slate-900",
                )}
            >
                <Menu className="h-5 w-5" />
            </button>

            {sidebarOpen && (
                <button
                    type="button"
                    aria-label={t.close}
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-72 border-r shadow-2xl transition-transform duration-300",
                    sidebarShell,
                    sidebarOpen ? "translate-x-0" : "-translate-x-full",
                    "lg:translate-x-0",
                )}
            >
                <div className="flex h-full flex-col">
                    <div
                        className={cn(
                            "flex items-center justify-between border-b px-5 py-5",
                            isDark ? "border-white/10" : "border-slate-200",
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7aa7bb] to-[#6797ab] text-white shadow-lg">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="text-lg font-black">
                                    {t.brand}
                                </h2>
                                <p
                                    className={cn(
                                        "text-xs font-medium",
                                        softText,
                                    )}
                                >
                                    {t.panel}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setSidebarOpen(false)}
                            className={cn("rounded-xl p-2 lg:hidden", hoverBg)}
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div
                        className={cn(
                            "border-b px-5 py-5",
                            isDark ? "border-white/10" : "border-slate-200",
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] text-sm font-bold text-white shadow-md">
                                {adminInitial}
                            </div>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-bold">
                                    {adminName}
                                </p>
                                <p className={cn("truncate text-xs", softText)}>
                                    {adminEmail}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 py-5">
                        <nav className="space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.key}
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={cn(
                                            "group flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-all",
                                            item.active
                                                ? "bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] text-white shadow-lg"
                                                : cn(
                                                      hoverBg,
                                                      isDark
                                                          ? "text-white/80 hover:text-white"
                                                          : "text-slate-700 hover:text-slate-900",
                                                  ),
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon className="h-5 w-5" />
                                            <span>{item.label}</span>
                                        </div>

                                        <ChevronRight
                                            className={cn(
                                                "h-4 w-4 transition-transform",
                                                item.active
                                                    ? "opacity-100"
                                                    : "opacity-0 group-hover:opacity-100",
                                            )}
                                        />
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div
                        className={cn(
                            "space-y-3 border-t p-4",
                            isDark ? "border-white/10" : "border-slate-200",
                        )}
                    >
                        <Link
                            href={route("home")}
                            className={cn(
                                "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                                isDark
                                    ? "bg-white/5 text-white hover:bg-white/10"
                                    : "bg-slate-100 text-slate-800 hover:bg-slate-200",
                            )}
                        >
                            <Home className="h-5 w-5" />
                            <span>{t.website}</span>
                        </Link>

                        <Link
                            href={route("admin.logout")}
                            method="post"
                            as="button"
                            className={cn(
                                "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                                isDark
                                    ? "bg-red-500/10 text-red-300 hover:bg-red-500/15"
                                    : "bg-red-50 text-red-600 hover:bg-red-100",
                            )}
                        >
                            <LogOut className="h-5 w-5" />
                            <span>{t.logout}</span>
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
}
