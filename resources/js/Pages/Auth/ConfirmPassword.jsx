import React, { useMemo, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import AuthLayout from "@/Layouts/AuthLayout";

const C = { primary: "#7aa7bb", textLow: "#8db0c0" };
const L = { textLow: "#4a6a7a" };

export default function ConfirmPassword() {
    const [showPassword, setShowPassword] = useState(false);

    const locale = localStorage.getItem("mindgate_locale") || "en";
    const isArabic = locale === "ar";
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    const dc = (d, l) => (isDarkMode ? d : l);

    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    const t = useMemo(
        () => ({
            title: isArabic ? "تأكيد كلمة المرور" : "Confirm Password",
            desc: isArabic
                ? "هذه منطقة آمنة. يرجى تأكيد كلمة المرور للمتابعة."
                : "This is a secure area. Please confirm your password to continue.",
            password: isArabic ? "كلمة المرور" : "Password",
            submit: isArabic ? "تأكيد" : "Confirm",
            submitting: isArabic ? "جاري التأكيد..." : "Confirming...",
        }),
        [isArabic],
    );

    const submit = (e) => {
        e.preventDefault();
        post(route("password.confirm"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <AuthLayout title={t.title}>
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
                            className={`w-full ${isArabic ? "pr-11 pl-11" : "pl-11 pr-11"} py-3 rounded-2xl border outline-none text-sm`}
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
                    {processing ? t.submitting : t.submit}
                    {!processing && <ArrowRight size={16} />}
                </button>
            </form>
        </AuthLayout>
    );
}
