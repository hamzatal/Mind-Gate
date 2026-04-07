import React, { useMemo, useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import AuthLayout from "@/Layouts/AuthLayout";

const C = {
    primary: "#7aa7bb",
    textLow: "#8db0c0",
};

const L = {
    textLow: "#4a6a7a",
};

export default function Login({ canResetPassword = true, status = null }) {
    const [showPassword, setShowPassword] = useState(false);

    const locale = localStorage.getItem("mindgate_locale") || "en";
    const isArabic = locale === "ar";
    const isDarkMode = localStorage.getItem("darkMode") === "true";

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const t = useMemo(
        () => ({
            title: isArabic ? "تسجيل الدخول" : "Login",
            email: isArabic ? "البريد الإلكتروني" : "Email address",
            password: isArabic ? "كلمة المرور" : "Password",
            emailPlaceholder: isArabic
                ? "example@email.com"
                : "you@example.com",
            passwordPlaceholder: isArabic
                ? "أدخل كلمة المرور"
                : "Enter your password",
            remember: isArabic ? "تذكرني" : "Remember me",
            forgot: isArabic ? "نسيت كلمة المرور؟" : "Forgot password?",
            button: isArabic ? "تسجيل الدخول" : "Sign in",
            signing: isArabic ? "جاري تسجيل الدخول..." : "Signing in...",
            noAccount: isArabic ? "ليس لديك حساب؟" : "Don't have an account?",
            create: isArabic ? "إنشاء حساب" : "Create one",
            boxText: isArabic
                ? "ادخل للوصول إلى التقييمات، تتبع المزاج، والمواعيد، مع المختصين."
                : "Sign in to access assessments, mood tracking, appointments, and specialist follow-up.",
            loginError: isArabic
                ? "يرجى التحقق من بيانات تسجيل الدخول."
                : "Please check your login details.",
          
            adminDesc: isArabic
                ? "إذا كنت مشرفًا أو مسؤول نظام يمكنك الدخول من هنا."
                : "If you are an administrator or system manager, sign in from here.",
        }),
        [isArabic],
    );

    const dc = (darkValue, lightValue) => (isDarkMode ? darkValue : lightValue);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
            onError: () => toast.error(t.loginError),
        });
    };

    return (
        <AuthLayout title={t.title} status={status}>
            <form
                onSubmit={submit}
                className="space-y-4 sm:space-y-5"
                dir={isArabic ? "rtl" : "ltr"}
            >
                <div>
                    <label
                        className="block text-xs sm:text-sm font-semibold mb-2"
                        style={{ color: dc("#d1e0e7", "#2d4a5c") }}
                    >
                        {t.email}
                    </label>
                    <div className="relative">
                        <Mail
                            size={17}
                            className={`absolute top-1/2 -translate-y-1/2 ${
                                isArabic ? "right-4" : "left-4"
                            }`}
                            color={dc(C.textLow, L.textLow)}
                        />
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className={`w-full ${
                                isArabic ? "pr-11 pl-4" : "pl-11 pr-4"
                            } py-3 sm:py-3.5 rounded-2xl border outline-none transition-all text-sm sm:text-base`}
                            style={{
                                backgroundColor: dc(
                                    "rgba(255,255,255,0.07)",
                                    "#ffffff",
                                ),
                                borderColor: errors.email
                                    ? "#ef4444"
                                    : dc("rgba(255,255,255,0.18)", "#c8dde8"),
                                color: dc("#f0f7fa", "#162636"),
                            }}
                            placeholder={t.emailPlaceholder}
                            autoComplete="username"
                        />
                    </div>
                    {errors.email && (
                        <p className="text-xs mt-2 text-red-500">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        className="block text-xs sm:text-sm font-semibold mb-2"
                        style={{ color: dc("#d1e0e7", "#2d4a5c") }}
                    >
                        {t.password}
                    </label>
                    <div className="relative">
                        <Lock
                            size={17}
                            className={`absolute top-1/2 -translate-y-1/2 ${
                                isArabic ? "right-4" : "left-4"
                            }`}
                            color={dc(C.textLow, L.textLow)}
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className={`w-full ${
                                isArabic ? "pr-11 pl-11" : "pl-11 pr-11"
                            } py-3 sm:py-3.5 rounded-2xl border outline-none transition-all text-sm sm:text-base`}
                            style={{
                                backgroundColor: dc(
                                    "rgba(255,255,255,0.07)",
                                    "#ffffff",
                                ),
                                borderColor: errors.password
                                    ? "#ef4444"
                                    : dc("rgba(255,255,255,0.18)", "#c8dde8"),
                                color: dc("#f0f7fa", "#162636"),
                            }}
                            placeholder={t.passwordPlaceholder}
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className={`absolute top-1/2 -translate-y-1/2 ${
                                isArabic ? "left-4" : "right-4"
                            }`}
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? (
                                <EyeOff
                                    size={17}
                                    color={dc(C.textLow, L.textLow)}
                                />
                            ) : (
                                <Eye
                                    size={17}
                                    color={dc(C.textLow, L.textLow)}
                                />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-xs mt-2 text-red-500">
                            {errors.password}
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-between gap-3">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                            className="rounded border-gray-300"
                        />
                        <span
                            className="text-xs sm:text-sm"
                            style={{ color: dc(C.textLow, L.textLow) }}
                        >
                            {t.remember}
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="text-xs sm:text-sm font-semibold"
                            style={{ color: C.primary }}
                        >
                            {t.forgot}
                        </Link>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 rounded-2xl text-white font-bold transition-all text-sm sm:text-base"
                    style={{
                        background: "linear-gradient(135deg, #7aa7bb, #6797ab)",
                        boxShadow: "0 10px 24px rgba(122,167,187,0.30)",
                        opacity: processing ? 0.7 : 1,
                    }}
                >
                    {processing ? t.signing : t.button}
                    {!processing && <ArrowRight size={16} />}
                </button>
            </form>
            <div className="mt-5 text-center space-y-2">
                <p
                    className="text-xs sm:text-sm"
                    style={{ color: dc(C.textLow, L.textLow) }}
                >
                    {t.noAccount}{" "}
                    <Link
                        href={route("register")}
                        className="font-bold"
                        style={{ color: C.primary }}
                    >
                        {t.create}
                    </Link>
                </p>

                <p
                    className="text-xs sm:text-sm"
                    style={{ color: dc(C.textLow, L.textLow) }}
                >
                    <Link
                        href={route("admin.login")}
                        className="font-bold"
                        style={{ color: C.primary }}
                    >
                        {isArabic ? "أدمن ؟" : "Admin?"}
                    </Link>
                </p>
            </div>
            <div
                className="mt-5 p-3.5 sm:p-4 rounded-2xl"
                style={{
                    backgroundColor: dc("rgba(188,220,207,0.08)", "#f2f8f5"),
                    border: `1px solid ${dc("rgba(188,220,207,0.16)", "#d8ebe1")}`,
                }}
            >
                <p
                    className="text-[11px] sm:text-xs leading-5 sm:leading-6"
                    style={{ color: dc(C.textLow, L.textLow) }}
                >
                    {t.boxText}
                </p>
            </div>

            
        </AuthLayout>
    );
}
