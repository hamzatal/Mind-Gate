import React, { useMemo } from "react";
import { usePage } from "@inertiajs/react";
import { Moon, Sun, Languages } from "lucide-react";
import AdminSidebar from "@/Components/AdminSidebar";
import useSitePreferences from "@/hooks/useSitePreferences";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function AdminLayout({
    title,
    subtitle,
    children,
    actions = null,
}) {
    const { props } = usePage();
    const { isDark, isArabic, toggleTheme, toggleLocale } =
        useSitePreferences();

    const admin = props?.admin ||
        props?.auth?.admin ||
        props?.auth?.user || {
            name: "Admin",
            email: "admin@mindgate.com",
        };

    const t = useMemo(
        () => ({
            dark: isArabic ? "داكن" : "Dark",
            light: isArabic ? "فاتح" : "Light",
            lang: isArabic ? "EN" : "AR",
            welcome: isArabic ? "مرحبًا" : "Welcome",
        }),
        [isArabic],
    );

    return (
        <div
            className={cn(
                "min-h-screen transition-colors",
                isDark
                    ? "bg-[#081018] text-white"
                    : "bg-[#f6f9fc] text-slate-900",
            )}
        >
            <AdminSidebar />

            <div className="lg:pl-72">
                <header
                    className={cn(
                        "sticky top-0 z-30 border-b backdrop-blur-xl",
                        isDark
                            ? "border-white/10 bg-[#081018]/80"
                            : "border-slate-200 bg-white/80",
                    )}
                >
                    <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
                        <div>
                            <p
                                className={cn(
                                    "text-sm font-medium",
                                    isDark ? "text-white/55" : "text-slate-500",
                                )}
                            >
                                {t.welcome}, {admin?.name || "Admin"}
                            </p>
                            <h1 className="mt-1 text-2xl font-black">
                                {title}
                            </h1>
                            {subtitle ? (
                                <p
                                    className={cn(
                                        "mt-2 text-sm",
                                        isDark
                                            ? "text-white/65"
                                            : "text-slate-600",
                                    )}
                                >
                                    {subtitle}
                                </p>
                            ) : null}
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            {actions}

                            <button
                                type="button"
                                onClick={toggleLocale}
                                className={cn(
                                    "inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition",
                                    isDark
                                        ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
                                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100",
                                )}
                            >
                                <Languages className="h-4 w-4" />
                                {t.lang}
                            </button>

                            <button
                                type="button"
                                onClick={toggleTheme}
                                className={cn(
                                    "inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition",
                                    isDark
                                        ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
                                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100",
                                )}
                            >
                                {isDark ? (
                                    <>
                                        <Sun className="h-4 w-4" />
                                        {t.light}
                                    </>
                                ) : (
                                    <>
                                        <Moon className="h-4 w-4" />
                                        {t.dark}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </header>

                <main className="px-6 py-6 lg:px-8">{children}</main>
            </div>
        </div>
    );
}
