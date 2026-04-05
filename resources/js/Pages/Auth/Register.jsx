import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    User,
    Home,
    Building2,
    ChevronLeft,
    ChevronRight,
    PhoneCall,
    Sparkles,
    HeartHandshake,
    CheckCircle2,
    AlertCircle,
    BadgeCheck,
    ShieldCheck,
    TrendingUp,
} from "lucide-react";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [notification, setNotification] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [accountType, setAccountType] = useState("user");
    const backgroundImage = "/images/word.png";

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        setError,
        clearErrors,
    } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "user",
        company_name: "",
        license_number: "",
    });

    useEffect(() => {
        return () => reset("password", "password_confirmation");
    }, []);
    useEffect(() => {
        setData("role", accountType);
    }, [accountType]);

    // ── Color tokens (same as Login light palette) ──
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
    const companyGradient = `linear-gradient(135deg, #8abbe0, ${C.primary})`;

    // ── Validation ──
    const validateName = (v) =>
        !v
            ? "الاسم مطلوب"
            : v.length < 2
              ? "الاسم يجب أن يكون حرفين على الأقل"
              : v.length > 50
                ? "الاسم لا يتجاوز 50 حرفًا"
                : null;
    const validateCompanyName = (v) =>
        accountType === "company" && !v
            ? "اسم الشركة مطلوب"
            : v && v.length < 2
              ? "اسم الشركة يجب أن يكون حرفين على الأقل"
              : v && v.length > 100
                ? "اسم الشركة لا يتجاوز 100 حرف"
                : null;
    const validateLicense = (v) =>
        accountType === "company" && !v
            ? "رقم الترخيص مطلوب"
            : v && v.length > 50
              ? "رقم الترخيص لا يتجاوز 50 حرفًا"
              : v && !/^[a-zA-Z0-9-]+$/.test(v)
                ? "رقم الترخيص يحتوي على أحرف وأرقام وشرطات فقط"
                : null;
    const validateEmail = (v) =>
        !v
            ? "البريد الإلكتروني مطلوب"
            : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
              ? "يرجى إدخال بريد إلكتروني صحيح"
              : v.length > 100
                ? "البريد لا يتجاوز 100 حرف"
                : null;
    const validatePassword = (v) =>
        !v
            ? "كلمة المرور مطلوبة"
            : v.length < 8
              ? "كلمة المرور يجب أن تكون 8 أحرف على الأقل"
              : !/[A-Z]/.test(v)
                ? "يجب أن تحتوي على حرف كبير"
                : !/[a-z]/.test(v)
                  ? "يجب أن تحتوي على حرف صغير"
                  : !/[0-9]/.test(v)
                    ? "يجب أن تحتوي على رقم"
                    : !/[!@#$%^&*(),.?":{}|<>]/.test(v)
                      ? "يجب أن تحتوي على رمز خاص"
                      : null;
    const validateConfirm = (p, c) =>
        !c
            ? "يرجى تأكيد كلمة المرور"
            : p !== c
              ? "كلمتا المرور غير متطابقتين"
              : null;

    const validate = () => {
        const e = {};
        if (currentStep === 1 && !accountType)
            e.role = "يرجى اختيار نوع الحساب";
        if (currentStep === 2) {
            const e1 = validateName(data.name);
            if (e1) e.name = e1;
            const e2 = validateCompanyName(data.company_name);
            if (e2) e.company_name = e2;
            const e3 = validateLicense(data.license_number);
            if (e3) e.license_number = e3;
            const e4 = validateEmail(data.email);
            if (e4) e.email = e4;
        }
        if (currentStep === 3) {
            const e1 = validatePassword(data.password);
            if (e1) e.password = e1;
            const e2 = validateConfirm(
                data.password,
                data.password_confirmation,
            );
            if (e2) e.password_confirmation = e2;
        }
        return e;
    };

    const showError = (msg) => {
        setNotification({ type: "error", message: msg });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleNextStep = () => {
        clearErrors();
        const ve = validate();
        if (Object.keys(ve).length > 0) {
            Object.entries(ve).forEach(([k, m]) => setError(k, m));
            showError("يرجى تصحيح الأخطاء أدناه.");
            return;
        }
        if (currentStep < 3) setCurrentStep(currentStep + 1);
        else handleSubmit();
    };

    const handlePrevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleSubmit = () => {
        clearErrors();
        const ve = validate();
        if (Object.keys(ve).length > 0) {
            Object.entries(ve).forEach(([k, m]) => setError(k, m));
            showError("يرجى تصحيح الأخطاء أدناه.");
            return;
        }
        post(
            route(accountType === "company" ? "company.register" : "register"),
            {
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    password_confirmation: data.password_confirmation,
                    ...(accountType === "company" && {
                        company_name: data.company_name,
                        license_number: data.license_number,
                    }),
                },
                onSuccess: () => {
                    setNotification({
                        type: "success",
                        message:
                            accountType === "company"
                                ? "تم تسجيل الشركة بنجاح! جارٍ التحويل..."
                                : "تم إنشاء الحساب بنجاح! يرجى تفعيل بريدك الإلكتروني.",
                    });
                    setTimeout(() => setNotification(null), 2000);
                },
                onError: (serverErrors) => {
                    showError(
                        serverErrors.email ||
                            serverErrors.company_name ||
                            serverErrors.license_number ||
                            "فشل إنشاء الحساب. يرجى المحاولة مجددًا.",
                    );
                },
            },
        );
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

    // ── Left panel config ──
    const panelInfo = {
        user: {
            icon: HeartHandshake,
            gradient: primaryGradient,
            badge: "انضم إلى Mind Gate",
            title: "ابدأ رحلتك",
            subtitle: "أنشئ حسابك الآن وابدأ رحلتك نحو الصحة النفسية الأفضل.",
            points: [
                { icon: HeartHandshake, text: "دعم نفسي متخصص ومريح" },
                { icon: ShieldCheck, text: "خصوصيتك محمية بالكامل" },
                { icon: TrendingUp, text: "تتبّع تقدمك يومًا بيوم" },
            ],
        },
        company: {
            icon: Building2,
            gradient: companyGradient,
            badge: "بوابة المؤسسات والشركات",
            title: "سجّل شركتك",
            subtitle: "سجّل شركتك للوصول إلى أدوات إدارة الصحة النفسية لفريقك.",
            points: [
                { icon: Building2, text: "تقارير مجهولة الهوية للموظفين" },
                { icon: ShieldCheck, text: "كشف مبكر عن الإرهاق الوظيفي" },
                { icon: TrendingUp, text: "إحصائيات شاملة لصحة الفريق" },
            ],
        },
    };

    const current = panelInfo[accountType];
    const PanelIcon = current.icon;
    const stepLabels = ["نوع الحساب", "المعلومات", "كلمة المرور"];

    // ── Field wrapper ──
    const Field = ({ label, error, children }) => (
        <div>
            <label
                className="mb-1.5 block text-xs font-semibold"
                style={{ color: C.textLow }}
            >
                {label}
            </label>
            {children}
            {error && (
                <p
                    className="mt-1.5 flex items-center gap-1 text-[11px]"
                    style={{ color: C.errorText }}
                >
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    {error}
                </p>
            )}
        </div>
    );

    const InputIcon = ({ icon: Icon }) => (
        <Icon
            className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
            style={{ color: "rgba(255,255,255,0.28)" }}
        />
    );

    // ── Step Indicator ──
    const renderStepIndicator = () => (
        <div className="flex justify-center mb-5">
            <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((step) => (
                    <React.Fragment key={step}>
                        <div className="flex flex-col items-center gap-1">
                            <div
                                className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all duration-300"
                                style={{
                                    background:
                                        currentStep === step
                                            ? primaryGradient
                                            : currentStep > step
                                              ? "rgba(122,167,187,0.22)"
                                              : "rgba(255,255,255,0.07)",
                                    border:
                                        currentStep === step
                                            ? "1px solid rgba(122,167,187,0.55)"
                                            : currentStep > step
                                              ? "1px solid rgba(122,167,187,0.38)"
                                              : "1px solid rgba(255,255,255,0.14)",
                                    color:
                                        currentStep >= step
                                            ? C.textHigh
                                            : "rgba(255,255,255,0.28)",
                                    boxShadow:
                                        currentStep === step
                                            ? "0 4px 14px rgba(122,167,187,0.32)"
                                            : "none",
                                }}
                            >
                                {currentStep > step ? (
                                    <CheckCircle2
                                        className="h-4 w-4"
                                        style={{ color: C.accentGreen }}
                                    />
                                ) : (
                                    step
                                )}
                            </div>
                            <span
                                className="text-[10px] font-semibold transition-colors duration-300"
                                style={{
                                    color:
                                        currentStep === step
                                            ? C.accent
                                            : currentStep > step
                                              ? "rgba(156,199,216,0.55)"
                                              : "rgba(255,255,255,0.22)",
                                }}
                            >
                                {stepLabels[step - 1]}
                            </span>
                        </div>
                        {step < 3 && (
                            <div
                                className="mb-4 h-0.5 w-10 rounded-full transition-all duration-300"
                                style={{
                                    backgroundColor:
                                        currentStep > step
                                            ? "rgba(122,167,187,0.55)"
                                            : "rgba(255,255,255,0.10)",
                                }}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );

    // ── Step Content ──
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-5">
                        <div className="text-center">
                            <h3
                                className="text-xl font-black sm:text-2xl"
                                style={{ color: C.textHigh }}
                            >
                                اختر نوع{" "}
                                <span
                                    style={{
                                        background: headingGradient,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    حسابك
                                </span>
                            </h3>
                            <p
                                className="mt-1 text-xs"
                                style={{ color: C.textFaint }}
                            >
                                حدد نوع الحساب الذي تريد إنشاؤه
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {[
                                {
                                    key: "user",
                                    icon: User,
                                    label: "مستخدم فردي",
                                    desc: "للدعم النفسي الشخصي",
                                },
                                {
                                    key: "company",
                                    icon: Building2,
                                    label: "مؤسسة / شركة",
                                    desc: "لإدارة صحة الفريق",
                                },
                            ].map((type) => {
                                const Icon = type.icon;
                                const isActive = accountType === type.key;
                                const grad =
                                    type.key === "company"
                                        ? companyGradient
                                        : primaryGradient;
                                return (
                                    <button
                                        type="button"
                                        key={type.key}
                                        onClick={() => setAccountType(type.key)}
                                        className="relative flex flex-col items-center gap-2.5 overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5"
                                        style={{
                                            backgroundColor: isActive
                                                ? "rgba(122,167,187,0.18)"
                                                : "rgba(255,255,255,0.06)",
                                            border: isActive
                                                ? "1px solid rgba(122,167,187,0.50)"
                                                : "1px solid rgba(255,255,255,0.14)",
                                            boxShadow: isActive
                                                ? "0 4px 18px rgba(122,167,187,0.22)"
                                                : "none",
                                        }}
                                    >
                                        <div
                                            className="flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300"
                                            style={{
                                                background: isActive
                                                    ? grad
                                                    : "rgba(255,255,255,0.10)",
                                                boxShadow: isActive
                                                    ? "0 4px 14px rgba(122,167,187,0.32)"
                                                    : "none",
                                            }}
                                        >
                                            <Icon className="h-6 w-6 text-white" />
                                        </div>
                                        <div className="text-center">
                                            <p
                                                className="text-sm font-extrabold"
                                                style={{
                                                    color: isActive
                                                        ? C.textHigh
                                                        : C.textLow,
                                                }}
                                            >
                                                {type.label}
                                            </p>
                                            <p
                                                className="mt-0.5 text-[11px] leading-4"
                                                style={{ color: C.textFaint }}
                                            >
                                                {type.desc}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {errors.role && (
                            <p
                                className="flex items-center gap-1 text-[11px]"
                                style={{ color: C.errorText }}
                            >
                                <AlertCircle className="h-3 w-3" />
                                {errors.role}
                            </p>
                        )}
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-4">
                        <div className="text-center">
                            <h3
                                className="text-xl font-black sm:text-2xl"
                                style={{ color: C.textHigh }}
                            >
                                {accountType === "company"
                                    ? "معلومات الشركة"
                                    : "معلوماتك الشخصية"}
                            </h3>
                            <p
                                className="mt-1 text-xs"
                                style={{ color: C.textFaint }}
                            >
                                {accountType === "company"
                                    ? "أخبرنا عن شركتك"
                                    : "أخبرنا من أنت"}
                            </p>
                        </div>

                        <Field
                            label={
                                accountType === "company"
                                    ? "اسم المسؤول"
                                    : "الاسم الكامل"
                            }
                            error={errors.name}
                        >
                            <div className="relative">
                                <InputIcon icon={User} />
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    placeholder={
                                        accountType === "company"
                                            ? "اسم المسؤول"
                                            : "اسمك الكامل"
                                    }
                                    style={{
                                        ...inputStyle(errors.name),
                                        paddingRight: "36px",
                                        paddingLeft: "14px",
                                        paddingTop: "10px",
                                        paddingBottom: "10px",
                                    }}
                                    onFocus={onFocus}
                                    onBlur={onBlur(errors.name)}
                                />
                            </div>
                        </Field>

                        {accountType === "company" && (
                            <>
                                <Field
                                    label="اسم الشركة"
                                    error={errors.company_name}
                                >
                                    <div className="relative">
                                        <InputIcon icon={Building2} />
                                        <input
                                            type="text"
                                            value={data.company_name}
                                            onChange={(e) =>
                                                setData(
                                                    "company_name",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="اسم شركتك"
                                            style={{
                                                ...inputStyle(
                                                    errors.company_name,
                                                ),
                                                paddingRight: "36px",
                                                paddingLeft: "14px",
                                                paddingTop: "10px",
                                                paddingBottom: "10px",
                                            }}
                                            onFocus={onFocus}
                                            onBlur={onBlur(errors.company_name)}
                                        />
                                    </div>
                                </Field>
                                <Field
                                    label="رقم الترخيص"
                                    error={errors.license_number}
                                >
                                    <div className="relative">
                                        <InputIcon icon={BadgeCheck} />
                                        <input
                                            type="text"
                                            value={data.license_number}
                                            onChange={(e) =>
                                                setData(
                                                    "license_number",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="رقم ترخيص الشركة"
                                            style={{
                                                ...inputStyle(
                                                    errors.license_number,
                                                ),
                                                paddingRight: "36px",
                                                paddingLeft: "14px",
                                                paddingTop: "10px",
                                                paddingBottom: "10px",
                                            }}
                                            onFocus={onFocus}
                                            onBlur={onBlur(
                                                errors.license_number,
                                            )}
                                        />
                                    </div>
                                </Field>
                            </>
                        )}

                        <Field label="البريد الإلكتروني" error={errors.email}>
                            <div className="relative">
                                <InputIcon icon={Mail} />
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    placeholder="example@email.com"
                                    style={{
                                        ...inputStyle(errors.email),
                                        paddingRight: "36px",
                                        paddingLeft: "14px",
                                        paddingTop: "10px",
                                        paddingBottom: "10px",
                                    }}
                                    onFocus={onFocus}
                                    onBlur={onBlur(errors.email)}
                                />
                            </div>
                        </Field>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-4">
                        <div className="text-center">
                            <h3
                                className="text-xl font-black sm:text-2xl"
                                style={{ color: C.textHigh }}
                            >
                                كلمة{" "}
                                <span
                                    style={{
                                        background: headingGradient,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    المرور
                                </span>
                            </h3>
                            <p
                                className="mt-1 text-xs"
                                style={{ color: C.textFaint }}
                            >
                                أنشئ كلمة مرور قوية لحسابك
                            </p>
                        </div>

                        {/* Password hints */}
                        <div className="flex flex-wrap gap-1.5">
                            {["8+ أحرف", "حرف كبير", "رقم", "رمز خاص"].map(
                                (hint, i) => (
                                    <span
                                        key={i}
                                        className="rounded-lg px-2 py-1 text-[11px]"
                                        style={{
                                            backgroundColor:
                                                "rgba(255,255,255,0.06)",
                                            border: "1px solid rgba(255,255,255,0.14)",
                                            color: C.textLow,
                                        }}
                                    >
                                        {hint}
                                    </span>
                                ),
                            )}
                        </div>

                        <Field label="كلمة المرور" error={errors.password}>
                            <div className="relative">
                                <InputIcon icon={Lock} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
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
                                    style={{ color: "rgba(255,255,255,0.28)" }}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.color = C.accent)
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
                        </Field>

                        <Field
                            label="تأكيد كلمة المرور"
                            error={errors.password_confirmation}
                        >
                            <div className="relative">
                                <InputIcon icon={Lock} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="••••••••"
                                    style={{
                                        ...inputStyle(
                                            errors.password_confirmation,
                                        ),
                                        paddingRight: "36px",
                                        paddingLeft: "36px",
                                        paddingTop: "10px",
                                        paddingBottom: "10px",
                                    }}
                                    onFocus={onFocus}
                                    onBlur={onBlur(
                                        errors.password_confirmation,
                                    )}
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 focus:outline-none"
                                    style={{ color: "rgba(255,255,255,0.28)" }}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.color = C.accent)
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
                        </Field>
                    </div>
                );

            default:
                return null;
        }
    };

    // ── Step Buttons ──
    const renderStepButtons = () => (
        <div className="mt-5 flex items-center justify-between gap-3">
            {currentStep > 1 ? (
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handlePrevStep}
                    className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300"
                    style={{
                        backgroundColor: "rgba(255,255,255,0.07)",
                        border: `1px solid ${C.cardBorder}`,
                        color: C.textLow,
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                            "rgba(255,255,255,0.13)";
                        e.currentTarget.style.color = C.textHigh;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                            "rgba(255,255,255,0.07)";
                        e.currentTarget.style.color = C.textLow;
                    }}
                >
                    <ChevronRight className="h-4 w-4" />
                    رجوع
                </motion.button>
            ) : (
                <div />
            )}

            <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                type="button"
                onClick={handleNextStep}
                disabled={processing}
                className="group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl py-2.5 text-sm font-bold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:px-8"
                style={{
                    background: current.gradient,
                    boxShadow: "0 6px 22px rgba(122,167,187,0.35)",
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
                        جارٍ إنشاء الحساب...
                    </>
                ) : currentStep === 3 ? (
                    <>
                        <BadgeCheck className="h-4 w-4" />
                        إتمام التسجيل
                    </>
                ) : (
                    <>
                        التالي
                        <ChevronLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                    </>
                )}
            </motion.button>
        </div>
    );

    return (
        <div
            dir="rtl"
            className="min-h-screen w-full flex relative overflow-hidden"
            style={{ backgroundColor: "#0f2233" }}
        >
            <Head title="إنشاء حساب - Mind Gate" />

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
                style={{
                    border: `1px solid ${C.cardBorder}`,
                    backgroundColor: C.cardBg,
                    color: C.textMid,
                }}
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
                style={{
                    border: `1px solid ${C.cardBorder}`,
                    backgroundColor: C.cardBg,
                    color: C.textMid,
                }}
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
                        className="fixed top-5 left-5 z-[100] max-w-sm"
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
                 MAIN LAYOUT
            ══════════════════════════════════ */}
            <div className="relative z-10 flex min-h-screen w-full">
                {/* ════════════════════════════════
                     LEFT — Decorative Panel
                ════════════════════════════════ */}
                <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-10 xl:p-14">
                    <div className="flex flex-col gap-6 max-w-sm w-full">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 backdrop-blur-md"
                            style={{
                                border: `1px solid ${C.cardBorder}`,
                                backgroundColor: C.cardBg,
                            }}
                        >
                            <Sparkles
                                className="h-4 w-4 shrink-0 animate-pulse"
                                style={{ color: C.accentGreen }}
                            />
                            <span
                                className="text-xs font-semibold tracking-wide"
                                style={{ color: C.textMid }}
                            >
                                {current.badge}
                            </span>
                        </motion.div>

                        {/* Gradient Icon Box */}
                        <motion.div
                            key={accountType}
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 0.45,
                                type: "spring",
                                stiffness: 130,
                            }}
                            className="relative overflow-hidden rounded-3xl p-8 inline-flex items-center justify-center"
                            style={{
                                background: current.gradient,
                                boxShadow: "0 16px 48px rgba(122,167,187,0.35)",
                                width: "fit-content",
                            }}
                        >
                            <div
                                className="absolute -top-6 -right-6 h-20 w-20 rounded-full blur-2xl opacity-40 pointer-events-none"
                                style={{
                                    backgroundColor: "rgba(255,255,255,0.6)",
                                }}
                            />
                            <PanelIcon
                                className="h-20 w-20 relative"
                                style={{ color: "rgba(255,255,255,0.92)" }}
                            />
                        </motion.div>

                        {/* Headline */}
                        <motion.div
                            key={accountType + "_ttl"}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h1
                                className="text-4xl xl:text-5xl font-black leading-tight"
                                style={{ color: C.textHigh }}
                            >
                                {current.title}
                                <br />
                                <span
                                    style={{
                                        background: headingGradient,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    مع Mind Gate
                                </span>
                            </h1>
                            <p
                                className="mt-3 text-sm leading-7"
                                style={{ color: C.textLow }}
                            >
                                {current.subtitle}
                            </p>
                        </motion.div>

                        {/* Feature Points */}
                        <motion.div
                            key={accountType + "_pts"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col gap-2.5"
                        >
                            {current.points.map((pt, i) => {
                                const Icon = pt.icon;
                                return (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 rounded-2xl px-4 py-3 backdrop-blur-md"
                                        style={{
                                            backgroundColor:
                                                "rgba(255,255,255,0.07)",
                                            border: "1px solid rgba(255,255,255,0.14)",
                                        }}
                                    >
                                        <div
                                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                                            style={{
                                                background: current.gradient,
                                                boxShadow:
                                                    "0 3px 10px rgba(122,167,187,0.30)",
                                            }}
                                        >
                                            <Icon className="h-4 w-4 text-white" />
                                        </div>
                                        <span
                                            className="text-xs font-semibold"
                                            style={{ color: C.textMid }}
                                        >
                                            {pt.text}
                                        </span>
                                    </div>
                                );
                            })}
                        </motion.div>

                        {/* Step Progress Visual */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.35 }}
                            className="flex flex-col gap-2"
                        >
                            {stepLabels.map((label, i) => {
                                const isActive = currentStep === i + 1;
                                const isDone = currentStep > i + 1;
                                return (
                                    <div
                                        key={i}
                                        className="relative flex items-center gap-3 overflow-hidden rounded-2xl px-4 py-3 transition-all duration-300"
                                        style={{
                                            backgroundColor: isActive
                                                ? "rgba(122,167,187,0.14)"
                                                : "rgba(255,255,255,0.04)",
                                            border: isActive
                                                ? "1px solid rgba(122,167,187,0.38)"
                                                : "1px solid rgba(255,255,255,0.09)",
                                            opacity:
                                                !isActive && !isDone ? 0.45 : 1,
                                        }}
                                    >
                                        <div
                                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all duration-300"
                                            style={{
                                                background: isDone
                                                    ? primaryGradient
                                                    : isActive
                                                      ? "rgba(122,167,187,0.22)"
                                                      : "rgba(255,255,255,0.06)",
                                                border: isActive
                                                    ? "1px solid rgba(122,167,187,0.45)"
                                                    : "1px solid rgba(255,255,255,0.10)",
                                                boxShadow: isDone
                                                    ? "0 3px 10px rgba(122,167,187,0.28)"
                                                    : "none",
                                            }}
                                        >
                                            {isDone ? (
                                                <CheckCircle2 className="h-4 w-4 text-white" />
                                            ) : (
                                                <span
                                                    className="text-xs font-bold"
                                                    style={{
                                                        color: isActive
                                                            ? C.accent
                                                            : "rgba(255,255,255,0.30)",
                                                    }}
                                                >
                                                    {i + 1}
                                                </span>
                                            )}
                                        </div>

                                        <span
                                            className="text-sm font-semibold"
                                            style={{
                                                color: isActive
                                                    ? C.textHigh
                                                    : C.textFaint,
                                            }}
                                        >
                                            {label}
                                        </span>

                                        {isActive && (
                                            <div className="mr-auto">
                                                <div
                                                    className="h-2 w-2 animate-pulse rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            C.accent,
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>

                {/* ════════════════════════════════
                     RIGHT — Form Panel
                ════════════════════════════════ */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-5 py-16 sm:px-8 lg:px-10 lg:py-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-sm sm:max-w-md"
                    >
                        {/* Mobile Logo */}
                        <div className="lg:hidden text-center mb-6">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.4 }}
                                className="relative inline-flex items-center justify-center overflow-hidden rounded-2xl p-5 mb-3 shadow-xl"
                                style={{ background: current.gradient }}
                            >
                                <PanelIcon className="h-12 w-12 text-white" />
                            </motion.div>
                            <h1
                                className="text-2xl font-black"
                                style={{
                                    background: headingGradient,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Mind Gate
                            </h1>
                            <p
                                className="mt-1 text-xs"
                                style={{ color: C.textFaint }}
                            >
                                {current.badge}
                            </p>
                        </div>

                        {/* ── Form Card ── */}
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

                            <div className="relative">
                                {/* Card Badge */}
                                <div className="mb-4 flex justify-center">
                                    <div
                                        className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-md"
                                        style={{
                                            border: `1px solid ${C.cardBorder}`,
                                            backgroundColor:
                                                "rgba(255,255,255,0.08)",
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
                                            إنشاء حساب جديد
                                        </span>
                                    </div>
                                </div>

                                {renderStepIndicator()}

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentStep}
                                        initial={{ opacity: 0, x: 18 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -18 }}
                                        transition={{ duration: 0.22 }}
                                    >
                                        {renderStepContent()}
                                    </motion.div>
                                </AnimatePresence>

                                {renderStepButtons()}

                                {/* Login Link */}
                                <div
                                    className="mt-4 pt-4 text-center"
                                    style={{
                                        borderTop:
                                            "1px solid rgba(255,255,255,0.10)",
                                    }}
                                >
                                    <p
                                        className="text-xs"
                                        style={{ color: C.textFaint }}
                                    >
                                        لديك حساب بالفعل؟{" "}
                                        <Link
                                            href={route("login")}
                                            className="font-bold transition-colors duration-200 hover:underline"
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
                                            تسجيل الدخول
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
