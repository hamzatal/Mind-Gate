import React from "react";
import { motion } from "framer-motion";
import {
    Brain,
    Heart,
    Shield,
    Info,
    Sparkles,
    ArrowRight,
    Users,
    Stethoscope,
    BadgeCheck,
    Clock,
    CheckCircle2,
    HeartHandshake,
    TrendingUp,
    Lock,
} from "lucide-react";

const WelcomePage = () => {
    const backgroundImage = "/images/word.png";

    // ── Color tokens ──
    const C = {
        primary: "#7aa7bb",
        primaryDark: "#6797ab",
        accent: "#9cc7d8",
        accentGreen: "#bcdccf",
        textHigh: "#f0f7fa",
        textMid: "#d1e0e7",
        textLow: "#8db0c0",
        textFaint: "rgba(209,224,231,0.40)",
        cardBg: "rgba(255,255,255,0.09)",
        cardBorder: "rgba(255,255,255,0.18)",
        glowRight: "rgba(156,199,216,0.22)",
        glowLeft: "rgba(188,220,207,0.18)",
    };

    const primaryGradient = `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`;
    const headingGradient =
        "linear-gradient(135deg, #c7e5d6, #9ed0d8, #7faabd)";

    const features = [
        {
            icon: Brain,
            title: "تقييم أولي ذكي",
            description:
                "تقييم نفسي يحلل أنماط مزاجك ويوجّهك للمسار الأنسب تلقائيًا.",
            gradient: "linear-gradient(135deg, #5a9cc0, #4a8ab0)",
            glow: "rgba(90,156,192,0.20)",
            border: "rgba(90,156,192,0.30)",
        },
        {
            icon: Stethoscope,
            title: "ربط مع المختص",
            description: "نصلك بالأخصائي الأنسب بناءً على حالتك ولغتك وتخصصه.",
            gradient: "linear-gradient(135deg, #4db896, #3a9f80)",
            glow: "rgba(77,184,150,0.20)",
            border: "rgba(77,184,150,0.30)",
        },
        {
            icon: Heart,
            title: "متابعة يومية",
            description:
                "تتبّع مزاجك يوميًا مع تنبيهات مبكرة عند ظهور علامات القلق.",
            gradient: "linear-gradient(135deg, #9270df, #7a58c8)",
            glow: "rgba(146,112,223,0.20)",
            border: "rgba(146,112,223,0.30)",
        },
        {
            icon: Shield,
            title: "خصوصية وأمان",
            description:
                "بيئة مشفّرة بالكامل — سريتك جزء أساسي من تجربتك معنا.",
            gradient: "linear-gradient(135deg, #d4885a, #b86e40)",
            glow: "rgba(212,136,90,0.20)",
            border: "rgba(212,136,90,0.30)",
        },
    ];

    const stats = [
        { icon: Users, value: "+١٠٠٠", label: "مستخدم نشط", accent: "#5a9cc0" },
        {
            icon: Stethoscope,
            value: "+٥٠",
            label: "معالج معتمد",
            accent: "#4db896",
        },
        { icon: Clock, value: "٢٤/٧", label: "دعم متواصل", accent: "#9270df" },
        {
            icon: BadgeCheck,
            value: "٩٨٪",
            label: "رضا المستخدمين",
            accent: "#d4885a",
        },
    ];

    const whyItems = [
        { icon: HeartHandshake, label: "دعم إنساني حقيقي", accent: "#5a9cc0" },
        { icon: TrendingUp, label: "تحسّن قابل للقياس", accent: "#4db896" },
        { icon: Lock, label: "سرية وتشفير تام", accent: "#9270df" },
    ];

    const fadeUp = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
    };
    const stagger = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    return (
        <div
            dir="rtl"
            className="h-screen w-full overflow-hidden flex flex-col relative"
            style={{ backgroundColor: "#0f2233" }}
        >
            {/* ── Background ── */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${backgroundImage}')` }}
            />

            {/* ── Overlay ── */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background:
                        "linear-gradient(160deg, rgba(16,32,50,0.88) 0%, rgba(20,42,62,0.82) 50%, rgba(13,30,45,0.92) 100%)",
                }}
            />

            {/* ── Glows ── */}
            <div
                className="absolute -top-24 -right-24 z-0 h-[380px] w-[380px] rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: C.glowRight }}
            />
            <div
                className="absolute -bottom-24 -left-24 z-0 h-[340px] w-[340px] rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: C.glowLeft }}
            />
            <div
                className="absolute top-1/2 left-1/2 z-0 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: "rgba(156,199,216,0.08)" }}
            />

            {/* ══════════════════════════════════
                 NAVBAR
            ══════════════════════════════════ */}
            <nav className="relative z-10 w-full shrink-0 px-5 py-3 md:px-10 lg:px-14">
                <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
                    <img
                        src="/images/logo.png"
                        alt="Mind Gate"
                        className="h-10 object-contain drop-shadow-lg md:h-11"
                    />
                    <button
                        onClick={() => (window.location.href = "/login")}
                        className="group flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white transition-all duration-300 hover:scale-105 md:px-5 md:text-sm"
                        style={{
                            background: primaryGradient,
                            boxShadow: "0 4px 16px rgba(122,167,187,0.28)",
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.boxShadow =
                                "0 6px 24px rgba(122,167,187,0.48)")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.boxShadow =
                                "0 4px 16px rgba(122,167,187,0.28)")
                        }
                    >
                        تسجيل الدخول
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
                    </button>
                </div>
            </nav>

            {/* ══════════════════════════════════
                 MAIN — Two Column
            ══════════════════════════════════ */}
            <main className="relative z-10 flex-1 overflow-hidden px-5 pb-2 pt-1 md:px-10 lg:px-14">
                <div className="mx-auto grid h-full w-full max-w-7xl items-center gap-6 lg:grid-cols-[45%_55%] xl:gap-10">
                    {/* ════════════════════════
                         LEFT — Hero + Stats
                    ════════════════════════ */}
                    <motion.section
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                        className="flex flex-col justify-center gap-4"
                    >
                        {/* Badge */}
                        <motion.div variants={fadeUp}>
                            <div
                                className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-md"
                                style={{
                                    border: `1px solid ${C.cardBorder}`,
                                    backgroundColor: C.cardBg,
                                }}
                            >
                                <Sparkles
                                    className="h-3.5 w-3.5 shrink-0 animate-pulse"
                                    style={{ color: C.accentGreen }}
                                />
                                <span
                                    className="text-[11px] font-semibold tracking-wide sm:text-xs"
                                    style={{ color: C.textMid }}
                                >
                                    بوابتك الذكية نحو دعم نفسي أكثر راحة ووضوحًا
                                </span>
                            </div>
                        </motion.div>

                        {/* Headline */}
                        <motion.div variants={fadeUp}>
                            <h1
                                className="text-3xl font-black leading-snug sm:text-4xl xl:text-[2.65rem]"
                                style={{ color: C.textHigh }}
                            >
                                مرحبًا بك، <br className="hidden sm:block" />
                                <span
                                    style={{
                                        background: headingGradient,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    صحتك النفسية تهمنا
                                </span>
                            </h1>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            variants={fadeUp}
                            className="max-w-md text-sm leading-7 md:text-[15px]"
                            style={{ color: C.textLow }}
                        >
                            منصة عربية تجمع الذكاء الاصطناعي والخبرة البشرية —
                            لتجربة مريحة، آمنة، وسهلة الوصول سواء كنت فردًا أو
                            مؤسسة.
                        </motion.p>

                        {/* Stats Row */}
                        <motion.div
                            variants={fadeUp}
                            className="grid grid-cols-4 gap-2"
                        >
                            {stats.map((s, i) => {
                                const Icon = s.icon;
                                return (
                                    <div
                                        key={i}
                                        className="flex flex-col items-center gap-1.5 rounded-2xl py-3 px-1 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
                                        style={{
                                            backgroundColor: C.cardBg,
                                            border: `1px solid ${C.cardBorder}`,
                                        }}
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                "rgba(255,255,255,0.13)")
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                C.cardBg)
                                        }
                                    >
                                        <div
                                            className="flex h-8 w-8 items-center justify-center rounded-xl"
                                            style={{
                                                backgroundColor: `${s.accent}20`,
                                                border: `1px solid ${s.accent}40`,
                                            }}
                                        >
                                            <Icon
                                                className="h-3.5 w-3.5"
                                                style={{ color: s.accent }}
                                            />
                                        </div>
                                        <span
                                            className="text-base font-black leading-none"
                                            style={{ color: C.textHigh }}
                                        >
                                            {s.value}
                                        </span>
                                        <span
                                            className="text-[10px] leading-tight"
                                            style={{ color: C.textFaint }}
                                        >
                                            {s.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={fadeUp}
                            className="flex flex-col gap-2.5 sm:flex-row"
                        >
                            {/* Primary */}
                            <button
                                onClick={() =>
                                    (window.location.href = "/register")
                                }
                                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] sm:px-8"
                                style={{
                                    background: primaryGradient,
                                    boxShadow:
                                        "0 6px 24px rgba(122,167,187,0.32)",
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.boxShadow =
                                        "0 8px 30px rgba(122,167,187,0.52)")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.boxShadow =
                                        "0 6px 24px rgba(122,167,187,0.32)")
                                }
                            >
                                <Brain className="h-4 w-4 shrink-0" />
                                ابدأ رحلتك الآن
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                                <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-2xl" />
                            </button>

                            {/* Ghost */}
                            <button
                                onClick={() =>
                                    (window.location.href = "/about-us")
                                }
                                className="flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold backdrop-blur-md transition-all duration-300 sm:px-8"
                                style={{
                                    border: `1px solid ${C.cardBorder}`,
                                    backgroundColor: "rgba(255,255,255,0.05)",
                                    color: C.textLow,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        "rgba(255,255,255,0.12)";
                                    e.currentTarget.style.color = C.textHigh;
                                    e.currentTarget.style.borderColor =
                                        "rgba(255,255,255,0.30)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        "rgba(255,255,255,0.05)";
                                    e.currentTarget.style.color = C.textLow;
                                    e.currentTarget.style.borderColor =
                                        C.cardBorder;
                                }}
                            >
                                <Info className="h-4 w-4" />
                                اكتشف المزيد
                            </button>
                        </motion.div>
                    </motion.section>

                    {/* ════════════════════════
                         RIGHT — Feature Cards
                    ════════════════════════ */}
                    <motion.section
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                        className="flex h-full flex-col justify-center gap-3 py-1"
                    >
                        {/* 2×2 Feature Cards */}
                        <div className="grid grid-cols-2 gap-3">
                            {features.map((f, i) => {
                                const Icon = f.icon;
                                return (
                                    <motion.article
                                        key={i}
                                        variants={fadeUp}
                                        whileHover={{ y: -4 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                        }}
                                        className="group relative overflow-hidden rounded-3xl p-4 backdrop-blur-xl cursor-default"
                                        style={{
                                            backgroundColor: C.cardBg,
                                            border: `1px solid ${f.border}`,
                                            boxShadow: `0 4px 22px ${f.glow}`,
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                                "rgba(255,255,255,0.13)";
                                            e.currentTarget.style.boxShadow = `0 8px 32px ${f.glow}`;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                                C.cardBg;
                                            e.currentTarget.style.boxShadow = `0 4px 22px ${f.glow}`;
                                        }}
                                    >
                                        {/* Blob */}
                                        <div
                                            className="absolute -right-5 -top-5 h-16 w-16 rounded-full blur-2xl opacity-25 pointer-events-none"
                                            style={{ background: f.gradient }}
                                        />
                                        <div className="relative">
                                            <div
                                                className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl shadow-lg"
                                                style={{
                                                    background: f.gradient,
                                                }}
                                            >
                                                <Icon className="h-5 w-5 text-white" />
                                            </div>
                                            <h3
                                                className="mb-1.5 text-sm font-extrabold"
                                                style={{ color: C.textHigh }}
                                            >
                                                {f.title}
                                            </h3>
                                            <p
                                                className="text-[11.5px] leading-[1.6]"
                                                style={{ color: C.textLow }}
                                            >
                                                {f.description}
                                            </p>
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </div>

                        {/* Bottom "Why" Panel */}
                        <motion.div
                            variants={fadeUp}
                            className="relative overflow-hidden rounded-3xl p-4 backdrop-blur-xl"
                            style={{
                                backgroundColor: C.cardBg,
                                border: `1px solid ${C.cardBorder}`,
                            }}
                        >
                            <div
                                className="absolute -top-8 -right-8 h-20 w-20 rounded-full blur-2xl opacity-20 pointer-events-none"
                                style={{ backgroundColor: C.primary }}
                            />
                            <div
                                className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full blur-2xl opacity-15 pointer-events-none"
                                style={{ backgroundColor: C.accentGreen }}
                            />

                            <div className="relative flex items-center justify-between gap-4">
                                {/* Label */}
                                <div className="flex items-center gap-2 shrink-0">
                                    <div
                                        className="flex h-8 w-8 items-center justify-center rounded-xl"
                                        style={{
                                            background: primaryGradient,
                                            boxShadow:
                                                "0 3px 10px rgba(122,167,187,0.30)",
                                        }}
                                    >
                                        <CheckCircle2 className="h-4 w-4 text-white" />
                                    </div>
                                    <span
                                        className="text-sm font-black"
                                        style={{ color: C.textHigh }}
                                    >
                                        لماذا Mind Gate؟
                                    </span>
                                </div>

                                {/* Why Items */}
                                <div className="flex flex-wrap justify-end gap-2">
                                    {whyItems.map((w, i) => {
                                        const Icon = w.icon;
                                        return (
                                            <div
                                                key={i}
                                                className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
                                                style={{
                                                    backgroundColor: `${w.accent}16`,
                                                    border: `1px solid ${w.accent}38`,
                                                }}
                                            >
                                                <Icon
                                                    className="h-3 w-3 shrink-0"
                                                    style={{ color: w.accent }}
                                                />
                                                <span
                                                    className="text-[11px] font-semibold"
                                                    style={{ color: w.accent }}
                                                >
                                                    {w.label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </motion.section>
                </div>
            </main>

            {/* ══════════════════════════════════
                 FOOTER
            ══════════════════════════════════ */}
            <footer className="relative z-10 shrink-0 py-2.5 text-center">
                <p
                    className="text-[11px]"
                    style={{ color: "rgba(255,255,255,0.22)" }}
                >
                    © 2025 Mind Gate — جميع الحقوق محفوظة · منصة مصممة بعناية
                    لرعاية نفسية أكثر هدوءًا
                </p>
            </footer>
        </div>
    );
};

export default WelcomePage;
