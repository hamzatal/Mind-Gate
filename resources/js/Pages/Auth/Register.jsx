import React, { useMemo, useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Phone,
    CalendarDays,
    ArrowRight,
} from "lucide-react";
import AuthLayout from "@/Layouts/AuthLayout";

const C = {
    primary: "#7aa7bb",
    textLow: "#8db0c0",
};

const L = {
    textLow: "#4a6a7a",
};

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const locale = localStorage.getItem("mindgate_locale") || "en";
    const isArabic = locale === "ar";
    const isDarkMode = localStorage.getItem("darkMode") === "true";

    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: "",
        email: "",
        phone: "",
        date_of_birth: "",
        gender: "",
        password: "",
        password_confirmation: "",
    });

    const t = useMemo(
        () => ({
            title: isArabic ? "إنشاء حساب" : "Register",
            fullName: isArabic ? "الاسم الكامل" : "Full name",
            email: isArabic ? "البريد الإلكتروني" : "Email address",
            phone: isArabic ? "رقم الهاتف" : "Phone",
            dob: isArabic ? "تاريخ الميلاد" : "Date of birth",
            gender: isArabic ? "الجنس" : "Gender",
            male: isArabic ? "ذكر" : "Male",
            female: isArabic ? "أنثى" : "Female",
            password: isArabic ? "كلمة المرور" : "Password",
            confirmPassword: isArabic
                ? "تأكيد كلمة المرور"
                : "Confirm password",
            fullNamePlaceholder: isArabic
                ? "أدخل الاسم الكامل"
                : "Enter your full name",
            emailPlaceholder: isArabic
                ? "example@email.com"
                : "you@example.com",
            phonePlaceholder: isArabic ? "07XXXXXXXX" : "07XXXXXXXX",
            passwordPlaceholder: isArabic
                ? "أدخل كلمة المرور"
                : "Enter your password",
            confirmPasswordPlaceholder: isArabic
                ? "أعد إدخال كلمة المرور"
                : "Re-enter your password",
            submit: isArabic ? "إنشاء الحساب" : "Create account",
            submitting: isArabic ? "جاري الإنشاء..." : "Creating account...",
            haveAccount: isArabic
                ? "لديك حساب بالفعل؟"
                : "Already have an account?",
            login: isArabic ? "تسجيل الدخول" : "Login",
         
        }),
        [isArabic],
    );

    const dc = (darkValue, lightValue) => (isDarkMode ? darkValue : lightValue);

    const inputStyle = {
        backgroundColor: dc("rgba(255,255,255,0.07)", "#ffffff"),
        borderColor: dc("rgba(255,255,255,0.18)", "#c8dde8"),
        color: dc("#f0f7fa", "#162636"),
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <AuthLayout title={t.title}>
            <form
                onSubmit={submit}
                className="space-y-3 sm:space-y-4"
                dir={isArabic ? "rtl" : "ltr"}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                        <label
                            className="block text-xs sm:text-sm font-semibold mb-2"
                            style={{ color: dc("#d1e0e7", "#2d4a5c") }}
                        >
                            {t.fullName}
                        </label>
                        <div className="relative">
                            <User
                                size={17}
                                className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "right-4" : "left-4"}`}
                                color={dc(C.textLow, L.textLow)}
                            />
                            <input
                                type="text"
                                value={data.full_name}
                                onChange={(e) =>
                                    setData("full_name", e.target.value)
                                }
                                className={`w-full ${isArabic ? "pr-11 pl-4" : "pl-11 pr-4"} py-3 rounded-2xl border outline-none text-sm`}
                                style={{
                                    ...inputStyle,
                                    borderColor: errors.full_name
                                        ? "#ef4444"
                                        : inputStyle.borderColor,
                                }}
                                placeholder={t.fullNamePlaceholder}
                            />
                        </div>
                        {errors.full_name && (
                            <p className="text-xs mt-2 text-red-500">
                                {errors.full_name}
                            </p>
                        )}
                    </div>

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
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className={`w-full ${isArabic ? "pr-11 pl-4" : "pl-11 pr-4"} py-3 rounded-2xl border outline-none text-sm`}
                                style={{
                                    ...inputStyle,
                                    borderColor: errors.email
                                        ? "#ef4444"
                                        : inputStyle.borderColor,
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

                    <div>
                        <label
                            className="block text-xs sm:text-sm font-semibold mb-2"
                            style={{ color: dc("#d1e0e7", "#2d4a5c") }}
                        >
                            {t.phone}
                        </label>
                        <div className="relative">
                            <Phone
                                size={17}
                                className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "right-4" : "left-4"}`}
                                color={dc(C.textLow, L.textLow)}
                            />
                            <input
                                type="text"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                className={`w-full ${isArabic ? "pr-11 pl-4" : "pl-11 pr-4"} py-3 rounded-2xl border outline-none text-sm`}
                                style={{
                                    ...inputStyle,
                                    borderColor: errors.phone
                                        ? "#ef4444"
                                        : inputStyle.borderColor,
                                }}
                                placeholder={t.phonePlaceholder}
                            />
                        </div>
                        {errors.phone && (
                            <p className="text-xs mt-2 text-red-500">
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            className="block text-xs sm:text-sm font-semibold mb-2"
                            style={{ color: dc("#d1e0e7", "#2d4a5c") }}
                        >
                            {t.dob}
                        </label>
                        <div className="relative">
                            <CalendarDays
                                size={17}
                                className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "right-4" : "left-4"}`}
                                color={dc(C.textLow, L.textLow)}
                            />
                            <input
                                type="date"
                                value={data.date_of_birth}
                                onChange={(e) =>
                                    setData("date_of_birth", e.target.value)
                                }
                                className={`w-full ${isArabic ? "pr-11 pl-4" : "pl-11 pr-4"} py-3 rounded-2xl border outline-none text-sm`}
                                style={{
                                    ...inputStyle,
                                    borderColor: errors.date_of_birth
                                        ? "#ef4444"
                                        : inputStyle.borderColor,
                                }}
                            />
                        </div>
                        {errors.date_of_birth && (
                            <p className="text-xs mt-2 text-red-500">
                                {errors.date_of_birth}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            className="block text-xs sm:text-sm font-semibold mb-2"
                            style={{ color: dc("#d1e0e7", "#2d4a5c") }}
                        >
                            {t.gender}
                        </label>
                        <select
                            value={data.gender}
                            onChange={(e) => setData("gender", e.target.value)}
                            className="w-full py-3 px-4 rounded-2xl border outline-none text-sm"
                            style={{
                                ...inputStyle,
                                borderColor: errors.gender
                                    ? "#ef4444"
                                    : inputStyle.borderColor,
                            }}
                        >
                            <option value="">{t.gender}</option>
                            <option value="male">{t.male}</option>
                            <option value="female">{t.female}</option>
                        </select>
                        {errors.gender && (
                            <p className="text-xs mt-2 text-red-500">
                                {errors.gender}
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
                                className={`w-full ${isArabic ? "pr-11 pl-11" : "pl-11 pr-11"} py-3 rounded-2xl border outline-none text-sm`}
                                style={{
                                    ...inputStyle,
                                    borderColor: errors.password
                                        ? "#ef4444"
                                        : inputStyle.borderColor,
                                }}
                                placeholder={t.passwordPlaceholder}
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
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                className={`w-full ${isArabic ? "pr-11 pl-11" : "pl-11 pr-11"} py-3 rounded-2xl border outline-none text-sm`}
                                style={{
                                    ...inputStyle,
                                    borderColor: errors.password_confirmation
                                        ? "#ef4444"
                                        : inputStyle.borderColor,
                                }}
                                placeholder={t.confirmPasswordPlaceholder}
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
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-white font-bold transition-all text-sm sm:text-base"
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

            <div className="mt-4 text-center">
                <p
                    className="text-xs sm:text-sm"
                    style={{ color: dc(C.textLow, L.textLow) }}
                >
                    {t.haveAccount}{" "}
                    <Link
                        href={route("login")}
                        className="font-bold"
                        style={{ color: C.primary }}
                    >
                        {t.login}
                    </Link>
                </p>
            </div>

            
        </AuthLayout>
    );
}
