import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    Shield,
    AlertCircle,
    CheckCircle2,
    Sparkles,
    ArrowRight,
    ShieldAlert,
    KeyRound,
    UserCog,
} from "lucide-react";
import { Head, Link, useForm } from "@inertiajs/react";

const AdminLoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [notification, setNotification] = useState(null);
    const backgroundImage = "/images/word.png";

    // ── Color tokens ──
    const C = {
        // Admin accent — red
        primary: "#c0524a",
        primaryMid: "#a84440",
        primaryLight: "#e07a72",
        // Shared light palette
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
        glowLeft: "rgba(156,199,216,0.14)",
    };

    const adminGradient = `linear-gradient(135deg, ${C.primary}, ${C.primaryMid})`;
    const headingGradient =
        "linear-gradient(135deg, #f5c6c3, #e07a72, #c0524a)";

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

    const validateEmail = (v) =>
        !v
            ? "البريد الإلكتروني مطلوب"
            : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
              ? "يرجى إدخال بريد إلكتروني صحيح"
              : v.length > 100
                ? "البريد لا يتجاوز 100 حرف"
                : null;
    const validatePassword = (v) =>
        !v
            ? "كلمة المرور مطلوبة"
            : v.length < 8
              ? "كلمة المرور يجب أن تكون 8 أحرف على الأقل"
              : null;

    const submit = (e) => {
        e.preventDefault();
        clearErrors();
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
            setTimeout(() => setNotification(null), 3000);
            return;
        }
        post(route("admin.login"), {
            onError: () => {
                setNotification({
                    type: "error",
                    message: "بيانات الدخول غير صحيحة.",
                });
                setTimeout(() => setNotification(null), 3000);
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

    // ── Left panel points ──
    const points = [
        { icon: ShieldAlert, text: "وصول حصري للمشرفين المعتمدين" },
        { icon: KeyRound, text: "صلاحيات إدارة كاملة للمنصة" },
        { icon: UserCog, text: "إدارة المستخدمين والمحتوى" },
    ];

    return (
        <div
            dir="rtl"
            className="min-h-screen w-full flex relative overflow-hidden"
            style={{ backgroundColor: "#1a0f0f" }}
        >
            <Head title="Admin Login - Mind Gate" />

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
                                        ? "rgba(192,82,74,0.18)"
                                        : "rgba(58,168,124,0.15)",
                                border:
                                    notification.type === "error"
                                        ? "1px solid rgba(192,82,74,0.38)"
                                        : "1px solid rgba(58,168,124,0.35)",
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
                                    style={{ color: "#3AA87C" }}
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
                                style={{ color: C.primaryLight }}
                            />
                            <span
                                className="text-xs font-semibold tracking-wide"
                                style={{ color: C.textMid }}
                            >
                                بوابة الإدارة المحمية
                            </span>
                        </motion.div>

                        {/* Gradient Icon Box */}
                        <motion.div
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 0.45,
                                type: "spring",
                                stiffness: 130,
                            }}
                            className="relative overflow-hidden rounded-3xl p-8 inline-flex items-center justify-center"
                            style={{
                                background: adminGradient,
                                boxShadow: "0 16px 48px rgba(192,82,74,0.35)",
                                width: "fit-content",
                            }}
                        >
                            <div
                                className="absolute -top-6 -right-6 h-20 w-20 rounded-full blur-2xl opacity-40 pointer-events-none"
                                style={{
                                    backgroundColor: "rgba(255,255,255,0.5)",
                                }}
                            />
                            <Shield className="h-20 w-20 relative text-white" />
                        </motion.div>

                        {/* Headline */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h1
                                className="text-4xl xl:text-5xl font-black leading-tight"
                                style={{ color: C.textHigh }}
                            >
                                بوابة
                                <br />
                                <span
                                    style={{
                                        background: headingGradient,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    المشرفين
                                </span>
                            </h1>
                            <p
                                className="mt-3 text-sm leading-7"
                                style={{ color: C.textLow }}
                            >
                                وصول حصري للمشرفين المعتمدين فقط — يرجى التأكد
                                من صلاحيتك قبل الدخول.
                            </p>
                        </motion.div>

                        {/* Feature Points */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col gap-2.5"
                        >
                            {points.map((pt, i) => {
                                const Icon = pt.icon;
                                return (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 rounded-2xl px-4 py-3 backdrop-blur-md"
                                        style={{
                                            backgroundColor:
                                                "rgba(255,255,255,0.07)",
                                            border: "1px solid rgba(255,255,255,0.14)",
                                        }}
                                    >
                                        <div
                                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                                            style={{
                                                background: adminGradient,
                                                boxShadow:
                                                    "0 3px 10px rgba(192,82,74,0.32)",
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

                        {/* Warning Banner */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-start gap-3 rounded-2xl px-4 py-3"
                            style={{
                                backgroundColor: "rgba(192,82,74,0.12)",
                                border: "1px solid rgba(192,82,74,0.30)",
                            }}
                        >
                            <ShieldAlert
                                className="mt-0.5 h-4 w-4 shrink-0"
                                style={{ color: C.primaryLight }}
                            />
                            <p
                                className="text-[11px] leading-5"
                                style={{ color: C.textLow }}
                            >
                                أي محاولة وصول غير مصرّح بها ستُسجَّل وتُراقَب.
                            </p>
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
                                style={{ background: adminGradient }}
                            >
                                <Shield className="h-12 w-12 text-white" />
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
                                Admin Portal
                            </h1>
                            <p
                                className="mt-1 text-xs"
                                style={{ color: C.textFaint }}
                            >
                                بوابة الإدارة المحمية
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
                                    backgroundColor: "rgba(192,82,74,0.14)",
                                }}
                            />
                            <div
                                className="absolute -bottom-14 -left-14 h-40 w-40 rounded-full blur-3xl pointer-events-none"
                                style={{
                                    backgroundColor: "rgba(156,199,216,0.08)",
                                }}
                            />

                            <div className="relative">
                                {/* Card Badge */}
                                <div className="mb-5 text-center">
                                    <div
                                        className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-md"
                                        style={{
                                            border: "1px solid rgba(192,82,74,0.35)",
                                            backgroundColor:
                                                "rgba(192,82,74,0.10)",
                                        }}
                                    >
                                        <Shield
                                            className="h-3.5 w-3.5"
                                            style={{ color: C.primaryLight }}
                                        />
                                        <span
                                            className="text-xs font-semibold"
                                            style={{ color: C.primaryLight }}
                                        >
                                            وصول مشرف
                                        </span>
                                    </div>

                                    <h3
                                        className="text-2xl sm:text-3xl font-black"
                                        style={{ color: C.textHigh }}
                                    >
                                        تسجيل دخول المشرف
                                    </h3>
                                    <p
                                        className="mt-1 text-xs"
                                        style={{ color: C.textFaint }}
                                    >
                                        للمشرفين المعتمدين فقط
                                    </p>
                                </div>

                                {/* ── Form ── */}
                                <form onSubmit={submit} className="space-y-4">
                                    {/* Email */}
                                    <div>
                                        <label
                                            className="mb-1.5 block text-xs font-semibold"
                                            style={{ color: C.textLow }}
                                        >
                                            البريد الإلكتروني للمشرف
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
                                                placeholder="admin@mindgate.com"
                                                autoComplete="username"
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
                                            كلمة مرور المشرف
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
                                                style={{ color: C.errorText }}
                                            >
                                                <AlertCircle className="h-3 w-3 shrink-0" />
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>

                                    {/* Forgot */}
                                    <div className="flex justify-start">
                                        <Link
                                            href={route("password.request")}
                                            className="text-xs font-semibold transition-colors duration-200 hover:underline"
                                            style={{ color: C.primaryLight }}
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
                                        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl py-3 text-sm font-bold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
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
                                                <Shield className="h-4 w-4 shrink-0" />
                                                دخول لوحة الإدارة
                                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                                            </>
                                        )}
                                    </motion.button>

                                    {/* Back to user login */}
                                    <div
                                        className="pt-4 text-center"
                                        style={{
                                            borderTop:
                                                "1px solid rgba(255,255,255,0.10)",
                                        }}
                                    >
                                        <p
                                            className="text-xs"
                                            style={{ color: C.textFaint }}
                                        >
                                            العودة إلى{" "}
                                            <Link
                                                href={route("login")}
                                                className="font-bold transition-colors duration-200 hover:underline"
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
        </div>
    );
};

export default AdminLoginPage;
