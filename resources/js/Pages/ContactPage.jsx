import React, { useState, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    ArrowLeft,
    Mail,
    Phone,
    Send,
    CheckCircle2,
    AlertCircle,
    MessageCircle,
    Headphones,
    Sparkles,
    Brain,
    Zap,
    HeartHandshake,
} from "lucide-react";

const Contact = ({ auth }) => {
    const canGoBack = window.history.length > 2;
    const [notification, setNotification] = useState(null);
    const backgroundImage = "/images/word.png";

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const { data, setData, processing, errors, reset, setError, clearErrors } =
        useForm({
            name: "",
            email: "",
            subject: "",
            message: "",
        });

    const validate = () => {
        const newErrors = {};
        if (!data.name) newErrors.name = "الاسم مطلوب";
        else if (data.name.length < 2)
            newErrors.name = "الاسم يجب أن يكون حرفين على الأقل";
        else if (data.name.length > 50)
            newErrors.name = "الاسم لا يتجاوز 50 حرفًا";

        if (!data.email) newErrors.email = "البريد الإلكتروني مطلوب";
        else if (!/^\S+@\S+\.\S+$/.test(data.email))
            newErrors.email = "يرجى إدخال بريد إلكتروني صحيح";
        else if (data.email.length > 100)
            newErrors.email = "البريد لا يتجاوز 100 حرف";

        if (!data.subject) newErrors.subject = "الموضوع مطلوب";
        else if (data.subject.length < 3)
            newErrors.subject = "الموضوع يجب أن يكون 3 أحرف على الأقل";
        else if (data.subject.length > 100)
            newErrors.subject = "الموضوع لا يتجاوز 100 حرف";

        if (!data.message) newErrors.message = "الرسالة مطلوبة";
        else if (data.message.length < 10)
            newErrors.message = "الرسالة يجب أن تكون 10 أحرف على الأقل";
        else if (data.message.length > 500)
            newErrors.message = "الرسالة لا تتجاوز 500 حرف";

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearErrors();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            Object.entries(validationErrors).forEach(([key, message]) =>
                setError(key, message),
            );
            setNotification({
                type: "error",
                message: "يرجى تصحيح الأخطاء أدناه.",
            });
            return;
        }

        try {
            const response = await axios.post("/contacts", data);
            setNotification({
                type: "success",
                message: response.data.message || "تم إرسال رسالتك بنجاح!",
            });
            reset();
        } catch (error) {
            setNotification({
                type: "error",
                message:
                    error.response?.data?.message ||
                    "حدث خطأ أثناء إرسال رسالتك.",
            });
        }
    };

    const contactMethods = [
        {
            icon: Mail,
            title: "راسلنا عبر البريد",
            description: "فريقنا سيرد عليك خلال 24 ساعة",
            contact: "support@mindbridge.com",
            action: "mailto:support@mindbridge.com",
        },
        {
            icon: Phone,
            title: "اتصل بنا",
            description: "متاح من الأحد إلى الخميس، 8ص - 6م",
            contact: "+962-777777777",
            action: "tel:+962777777777",
        },
    ];

    const faqs = [
        {
            question: "كم يستغرق الرد على استفسارتي؟",
            answer: "نرد على جميع الاستفسارات خلال 24 ساعة في أيام العمل.",
        },
        {
            question: "هل بياناتي الشخصية آمنة؟",
            answer: "نعم، جميع بياناتك مشفّرة ومحمية ولا يمكن لأي طرف ثالث الوصول إليها.",
        },
        {
            question: "كيف يمكنني إلغاء أو تغيير موعد جلستي؟",
            answer: "يمكنك إدارة مواعيدك بسهولة من لوحة التحكم الخاصة بك في أي وقت.",
        },
        {
            question: "هل يمكنني تغيير المعالج النفسي المُوصى به؟",
            answer: "بالطبع، لديك كامل الحرية في اختيار معالج آخر من قائمة المعالجين المتاحين.",
        },
        {
            question: "هل المنصة مناسبة للشركات؟",
            answer: "نعم، نقدم حلولًا مؤسسية مخصصة لرصد صحة الموظفين النفسية.",
        },
    ];

    return (
        <div dir="rtl" className="min-h-screen w-full relative overflow-hidden">
            <Head title="تواصل معنا - MindBridge" />

            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${backgroundImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#163040]/70 via-[#173444]/65 to-[#122734]/80 z-0" />

            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-[#9cc7d8]/20 rounded-full blur-3xl z-0" />
            <div className="absolute bottom-0 left-0 w-[380px] h-[380px] bg-[#bcdccf]/20 rounded-full blur-3xl z-0" />

            {/* ===== Notification ===== */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -50, scale: 0.9 }}
                        className="fixed top-6 left-6 z-50 max-w-md"
                    >
                        <div
                            className={`rounded-2xl shadow-2xl border backdrop-blur-md p-4 flex items-start gap-3 ${
                                notification.type === "success"
                                    ? "bg-[#163040]/90 border-[#7aa7bb]/50"
                                    : "bg-red-900/80 border-red-500/50"
                            }`}
                        >
                            {notification.type === "success" ? (
                                <CheckCircle2 className="w-6 h-6 text-[#c6e4d5] flex-shrink-0 mt-0.5" />
                            ) : (
                                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                            )}
                            <div>
                                <p className="font-bold text-white mb-1">
                                    {notification.type === "success"
                                        ? "تم بنجاح!"
                                        : "خطأ"}
                                </p>
                                <p className="text-sm text-[#e0ebf0]">
                                    {notification.message}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-10">
                {/* ===== Navbar ===== */}
                <nav className="flex justify-between items-center p-6 md:px-12 lg:px-16">
                    <div className="flex items-center">
                        <img
                            src="/images/logo.png"
                            alt="MindBridge Logo"
                            className="h-14 md:h-16 object-contain drop-shadow-lg"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        {canGoBack && (
                            <button
                                onClick={() => window.history.back()}
                                className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white px-5 py-2.5 rounded-xl transition-all duration-300 font-semibold"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>رجوع</span>
                            </button>
                        )}
                        <button
                            onClick={() => (window.location.href = "/login")}
                            className="group bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] hover:from-[#6d9bb0] hover:to-[#5f8ea2] text-white px-6 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-[#7aa7bb]/30 font-semibold"
                        >
                            <span>تسجيل الدخول</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                    </div>
                </nav>

                {/* ===== Hero ===== */}
                <section className="relative pt-12 pb-16 px-6 md:px-12 lg:px-16">
                    <div className="max-w-7xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-md"
                        >
                            <Headphones className="w-5 h-5 text-[#b9dfcf]" />
                            <span className="text-[#d8efe6] font-semibold text-sm tracking-wide">
                                نحن هنا للمساعدة دائمًا
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-7xl font-black text-white leading-tight drop-shadow-2xl mb-6"
                        >
                            تحدّث معنا،
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#c7e5d6] via-[#9ed0d8] to-[#7faabd]">
                                نحن نسمعك
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-xl text-[#e8f1f5] max-w-2xl mx-auto leading-9"
                        >
                            لديك سؤال أو استفسار؟ فريقنا جاهز للرد عليك. أرسل
                            رسالتك وسنتواصل معك في أقرب وقت ممكن.
                        </motion.p>
                    </div>
                </section>

                {/* ===== Contact Method Cards ===== */}
                <section className="pb-12 px-6 md:px-12 lg:px-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                            {contactMethods.map((method, index) => (
                                <motion.a
                                    key={index}
                                    href={method.action}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.15 }}
                                    whileHover={{ y: -6 }}
                                    className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 shadow-xl transition-all duration-300 hover:bg-white/15 hover:border-[#7aa7bb]/40"
                                >
                                    <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl opacity-60" />
                                    <div className="relative flex items-start gap-4">
                                        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center group-hover:bg-[#7aa7bb]/20 transition-all duration-300">
                                            <method.icon className="w-7 h-7 text-[#c6e4d5]" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-extrabold text-lg mb-1">
                                                {method.title}
                                            </h3>
                                            <p className="text-[#d1e0e7] text-sm mb-2">
                                                {method.description}
                                            </p>
                                            <p className="text-[#9ed0d8] font-semibold text-sm">
                                                {method.contact}
                                            </p>
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== Main: Form + FAQ ===== */}
                <section className="py-8 px-6 md:px-12 lg:px-16 pb-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-5 gap-10">
                            {/* Form - 3 cols */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="lg:col-span-3"
                            >
                                <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 md:p-10 shadow-2xl">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#9cc7d8]/10 rounded-full blur-3xl" />

                                    <div className="relative mb-8">
                                        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white/10 border border-white/20 rounded-full backdrop-blur-md">
                                            <Sparkles className="w-4 h-4 text-[#b9dfcf]" />
                                            <span className="text-[#d8efe6] text-sm font-semibold">
                                                أرسل رسالتك
                                            </span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
                                            كيف يمكننا{" "}
                                            <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#c7e5d6] to-[#7faabd]">
                                                مساعدتك؟
                                            </span>
                                        </h2>
                                        <p className="text-[#d1e0e7] text-sm leading-7">
                                            املأ النموذج أدناه وسنرد عليك في
                                            أقرب وقت
                                        </p>
                                    </div>

                                    <form
                                        onSubmit={handleSubmit}
                                        className="relative space-y-5"
                                    >
                                        {/* Name & Email */}
                                        <div className="grid md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-semibold text-[#d1e0e7] mb-2">
                                                    الاسم الكامل *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) =>
                                                        setData(
                                                            "name",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7aa7bb] text-white placeholder-white/25 transition-all ${
                                                        errors.name
                                                            ? "border-red-400/60"
                                                            : "border-white/15 hover:border-[#7aa7bb]/50"
                                                    }`}
                                                    placeholder="محمد أحمد"
                                                />
                                                {errors.name && (
                                                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                                                        <AlertCircle className="w-3.5 h-3.5" />
                                                        {errors.name}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-[#d1e0e7] mb-2">
                                                    البريد الإلكتروني *
                                                </label>
                                                <input
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) =>
                                                        setData(
                                                            "email",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7aa7bb] text-white placeholder-white/25 transition-all ${
                                                        errors.email
                                                            ? "border-red-400/60"
                                                            : "border-white/15 hover:border-[#7aa7bb]/50"
                                                    }`}
                                                    placeholder="example@email.com"
                                                />
                                                {errors.email && (
                                                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                                                        <AlertCircle className="w-3.5 h-3.5" />
                                                        {errors.email}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Subject */}
                                        <div>
                                            <label className="block text-sm font-semibold text-[#d1e0e7] mb-2">
                                                موضوع الرسالة *
                                            </label>
                                            <input
                                                type="text"
                                                value={data.subject}
                                                onChange={(e) =>
                                                    setData(
                                                        "subject",
                                                        e.target.value,
                                                    )
                                                }
                                                className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7aa7bb] text-white placeholder-white/25 transition-all ${
                                                    errors.subject
                                                        ? "border-red-400/60"
                                                        : "border-white/15 hover:border-[#7aa7bb]/50"
                                                }`}
                                                placeholder="كيف يمكننا مساعدتك؟"
                                            />
                                            {errors.subject && (
                                                <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                                                    <AlertCircle className="w-3.5 h-3.5" />
                                                    {errors.subject}
                                                </p>
                                            )}
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label className="block text-sm font-semibold text-[#d1e0e7] mb-2">
                                                رسالتك *
                                            </label>
                                            <textarea
                                                value={data.message}
                                                onChange={(e) =>
                                                    setData(
                                                        "message",
                                                        e.target.value,
                                                    )
                                                }
                                                rows="5"
                                                className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7aa7bb] text-white placeholder-white/25 transition-all resize-none ${
                                                    errors.message
                                                        ? "border-red-400/60"
                                                        : "border-white/15 hover:border-[#7aa7bb]/50"
                                                }`}
                                                placeholder="اكتب رسالتك هنا..."
                                            />
                                            <div className="flex justify-between items-center mt-1.5">
                                                {errors.message ? (
                                                    <p className="text-red-400 text-xs flex items-center gap-1">
                                                        <AlertCircle className="w-3.5 h-3.5" />
                                                        {errors.message}
                                                    </p>
                                                ) : (
                                                    <div />
                                                )}
                                                <span className="text-[#d1e0e7]/40 text-xs">
                                                    {data.message.length}/500
                                                </span>
                                            </div>
                                        </div>

                                        {/* Submit */}
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={processing}
                                            className="w-full bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] hover:from-[#6d9bb0] hover:to-[#5f8ea2] text-white px-8 py-4 rounded-2xl font-bold text-base shadow-2xl hover:shadow-[#7aa7bb]/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {processing ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    جارٍ الإرسال...
                                                </>
                                            ) : (
                                                <>
                                                    إرسال الرسالة
                                                    <Send className="w-5 h-5" />
                                                </>
                                            )}
                                        </motion.button>
                                    </form>
                                </div>
                            </motion.div>

                            {/* FAQ + Quick Response - 2 cols */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="lg:col-span-2 space-y-5"
                            >
                                {/* Quick Response */}
                                <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 shadow-xl">
                                    <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl opacity-60" />
                                    <div className="relative flex items-start gap-4">
                                        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7aa7bb] to-[#6797ab] flex items-center justify-center shadow-lg">
                                            <Zap className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-extrabold text-lg mb-1">
                                                رد سريع مضمون
                                            </h3>
                                            <p className="text-[#e0ebf0] text-sm leading-7">
                                                نفخر بسرعة ردودنا. توقّع أن تسمع
                                                منّا خلال 24 ساعة في أيام العمل.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Support Card */}
                                <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 shadow-xl">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#bcdccf]/10 rounded-full blur-2xl" />
                                    <div className="relative flex items-start gap-4">
                                        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
                                            <HeartHandshake className="w-7 h-7 text-[#c6e4d5]" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-extrabold text-lg mb-1">
                                                دعم إنساني حقيقي
                                            </h3>
                                            <p className="text-[#e0ebf0] text-sm leading-7">
                                                فريقنا من المختصين والمستشارين
                                                جاهز لمساعدتك بكل ترحيب
                                                واحترافية.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* FAQ */}
                                <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 shadow-xl">
                                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#9cc7d8]/10 rounded-full blur-2xl" />
                                    <div className="relative">
                                        <h3 className="text-white font-extrabold text-xl mb-5 flex items-center gap-2">
                                            <MessageCircle className="w-5 h-5 text-[#c6e4d5]" />
                                            أسئلة شائعة
                                        </h3>
                                        <div className="space-y-4">
                                            {faqs.map((faq, index) => (
                                                <div
                                                    key={index}
                                                    className="border-b border-white/10 last:border-0 pb-4 last:pb-0"
                                                >
                                                    <h4 className="font-bold text-white mb-1.5 text-sm">
                                                        {faq.question}
                                                    </h4>
                                                    <p className="text-[#d1e0e7] text-sm leading-7">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ===== Footer ===== */}
                <footer className="border-t border-white/10 px-6 md:px-12 lg:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[#d1e0e7]/50 text-sm">
                    <div className="flex items-center gap-5">
                        <a
                            href="/privacy"
                            className="hover:text-[#d1e0e7] transition-colors"
                        >
                            الخصوصية
                        </a>
                        <a
                            href="/terms"
                            className="hover:text-[#d1e0e7] transition-colors"
                        >
                            الشروط
                        </a>
                        <a
                            href="/about-us"
                            className="hover:text-[#d1e0e7] transition-colors"
                        >
                            من نحن
                        </a>
                    </div>
                    <p>© 2025 MindBridge. جميع الحقوق محفوظة.</p>
                </footer>
            </div>
        </div>
    );
};

export default Contact;
