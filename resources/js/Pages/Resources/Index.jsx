import React, { useEffect, useMemo, useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { Search, BookOpenText, Clock3, ArrowRight } from "lucide-react";
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

export default function ResourcesIndex({ resources, filters }) {
    const { isDark, isArabic } = useSitePreferences();
    const [search, setSearch] = useState(filters?.search || "");
    const [type, setType] = useState(filters?.type || "");

    const t = useMemo(
        () => ({
            title: isArabic ? "الموارد - Mind Gate" : "Resources - Mind Gate",
            heading: isArabic ? "مركز الموارد" : "Resource center",
            subtitle: isArabic
                ? "مقالات وأدلة وتمارين تساعد المستخدم على الفهم والمتابعة اليومية."
                : "Articles, guides, and exercises that support reflection and daily progress.",
            search: isArabic ? "ابحث عن مورد..." : "Search resources...",
            all: isArabic ? "كل الأنواع" : "All types",
            article: isArabic ? "مقال" : "Article",
            guide: isArabic ? "دليل" : "Guide",
            exercise: isArabic ? "تمرين" : "Exercise",
            video: isArabic ? "فيديو" : "Video",
            noItems: isArabic
                ? "لا توجد موارد مطابقة."
                : "No matching resources found.",
            readMore: isArabic ? "قراءة المزيد" : "Read more",
        }),
        [isArabic],
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                route("resources.index"),
                { search, type },
                { preserveState: true, preserveScroll: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(timer);
    }, [search, type]);

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
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className={`rounded-2xl border px-4 py-4 text-sm outline-none ${
                                        isDark
                                            ? "border-white/10 bg-white/5 text-white"
                                            : "border-slate-200 bg-white"
                                    }`}
                                >
                                    <option value="">{t.all}</option>
                                    <option value="article">{t.article}</option>
                                    <option value="guide">{t.guide}</option>
                                    <option value="exercise">
                                        {t.exercise}
                                    </option>
                                    <option value="video">{t.video}</option>
                                </select>
                            </div>
                        </GlassCard>
                    </div>
                </section>

                <section className="px-6 md:px-12 lg:px-16 pb-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {resources?.data?.length ? (
                                resources.data.map((item) => (
                                    <GlassCard
                                        key={item.id}
                                        isDark={isDark}
                                        className="overflow-hidden"
                                    >
                                        <div
                                            className={`h-48 ${isDark ? "bg-white/5" : "bg-slate-100"}`}
                                        >
                                            {item.cover_image ? (
                                                <img
                                                    src={item.cover_image}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <BookOpenText className="h-10 w-10 text-[#7aa7bb]" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6">
                                            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold text-[#7aa7bb]">
                                                <span>{item.type}</span>
                                                {item.category ? (
                                                    <span>
                                                        • {item.category}
                                                    </span>
                                                ) : null}
                                                {item.read_time ? (
                                                    <span className="inline-flex items-center gap-1">
                                                        <Clock3 className="h-3.5 w-3.5" />
                                                        {item.read_time} min
                                                    </span>
                                                ) : null}
                                            </div>

                                            <h3 className="text-xl font-extrabold">
                                                {item.title}
                                            </h3>
                                            <p
                                                className={`mt-3 line-clamp-3 text-sm leading-8 ${muted}`}
                                            >
                                                {item.excerpt || ""}
                                            </p>

                                            <div className="mt-5">
                                                <Link
                                                    href={route(
                                                        "resources.show",
                                                        item.slug,
                                                    )}
                                                    className="inline-flex items-center gap-2 font-bold text-[#7aa7bb]"
                                                >
                                                    {t.readMore}
                                                    <ArrowRight className="h-4 w-4" />
                                                </Link>
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
                                </GlassCard>
                            )}
                        </div>

                        {resources?.links?.length > 3 && (
                            <div className="mt-8 flex flex-wrap justify-center gap-2">
                                {resources.links.map((link, index) => (
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
