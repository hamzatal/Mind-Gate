import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Head, useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail,
    Phone,
    Send,
    CheckCircle2,
    AlertCircle,
    MessageCircle,
    Headphones,
    Sparkles,
    Shield,
    Clock3,
    ArrowRight,
} from "lucide-react";
import NavV2 from "@/Components/NavBar";
import useSitePreferences from "@/hooks/useSitePreferences";

axios.defaults.baseURL = window.location.origin;

export default function ContactPage() {
    const { isDark, isArabic } = useSitePreferences();
    const [notification, setNotification] = useState(null);

    const { data, setData, processing, errors, reset, setError, clearErrors } =
        useForm({
            name: "",
            email: "",
            subject: "",
            message: "",
        });

    useEffect(() => {
        if (!notification) return;
        const timer = setTimeout(() => setNotification(null), 5000);
        return () => clearTimeout(timer);
    }, [notification]);

    const t = useMemo(
        () => ({
            title: isArabic
                ? "تواصل معنا - Mind Gate"
                : "Contact Us - Mind Gate",
            badge: isArabic
                ? "فريق دعم جاهز للمساعدة"
                : "A support team ready to help",
            heading: isArabic ? "دعنا نسمع منك" : "Let us hear from you",
            intro: isArabic
                ? "إذا كان لديك سؤال، استفسار، أو تحتاج مساعدة بخصوص المنصة، أرسل لنا رسالتك وسنرد عليك بأقرب وقت."
                : "If you have a question, feedback, or need help with the platform, send us a message and we will get back to you soon.",
            emailCard: isArabic ? "راسلنا عبر البريد" : "Email us",
            emailDesc: isArabic
                ? "سنرد خلال 24 ساعة في أيام العمل."
                : "We reply within 24 business hours.",
            phoneCard: isArabic ? "اتصل بنا" : "Call us",
            phoneDesc: isArabic
                ? "دعم متاح خلال أوقات العمل الرسمية."
                : "Support is available during business hours.",
            secureTitle: isArabic ? "تواصل آمن" : "Secure communication",
            secureText: isArabic
                ? "نحترم خصوصيتك ونتعامل مع رسائلك بسرية ووضوح."
                : "We respect your privacy and handle your messages with clarity and care.",
            formTitle: isArabic ? "أرسل رسالتك" : "Send your message",
            formText: isArabic
                ? "املأ النموذج التالي وسنتواصل معك في أقرب وقت."
                : "Fill out the form below and we will contact you shortly.",
            name: isArabic ? "الاسم الكامل" : "Full name",
            email: isArabic ? "البريد الإلكتروني" : "Email address",
            subject: isArabic ? "الموضوع" : "Subject",
            message: isArabic ? "الرسالة" : "Message",
            submit: isArabic ? "إرسال الرسالة" : "Send message",
            sending: isArabic ? "جارٍ الإرسال..." : "Sending...",
            faqTitle: isArabic ? "أسئلة شائعة" : "Frequently asked questions",
            success: isArabic
                ? "تم إرسال رسالتك بنجاح."
                : "Your message has been sent successfully.",
            validation: isArabic
                ? "يرجى تصحيح الأخطاء في النموذج."
                : "Please fix the form errors.",
            failed: isArabic
                ? "حدث خطأ أثناء الإرسال."
                : "Something went wrong while sending.",
            q1: isArabic ? "كم يستغرق الرد؟" : "How long does a response take?",
            a1: isArabic
                ? "عادةً خلال 24 ساعة في أيام العمل."
                : "Usually within 24 business hours.",
            q2: isArabic ? "هل بياناتي آمنة؟" : "Is my data safe?",
            a2: isArabic
                ? "نعم، نتعامل مع الرسائل بسرية واحترام."
                : "Yes, we handle messages with privacy and care.",
            q3: isArabic
                ? "هل الدعم مخصص للأفراد فقط؟"
                : "Is support only for individuals?",
            a3: isArabic
                ? "لا، نوفر أيضًا حلولًا للمؤسسات والشركات."
                : "No, we also support organizations and companies.",
        }),
        [isArabic],
    );

    const pageBg = isDark
        ? "bg-[#081018] text-white"
        : "bg-[#f6fafc] text-slate-900";

    const glass = isDark
        ? "bg-white/5 border-white/10"
        : "bg-white/85 border-slate-200";

    const textMuted = isDark ? "text-white/70" : "text-slate-600";

    const validate = () => {
        const newErrors = {};

        if (!data.name || data.name.trim().length < 2) {
            newErrors.name = isArabic
                ? "الاسم يجب أن يكون حرفين على الأقل"
                : "Name must be at least 2 characters";
        }

        if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
            newErrors.email = isArabic
                ? "يرجى إدخال بريد إلكتروني صحيح"
                : "Please enter a valid email address";
        }

        if (!data.subject || data.subject.trim().length < 3) {
            newErrors.subject = isArabic
                ? "الموضوع يجب أن يكون 3 أحرف على الأقل"
                : "Subject must be at least 3 characters";
        }

        if (!data.message || data.message.trim().length < 10) {
            newErrors.message = isArabic
                ? "الرسالة يجب أن تكون 10 أحرف على الأقل"
                : "Message must be at least 10 characters";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearErrors();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            Object.entries(validationErrors).forEach(([key, value]) => {
                setError(key, value);
            });

            setNotification({
                type: "error",
                message: t.validation,
            });
            return;
        }

        try {
            const response = await axios.post("/contacts", data);
            setNotification({
                type: "success",
                message: response.data?.message || t.success,
            });
            reset();
        } catch (error) {
            setNotification({
                type: "error",
                message: error.response?.data?.message || t.failed,
            });
        }
    };

    const faqs = [
        { q: t.q1, a: t.a1 },
        { q: t.q2, a: t.a2 },
        { q: t.q3, a: t.a3 },
    ];

    return (
        <div
            dir={isArabic ? "rtl" : "ltr"}
            className={`min-h-screen ${pageBg} relative overflow-hidden`}
        >
            <Head title={t.title} />
            <NavV2 />

            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-16 end-0 h-[340px] w-[340px] rounded-full bg-[#7aa7bb]/20 blur-3xl" />
                <div className="absolute bottom-0 start-0 h-[300px] w-[300px] rounded-full bg-[#9cc7d8]/20 blur-3xl" />
            </div>

            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -30, scale: 0.95 }}
                        className="fixed top-24 z-[80] w-full px-4"
                    >
                        <div className="mx-auto max-w-md">
                            <div
                                className={`flex items-start gap-3 rounded-2xl border px-4 py-4 shadow-2xl backdrop-blur-xl ${
                                    notification.type === "success"
                                        ? isDark
                                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                                            : "border-emerald-200 bg-emerald-50 text-emerald-700"
                                        : isDark
                                          ? "border-red-500/20 bg-red-500/10 text-red-300"
                                          : "border-red-200 bg-red-50 text-red-700"
                                }`}
                            >
                                {notification.type === "success" ? (
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                                ) : (
                                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                                )}
                                <div className="text-sm font-semibold">
                                    {notification.message}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="relative z-10 pt-28">
                <section className="px-6 md:px-12 lg:px-16 pb-14">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold ${glass}`}
                                >
                                    <Sparkles className="h-4 w-4 text-[#7aa7bb]" />
                                    {t.badge}
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 26 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.08 }}
                                    className="mt-6 text-5xl font-black leading-tight md:text-7xl"
                                >
                                    {t.heading}
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 26 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.14 }}
                                    className={`mt-6 max-w-2xl text-lg leading-9 ${textMuted}`}
                                >
                                    {t.intro}
                                </motion.p>

                                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                    <div
                                        className={`rounded-[28px] border p-5 shadow-lg ${glass}`}
                                    >
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7aa7bb] to-[#6797ab] text-white">
                                            <Mail className="h-6 w-6" />
                                        </div>
                                        <div className="text-lg font-extrabold">
                                            {t.emailCard}
                                        </div>
                                        <div
                                            className={`mt-2 text-sm leading-7 ${textMuted}`}
                                        >
                                            {t.emailDesc}
                                        </div>
                                        <div className="mt-3 text-sm font-bold text-[#7aa7bb]">
                                            support@mindgate.com
                                        </div>
                                    </div>

                                    <div
                                        className={`rounded-[28px] border p-5 shadow-lg ${glass}`}
                                    >
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7aa7bb] to-[#6797ab] text-white">
                                            <Phone className="h-6 w-6" />
                                        </div>
                                        <div className="text-lg font-extrabold">
                                            {t.phoneCard}
                                        </div>
                                        <div
                                            className={`mt-2 text-sm leading-7 ${textMuted}`}
                                        >
                                            {t.phoneDesc}
                                        </div>
                                        <div className="mt-3 text-sm font-bold text-[#7aa7bb]">
                                            +962-777777777
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.12 }}
                                className={`rounded-[34px] border p-7 shadow-2xl ${glass}`}
                            >
                                <div className="grid gap-4">
                                    <div
                                        className={`rounded-3xl border p-5 ${glass}`}
                                    >
                                        <div className="mb-3 flex items-center gap-3">
                                            <Shield className="h-5 w-5 text-[#7aa7bb]" />
                                            <div className="font-extrabold">
                                                {t.secureTitle}
                                            </div>
                                        </div>
                                        <p
                                            className={`text-sm leading-7 ${textMuted}`}
                                        >
                                            {t.secureText}
                                        </p>
                                    </div>

                                    <div
                                        className={`rounded-3xl border p-5 ${glass}`}
                                    >
                                        <div className="mb-3 flex items-center gap-3">
                                            <Clock3 className="h-5 w-5 text-[#7aa7bb]" />
                                            <div className="font-extrabold">
                                                {isArabic
                                                    ? "زمن استجابة واضح"
                                                    : "Clear response time"}
                                            </div>
                                        </div>
                                        <p
                                            className={`text-sm leading-7 ${textMuted}`}
                                        >
                                            {isArabic
                                                ? "نهتم بأن تكون قنوات التواصل بسيطة وواضحة ومباشرة."
                                                : "We care about keeping communication simple, direct, and predictable."}
                                        </p>
                                    </div>

                                    <div
                                        className={`rounded-3xl border p-5 ${glass}`}
                                    >
                                        <div className="mb-3 flex items-center gap-3">
                                            <Headphones className="h-5 w-5 text-[#7aa7bb]" />
                                            <div className="font-extrabold">
                                                {isArabic
                                                    ? "دعم متعاون"
                                                    : "Helpful support"}
                                            </div>
                                        </div>
                                        <p
                                            className={`text-sm leading-7 ${textMuted}`}
                                        >
                                            {isArabic
                                                ? "سواء كنت فردًا أو جهة مؤسسية، يمكننا مساعدتك على فهم الخطوة التالية."
                                                : "Whether you are an individual or an organization, we can help you understand the next step."}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="px-6 md:px-12 lg:px-16 pb-20">
                    <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.12fr_0.88fr]">
                        <div
                            className={`rounded-[34px] border p-8 shadow-2xl ${glass}`}
                        >
                            <div className="mb-8">
                                <div className="text-3xl font-black">
                                    {t.formTitle}
                                </div>
                                <p
                                    className={`mt-3 text-base leading-8 ${textMuted}`}
                                >
                                    {t.formText}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-bold">
                                            {t.name}
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${
                                                isDark
                                                    ? "border-white/10 bg-white/5 text-white placeholder:text-white/30"
                                                    : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
                                            }`}
                                        />
                                        {errors.name && (
                                            <p className="mt-2 text-xs text-red-500">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-bold">
                                            {t.email}
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${
                                                isDark
                                                    ? "border-white/10 bg-white/5 text-white placeholder:text-white/30"
                                                    : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
                                            }`}
                                        />
                                        {errors.email && (
                                            <p className="mt-2 text-xs text-red-500">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-bold">
                                        {t.subject}
                                    </label>
                                    <input
                                        type="text"
                                        value={data.subject}
                                        onChange={(e) =>
                                            setData("subject", e.target.value)
                                        }
                                        className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${
                                            isDark
                                                ? "border-white/10 bg-white/5 text-white placeholder:text-white/30"
                                                : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
                                        }`}
                                    />
                                    {errors.subject && (
                                        <p className="mt-2 text-xs text-red-500">
                                            {errors.subject}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-bold">
                                        {t.message}
                                    </label>
                                    <textarea
                                        rows="6"
                                        value={data.message}
                                        onChange={(e) =>
                                            setData("message", e.target.value)
                                        }
                                        className={`w-full resize-none rounded-2xl border px-4 py-3 text-sm outline-none transition ${
                                            isDark
                                                ? "border-white/10 bg-white/5 text-white placeholder:text-white/30"
                                                : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
                                        }`}
                                    />
                                    {errors.message && (
                                        <p className="mt-2 text-xs text-red-500">
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] px-6 py-4 text-base font-bold text-white shadow-xl transition hover:scale-[1.01] disabled:opacity-60"
                                >
                                    {processing ? t.sending : t.submit}
                                    <Send className="h-5 w-5" />
                                </button>
                            </form>
                        </div>

                        <div className="space-y-6">
                            <div
                                className={`rounded-[34px] border p-8 shadow-xl ${glass}`}
                            >
                                <div className="mb-5 text-2xl font-black">
                                    {t.faqTitle}
                                </div>

                                <div className="space-y-4">
                                    {faqs.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`rounded-2xl border p-5 ${glass}`}
                                        >
                                            <div className="font-bold">
                                                {item.q}
                                            </div>
                                            <p
                                                className={`mt-2 text-sm leading-7 ${textMuted}`}
                                            >
                                                {item.a}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div
                                className={`rounded-[34px] border p-8 shadow-xl ${glass}`}
                            >
                                <div className="mb-4 flex items-center gap-3">
                                    <MessageCircle className="h-5 w-5 text-[#7aa7bb]" />
                                    <div className="text-xl font-extrabold">
                                        {isArabic
                                            ? "قناة تواصل واضحة"
                                            : "A clearer communication channel"}
                                    </div>
                                </div>

                                <p className={`text-sm leading-8 ${textMuted}`}>
                                    {isArabic
                                        ? "هدفنا أن تشعر أن التواصل مع المنصة بسيط، واضح، وسريع دون تعقيد."
                                        : "Our goal is to make contacting the platform simple, clear, and fast without unnecessary friction."}
                                </p>

                                <div className="mt-6">
                                    <a
                                        href="mailto:support@mindgate.com"
                                        className="inline-flex items-center gap-2 font-bold text-[#7aa7bb]"
                                    >
                                        support@mindgate.com
                                        <ArrowRight className="h-4 w-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
