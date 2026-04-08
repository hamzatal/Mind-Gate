import React, { useMemo } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Mail, ArrowRight } from "lucide-react";
import AuthLayout from "@/Layouts/AuthLayout";

const C = { primary: "#7aa7bb", textLow: "#8db0c0" };
const L = { textLow: "#4a6a7a" };

export default function ForgotPassword({ status }) {
    const locale = localStorage.getItem("mindgate_locale") || "en";
    const isArabic = locale === "ar";
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    const dc = (d, l) => (isDarkMode ? d : l);

    const { data, setData, post, processing, errors } = useForm({ email: "" });

    const t = useMemo(
        () => ({
            title: isArabic ? "استعادة كلمة المرور" : "Forgot Password",
            desc: isArabic
                ? "أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور."
                : "Enter your email and we will send you a password reset link.",
            email: isArabic ? "البريد الإلكتروني" : "Email address",
            emailPlaceholder: isArabic
                ? "example@email.com"
                : "you@example.com",
            submit: isArabic ? "إرسال الرابط" : "Send reset link",
            sending: isArabic ? "جاري الإرسال..." : "Sending...",
            back: isArabic ? "العودة لتسجيل الدخول" : "Back to login",
        }),
        [isArabic],
    );

    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <AuthLayout title={t.title} status={status}>
            <p
                className="text-xs sm:text-sm leading-6 mb-5"
                style={{ color: dc(C.textLow, L.textLow) }}
            >
                {t.desc}
            </p>

            <form
                onSubmit={submit}
                className="space-y-4"
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
                            className={`w-full ${isArabic ? "pr-11 pl-4" : "pl-11 pr-4"} py-3 rounded-2xl border outline-none text-sm`}
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
                        />
                    </div>
                    {errors.email && (
                        <p className="text-xs mt-2 text-red-500">
                            {errors.email}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-white font-bold text-sm"
                    style={{
                        background: "linear-gradient(135deg, #7aa7bb, #6797ab)",
                        boxShadow: "0 10px 24px rgba(122,167,187,0.30)",
                        opacity: processing ? 0.7 : 1,
                    }}
                >
                    {processing ? t.sending : t.submit}
                    {!processing && <ArrowRight size={16} />}
                </button>
            </form>

            <div className="mt-4 text-center">
                <Link
                    href={route("login")}
                    className="font-bold text-xs sm:text-sm"
                    style={{ color: C.primary }}
                >
                    {t.back}
                </Link>
            </div>
        </AuthLayout>
    );
}
