import React, { useMemo } from "react";
import { Link, useForm } from "@inertiajs/react";
import { MailCheck, RefreshCcw, LogOut } from "lucide-react";
import AuthLayout from "@/Layouts/AuthLayout";

const C = {
    primary: "#7aa7bb",
    textLow: "#8db0c0",
};

const L = {
    textLow: "#4a6a7a",
};

export default function VerifyEmail({ status }) {
    const locale = localStorage.getItem("mindgate_locale") || "en";
    const isArabic = locale === "ar";
    const isDarkMode = localStorage.getItem("darkMode") === "true";

    const { post, processing } = useForm({});

    const t = useMemo(
        () => ({
            title: isArabic ? "تأكيد البريد الإلكتروني" : "Verify Email",
            desc: isArabic
                ? "شكرًا لتسجيلك. قبل البدء، يرجى التحقق من بريدك الإلكتروني عبر الرابط الذي أرسلناه إليك."
                : "Thanks for signing up. Before getting started, please verify your email address by clicking the link we sent you.",
            resend: isArabic
                ? "إعادة إرسال رابط التحقق"
                : "Resend verification email",
            resending: isArabic ? "جاري الإرسال..." : "Sending...",
            logout: isArabic ? "تسجيل الخروج" : "Log out",
            sent: isArabic
                ? "تم إرسال رابط تحقق جديد إلى بريدك الإلكتروني."
                : "A new verification link has been sent to your email address.",
        }),
        [isArabic],
    );

    const dc = (darkValue, lightValue) => (isDarkMode ? darkValue : lightValue);

    const submit = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <AuthLayout title={t.title}>
            <div
                className="mb-5 rounded-2xl p-4"
                style={{
                    backgroundColor: dc("rgba(122,167,187,0.08)", "#f3f8fb"),
                    border: `1px solid ${dc("rgba(122,167,187,0.16)", "#d7e6ee")}`,
                }}
            >
                <div className="flex items-start gap-3">
                    <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                        style={{
                            background:
                                "linear-gradient(135deg, #7aa7bb, #6797ab)",
                        }}
                    >
                        <MailCheck size={18} color="#fff" />
                    </div>
                    <p
                        className="text-xs sm:text-sm leading-6"
                        style={{ color: dc(C.textLow, L.textLow) }}
                    >
                        {t.desc}
                    </p>
                </div>
            </div>

            {status === "verification-link-sent" && (
                <div
                    className="mb-4 rounded-2xl p-3.5"
                    style={{
                        backgroundColor: dc(
                            "rgba(188,220,207,0.08)",
                            "#f2f8f5",
                        ),
                        border: `1px solid ${dc("rgba(188,220,207,0.16)", "#d8ebe1")}`,
                    }}
                >
                    <p
                        className="text-xs sm:text-sm"
                        style={{ color: dc(C.textLow, L.textLow) }}
                    >
                        {t.sent}
                    </p>
                </div>
            )}

            <form
                onSubmit={submit}
                className="space-y-4"
                dir={isArabic ? "rtl" : "ltr"}
            >
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
                    <RefreshCcw size={16} />
                    {processing ? t.resending : t.resend}
                </button>
            </form>

            <div className="mt-4 text-center">
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold"
                    style={{ color: C.primary }}
                >
                    <LogOut size={16} />
                    {t.logout}
                </Link>
            </div>
        </AuthLayout>
    );
}
