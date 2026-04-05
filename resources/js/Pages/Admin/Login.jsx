import React, { useState, useEffect } from "react";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    Home,
    ShieldAlert,
    Shield,
    PhoneCall,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Sparkles,
    KeyRound,
    UserCog,
} from "lucide-react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";

// ── Color tokens (Admin — Red palette) ──
const C = {
    primary: "#c0524a",
    primaryMid: "#a84440",
    primaryLight: "#e07a72",
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
    glowRight: "rgba(192,82,74,0.20)",
    glowLeft: "rgba(156,199,216,0.12)",
};

const adminGradient = `linear-gradient(135deg, ${C.primary}, ${C.primaryMid})`;
const headingGradient = "linear-gradient(135deg, #f5c6c3, #e07a72, #c0524a)";
const navGradient = `linear-gradient(135deg, ${C.primary}, ${C.primaryMid})`;

// ══════════════════════════════════
//  Notification
// ══════════════════════════════════
const Notification = ({ message, type }) => {
    const [visible, setVisible] = useState(!!message);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [message, type]);

    if (!visible) return null;

    return (
        <AnimatePresence>
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
                            type === "error"
                                ? "rgba(192,82,74,0.18)"
                                : "rgba(58,168,124,0.15)",
                        border:
                            type === "error"
                                ? "1px solid rgba(192,82,74,0.38)"
                                : "1px solid rgba(58,168,124,0.35)",
                    }}
                >
                    {type === "error" ? (
                        <AlertCircle
                            className="mt-0.5 h-5 w-5 shrink-0"
                            style={{ color: C.errorText }}
                        />
                    ) : (
                        <CheckCircle2
                            className="mt-0.5 h-5 w-5 shrink-0"
                            style={{ color: "#3AA87C" }}
                        />
                    )}
                    <div>
                        <p
                            className="mb-0.5 text-sm font-bold"
                            style={{ color: C.textHigh }}
                        >
                            {type === "error" ? "خطأ" : "تم بنجاح"}
                        </p>
                        <p
                            className="text-xs leading-5"
                            style={{ color: C.textMid }}
                        >
                            {message}
                        </p>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

