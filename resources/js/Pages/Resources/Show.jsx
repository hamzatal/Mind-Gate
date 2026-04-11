import React, { useMemo } from "react";
import { Head, Link } from "@inertiajs/react";
import { BookOpenText, Clock3, ArrowRight } from "lucide-react";
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

export default function ResourceShow({ resource, related = [] }) {
    const { isDark, isArabic } = useSitePreferences();

    const t = useMemo(
        () => ({
            title: resource?.title || "Resource",
            back: isArabic ? "العودة إلى الموارد" : "Back to resources",
            related: isArabic ? "موارد ذات صلة" : "Related resources",
            readMore: isArabic ? "فتح المورد" : "Open resource",
        }),
        [isArabic, resource],
    );

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
                <section className="px-6 md:px-12 lg:px-16 pb-16">
                    <div className="mx-auto max-w-5xl">
                        <Link
                            href={route("resources.index")}
                            className="inline-flex items-center gap-2 font-bold text-[#7aa7bb]"
                        >
                            <ArrowRight className="h-4 w-4" />
                            {t.back}
                        </Link>

                        <div className="mt-6">
                            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold text-[#7aa7bb]">
                                <span>{resource.type}</span>
                                {resource.category ? (
                                    <span>• {resource.category}</span>
                                ) : null}
                                {resource.read_time ? (
                                    <span className="inline-flex items-center gap-1">
                                        <Clock3 className="h-3.5 w-3.5" />
                                        {resource.read_time} min
                                    </span>
                                ) : null}
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black leading-tight">
                                {resource.title}
                            </h1>
                            {resource.excerpt ? (
                                <p
                                    className={`mt-5 text-lg leading-9 ${muted}`}
                                >
                                    {resource.excerpt}
                                </p>
                            ) : null}
                        </div>
                    </div>
                </section>

                <section className="px-6 md:px-12 lg:px-16 pb-20">
                    <div className="mx-auto max-w-5xl">
                        {resource.cover_image ? (
                            <div className="mb-8 overflow-hidden rounded-[32px] border border-white/10">
                                <img
                                    src={resource.cover_image}
                                    alt={resource.title}
                                    className="h-[380px] w-full object-cover"
                                />
                            </div>
                        ) : null}

                        <GlassCard isDark={isDark} className="p-8">
                            <div
                                className={`prose max-w-none leading-8 ${
                                    isDark ? "prose-invert" : ""
                                }`}
                            >
                                {resource.content ? (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: resource.content,
                                        }}
                                    />
                                ) : (
                                    <p className={muted}>
                                        No content available yet.
                                    </p>
                                )}
                            </div>
                        </GlassCard>
                    </div>
                </section>

                {related.length > 0 && (
                    <section className="px-6 md:px-12 lg:px-16 pb-24">
                        <div className="mx-auto max-w-5xl">
                            <h2 className="mb-6 text-3xl font-black">
                                {t.related}
                            </h2>

                            <div className="grid gap-6 md:grid-cols-3">
                                {related.map((item) => (
                                    <GlassCard
                                        key={item.id}
                                        isDark={isDark}
                                        className="p-6"
                                    >
                                        <div className="mb-3 flex items-center gap-2 text-xs font-bold text-[#7aa7bb]">
                                            <BookOpenText className="h-4 w-4" />
                                            {item.type}
                                        </div>

                                        <h3 className="text-xl font-extrabold">
                                            {item.title}
                                        </h3>

                                        <div className="mt-4">
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
                                    </GlassCard>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <FooterV2 />
        </div>
    );
}
