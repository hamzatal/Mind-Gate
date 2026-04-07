import React, { useMemo, useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import AuthLayout from "@/Layouts/AuthLayout";

const C = {
    primary: "#7aa7bb",
    textLow: "#8db0c0",
};

const L = {
    textLow: "#4a6a7a",
};

export default function ResetPassword({ email, token }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const locale = localStorage.getItem("mindgate_locale") || "en";
    const isArabic = locale === "ar";
    const isDarkMode = localStorage.getItem("darkMode") === "true";

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token || "",
        email: email || "",
        password: "",
        password_confirmation: "",
    });

    const t = useMemo(
        () => ({
            title: isArabic ? "إعادة تعيين كلمة المرور" : "Reset Password",
            email: isArabic ? "البريد الإلكتروني" : "Email address",
            password: isArabic ? "كلمة المرور الجديدة" : "New password",
            confirmPassword: isArabic
                ? "تأكيد كلمة المرور"
                : "Confirm password",
            submit: isArabic ? "حفظ كلمة المرور" : "Save password",
            saving: isArabic ? "جاري الحفظ..." : "Saving...",
            back: isArabic ? "العودة لتسجيل الدخول" : "Back to login",
        }),
        [isArabic],
    );

    const dc = (darkValue, lightValue) => (isDarkMode ? darkValue : lightValue);

    const submit = (e) => {
        e.preventDefault();
        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <AuthLayout title={t.title}>
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
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="w-full py-3 sm:py-3.5 px-4 rounded-2xl border outline-none transition-all text-sm sm:text-base"
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

                <div>
                    <label
                        className="block text-xs sm:text-sm font-semibold mb-2"
                        style={{ color: dc("#d1e0e7", "#2d4a5c") }}
                    >
                        {t.confirmPassword}
                    </label>
                    <div className="relative">
                        <Lock
                            size={17}
                            className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "right-4" : "left-4"}`}
                            color={dc(C.textLow, L.textLow)}
                        />
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            className={`w-full ${isArabic ? "pr-11 pl-11" : "pl-11 pr-11"} py-3 sm:py-3.5 rounded-2xl border outline-none transition-all text-sm sm:text-base`}
                            style={{
                                backgroundColor: dc(
                                    "rgba(255,255,255,0.07)",
                                    "#ffffff",
                                ),
                                borderColor: errors.password_confirmation
                                    ? "#ef4444"
                                    : dc("rgba(255,255,255,0.18)", "#c8dde8"),
                                color: dc("#f0f7fa", "#162636"),
                            }}
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword((prev) => !prev)
                            }
                            className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-4" : "right-4"}`}
                        >
                            {showConfirmPassword ? (
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
                    {errors.password_confirmation && (
                        <p className="text-xs mt-2 text-red-500">
                            {errors.password_confirmation}
                        </p>
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
                    {processing ? t.saving : t.submit}
                    {!processing && <ArrowRight size={16} />}
                </button>
            </form>

            <div className="mt-5 text-center">
                <Link
                    href={route("login")}
                    className="text-xs sm:text-sm font-bold"
                    style={{ color: C.primary }}
                >
                    {t.back}
                </Link>
            </div>
        </AuthLayout>
    );
}