// ══════════════════════════════════
//  AdminLoginPage
// ══════════════════════════════════
const AdminLoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { flash, errors: pageErrors } = usePage().props;
    const [notification, setNotification] = useState(null);
    const backgroundImage = "/images/word.png";

    useEffect(() => {
        if (flash?.success) {
            setNotification({ type: "success", message: flash.success });
        } else if (flash?.error) {
            setNotification({ type: "error", message: flash.error });
        } else if (
            pageErrors &&
            Object.keys(pageErrors).length > 0 &&
            !pageErrors.email &&
            !pageErrors.password
        ) {
            const generalError = Object.values(pageErrors)[0];
            if (typeof generalError === "string")
                setNotification({ type: "error", message: generalError });
        }
    }, [flash, pageErrors]);

    const validateEmail = (v) =>
        !v
            ? "البريد الإلكتروني مطلوب"
            : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
              ? "يرجى إدخال بريد إلكتروني صحيح"
              : v.length > 100
                ? "البريد لا يتجاوز 100 حرف"
                : null;
    const validatePassword = (v) => (!v ? "كلمة المرور مطلوبة" : null);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        setError,
        clearErrors,
    } = useForm({ email: "", password: "", remember: true });

    useEffect(() => {
        return () => reset("password");
    }, []);

    const submit = (e) => {
        e.preventDefault();
        clearErrors();
        setNotification(null);
        const ve = {};
        const e1 = validateEmail(data.email);
        if (e1) ve.email = e1;
        const e2 = validatePassword(data.password);
        if (e2) ve.password = e2;
        if (Object.keys(ve).length > 0) {
            Object.entries(ve).forEach(([k, m]) => setError(k, m));
            setNotification({
                type: "error",
                message: "يرجى تصحيح الأخطاء أدناه.",
            });
            return;
        }
        post(route("admin.login.submit"), {
            onError: () => {
                if (!flash?.error)
                    setNotification({
                        type: "error",
                        message: "فشل تسجيل الدخول. يرجى التحقق من بياناتك.",
                    });
            },
            onFinish: () => {
                if (Object.keys(errors).length > 0 || flash?.error)
                    reset("password");
            },
        });
    };

    // ── Input style helpers ──
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
        e.target.style.borderColor = "rgba(192,82,74,0.65)";
        e.target.style.boxShadow = "0 0 0 3px rgba(192,82,74,0.18)";
    };
    const onBlur = (hasError) => (e) => {
        e.target.style.borderColor = hasError ? C.errorBorder : C.inputBorder;
        e.target.style.boxShadow = "none";
    };

    // ── Security badges ──
    const badges = [
        { icon: Shield, label: "تشفير كامل", glow: "rgba(192,82,74,0.18)" },
        {
            icon: ShieldAlert,
            label: "وصول محدود",
            glow: "rgba(192,82,74,0.18)",
        },
        { icon: KeyRound, label: "سجل نشاط", glow: "rgba(156,199,216,0.12)" },
        {
            icon: UserCog,
            label: "حماية متقدمة",
            glow: "rgba(156,199,216,0.12)",
        },
    ];

    const stagger = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
    };
    const fadeUp = {
        hidden: { opacity: 0, y: 22 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div
            dir="rtl"
            className="min-h-screen w-full relative overflow-hidden"
            style={{ backgroundColor: "#1a0f0f" }}
        >
            <Head title="لوحة الإدارة - Mind Gate" />

            {/* ── Background ── */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${backgroundImage}')` }}
            />
            <div
                className="absolute inset-0 z-0"
                style={{
                    background:
                        "linear-gradient(160deg, rgba(30,10,10,0.92) 0%, rgba(25,15,15,0.87) 50%, rgba(20,8,8,0.94) 100%)",
                }}
            />

            {/* ── Glows ── */}
            <div
                className="absolute -top-20 -right-20 z-0 h-[420px] w-[420px] rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: C.glowRight }}
            />
            <div
                className="absolute -bottom-20 -left-20 z-0 h-[360px] w-[360px] rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: C.glowLeft }}
            />
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 h-[200px] w-[200px] rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: "rgba(192,82,74,0.08)" }}
            />

            <Notification
                message={notification?.message}
                type={notification?.type}
            />

            <div className="relative z-10 min-h-screen flex flex-col">
                {/* ══════════════════════════════════
                     NAVBAR
                ══════════════════════════════════ */}
                <nav className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-16">
                    {/* Logo */}
                    <img
                        src="/images/logo.png"
                        alt="Mind Gate Logo"
                        className="h-12 object-contain drop-shadow-lg md:h-14"
                    />

                    {/* Nav Actions */}
                    <div className="flex items-center gap-2.5">
                        <Link
                            href={route("home")}
                            className="hidden items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold backdrop-blur-md transition-all duration-300 hover:scale-105 md:flex"
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
                                (e.currentTarget.style.backgroundColor =
                                    C.cardBg)
                            }
                        >
                            <Home className="h-4 w-4" />
                            الرئيسية
                        </Link>

                        <Link
                            href={route("ContactPage")}
                            className="group flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:scale-105"
                            style={{
                                background: navGradient,
                                boxShadow: "0 4px 16px rgba(192,82,74,0.28)",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.boxShadow =
                                    "0 6px 22px rgba(192,82,74,0.46)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.boxShadow =
                                    "0 4px 16px rgba(192,82,74,0.28)")
                            }
                        >
                            <PhoneCall className="h-4 w-4" />
                            تواصل معنا
                        </Link>
                    </div>
                </nav>

                {/* ══════════════════════════════════
                     MAIN SPLIT LAYOUT
                ══════════════════════════════════ */}
                <div className="flex-1 flex flex-col lg:flex-row items-center gap-10 px-6 py-8 md:px-12 lg:px-16">
                    {/* ════════════════════════════════
                         RIGHT — Decorative Panel
                    ════════════════════════════════ */}
                    <div className="hidden lg:flex flex-1 flex-col justify-center items-center text-center gap-7 max-w-lg">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-md"
                            style={{
                                border: `1px solid ${C.cardBorder}`,
                                backgroundColor: C.cardBg,
                            }}
                        >
                            <Sparkles
                                className="h-5 w-5 animate-pulse"
                                style={{ color: C.primaryLight }}
                            />
                            <span
                                className="text-sm font-semibold tracking-wide"
                                style={{ color: C.textMid }}
                            >
                                منطقة المسؤولين فقط
                            </span>
                        </motion.div>

                        {/* Gradient Icon Box */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 0.55,
                                type: "spring",
                                stiffness: 120,
                            }}
                            className="relative overflow-hidden rounded-3xl p-10 inline-flex items-center justify-center"
                            style={{
                                background: adminGradient,
                                boxShadow: "0 16px 48px rgba(192,82,74,0.38)",
                                width: "fit-content",
                            }}
                        >
                            <div
                                className="absolute -top-6 -right-6 h-20 w-20 rounded-full blur-2xl opacity-40 pointer-events-none"
                                style={{
                                    backgroundColor: "rgba(255,255,255,0.5)",
                                }}
                            />
                            <ShieldAlert className="h-24 w-24 relative text-white" />
                        </motion.div>

                        {/* Headline */}
                        <motion.div
                            initial={{ y: -18, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h1
                                className="text-5xl font-black leading-tight mb-4"
                                style={{ color: C.textHigh }}
                            >
                                لوحة إدارة
                                <br />
                                <span
                                    style={{
                                        background: headingGradient,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    Mind Gate
                                </span>
                            </h1>
                            <p
                                className="text-lg leading-8 max-w-md mx-auto"
                                style={{ color: C.textLow }}
                            >
                                وصول آمن ومقيّد للمسؤولين المعتمدين فقط. يُرجى
                                التأكد من صلاحياتك قبل الدخول.
                            </p>
                        </motion.div>

                        {/* Security Badges Grid */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={stagger}
                            className="grid grid-cols-2 gap-3 w-full"
                        >
                            {badges.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        variants={fadeUp}
                                        className="relative flex flex-col items-center gap-2.5 overflow-hidden rounded-2xl px-4 py-4 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-1"
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
                                        {/* Glow blob */}
                                        <div
                                            className="absolute -top-4 -right-4 h-12 w-12 rounded-full blur-2xl opacity-50 pointer-events-none"
                                            style={{
                                                backgroundColor: item.glow,
                                            }}
                                        />

                                        <div
                                            className="flex h-10 w-10 items-center justify-center rounded-xl"
                                            style={{
                                                background: adminGradient,
                                                boxShadow:
                                                    "0 3px 10px rgba(192,82,74,0.30)",
                                            }}
                                        >
                                            <Icon className="h-5 w-5 text-white" />
                                        </div>
                                        <p
                                            className="relative text-sm font-bold"
                                            style={{ color: C.textMid }}
                                        >
                                            {item.label}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* Warning Banner */}
                       
                    </div>

                    {/* ════════════════════════════════
                         LEFT — Form Panel
                    ════════════════════════════════ */}
                    <div className="w-full lg:flex-1 flex justify-center items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-full max-w-md"
                        >
                            {/* Mobile Header */}
                            <div className="lg:hidden text-center mb-6">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="relative inline-flex items-center justify-center overflow-hidden rounded-2xl p-5 mb-3 shadow-xl"
                                    style={{ background: adminGradient }}
                                >
                                    <ShieldAlert className="h-12 w-12 text-white" />
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
                                    لوحة الإدارة
                                </h1>
                                <p
                                    className="mt-1 text-xs"
                                    style={{ color: C.textFaint }}
                                >
                                    وصول للمسؤولين المعتمدين فقط
                                </p>
                            </div>

                            {/* ── Form Card ── */}
                            <div
                                className="relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl"
                                style={{
                                    backgroundColor: C.cardBg,
                                    border: `1px solid ${C.cardBorder}`,
                                }}
                            >
                                {/* Inner glows */}
                                <div
                                    className="absolute -top-14 -right-14 h-44 w-44 rounded-full blur-3xl pointer-events-none"
                                    style={{
                                        backgroundColor: "rgba(192,82,74,0.14)",
                                    }}
                                />
                                <div
                                    className="absolute -bottom-14 -left-14 h-44 w-44 rounded-full blur-3xl pointer-events-none"
                                    style={{
                                        backgroundColor:
                                            "rgba(156,199,216,0.08)",
                                    }}
                                />

                                <div className="relative">
                                    {/* Card Header */}
                                    <div className="mb-7 text-center">
                                        <div
                                            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-md"
                                            style={{
                                                border: "1px solid rgba(192,82,74,0.35)",
                                                backgroundColor:
                                                    "rgba(192,82,74,0.10)",
                                            }}
                                        >
                                            <Shield
                                                className="h-4 w-4"
                                                style={{
                                                    color: C.primaryLight,
                                                }}
                                            />
                                            <span
                                                className="text-sm font-semibold"
                                                style={{
                                                    color: C.primaryLight,
                                                }}
                                            >
                                                دخول المسؤولين فقط
                                            </span>
                                        </div>

                                        <h2
                                            className="text-3xl md:text-4xl font-black leading-tight mb-2"
                                            style={{ color: C.textHigh }}
                                        >
                                            تسجيل الدخول
                                            <br />
                                            <span
                                                style={{
                                                    background: headingGradient,
                                                    WebkitBackgroundClip:
                                                        "text",
                                                    WebkitTextFillColor:
                                                        "transparent",
                                                    backgroundClip: "text",
                                                }}
                                            >
                                                كمسؤول
                                            </span>
                                        </h2>
                                        <p
                                            className="text-xs"
                                            style={{ color: C.textFaint }}
                                        >
                                            أدخل بيانات حساب المسؤول للمتابعة
                                        </p>
                                    </div>

                                    {/* ── Form ── */}
                                    <form
                                        onSubmit={submit}
                                        className="space-y-4"
                                    >
                                        {/* Email */}
                                        <div>
                                            <label
                                                htmlFor="email"
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
                                                    id="email"
                                                    value={data.email}
                                                    onChange={(e) =>
                                                        setData(
                                                            "email",
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="admin@mindgate.com"
                                                    autoComplete="username"
                                                    style={{
                                                        ...inputStyle(
                                                            errors.email,
                                                        ),
                                                        paddingRight: "36px",
                                                        paddingLeft: "14px",
                                                        paddingTop: "10px",
                                                        paddingBottom: "10px",
                                                    }}
                                                    onFocus={onFocus}
                                                    onBlur={onBlur(
                                                        errors.email,
                                                    )}
                                                />
                                            </div>
                                            {errors.email && (
                                                <p
                                                    className="mt-1.5 flex items-center gap-1 text-[11px]"
                                                    style={{
                                                        color: C.errorText,
                                                    }}
                                                >
                                                    <AlertCircle className="h-3 w-3 shrink-0" />
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>

                                        {/* Password */}
                                        <div>
                                            <label
                                                htmlFor="password"
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
                                                    id="password"
                                                    value={data.password}
                                                    onChange={(e) =>
                                                        setData(
                                                            "password",
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="••••••••"
                                                    autoComplete="current-password"
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
                                                    onBlur={onBlur(
                                                        errors.password,
                                                    )}
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
                                                            C.primaryLight)
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
                                                    style={{
                                                        color: C.errorText,
                                                    }}
                                                >
                                                    <AlertCircle className="h-3 w-3 shrink-0" />
                                                    {errors.password}
                                                </p>
                                            )}
                                        </div>

                                        {/* Remember + Forgot row */}
                                        <div className="flex items-center justify-between gap-2">
                                            <label className="flex cursor-pointer items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id="remember"
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
                                                    style={{
                                                        color: C.textFaint,
                                                    }}
                                                >
                                                    تذكرني
                                                </span>
                                            </label>
                                            <Link
                                                href={route("password.request")}
                                                className="text-xs font-semibold transition-colors duration-200 hover:underline"
                                                style={{
                                                    color: C.primaryLight,
                                                }}
                                                onMouseEnter={(e) =>
                                                    (e.currentTarget.style.color =
                                                        "#f5c6c3")
                                                }
                                                onMouseLeave={(e) =>
                                                    (e.currentTarget.style.color =
                                                        C.primaryLight)
                                                }
                                            >
                                                نسيت بيانات الدخول؟
                                            </Link>
                                        </div>

                                        {/* Submit */}
                                        <motion.button
                                            whileHover={{ scale: 1.015 }}
                                            whileTap={{ scale: 0.985 }}
                                            type="submit"
                                            disabled={processing}
                                            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl py-3.5 text-sm font-bold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
                                            style={{
                                                background: adminGradient,
                                                boxShadow:
                                                    "0 6px 22px rgba(192,82,74,0.38)",
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!processing)
                                                    e.currentTarget.style.boxShadow =
                                                        "0 8px 28px rgba(192,82,74,0.55)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.boxShadow =
                                                    "0 6px 22px rgba(192,82,74,0.38)";
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                            {processing ? (
                                                <>
                                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                    جارٍ التحقق...
                                                </>
                                            ) : (
                                                <>
                                                    <Shield className="h-5 w-5 shrink-0" />
                                                    دخول لوحة الإدارة
                                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                                                </>
                                            )}
                                        </motion.button>

                                        {/* Footer link */}
                                        <div
                                            className="pt-4 text-center"
                                            style={{
                                                borderTop:
                                                    "1px solid rgba(255,255,255,0.10)",
                                            }}
                                        >
                                            <p
                                                className="text-xs leading-6"
                                                style={{ color: C.textFaint }}
                                            >
                                                هذه اللوحة مخصصة للمسؤولين
                                                المعتمدين فقط.
                                                <br />
                                                للعودة إلى{" "}
                                                <Link
                                                    href={route("login")}
                                                    className="font-semibold transition-colors duration-200 hover:underline"
                                                    style={{
                                                        color: C.primaryLight,
                                                    }}
                                                    onMouseEnter={(e) =>
                                                        (e.currentTarget.style.color =
                                                            "#f5c6c3")
                                                    }
                                                    onMouseLeave={(e) =>
                                                        (e.currentTarget.style.color =
                                                            C.primaryLight)
                                                    }
                                                >
                                                    تسجيل دخول المستخدمين
                                                </Link>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* ══════════════════════════════════
                     FOOTER
                ══════════════════════════════════ */}
              
            </div>
        </div>
    );
};

export default AdminLoginPage;
