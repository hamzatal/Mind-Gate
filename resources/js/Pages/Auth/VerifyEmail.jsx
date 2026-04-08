import React, { useMemo } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Mail, ArrowRight } from "lucide-react";
import AuthLayout from "@/Layouts/AuthLayout";

const C = { primary: "#7aa7bb", textLow: "#8db0c0" };
const L = { textLow: "#4a6a7a" };

export default function VerifyEmail({ status }) {
    const locale = localStorage.getItem("mindgate_locale") || "en";
    const isArabic = locale === "ar";
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    const dc = (d, l) => (isDarkMode ? d : l);

    const { post, processing } = useForm({});

    const t = useMemo(
        () => ({
            title: isArabic ? "تأكيد البريد الإلكتروني" : "Verify Email",
            desc: isArabic
                ? "شكرًا لتسجيلك. يرجى تأكيد بريدك الإلكتروني عبر الرابط الذي تم إرساله إليك."
                : "Thanks for signing up. Please verify your email address using the link we sent you.",
            resend: isArabic
                ? "إعادة إرسال الرابط"
                : "Resend verification link",
            sending: isArabic ? "جاري الإرسال..." : "Sending...",
            logout: isArabic ? "تسجيل الخروج" : "Log out",
        }),
        [isArabic],
    );

    const submit = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <AuthLayout title={t.title} status={status}>
            <div
                className="mb-5 p-4 rounded-2xl"
                style={{
                    backgroundColor: dc("rgba(188,220,207,0.08)", "#f2f8f5"),
                    border: `1px solid ${dc("rgba(188,220,207,0.16)", "#d8ebe1")}`,
                }}
            >
                <div className="flex items-start gap-3">
                    <Mail size={18} color={C.primary} className="mt-1" />
                    <p
                        className="text-xs sm:text-sm leading-6"
                        style={{ color: dc(C.textLow, L.textLow) }}
                    >
                        {t.desc}
                    </p>
                </div>
            </div>

            <form onSubmit={submit} className="space-y-4">
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
                    {processing ? t.sending : t.resend}
                    {!processing && <ArrowRight size={16} />}
                </button>
            </form>

            <div className="mt-4 text-center">
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="font-bold text-xs sm:text-sm"
                    style={{ color: C.primary }}
                >
                    {t.logout}
                </Link>
            </div>
        </AuthLayout>
    );
}
