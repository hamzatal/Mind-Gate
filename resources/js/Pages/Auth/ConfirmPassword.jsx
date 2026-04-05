import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Lock,
    Home,
    LogIn,
    PhoneCall,
    Eye,
    EyeOff,
    CheckCircle2,
    AlertCircle,
    Sparkles,
    ShieldCheck,
} from "lucide-react";
import { Head, Link, useForm } from "@inertiajs/react";

const ConfirmPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [notification, setNotification] = useState(null);
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

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        setError,
        clearErrors,
    } = useForm({ password: "" });

    useEffect(() => {
        return () => reset("password");
    }, []);

    const validate = () => {
        const e = {};
        if (!data.password) e.password = "كلمة المرور مطلوبة";
        else if (data.password.length < 8)
            e.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
        else if (data.password.length > 50)
            e.password = "كلمة المرور لا تتجاوز 50 حرفاً";
        return e;
    };

    const submit = (e) => {
        e.preventDefault();
        clearErrors();
        const ve = validate();
        if (Object.keys(ve).length > 0) {
            Object.entries(ve).forEach(([k, m]) => setError(k, m));
            setNotification({
                type: "error",
                message: "يرجى إدخال كلمة مرور صحيحة.",
            });
            setTimeout(() => setNotification(null), 3000);
            return;
        }
        post(route("password.confirm"), {
            onSuccess: () => {
                setNotification({
                    type: "success",
                    message: "تم التحقق من كلمة المرور بنجاح!",
                });
                setTimeout(() => setNotification(null), 3000);
            },
            onError: () => {
                setNotification({
                    type: "error",
                    message: "فشل التحقق من كلمة المرور. يرجى المحاولة مجدداً.",
                });
                setTimeout(() => setNotification(null), 3000);
            },
            onFinish: () => reset("password"),
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
        e.target.style.borderColor = "rgba(122,167,187,0.70)";
        e.target.style.boxShadow = "0 0 0 3px rgba(122,167,187,0.18)";
    };
    const onBlur = (hasError) => (e) => {
        e.target.style.borderColor = hasError ? C.errorBorder : C.inputBorder;
        e.target.style.boxShadow = "none";
    };

    // ── Nav button style ──
    const navBtn = {
        border: `1px solid ${C.cardBorder}`,
        backgroundColor: C.cardBg,
        color: C.textMid,
    };

    return (
        <div
            dir="rtl"
            className="min-h-screen w-full flex relative overflow-hidden"
            style={{ backgroundColor: "#0f2233" }}
        >
            <Head title="تأكيد كلمة المرور - Mind Gate" />

            {/* ── Background ── */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${backgroundImage}')` }}
            />
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
                style={navBtn}
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
                style={navBtn}
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

            <Link
                href={route("login")}
                className="fixed top-4 left-4 sm:top-5 sm:left-5 z-50 flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold backdrop-blur-md transition-all duration-300 hover:scale-105"
                style={navBtn}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                        "rgba(255,255,255,0.15)")
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = C.cardBg)
                }
            >
                <LogIn className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">تسجيل الدخول</span>
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
                        className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] w-[calc(100vw-2rem)] max-w-sm"
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
                                        : "1px solid rgba(122,167,187,0.35)",
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
                 CENTER CARD
            ══════════════════════════════════ */}
            <div className="relative z-10 flex w-full flex-col items-center justify-center px-5 py-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-sm sm:max-w-md"
                >
                    {/* ── Card ── */}
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

                        <div className="relative flex flex-col items-center text-center gap-5">
                            {/* Badge */}
                            <div
                                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-md"
                                style={{
                                    border: `1px solid ${C.cardBorder}`,
                                    backgroundColor: "rgba(255,255,255,0.08)",
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
                                    منطقة آمنة
                                </span>
                            </div>

                            {/* Lock Icon */}
                            <motion.div
                                animate={{ scale: [1, 1.07, 1] }}
                                transition={{
                                    duration: 2.2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="relative overflow-hidden rounded-3xl p-6 inline-flex items-center justify-center"
                                style={{
                                    background: primaryGradient,
                                    boxShadow:
                                        "0 14px 40px rgba(122,167,187,0.38)",
                                }}
                            >
                                <div
                                    className="absolute -top-4 -right-4 h-14 w-14 rounded-full blur-2xl opacity-40 pointer-events-none"
                                    style={{
                                        backgroundColor:
                                            "rgba(255,255,255,0.5)",
                                    }}
                                />
                                <Lock className="h-12 w-12 relative text-white" />
                            </motion.div>

                            {/* Headline */}
                            <div>
                                <h2
                                    className="text-2xl sm:text-3xl font-black mb-2"
                                    style={{ color: C.textHigh }}
                                >
                                    تأكيد{" "}
                                    <span
                                        style={{
                                            background: headingGradient,
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            backgroundClip: "text",
                                        }}
                                    >
                                        كلمة المرور
                                    </span>
                                </h2>
                                <p
                                    className="text-xs sm:text-sm leading-6"
                                    style={{ color: C.textLow }}
                                >
                                    هذه منطقة محمية. يرجى تأكيد كلمة مرورك
                                    للمتابعة إلى الصفحة المطلوبة.
                                </p>
                            </div>

                            {/* Divider */}
                            <div
                                className="w-full"
                                style={{
                                    borderTop:
                                        "1px solid rgba(255,255,255,0.10)",
                                }}
                            />

                            {/* ── Form ── */}
                            <form
                                onSubmit={submit}
                                className="w-full space-y-4"
                            >
                                {/* Password */}
                                <div className="text-right">
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
                                                ...inputStyle(errors.password),
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
                                                setShowPassword(!showPassword)
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

                                {/* Submit */}
                                <motion.button
                                    whileHover={{ scale: 1.015 }}
                                    whileTap={{ scale: 0.985 }}
                                    type="submit"
                                    disabled={processing}
                                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl py-3 text-sm font-bold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
                                    style={{
                                        background: primaryGradient,
                                        boxShadow:
                                            "0 6px 22px rgba(122,167,187,0.35)",
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!processing)
                                            e.currentTarget.style.boxShadow =
                                                "0 8px 28px rgba(122,167,187,0.55)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.boxShadow =
                                            "0 6px 22px rgba(122,167,187,0.35)";
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
                                            <ShieldCheck className="h-4 w-4 shrink-0" />
                                            تأكيد كلمة المرور
                                        </>
                                    )}
                                </motion.button>

                                {/* Back to login */}
                                <div
                                    className="pt-3 text-center"
                                    style={{
                                        borderTop:
                                            "1px solid rgba(255,255,255,0.10)",
                                    }}
                                >
                                    <Link
                                        href={route("login")}
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
                                        العودة إلى تسجيل الدخول
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ConfirmPassword;
