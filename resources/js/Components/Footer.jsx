import React from "react";
import { Link } from "@inertiajs/react";
import { ShieldCheck, Brain, HeartHandshake } from "lucide-react";
import useSitePreferences from "@/hooks/useSitePreferences";

export default function Footer() {
    const { isDark, isArabic } = useSitePreferences();

    return (
        <footer
            className={`border-t ${
                isDark
                    ? "border-white/10 bg-[#071019] text-white"
                    : "border-slate-200 bg-white text-slate-900"
            }`}
        >
            <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 lg:px-16">
                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <div className="flex items-center gap-3">
                            <img
                                src="/images/logo.png"
                                alt="Mind Gate"
                                className="h-12 w-auto object-contain"
                            />
                            <div>
                                <div className="text-xl font-black">
                                    Mind Gate
                                </div>
                                <div
                                    className={`text-sm ${isDark ? "text-white/60" : "text-slate-500"}`}
                                >
                                    {isArabic
                                        ? "بوابة ذكية للصحة النفسية"
                                        : "A smart gateway for mental health"}
                                </div>
                            </div>
                        </div>

                        <p
                            className={`mt-5 max-w-2xl text-sm leading-8 ${isDark ? "text-white/70" : "text-slate-600"}`}
                        >
                            {isArabic
                                ? "منصة رقمية متكاملة تساعد المستخدم على التقييم الأولي، المتابعة اليومية، الوصول إلى الموارد، واكتشاف المختص المناسب ضمن تجربة واضحة وآمنة."
                                : "An integrated digital platform that helps users with initial assessment, daily tracking, access to resources, and discovering the right specialist in a clear and safe experience."}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            {[
                                {
                                    icon: ShieldCheck,
                                    label: isArabic
                                        ? "خصوصية عالية"
                                        : "High privacy",
                                },
                                {
                                    icon: Brain,
                                    label: isArabic
                                        ? "تقييم أولي ذكي"
                                        : "Smart initial assessment",
                                },
                                {
                                    icon: HeartHandshake,
                                    label: isArabic
                                        ? "دعم إنساني"
                                        : "Human-centered support",
                                },
                            ].map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                                            isDark
                                                ? "bg-white/5 text-white/85"
                                                : "bg-slate-100 text-slate-700"
                                        }`}
                                    >
                                        <Icon className="h-4 w-4 text-[#7aa7bb]" />
                                        {item.label}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2">
                        <div>
                            <h3 className="text-base font-black">
                                {isArabic ? "روابط الموقع" : "Site links"}
                            </h3>
                            <div className="mt-4 space-y-3">
                                <Link
                                    href={route("home")}
                                    className="block text-sm hover:text-[#7aa7bb]"
                                >
                                    {isArabic ? "الرئيسية" : "Home"}
                                </Link>
                                <Link
                                    href={route("specialists.index")}
                                    className="block text-sm hover:text-[#7aa7bb]"
                                >
                                    {isArabic ? "المختصون" : "Specialists"}
                                </Link>
                                <Link
                                    href={route("resources.index")}
                                    className="block text-sm hover:text-[#7aa7bb]"
                                >
                                    {isArabic ? "الموارد" : "Resources"}
                                </Link>
                                <Link
                                    href={route("assessment.quick.page")}
                                    className="block text-sm hover:text-[#7aa7bb]"
                                >
                                    {isArabic
                                        ? "التقييم الأولي"
                                        : "Quick Assessment"}
                                </Link>
                                <Link
                                    href={route("about-us")}
                                    className="block text-sm hover:text-[#7aa7bb]"
                                >
                                    {isArabic ? "من نحن" : "About Us"}
                                </Link>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-base font-black">
                                {isArabic ? "تواصل" : "Contact"}
                            </h3>
                            <div
                                className={`mt-4 space-y-3 text-sm ${isDark ? "text-white/70" : "text-slate-600"}`}
                            >
                                <div>support@mindgate.com</div>
                                <div>+962-777777777</div>
                                <div>{isArabic ? "الأردن" : "Jordan"}</div>
                                <Link
                                    href={route("ContactPage")}
                                    className="block font-semibold text-[#7aa7bb]"
                                >
                                    {isArabic
                                        ? "اذهب إلى صفحة التواصل"
                                        : "Open contact page"}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`mt-10 border-t pt-5 text-sm ${isDark ? "border-white/10 text-white/50" : "border-slate-200 text-slate-500"}`}
                >
                    © 2026 Mind Gate.{" "}
                    {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
                </div>
            </div>
        </footer>
    );
}
