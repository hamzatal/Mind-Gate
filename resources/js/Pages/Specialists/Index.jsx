import React, { useMemo, useState, useEffect } from "react";
import { Head, Link, router } from "@inertiajs/react";
import {
    Search,
    Stethoscope,
    MapPin,
    Languages,
    ArrowRight,
} from "lucide-react";
import NavV2 from "@/Components/NavBar";
import FooterV2 from "@/Components/Footer";
import useSitePreferences from "@/hooks/useSitePreferences";

function GlassCard({ children, isDark, className = "" }) {
    return (
        <div
            className={`rounded-[30px] border shadow-xl ${
                isDark
                    ? "border-white/10 bg-white/5"
                    : "border-slate-200 bg-white/85"
            } ${className}`}
        >
            {children}
        </div>
    );
}

export default function SpecialistsIndex({ specialists, filters }) {
    const { isDark, isArabic } = useSitePreferences();
    const [search, setSearch] = useState(filters?.search || "");
    const [mode, setMode] = useState(filters?.mode || "");

    const t = useMemo(
        () => ({
            title: isArabic
                ? "المختصون - Mind Gate"
                : "Specialists - Mind Gate",
            heading: isArabic ? "المختصون" : "Specialists",
            subtitle: isArabic
                ? "ابحث عن المختص الأنسب حسب التخصص ونوع الجلسة."
                : "Find the right specialist by specialization and session mode.",
            search: isArabic
                ? "ابحث عن اسم أو تخصص..."
                : "Search by name or specialization...",
            all: isArabic ? "كل الأنماط" : "All modes",
            online: isArabic ? "أونلاين" : "Online",
            inPerson: isArabic ? "حضوري" : "In-person",
            both: isArabic ? "الاثنان" : "Both",
            noItems: isArabic
                ? "لا يوجد مختصون مطابقون."
                : "No matching specialists found.",
            showResources: isArabic ? "استكشف الموارد" : "Explore resources",
        }),
        [isArabic],
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                route("specialists.index"),
                { search, mode },
                { preserveState: true, preserveScroll: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(timer);
    }, [search, mode]);

    const pageBg = isDark
        ? "bg-[#081018] text-white"
        : "bg-[#f7fafc] text-slate-900";
    const muted = isDark ? "text-white/70" : "text-slate-600";

    return (
        <div
            dir={isArabic ? "rtl" : "ltr"}
            className={`min-h-screen ${pageBg}`}
        >
            <Head title={t.title} />
            <NavV2 />

            <main className="pt-28">
                <section className="px-6 md:px-12 lg:px-16 pb-14">
                    <div className="mx-auto max-w-7xl">
                        <GlassCard isDark={isDark} className="p-8">
                            <h1 className="text-4xl md:text-6xl font-black">
                                {t.heading}
                            </h1>
                            <p className={`mt-4 text-lg leading-8 ${muted}`}>
                                {t.subtitle}
                            </p>

                            <div className="mt-8 grid gap-4 md:grid-cols-[1fr_220px]">
                                <div className="relative">
                                    <Search
                                        className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 ${isArabic ? "right-4" : "left-4"} ${muted}`}
                                    />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        placeholder={t.search}
                                        className={`w-full rounded-2xl border px-12 py-4 text-sm outline-none ${
                                            isDark
                                                ? "border-white/10 bg-white/5 text-white"
                                                : "border-slate-200 bg-white"
                                        }`}
                                    />
                                </div>

                                <select
                                    value={mode}
                                    onChange={(e) => setMode(e.target.value)}
                                    className={`rounded-2xl border px-4 py-4 text-sm outline-none ${
                                        isDark
                                            ? "border-white/10 bg-white/5 text-white"
                                            : "border-slate-200 bg-white"
                                    }`}
                                >
                                    <option value="">{t.all}</option>
                                    <option value="online">{t.online}</option>
                                    <option value="in_person">
                                        {t.inPerson}
                                    </option>
                                    <option value="both">{t.both}</option>
                                </select>
                            </div>
                        </GlassCard>
                    </div>
                </section>

                <section className="px-6 md:px-12 lg:px-16 pb-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {specialists?.data?.length ? (
                                specialists.data.map((item) => (
                                    <GlassCard
                                        key={item.id}
                                        isDark={isDark}
                                        className="p-6"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div
                                                className={`h-16 w-16 overflow-hidden rounded-2xl ${isDark ? "bg-white/5" : "bg-slate-100"}`}
                                            >
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.full_name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center">
                                                        <Stethoscope className="h-7 w-7 text-[#7aa7bb]" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h3 className="truncate text-xl font-extrabold">
                                                    {item.full_name}
                                                </h3>
                                                <p className="mt-1 text-sm font-semibold text-[#7aa7bb]">
                                                    {item.job_title ||
                                                        item.specialization}
                                                </p>
                                                <p
                                                    className={`mt-3 text-sm leading-8 ${muted}`}
                                                >
                                                    {item.bio ||
                                                        item.specialization}
                                                </p>

                                                <div
                                                    className={`mt-4 space-y-2 text-xs ${muted}`}
                                                >
                                                    {item.city ? (
                                                        <div className="flex items-center gap-2">
                                                            <MapPin className="h-4 w-4" />
                                                            {item.city}
                                                        </div>
                                                    ) : null}

                                                    {item.languages ? (
                                                        <div className="flex items-center gap-2">
                                                            <Languages className="h-4 w-4" />
                                                            {item.languages}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    </GlassCard>
                                ))
                            ) : (
                                <GlassCard
                                    isDark={isDark}
                                    className="col-span-full p-8 text-center"
                                >
                                    <p className={muted}>{t.noItems}</p>
                                    <Link
                                        href={route("resources.index")}
                                        className="mt-5 inline-flex items-center gap-2 font-bold text-[#7aa7bb]"
                                    >
                                        {t.showResources}
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </GlassCard>
                            )}
                        </div>

                        {specialists?.links?.length > 3 && (
                            <div className="mt-8 flex flex-wrap justify-center gap-2">
                                {specialists.links.map((link, index) => (
                                    <button
                                        key={index}
                                        disabled={!link.url}
                                        onClick={() =>
                                            link.url && router.visit(link.url)
                                        }
                                        className={`rounded-xl px-4 py-2 text-sm font-bold ${
                                            link.active
                                                ? "bg-[#7aa7bb] text-white"
                                                : isDark
                                                  ? "bg-white/5 text-white disabled:opacity-40"
                                                  : "bg-white text-slate-700 border border-slate-200 disabled:opacity-40"
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <FooterV2 />
        </div>
    );
}
