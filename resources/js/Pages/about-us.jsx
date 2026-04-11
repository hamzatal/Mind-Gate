import React, { useMemo } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    Brain,
    HeartHandshake,
    Shield,
    Sparkles,
    Users,
    Stethoscope,
    LineChart,
    Building2,
    ArrowRight,
    CheckCircle2,
    Globe2,
    LockKeyhole,
} from "lucide-react";
import NavV2 from "@/Components/NavBar";
import useSitePreferences from "@/hooks/useSitePreferences";

export default function About() {
    const { props } = usePage();
    const { auth = {} } = props;
    const { isDark, isArabic } = useSitePreferences();

    const t = useMemo(
        () => ({
            title: isArabic ? "من نحن - Mind Gate" : "About Us - Mind Gate",
            badge: isArabic
                ? "منصة رقمية للصحة النفسية"
                : "Digital mental health platform",
            heading1: isArabic ? "نبني تجربة" : "We build a",
            heading2: isArabic
                ? "أكثر إنسانية ووضوحًا"
                : "more human and clear",
            heading3: isArabic ? "في الدعم النفسي" : "support experience",
            intro: isArabic
                ? "Mind Gate صُممت لتكون مساحة موحّدة وآمنة تربط الأفراد والمختصين والمؤسسات في تجربة نفسية رقمية حديثة وسهلة الاستخدام."
                : "Mind Gate is built as a safe unified space connecting individuals, specialists, and organizations through a modern mental-health experience.",
            missionTitle: isArabic ? "رسالتنا" : "Our Mission",
            missionText: isArabic
                ? "أن نجعل الوصول إلى الدعم النفسي أبسط وأكثر أمانًا وتنظيمًا، مع الاستفادة من الذكاء الاصطناعي دون أن نفقد البعد الإنساني."
                : "To make mental-health support simpler, safer, and better organized while using AI without losing the human side.",
            visionTitle: isArabic ? "رؤيتنا" : "Our Vision",
            visionText: isArabic
                ? "أن تصبح Mind Gate البوابة الذكية الموثوقة للصحة النفسية على المستوى الفردي والمؤسسي."
                : "To become the trusted smart gateway for mental health across individuals and organizations.",
            valuesTitle: isArabic
                ? "ما الذي يميزنا؟"
                : "What makes us different?",
            blocks: [
                {
                    icon: Shield,
                    title: isArabic ? "خصوصية أولاً" : "Privacy first",
                    text: isArabic
                        ? "بيانات المستخدمين تُعامل بسرية عالية وتجربة المنصة مبنية على الثقة."
                        : "User data is handled with care, and trust is part of the platform foundation.",
                },
                {
                    icon: Brain,
                    title: isArabic ? "ذكاء اصطناعي نافع" : "Useful AI",
                    text: isArabic
                        ? "تحليل أولي ذكي ومساعدة في التوجيه دون استبدال المختص."
                        : "Smart early analysis and guidance without replacing the specialist.",
                },
                {
                    icon: HeartHandshake,
                    title: isArabic ? "تجربة إنسانية" : "Human-centered",
                    text: isArabic
                        ? "كل خطوة مصممة لتقليل التوتر وزيادة الوضوح والثقة."
                        : "Every step is designed to reduce friction and increase confidence.",
                },
                {
                    icon: Building2,
                    title: isArabic
                        ? "جاهزة للمؤسسات"
                        : "Built for organizations",
                    text: isArabic
                        ? "تخدم الأفراد كما تخدم الشركات في دعم الصحة النفسية للموظفين."
                        : "Supports both individuals and organizations with scalable workflows.",
                },
            ],
            stats: [
                {
                    icon: Users,
                    value: "+1000",
                    label: isArabic ? "مستخدم" : "Users",
                },
                {
                    icon: Stethoscope,
                    value: "+50",
                    label: isArabic ? "مختص" : "Specialists",
                },
                {
                    icon: LineChart,
                    value: "24/7",
                    label: isArabic ? "متابعة" : "Tracking",
                },
                {
                    icon: Globe2,
                    value: "AI",
                    label: isArabic ? "توجيه ذكي" : "Smart guidance",
                },
            ],
            featuresTitle: isArabic ? "ركائز المنصة" : "Core pillars",
            features: [
                isArabic
                    ? "إنشاء حساب ومسار استخدام واضح"
                    : "Clear onboarding and account flow",
                isArabic
                    ? "تقييم أولي مدعوم بالذكاء الاصطناعي"
                    : "AI-powered initial assessment",
                isArabic
                    ? "اختيار المختص الأنسب حسب الاحتياج"
                    : "Smarter specialist matching",
                isArabic
                    ? "متابعة يومية منظمة للحالة النفسية"
                    : "Structured daily mental tracking",
                isArabic
                    ? "حلول خاصة بالمؤسسات والشركات"
                    : "Dedicated organization workflows",
                isArabic
                    ? "واجهة آمنة وسهلة الاستخدام"
                    : "Safe and accessible experience",
            ],
            ctaTitle: isArabic ? "ابدأ مع Mind Gate" : "Start with Mind Gate",
            ctaText: isArabic
                ? "إذا كنت تبحث عن تجربة نفسية رقمية أكثر وضوحًا وأمانًا، فهذه هي البداية المناسبة."
                : "If you want a clearer and safer digital mental-health experience, this is a strong place to begin.",
            ctaPrimary:
                auth?.user || auth?.admin
                    ? isArabic
                        ? "العودة إلى الرئيسية"
                        : "Back to home"
                    : isArabic
                      ? "ابدأ الآن"
                      : "Get started",
            ctaSecondary: isArabic ? "تواصل معنا" : "Contact us",
        }),
        [isArabic, auth],
    );

    const pageBg = isDark
        ? "bg-[#081018] text-white"
        : "bg-[#f6fafc] text-slate-900";

    const glass = isDark
        ? "bg-white/5 border-white/10"
        : "bg-white/80 border-slate-200";

    const textMuted = isDark ? "text-white/70" : "text-slate-600";

    return (
        <div
            dir={isArabic ? "rtl" : "ltr"}
            className={`min-h-screen ${pageBg} relative overflow-hidden`}
        >
            <Head title={t.title} />
            <NavV2 />

            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-20 end-0 h-[340px] w-[340px] rounded-full bg-[#7aa7bb]/20 blur-3xl" />
                <div className="absolute bottom-0 start-0 h-[300px] w-[300px] rounded-full bg-[#9cc7d8]/20 blur-3xl" />
            </div>

            <main className="relative z-10 pt-28">
                <section className="px-6 md:px-12 lg:px-16 pb-16">
                    <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold ${glass}`}
                            >
                                <Sparkles className="h-4 w-4 text-[#7aa7bb]" />
                                {t.badge}
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.08 }}
                                className="mt-6 text-5xl font-black leading-tight md:text-7xl"
                            >
                                {t.heading1}
                                <br />
                                <span className="bg-gradient-to-l from-[#c7e5d6] via-[#9ed0d8] to-[#7faabd] bg-clip-text text-transparent">
                                    {t.heading2}
                                </span>
                                <br />
                                {t.heading3}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 26 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.14 }}
                                className={`mt-6 max-w-2xl text-lg leading-9 ${textMuted}`}
                            >
                                {t.intro}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 26 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mt-8 flex flex-wrap gap-4"
                            >
                                <Link
                                    href={
                                        auth?.user || auth?.admin
                                            ? "/home"
                                            : "/register"
                                    }
                                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] px-7 py-4 text-base font-bold text-white shadow-xl transition hover:scale-[1.02]"
                                >
                                    {t.ctaPrimary}
                                    <ArrowRight className="h-5 w-5" />
                                </Link>

                                <Link
                                    href="/ContactPage"
                                    className={`inline-flex items-center gap-2 rounded-2xl border px-7 py-4 text-base font-bold transition ${glass}`}
                                >
                                    {t.ctaSecondary}
                                </Link>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.12 }}
                            className={`relative overflow-hidden rounded-[34px] border p-7 shadow-2xl ${glass}`}
                        >
                            <div className="grid grid-cols-2 gap-4">
                                {t.stats.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`rounded-3xl border p-5 ${glass}`}
                                    >
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7aa7bb] to-[#6797ab] text-white shadow-lg">
                                            <item.icon className="h-6 w-6" />
                                        </div>
                                        <div className="text-3xl font-black">
                                            {item.value}
                                        </div>
                                        <div
                                            className={`mt-2 text-sm ${textMuted}`}
                                        >
                                            {item.label}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div
                                className={`mt-5 rounded-3xl border p-5 ${glass}`}
                            >
                                <div className="mb-3 flex items-center gap-3">
                                    <LockKeyhole className="h-5 w-5 text-[#7aa7bb]" />
                                    <div className="font-extrabold">
                                        {isArabic
                                            ? "منصة آمنة وواضحة"
                                            : "Safe and structured"}
                                    </div>
                                </div>
                                <p className={`text-sm leading-7 ${textMuted}`}>
                                    {isArabic
                                        ? "تصميم Mind Gate مبني حول الوضوح والخصوصية وسهولة الوصول، مع تنظيم يحترم اختلاف احتياجات المستخدمين."
                                        : "Mind Gate is designed around clarity, privacy, and accessible guidance, with workflows that respect different user needs."}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section className="px-6 md:px-12 lg:px-16 pb-16">
                    <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
                        <div
                            className={`rounded-[32px] border p-8 shadow-xl ${glass}`}
                        >
                            <div className="mb-4 text-2xl font-black">
                                {t.missionTitle}
                            </div>
                            <p className={`text-lg leading-9 ${textMuted}`}>
                                {t.missionText}
                            </p>
                        </div>

                        <div
                            className={`rounded-[32px] border p-8 shadow-xl ${glass}`}
                        >
                            <div className="mb-4 text-2xl font-black">
                                {t.visionTitle}
                            </div>
                            <p className={`text-lg leading-9 ${textMuted}`}>
                                {t.visionText}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="px-6 md:px-12 lg:px-16 pb-16">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-8 text-center">
                            <h2 className="text-4xl font-black">
                                {t.valuesTitle}
                            </h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                            {t.blocks.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                    className={`rounded-[30px] border p-7 shadow-lg ${glass}`}
                                >
                                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7aa7bb] to-[#6797ab] text-white shadow-lg">
                                        <item.icon className="h-7 w-7" />
                                    </div>

                                    <div className="mb-3 text-xl font-extrabold">
                                        {item.title}
                                    </div>
                                    <p
                                        className={`text-sm leading-8 ${textMuted}`}
                                    >
                                        {item.text}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="px-6 md:px-12 lg:px-16 pb-20">
                    <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[1fr_1.05fr]">
                        <div
                            className={`rounded-[34px] border p-8 shadow-xl ${glass}`}
                        >
                            <h3 className="text-3xl font-black">
                                {t.featuresTitle}
                            </h3>
                            <div className="mt-6 space-y-4">
                                {t.features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center gap-4 rounded-2xl border px-4 py-4 ${glass}`}
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7aa7bb] to-[#6797ab] text-white">
                                            <CheckCircle2 className="h-5 w-5" />
                                        </div>
                                        <span className="text-base font-semibold">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            className={`rounded-[34px] border p-8 shadow-xl ${glass}`}
                        >
                            <h3 className="text-3xl font-black">
                                {t.ctaTitle}
                            </h3>
                            <p
                                className={`mt-4 text-lg leading-9 ${textMuted}`}
                            >
                                {t.ctaText}
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    href={
                                        auth?.user || auth?.admin
                                            ? "/home"
                                            : "/register"
                                    }
                                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] px-7 py-4 text-base font-bold text-white shadow-xl transition hover:scale-[1.02]"
                                >
                                    {t.ctaPrimary}
                                    <ArrowRight className="h-5 w-5" />
                                </Link>

                                <Link
                                    href="/ContactPage"
                                    className={`inline-flex items-center gap-2 rounded-2xl border px-7 py-4 text-base font-bold transition ${glass}`}
                                >
                                    {t.ctaSecondary}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
