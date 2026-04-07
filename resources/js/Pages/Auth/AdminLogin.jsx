import React, { useMemo, useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import AuthLayout from "@/Layouts/AuthLayout";

const C = {
    primary: "#7aa7bb",
    textLow: "#8db0c0",
};

const L = {
    textLow: "#4a6a7a",
};

export default function AdminLogin({ canResetPassword = true, status = null }) {
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
            title: isArabic ? "دخول الإدارة" : "Admin Login",
            subtitle: isArabic
                ? "تسجيل الدخول إلى لوحة الإدارة"
                : "Sign in to the admin control panel",
            email: isArabic ? "البريد الإلكتروني" : "Email address",
            password: isArabic ? "كلمة المرور" : "Password",
            remember: isArabic ? "تذكرني" : "Remember me",
            forgot: isArabic ? "نسيت كلمة المرور؟" : "Forgot password?",
            submit: isArabic ? "دخول الإدارة" : "Admin sign in",
            submitting: isArabic ? "جاري تسجيل الدخول..." : "Signing in...",
            backUser: isArabic
                ? "العودة لتسجيل دخول المستخدم"
                : "Back to user login",
            emailPlaceholder: isArabic
                ? "admin@email.com"
                : "admin@example.com",
            passwordPlaceholder: isArabic
                ? "أدخل كلمة المرور"
                : "Enter your password",
            error: isArabic
                ? "يرجى التحقق من بيانات دخول الإدارة."
                : "Please check your admin login details.",
            note: isArabic
                ? "هذه الصفحة مخصصة للمشرفين والإدارة فقط للوصول إلى أدوات التحكم والمتابعة."
                : "This page is intended for administrators only to access control and management tools.",
        }),
        [isArabic],
    );

    const dc = (darkValue, lightValue) => (isDarkMode ? darkValue : lightValue);

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.login"), {
            onFinish: () => reset("password"),
            onError: () => toast.error(t.error),
        });
    };

    return (
        <AuthLayout title={t.title} status={status}>
            <div
                className="mb-5 rounded-2xl p-4"
                style={{
                    backgroundColor: dc("rgba(122,167,187,0.08)", "#f3f8fb"),
                    border: `1px solid ${dc("rgba(122,167,187,0.16)", "#d7e6ee")}`,
                }}
            >
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center"
                        style={{
                            background:
                                "linear-gradient(135deg, #7aa7bb, #6797ab)",
                        }}
                    >
                        <ShieldCheck size={18} color="#fff" />
                    </div>
                    <div>
                        <h3
                            className="text-sm font-bold"
                            style={{ color: dc("#f0f7fa", "#162636") }}
                        >
                            {t.subtitle}
                        </h3>
                        <p
                            className="text-xs mt-1"
                            style={{ color: dc(C.textLow, L.textLow) }}
                        >
                            {t.note}
                        </p>
                    </div>
                </div>
            </div>

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
                            className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "right-4" : "left-4"}`}
                            color={dc(C.textLow, L.textLow)}
                        />
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className={`w-full ${isArabic ? "pr-11 pl-4" : "pl-11 pr-4"} py-3 sm:py-3.5 rounded-2xl border outline-none transition-all text-sm sm:text-base`}
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
                            className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "right-4" : "left-4"}`}
                            color={dc(C.textLow, L.textLow)}
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className={`w-full ${isArabic ? "pr-11 pl-11" : "pl-11 pr-11"} py-3 sm:py-3.5 rounded-2xl border outline-none transition-all text-sm sm:text-base`}
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
                            className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-4" : "right-4"}`}
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
                    {processing ? t.submitting : t.submit}
                    {!processing && <ArrowRight size={16} />}
                </button>
            </form>

            <div className="mt-5 text-center">
                <Link
                    href={route("login")}
                    className="text-xs sm:text-sm font-bold"
                    style={{ color: C.primary }}
                >
                    {t.backUser}
                </Link>
            </div>
        </AuthLayout>
    );
}
