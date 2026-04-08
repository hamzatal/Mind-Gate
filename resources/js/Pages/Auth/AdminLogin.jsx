import React, { useMemo, useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import AuthLayout from "@/Layouts/AuthLayout";

const C = {
    admin: "#dc2626",
    textLow: "#8db0c0",
};

const L = {
    textLow: "#4a6a7a",
};

export default function AdminLogin({ status = null }) {
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
            email: isArabic ? "البريد الإلكتروني" : "Email address",
            password: isArabic ? "كلمة المرور" : "Password",
            remember: isArabic ? "تذكرني" : "Remember me",
            forgot: isArabic ? "نسيت كلمة المرور؟" : "Forgot password?",
            button: isArabic ? "تسجيل دخول الإدارة" : "Admin Sign in",
            signing: isArabic ? "جاري تسجيل الدخول..." : "Signing in...",
            adminBoxTitle: isArabic ? "بوابة الإدارة" : "Administration Portal",
            adminBoxText: isArabic
                ? "هذه الصفحة مخصصة للمشرفين فقط للوصول إلى لوحة التحكم وإدارة النظام."
                : "This page is intended for administrators to access the control panel and manage the platform.",
            backToUser: isArabic ? "مستخدم ؟" : "User?",
            loginError: isArabic
                ? "يرجى التحقق من بيانات دخول الإدارة."
                : "Please check your admin credentials.",
        }),
        [isArabic],
    );

    const dc = (darkValue, lightValue) => (isDarkMode ? darkValue : lightValue);

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.login.submit"), {
            onFinish: () => reset("password"),
            onError: () => toast.error(t.loginError),
        });
    };

    return (
        <AuthLayout title={t.title} status={status}>
            <div
                className="mb-5 rounded-2xl p-4"
                style={{
                    backgroundColor: dc("rgba(220,38,38,0.10)", "#fef2f2"),
                    border: `1px solid ${dc("rgba(220,38,38,0.20)", "#fecaca")}`,
                }}
            >
                <div className="flex items-start gap-3">
                    <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                        style={{
                            background:
                                "linear-gradient(135deg, #dc2626, #b91c1c)",
                        }}
                    >
                        <ShieldCheck size={18} color="#fff" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3
                            className="text-sm font-bold mb-1"
                            style={{ color: dc("#f0f7fa", "#162636") }}
                        >
                            {t.adminBoxTitle}
                        </h3>
                        <p
                            className="text-[11px] sm:text-xs leading-5"
                            style={{ color: dc(C.textLow, L.textLow) }}
                        >
                            {t.adminBoxText}
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
                            className={`w-full ${isArabic ? "pr-11 pl-4" : "pl-11 pr-4"} py-3 sm:py-3.5 rounded-2xl border outline-none text-sm sm:text-base`}
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
                            className={`w-full ${isArabic ? "pr-11 pl-11" : "pl-11 pr-11"} py-3 sm:py-3.5 rounded-2xl border outline-none text-sm sm:text-base`}
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
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
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

                    <Link
                        href={route("password.request")}
                        className="text-xs sm:text-sm font-semibold"
                        style={{ color: C.admin }}
                    >
                        {t.forgot}
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 rounded-2xl text-white font-bold text-sm sm:text-base"
                    style={{
                        background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                        boxShadow: "0 10px 24px rgba(220,38,38,0.28)",
                        opacity: processing ? 0.7 : 1,
                    }}
                >
                    {processing ? t.signing : t.button}
                    {!processing && <ArrowRight size={16} />}
                </button>
            </form>

            <div className="mt-5 text-center">
                <p
                    className="text-xs sm:text-sm"
                    style={{ color: dc(C.textLow, L.textLow) }}
                >
                    <Link
                        href={route("login")}
                        className="font-bold"
                        style={{ color: C.admin }}
                    >
                        {t.backToUser}
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
