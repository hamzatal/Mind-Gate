import React, { useEffect, useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    Brain,
    Sun,
    Moon,
    Languages,
    ShieldCheck,
    HeartHandshake,
    Sparkles,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const C = {
    primary: "#7aa7bb",
    primaryDark: "#6797ab",
    accentGreen: "#bcdccf",
    textHigh: "#f0f7fa",
    textMid: "#d1e0e7",
    textLow: "#8db0c0",
    textFaint: "rgba(209,224,231,0.40)",
    cardBg: "rgba(255,255,255,0.07)",
    cardBorder: "rgba(255,255,255,0.14)",
    pageBg: "#0f1720",
    pageBgAlt: "#131d27",
    inputBg: "rgba(255,255,255,0.07)",
    inputBorder: "rgba(255,255,255,0.18)",
};

const L = {
    bg: "#f4f8fb",
    bgAlt: "#edf4f7",
    cardBg: "#ffffff",
    cardBorder: "#ddeaf0",
    textHigh: "#162636",
    textMid: "#2d4a5c",
    textLow: "#4a6a7a",
    textFaint: "#8aabb8",
    inputBg: "#ffffff",
    inputBorder: "#c8dde8",
};

const GRADIENT = `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`;

export default function AuthLayout({ title, children, status = null }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem("darkMode");
        if (saved !== null) return saved === "true";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    const [locale, setLocale] = useState(() => {
        return localStorage.getItem("mindgate_locale") || "en";
    });

    const isArabic = locale === "ar";

    const t = useMemo(
        () => ({
            dir: isArabic ? "rtl" : "ltr",
            lang: isArabic ? "ar" : "en",
            brand: "Mind Gate",
            brandSub: isArabic
                ? "منصة للصحة النفسية"
                : "Mental wellness platform",
            heroTitle: isArabic
                ? "مساحتك الهادئة لبداية أكثر توازنًا ووضوحًا."
                : "Your calm space for a more balanced and clear beginning.",
            heroText: isArabic
                ? "منصة مريحة وآمنة لإدارة المتابعة النفسية، التقييمات الأولية، المواعيد، وربط المستخدم بالمختص المناسب."
                : "A calm and secure platform for mental health follow-up, initial assessments, appointments, and connecting users with the right specialist.",
            cards: [
                {
                    title: isArabic ? "تقييم أولي ذكي" : "AI Assessment",
                    desc: isArabic
                        ? "تحليل مبدئي يساعد على فهم الحالة"
                        : "An initial analysis to better understand the condition",
                    icon: Brain,
                },
                {
                    title: isArabic ? "خصوصية وأمان" : "Private & Secure",
                    desc: isArabic
                        ? "بياناتك محفوظة ضمن تجربة موثوقة"
                        : "Your data stays protected in a trusted experience",
                    icon: ShieldCheck,
                },
                {
                    title: isArabic
                        ? "ربط مع المختص"
                        : "Connect to Specialists",
                    desc: isArabic
                        ? "الوصول للمختص المناسب بسهولة"
                        : "Reach the right specialist with ease",
                    icon: HeartHandshake,
                },
            ],
            switchLang: isArabic ? "English" : "العربية",
            switchLangLabel: isArabic
                ? "Switch to English"
                : "التحويل إلى العربية",
        }),
        [isArabic],
    );

    const dc = (darkValue, lightValue) => (isDarkMode ? darkValue : lightValue);

    useEffect(() => {
        localStorage.setItem("darkMode", isDarkMode);
        document.documentElement.classList.toggle("dark", isDarkMode);
    }, [isDarkMode]);

    useEffect(() => {
        localStorage.setItem("mindgate_locale", locale);
        document.documentElement.lang = t.lang;
        document.documentElement.dir = t.dir;
    }, [locale, t.lang, t.dir]);

    useEffect(() => {
        if (status) toast.success(status);
    }, [status]);

    return (
        <div
            dir={t.dir}
            className="h-screen overflow-hidden relative"
            style={{
                background: isDarkMode
                    ? `radial-gradient(circle at top left, rgba(122,167,187,0.14), transparent 30%),
                       radial-gradient(circle at bottom right, rgba(188,220,207,0.10), transparent 28%),
                       linear-gradient(135deg, ${C.pageBg}, ${C.pageBgAlt})`
                    : `radial-gradient(circle at top left, rgba(122,167,187,0.10), transparent 28%),
                       radial-gradient(circle at bottom right, rgba(188,220,207,0.16), transparent 26%),
                       linear-gradient(180deg, ${L.bg}, ${L.bgAlt})`,
            }}
        >
            <Head title={title} />
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute -top-20 -left-20 w-56 sm:w-72 h-56 sm:h-72 rounded-full blur-3xl"
                    style={{ background: "rgba(122,167,187,0.12)" }}
                />
                <div
                    className="absolute bottom-0 right-0 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl"
                    style={{ background: "rgba(188,220,207,0.10)" }}
                />
            </div>

            <div className="relative z-10 h-screen grid grid-cols-1 lg:grid-cols-2">
                <div className="hidden lg:flex items-center justify-center px-8 xl:px-14 h-screen">
                    <motion.div
                        initial={{ opacity: 0, x: isArabic ? 30 : -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-xl"
                    >
                        <div
                            className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl mb-5"
                            style={{
                                backgroundColor: dc(
                                    "rgba(255,255,255,0.08)",
                                    "#ffffff",
                                ),
                                border: `1px solid ${dc(C.cardBorder, L.cardBorder)}`,
                                color: dc(C.textMid, L.textMid),
                                backdropFilter: isDarkMode
                                    ? "blur(12px)"
                                    : "none",
                            }}
                        >
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: GRADIENT }}
                            >
                                <Brain size={20} color="#fff" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold">
                                    {t.brand}
                                </p>
                                <p
                                    className="text-xs"
                                    style={{
                                        color: dc(C.textFaint, L.textFaint),
                                    }}
                                >
                                    {t.brandSub}
                                </p>
                            </div>
                        </div>

                        <h1
                            className="text-3xl xl:text-5xl font-bold leading-tight mb-4"
                            style={{ color: dc(C.textHigh, L.textHigh) }}
                        >
                            {t.heroTitle}
                        </h1>

                        <p
                            className="text-sm xl:text-lg leading-7 xl:leading-8 mb-7 max-w-lg"
                            style={{ color: dc(C.textLow, L.textLow) }}
                        >
                            {t.heroText}
                        </p>

                        <div className="grid grid-cols-3 gap-3">
                            {t.cards.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: 0.12 * index,
                                            duration: 0.4,
                                        }}
                                        className="rounded-2xl p-4"
                                        style={{
                                            backgroundColor: dc(
                                                C.cardBg,
                                                L.cardBg,
                                            ),
                                            border: `1px solid ${dc(C.cardBorder, L.cardBorder)}`,
                                            backdropFilter: isDarkMode
                                                ? "blur(12px)"
                                                : "none",
                                            boxShadow: dc(
                                                "0 10px 30px rgba(0,0,0,0.18)",
                                                "0 6px 24px rgba(80,120,145,0.10)",
                                            ),
                                        }}
                                    >
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                                            style={{
                                                backgroundColor: dc(
                                                    "rgba(122,167,187,0.16)",
                                                    "rgba(122,167,187,0.12)",
                                                ),
                                            }}
                                        >
                                            <Icon size={18} color={C.primary} />
                                        </div>
                                        <h3
                                            className="font-bold text-xs xl:text-sm mb-1"
                                            style={{
                                                color: dc(
                                                    C.textHigh,
                                                    L.textHigh,
                                                ),
                                            }}
                                        >
                                            {item.title}
                                        </h3>
                                        <p
                                            className="text-[11px] xl:text-xs leading-5"
                                            style={{
                                                color: dc(C.textLow, L.textLow),
                                            }}
                                        >
                                            {item.desc}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                <div className="flex items-center justify-center h-screen px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                        className="w-full max-w-md rounded-[28px] p-5 sm:p-7 lg:p-8"
                        style={{
                            backgroundColor: dc(
                                "rgba(255,255,255,0.08)",
                                L.cardBg,
                            ),
                            border: `1px solid ${dc(C.cardBorder, L.cardBorder)}`,
                            backdropFilter: isDarkMode ? "blur(18px)" : "none",
                            boxShadow: dc(
                                "0 16px 50px rgba(0,0,0,0.28)",
                                "0 12px 40px rgba(84,124,148,0.12)",
                            ),
                        }}
                    >
                        <div className="flex items-start justify-between gap-3 mb-6">
                            <div className="inline-flex items-center gap-2">
                                <div
                                    className="w-10 h-10 rounded-2xl flex items-center justify-center"
                                    style={{ background: GRADIENT }}
                                >
                                    <Sparkles size={18} color="#fff" />
                                </div>
                                <div>
                                    <p
                                        className="text-xs font-semibold"
                                        style={{ color: C.primary }}
                                    >
                                        {title}
                                    </p>
                                    <h2
                                        className="text-xl sm:text-2xl font-bold leading-snug"
                                        style={{
                                            color: dc(C.textHigh, L.textHigh),
                                        }}
                                    >
                                        {t.brand}
                                    </h2>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setLocale((prev) =>
                                            prev === "ar" ? "en" : "ar",
                                        )
                                    }
                                    className="h-10 px-3 rounded-2xl flex items-center justify-center gap-2 transition-all"
                                    style={{
                                        backgroundColor: dc(
                                            C.cardBg,
                                            "#f3f8fb",
                                        ),
                                        border: `1px solid ${dc(C.cardBorder, L.cardBorder)}`,
                                        color: dc(C.textMid, L.textMid),
                                    }}
                                    aria-label={t.switchLangLabel}
                                    title={t.switchLangLabel}
                                >
                                    <Languages size={16} />
                                    <span className="text-xs font-bold">
                                        {t.switchLang}
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsDarkMode((prev) => !prev)
                                    }
                                    className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all"
                                    style={{
                                        backgroundColor: dc(
                                            C.cardBg,
                                            "#f3f8fb",
                                        ),
                                        border: `1px solid ${dc(C.cardBorder, L.cardBorder)}`,
                                        color: dc(C.textMid, L.textMid),
                                    }}
                                    aria-label="Toggle dark mode"
                                >
                                    {isDarkMode ? (
                                        <Sun size={17} />
                                    ) : (
                                        <Moon size={17} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {children}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
