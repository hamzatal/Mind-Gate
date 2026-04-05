import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    Home,
    Building2,
    User,
    PhoneCall,
    ArrowRight,
    Sparkles,
    Brain,
    HeartHandshake,
    CheckCircle2,
    AlertCircle,
    ShieldCheck,
    TrendingUp,
} from "lucide-react";
import { Head, Link, useForm, usePage, router } from "@inertiajs/react";

export default function Login({ status }) {
    const { auth } = usePage().props;
    const [showPassword, setShowPassword] = useState(false);
    const [notification, setNotification] = useState(null);
    const [accountType, setAccountType] = useState(
        auth.company ? "company" : "user",
    );
    const backgroundImage = "/images/word.png";

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        clearErrors,
        setError,
    } = useForm({ email: "", password: "", remember: false });

    useEffect(() => {
        return () => reset("password");
    }, []);
    useEffect(() => {
        if (auth.company && accountType === "company")
            router.visit(route("home"), { replace: true });
    }, [auth.company, accountType]);

    const validate = () => {
        const e = {};
        if (!data.email) e.email = "البريد الإلكتروني مطلوب";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
            e.email = "يرجى إدخال بريد إلكتروني صحيح";
        if (!data.password) e.password = "كلمة المرور مطلوبة";
        return e;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        clearErrors();
        const ve = validate();
        if (Object.keys(ve).length > 0) {
            Object.entries(ve).forEach(([k, m]) => setError(k, m));
            setNotification({
                type: "error",
                message: "يرجى تصحيح الأخطاء أدناه.",
            });
            setTimeout(() => setNotification(null), 3000);
            return;
        }
        post(route(accountType === "company" ? "company.login" : "login"), {
            onSuccess: () => {
                setTimeout(
                    () => router.visit(route("home"), { replace: true }),
                    1000,
                );
            },
            onError: (serverErrors) => {
                setNotification({
                    type: "error",
                    message:
                        serverErrors.email ||
                        "فشل تسجيل الدخول. يرجى التحقق من بياناتك.",
                });
                setTimeout(() => setNotification(null), 3000);
            },
        });
    };

    // ── Color tokens (light palette) ──
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
        inputBg: "rgba(255,255,255,0.07)",
        inputBorder: "rgba(255,255,255,0.18)",
        errorBorder: "rgba(220,120,120,0.65)",
        errorText: "#e8a0a0",
        glowRight: "rgba(156,199,216,0.22)",
        glowLeft: "rgba(188,220,207,0.18)",
    };

    const primaryGradient = `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`;
    const headingGradient =
        "linear-gradient(135deg, #c7e5d6, #9ed0d8, #7faabd)";

    // ── Left panel per account type ──
    const panelInfo = {
        user: {
            icon: HeartHandshake,
            gradient: primaryGradient,
            badge: "بوابتك نحو الصحة النفسية",
            title: "أهلًا بك",
            subtitle: "سجّل دخولك لتبدأ رحلتك نحو الدعم النفسي الذي تستحقه.",
            points: [
                { icon: Brain, text: "تقييم ذكي لحالتك النفسية" },
                { icon: ShieldCheck, text: "بيانات مشفّرة وسرية تامة" },
                { icon: TrendingUp, text: "متابعة يومية لمؤشراتك" },
            ],
        },
        company: {
            icon: Building2,
            gradient: `linear-gradient(135deg, #8abbe0, ${C.primary})`,
            badge: "بوابة المؤسسات والشركات",
            title: "أهلًا بمؤسستك",
            subtitle:
                "سجّل دخول مؤسستك لإدارة صحة فريقك ورصد مؤشرات الرفاهية الوظيفية.",
            points: [
                { icon: Building2, text: "تقارير مجهولة الهوية للموظفين" },
                { icon: ShieldCheck, text: "كشف مبكر عن الإرهاق الوظيفي" },
                { icon: TrendingUp, text: "إحصائيات شاملة لصحة الفريق" },
            ],
        },
    };

    const current = panelInfo[accountType];
    const PanelIcon = current.icon;

    // ── Input helpers ──
    const inputStyle = (hasError) => ({
        width: "100%",
        backgroundColor: C.inputBg,
        border: `1px solid ${hasError ? C.errorBorder : C.inputBorder}`,
        borderRadius: "10px",
        color: C.textHigh,
        fontSize: "13px",
        outline: "none",
        transition: "border-color 0.2s, box-shadow 0.2s",
    });
    const onFocus = (e) => {
        e.target.style.borderColor = `rgba(122,167,187,0.70)`;
        e.target.style.boxShadow = `0 0 0 3px rgba(122,167,187,0.18)`;
    };
    const onBlur = (hasError) => (e) => {
        e.target.style.borderColor = hasError ? C.errorBorder : C.inputBorder;
        e.target.style.boxShadow = "none";
    };

    return (
        <div
            dir="rtl"
            className="min-h-screen w-full flex relative overflow-hidden"
            style={{ backgroundColor: "#0f2233" }}
        >
            <Head title="تسجيل الدخول - Mind Gate" />

            {/* ── Background Image ── */}
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
                className="absolute -top-20 -right-20 z-0 h-[400px] w-[400px] rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: C.glowRight }}
            />
            <div
                className="absolute -bottom-20 -left-20 z-0 h-[360px] w-[360px] rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: C.glowLeft }}
            />
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 h-[200px] w-[200px] rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: "rgba(156,199,216,0.10)" }}
            />

            {/* ══════════════════════════════════
                 FIXED NAV BUTTONS
            ══════════════════════════════════ */}
            <Link
                href="/"
                className="fixed top-4 right-4 sm:top-5 sm:right-5 z-50 flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold backdrop-blur-md transition-all duration-300 hover:scale-105"
                style={{
                    border: `1px solid ${C.cardBorder}`,
                    backgroundColor: C.cardBg,
                    color: C.textMid,
                }}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                        "rgba(255,255,255,0.15)")
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = C.cardBg)
                }
            >
                <Home className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">الرئيسية</span>
            </Link>

            <Link
                href="/ContactPage"
                className="fixed top-4 right-16 sm:top-5 sm:right-32 z-50 flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold backdrop-blur-md transition-all duration-300 hover:scale-105"
                style={{
                    border: `1px solid ${C.cardBorder}`,
                    backgroundColor: C.cardBg,
                    color: C.textMid,
                }}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                        "rgba(255,255,255,0.15)")
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = C.cardBg)
                }
            >
                <PhoneCall className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">تواصل معنا</span>
            </Link>

            {/* ══════════════════════════════════
                 NOTIFICATION
            ══════════════════════════════════ */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -28, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -28, scale: 0.92 }}
                        transition={{ duration: 0.28 }}
                        className="fixed top-5 left-5 z-[100] max-w-sm"
                    >
                        <div
                            className="flex items-start gap-3 rounded-2xl p-4 shadow-2xl backdrop-blur-xl"
                            style={{
                                backgroundColor:
                                    notification.type === "error"
                                        ? "rgba(200,100,100,0.18)"
                                        : "rgba(156,199,216,0.15)",
                                border:
                                    notification.type === "error"
                                        ? "1px solid rgba(220,120,120,0.35)"
                                        : `1px solid rgba(122,167,187,0.35)`,
                            }}
                        >
                            {notification.type === "error" ? (
                                <AlertCircle
                                    className="mt-0.5 h-5 w-5 shrink-0"
                                    style={{ color: C.errorText }}
                                />
                            ) : (
                                <CheckCircle2
                                    className="mt-0.5 h-5 w-5 shrink-0"
                                    style={{ color: C.accentGreen }}
                                />
                            )}
                            <div>
                                <p
                                    className="mb-0.5 text-sm font-bold"
                                    style={{ color: C.textHigh }}
                                >
                                    {notification.type === "error"
                                        ? "خطأ"
                                        : "تم بنجاح"}
                                </p>
                                <p
                                    className="text-xs leading-5"
                                    style={{ color: C.textMid }}
                                >
                                    {notification.message}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ══════════════════════════════════
                 MAIN LAYOUT
            ══════════════════════════════════ */}
            <div className="relative z-10 flex min-h-screen w-full">
                {/* ════════════════════════════════
                     LEFT — Decorative Panel
                ════════════════════════════════ */}
                <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-10 xl:p-14">
                    <div className="flex flex-col gap-7 max-w-sm w-full">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 backdrop-blur-md"
                            style={{
                                border: `1px solid ${C.cardBorder}`,
                                backgroundColor: C.cardBg,
                            }}
                        >
                            <Sparkles
                                className="h-4 w-4 shrink-0 animate-pulse"
                                style={{ color: C.accentGreen }}
                            />
                            <span
                                className="text-xs font-semibold tracking-wide"
                                style={{ color: C.textMid }}
                            >
                                {current.badge}
                            </span>
                        </motion.div>

                        {/* Gradient Icon Box */}
                        <motion.div
                            key={accountType}
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 0.45,
                                type: "spring",
                                stiffness: 130,
                            }}
                            className="relative overflow-hidden rounded-3xl p-8 inline-flex items-center justify-center"
                            style={{
                                background: current.gradient,
                                boxShadow: `0 16px 48px rgba(122,167,187,0.35)`,
                                width: "fit-content",
                            }}
                        >
                            <div
                                className="absolute -top-6 -right-6 h-20 w-20 rounded-full blur-2xl opacity-40 pointer-events-none"
                                style={{
                                    backgroundColor: "rgba(255,255,255,0.6)",
                                }}
                            />
                            <PanelIcon
                                className="h-20 w-20 relative"
                                style={{ color: "rgba(255,255,255,0.92)" }}
                            />
                        </motion.div>

                        {/* Headline */}
                        <motion.div
                            key={accountType + "_ttl"}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h1
                                className="text-4xl xl:text-5xl font-black leading-tight"
                                style={{ color: C.textHigh }}
                            >
                                {current.title}
                                <br />
                                <span
                                    style={{
                                        background: headingGradient,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    في Mind Gate
                                </span>
                            </h1>
                            <p
                                className="mt-3 text-sm leading-7"
                                style={{ color: C.textLow }}
                            >
                                {current.subtitle}
                            </p>
                        </motion.div>

                        {/* Feature Points */}
                        <motion.div
                            key={accountType + "_pts"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col gap-2.5"
                        >
                            {current.points.map((pt, i) => {
                                const Icon = pt.icon;
                                return (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 rounded-2xl px-4 py-3 backdrop-blur-md"
                                        style={{
                                            backgroundColor:
                                                "rgba(255,255,255,0.07)",
                                            border: `1px solid rgba(255,255,255,0.14)`,
                                        }}
                                    >
                                        <div
                                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                                            style={{
                                                background: current.gradient,
                                                boxShadow: `0 3px 10px rgba(122,167,187,0.30)`,
                                            }}
                                        >
                                            <Icon className="h-4 w-4 text-white" />
                                        </div>
                                        <span
                                            className="text-xs font-semibold"
                                            style={{ color: C.textMid }}
                                        >
                                            {pt.text}
                                        </span>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>

                {/* ════════════════════════════════
                     RIGHT — Form Panel
                ════════════════════════════════ */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-5 py-16 sm:px-8 lg:px-10 lg:py-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-sm sm:max-w-md"
                    >
                        {/* Mobile Logo */}
                        <div className="lg:hidden text-center mb-6">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.4 }}
                                className="relative inline-flex items-center justify-center overflow-hidden rounded-2xl p-5 mb-3 shadow-xl"
                                style={{ background: current.gradient }}
                            >
                                <PanelIcon className="h-12 w-12 text-white" />
                            </motion.div>
                            <h1
                                className="text-2xl font-black"
                                style={{
                                    background: headingGradient,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Mind Gate
                            </h1>
                            <p
                                className="mt-1 text-xs"
                                style={{ color: C.textFaint }}
                            >
                                {current.badge}
                            </p>
                        </div>

                        {/* ── Form Card ── */}
                        <div
                            className="relative overflow-hidden rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
                            style={{
                                backgroundColor: C.cardBg,
                                border: `1px solid ${C.cardBorder}`,
                            }}
                        >
                            {/* Inner glows */}
                            <div
                                className="absolute -top-14 -right-14 h-40 w-40 rounded-full blur-3xl pointer-events-none"
                                style={{
                                    backgroundColor: "rgba(156,199,216,0.14)",
                                }}
                            />
                            <div
                                className="absolute -bottom-14 -left-14 h-40 w-40 rounded-full blur-3xl pointer-events-none"
                                style={{
                                    backgroundColor: "rgba(188,220,207,0.12)",
                                }}
                            />

                            <div className="relative">
                                {/* Card Header */}
                                <div className="mb-5 text-center">
                                    <div
                                        className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-md"
                                        style={{
                                            border: `1px solid ${C.cardBorder}`,
                                            backgroundColor:
                                                "rgba(255,255,255,0.08)",
                                        }}
                                    >
                                        <Sparkles
                                            className="h-3.5 w-3.5"
                                            style={{ color: C.accentGreen }}
                                        />
                                        <span
                                            className="text-xs font-semibold"
                                            style={{ color: C.textMid }}
                                        >
                                            تسجيل الدخول
                                        </span>
                                    </div>
                                    <h3
                                        className="text-2xl sm:text-3xl font-black"
                                        style={{ color: C.textHigh }}
                                    >
                                        مرحبًا بعودتك
                                    </h3>
                                    <p
                                        className="mt-1 text-xs"
                                        style={{ color: C.textFaint }}
                                    >
                                        اختر نوع حسابك للمتابعة
                                    </p>
                                </div>

                                {/* Status */}
                                {status && (
                                    <div
                                        className="mb-4 flex items-center gap-2 rounded-xl px-4 py-3 text-xs"
                                        style={{
                                            backgroundColor:
                                                "rgba(156,199,216,0.12)",
                                            border: `1px solid rgba(156,199,216,0.30)`,
                                            color: C.accent,
                                        }}
                                    >
                                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                                        {status}
                                    </div>
                                )}

                                {/* Account Type Selector */}
                                <div className="mb-5 grid grid-cols-2 gap-2.5">
                                    {[
                                        {
                                            key: "user",
                                            icon: User,
                                            label: "مستخدم فردي",
                                        },
                                        {
                                            key: "company",
                                            icon: Building2,
                                            label: "مؤسسة / شركة",
                                        },
                                    ].map((type) => {
                                        const Icon = type.icon;
                                        const isActive =
                                            accountType === type.key;
                                        return (
                                            <button
                                                type="button"
                                                key={type.key}
                                                onClick={() =>
                                                    setAccountType(type.key)
                                                }
                                                className="relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl p-3.5 transition-all duration-300 hover:-translate-y-0.5"
                                                style={{
                                                    backgroundColor: isActive
                                                        ? "rgba(122,167,187,0.18)"
                                                        : "rgba(255,255,255,0.06)",
                                                    border: isActive
                                                        ? `1px solid rgba(122,167,187,0.50)`
                                                        : `1px solid rgba(255,255,255,0.14)`,
                                                    boxShadow: isActive
                                                        ? `0 4px 18px rgba(122,167,187,0.22)`
                                                        : "none",
                                                }}
                                            >
                                                <div
                                                    className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300"
                                                    style={{
                                                        background: isActive
                                                            ? current.gradient
                                                            : "rgba(255,255,255,0.10)",
                                                        boxShadow: isActive
                                                            ? `0 4px 12px rgba(122,167,187,0.35)`
                                                            : "none",
                                                    }}
                                                >
                                                    <Icon className="h-5 w-5 text-white" />
                                                </div>
                                                <span
                                                    className="text-xs font-bold"
                                                    style={{
                                                        color: isActive
                                                            ? C.textHigh
                                                            : C.textLow,
                                                    }}
                                                >
                                                    {type.label}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* ── Form ── */}
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    {/* Email */}
                                    <div>
                                        <label
                                            className="mb-1.5 block text-xs font-semibold"
                                            style={{ color: C.textLow }}
                                        >
                                            البريد الإلكتروني
                                        </label>
                                        <div className="relative">
                                            <Mail
                                                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
                                                style={{
                                                    color: "rgba(255,255,255,0.28)",
                                                }}
                                            />
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="example@email.com"
                                                style={{
                                                    ...inputStyle(errors.email),
                                                    paddingRight: "36px",
                                                    paddingLeft: "14px",
                                                    paddingTop: "10px",
                                                    paddingBottom: "10px",
                                                }}
                                                onFocus={onFocus}
                                                onBlur={onBlur(errors.email)}
                                            />
                                        </div>
                                        {errors.email && (
                                            <p
                                                className="mt-1.5 flex items-center gap-1 text-[11px]"
                                                style={{ color: C.errorText }}
                                            >
                                                <AlertCircle className="h-3 w-3 shrink-0" />
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label
                                            className="mb-1.5 block text-xs font-semibold"
                                            style={{ color: C.textLow }}
                                        >
                                            كلمة المرور
                                        </label>
                                        <div className="relative">
                                            <Lock
                                                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
                                                style={{
                                                    color: "rgba(255,255,255,0.28)",
                                                }}
                                            />
                                            <input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="••••••••"
                                                style={{
                                                    ...inputStyle(
                                                        errors.password,
                                                    ),
                                                    paddingRight: "36px",
                                                    paddingLeft: "36px",
                                                    paddingTop: "10px",
                                                    paddingBottom: "10px",
                                                }}
                                                onFocus={onFocus}
                                                onBlur={onBlur(errors.password)}
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword,
                                                    )
                                                }
                                                className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 focus:outline-none"
                                                style={{
                                                    color: "rgba(255,255,255,0.28)",
                                                }}
                                                onMouseEnter={(e) =>
                                                    (e.currentTarget.style.color =
                                                        C.accent)
                                                }
                                                onMouseLeave={(e) =>
                                                    (e.currentTarget.style.color =
                                                        "rgba(255,255,255,0.28)")
                                                }
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p
                                                className="mt-1.5 flex items-center gap-1 text-[11px]"
                                                style={{ color: C.errorText }}
                                            >
                                                <AlertCircle className="h-3 w-3 shrink-0" />
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>

                                    {/* Remember + Forgot */}
                                    <div className="flex items-center justify-between gap-2">
                                        <label className="flex cursor-pointer items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={data.remember}
                                                onChange={(e) =>
                                                    setData(
                                                        "remember",
                                                        e.target.checked,
                                                    )
                                                }
                                                className="h-3.5 w-3.5 shrink-0 rounded"
                                                style={{
                                                    accentColor: C.primary,
                                                }}
                                            />
                                            <span
                                                className="text-xs"
                                                style={{ color: C.textFaint }}
                                            >
                                                تذكرني
                                            </span>
                                        </label>
                                        <Link
                                            href={route("password.request")}
                                            className="text-xs font-semibold transition-colors duration-200 hover:underline"
                                            style={{ color: C.accent }}
                                            onMouseEnter={(e) =>
                                                (e.currentTarget.style.color =
                                                    C.accentGreen)
                                            }
                                            onMouseLeave={(e) =>
                                                (e.currentTarget.style.color =
                                                    C.accent)
                                            }
                                        >
                                            نسيت كلمة المرور؟
                                        </Link>
                                    </div>

                                    {/* Submit */}
                                    <motion.button
                                        whileHover={{ scale: 1.015 }}
                                        whileTap={{ scale: 0.985 }}
                                        type="submit"
                                        disabled={processing}
                                        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl py-3 text-sm font-bold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
                                        style={{
                                            background: current.gradient,
                                            boxShadow: `0 6px 22px rgba(122,167,187,0.35)`,
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!processing)
                                                e.currentTarget.style.boxShadow = `0 8px 30px rgba(122,167,187,0.55)`;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.boxShadow = `0 6px 22px rgba(122,167,187,0.35)`;
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        {processing ? (
                                            <>
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                جارٍ تسجيل الدخول...
                                            </>
                                        ) : (
                                            <>
                                                {accountType === "company" ? (
                                                    <Building2 className="h-4 w-4 shrink-0" />
                                                ) : (
                                                    <Brain className="h-4 w-4 shrink-0" />
                                                )}
                                                تسجيل الدخول
                                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                                            </>
                                        )}
                                    </motion.button>

                                    {/* Footer Links */}
                                    <div
                                        className="space-y-2 pt-4 text-center"
                                        style={{
                                            borderTop:
                                                "1px solid rgba(255,255,255,0.10)",
                                        }}
                                    >
                                        <p
                                            className="text-xs"
                                            style={{ color: C.textFaint }}
                                        >
                                            ليس لديك حساب؟{" "}
                                            <Link
                                                href={route("register")}
                                                className="font-bold transition-colors duration-200 hover:underline"
                                                style={{ color: C.accent }}
                                                onMouseEnter={(e) =>
                                                    (e.currentTarget.style.color =
                                                        C.accentGreen)
                                                }
                                                onMouseLeave={(e) =>
                                                    (e.currentTarget.style.color =
                                                        C.accent)
                                                }
                                            >
                                                إنشاء حساب جديد
                                            </Link>
                                        </p>
                                        <p>
                                            <Link
                                                href={
                                                    auth.admin
                                                        ? route(
                                                              "admin.dashboard",
                                                          )
                                                        : route("admin.login")
                                                }
                                                className="text-[11px] transition-colors duration-200 hover:underline"
                                                style={{
                                                    color: "rgba(255,255,255,0.25)",
                                                }}
                                                onMouseEnter={(e) =>
                                                    (e.currentTarget.style.color =
                                                        "rgba(255,255,255,0.50)")
                                                }
                                                onMouseLeave={(e) =>
                                                    (e.currentTarget.style.color =
                                                        "rgba(255,255,255,0.25)")
                                                }
                                            >
                                                دخول لوحة الإدارة
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
