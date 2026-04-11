import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Head, Link, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Brain,
    Sparkles,
    ShieldCheck,
    Activity,
    NotebookPen,
    HeartHandshake,
    BookOpenText,
    Users,
    Stethoscope,
    LineChart,
    Building2,
    MessageCircle,
    ArrowRight,
    CheckCircle2,
    Clock3,
    Star,
    X,
} from "lucide-react";
import NavBar from "@/Components/NavBar";
import Footer from "@/Components/Footer";
import useSitePreferences from "@/hooks/useSitePreferences";

axios.defaults.baseURL = window.location.origin;

function GlassCard({ children, isDark, className = "" }) {
    return (
        <div
            className={`rounded-[32px] border shadow-xl ${
                isDark
                    ? "border-white/10 bg-white/5"
                    : "border-slate-200 bg-white/85"
            } ${className}`}
        >
            {children}
        </div>
    );
}

function SectionTitle({ title, subtitle, isDark }) {
    return (
        <div className="mb-12 text-center">
            <h2
                className={`text-3xl md:text-5xl font-black ${isDark ? "text-white" : "text-slate-900"}`}
            >
                {title}
            </h2>
            <p
                className={`mt-4 max-w-3xl mx-auto text-lg leading-8 ${isDark ? "text-white/70" : "text-slate-600"}`}
            >
                {subtitle}
            </p>
        </div>
    );
}

export default function Home() {
    const { props } = usePage();
    const {
        auth = {},
        heroSections = [],
        featuredSpecialists = [],
        featuredResources = [],
        stats = {},
        latestCheckin = null,
        hasTodayCheckin = false,
        flash = {},
    } = props;

    const user = auth?.user || null;
    const admin = auth?.admin || null;

    const { isDark, isArabic } = useSitePreferences();

    const [slide, setSlide] = useState(0);
    const [assessmentOpen, setAssessmentOpen] = useState(false);
    const [checkinOpen, setCheckinOpen] = useState(false);
    const [assessmentLoading, setAssessmentLoading] = useState(false);
    const [checkinLoading, setCheckinLoading] = useState(false);
    const [assessmentResult, setAssessmentResult] = useState(null);
    const [banner, setBanner] = useState({
        success: flash?.success || null,
        error: flash?.error || null,
    });

    const [assessmentForm, setAssessmentForm] = useState({
        full_name: user?.name || "",
        email: user?.email || "",
        anxiety: 3,
        stress: 3,
        sleep_quality: 3,
        mood_balance: 3,
        focus: 3,
        energy: 3,
    });

    const [checkinForm, setCheckinForm] = useState({
        mood: 5,
        stress: 5,
        energy: 5,
        focus: 5,
        sleep_hours: "",
        notes: "",
    });

    const t = useMemo(
        () => ({
            title: "Mind Gate",
            heroBadge: isArabic
                ? "منصة رقمية متكاملة للصحة النفسية"
                : "Integrated digital mental-health platform",
            heroTitle1: isArabic ? "بوابتك" : "Your gateway",
            heroTitle2: isArabic ? "لفهم حالتك النفسية" : "to understanding",
            heroTitle3: isArabic
                ? "والمتابعة اليومية بوضوح"
                : "your mental state",
            heroText: isArabic
                ? "ابدأ بتقييم أولي، تابع يومك بمؤشرات واضحة، واكتشف الموارد والمختصين المناسبين ضمن تجربة حديثة وآمنة."
                : "Start with an initial assessment, follow your daily state with clear indicators, and explore the right resources and specialists in a safe modern experience.",
            ctaMain:
                user || admin
                    ? isArabic
                        ? "الدخول إلى المساحة الخاصة"
                        : "Go to your space"
                    : isArabic
                      ? "إنشاء حساب"
                      : "Create account",
            ctaSecondary: isArabic
                ? "ابدأ التقييم الأولي"
                : "Start quick assessment",

            users: isArabic ? "المستخدمون" : "Users",
            specialists: isArabic ? "المختصون" : "Specialists",
            resources: isArabic ? "الموارد" : "Resources",
            checkins: isArabic ? "متابعات اليوم" : "Today check-ins",

            featuresTitle: isArabic
                ? "ماذا يقدّم الموقع فعليًا؟"
                : "What does the platform actually provide?",
            featuresSubtitle: isArabic
                ? "مسار واضح يبدأ بالفهم، ثم التقييم، ثم المتابعة، ثم الدعم المناسب."
                : "A clear journey that starts with understanding, then assessment, then tracking, then appropriate support.",

            specialistsTitle: isArabic
                ? "مختصون موثوقون"
                : "Trusted specialists",
            specialistsSubtitle: isArabic
                ? "هذا القسم يقرأ بيانات حقيقية من قاعدة البيانات."
                : "This section reads live specialist data from the database.",

            resourcesTitle: isArabic ? "مركز الموارد" : "Resource center",
            resourcesSubtitle: isArabic
                ? "محتوى معرفي وتمارين ومقالات تساعد المستخدم في المتابعة اليومية."
                : "Articles, exercises, and guided content that support daily progress.",

            dailyCheckinTitle: isArabic ? "المتابعة اليومية" : "Daily check-in",
            dailyCheckinText: isArabic
                ? "سجّل مزاجك وتوترك وطاقة يومك ونومك حتى ترى الصورة بشكل أوضح مع الوقت."
                : "Track mood, stress, energy, focus, and sleep to build a clearer picture over time.",
            todaySaved: isArabic
                ? "تم حفظ متابعة اليوم"
                : "Today check-in saved",
            submitCheckin: isArabic
                ? "سجل متابعة اليوم"
                : "Submit today check-in",

            quickAssessmentTitle: isArabic
                ? "التقييم الأولي"
                : "Quick assessment",
            quickAssessmentText: isArabic
                ? "ابدأ بنموذج قصير يعطيك ملخصًا أوليًا وتوصية مبدئية."
                : "Start with a short form that returns an early summary and a first recommendation.",
            resultTitle: isArabic ? "نتيجة التقييم" : "Assessment result",

            orgTitle: isArabic
                ? "مصمم للأفراد والمؤسسات"
                : "Built for individuals and organizations",
            orgText: isArabic
                ? "المنصة قابلة للتوسع لتخدم الشركات والمؤسسات في دعم الصحة النفسية للموظفين ضمن تدفقات عمل واضحة."
                : "The platform is ready to expand toward organization workflows and employee mental-health support.",

            noSpecialists: isArabic
                ? "لا يوجد مختصون مضافون بعد."
                : "No specialists have been added yet.",
            noResources: isArabic
                ? "لا توجد موارد منشورة بعد."
                : "No published resources yet.",

            viewAllSpecialists: isArabic
                ? "عرض كل المختصين"
                : "View all specialists",
            viewAllResources: isArabic
                ? "عرض كل الموارد"
                : "View all resources",

            close: isArabic ? "إغلاق" : "Close",
            send: isArabic ? "إرسال" : "Submit",
            saving: isArabic ? "جارٍ الحفظ..." : "Saving...",
        }),
        [isArabic, user, admin],
    );

    const hero = heroSections[slide] || null;
    const pageBg = isDark
        ? "bg-[#081018] text-white"
        : "bg-[#f7fafc] text-slate-900";
    const muted = isDark ? "text-white/70" : "text-slate-600";

    useEffect(() => {
        if (heroSections.length > 1) {
            const timer = setInterval(() => {
                setSlide((prev) => (prev + 1) % heroSections.length);
            }, 5000);

            return () => clearInterval(timer);
        }
    }, [heroSections]);

    useEffect(() => {
        if (!banner.success && !banner.error) return;
        const timer = setTimeout(() => {
            setBanner({ success: null, error: null });
        }, 4000);
        return () => clearTimeout(timer);
    }, [banner]);

    const submitAssessment = async (e) => {
        e.preventDefault();
        setAssessmentLoading(true);

        try {
            const res = await axios.post(
                route("assessment.quick"),
                assessmentForm,
            );
            setAssessmentResult(res.data?.result || null);
            setBanner({
                success:
                    res.data?.message || "Assessment submitted successfully.",
                error: null,
            });
        } catch (error) {
            setBanner({
                success: null,
                error:
                    error.response?.data?.message ||
                    "Failed to submit assessment.",
            });
        } finally {
            setAssessmentLoading(false);
        }
    };

    const submitCheckin = async (e) => {
        e.preventDefault();
        setCheckinLoading(true);

        try {
            const res = await axios.post(
                route("daily-checkins.store"),
                checkinForm,
            );
            setBanner({
                success: res.data?.message || "Check-in saved successfully.",
                error: null,
            });
            setCheckinOpen(false);
        } catch (error) {
            setBanner({
                success: null,
                error:
                    error.response?.data?.message || "Failed to save check-in.",
            });
        } finally {
            setCheckinLoading(false);
        }
    };

    const featureCards = [
        {
            icon: Brain,
            title: isArabic ? "تقييم أولي ذكي" : "Smart initial assessment",
            text: isArabic
                ? "نقطة دخول واضحة تساعد المستخدم على فهم وضعه الحالي."
                : "A clear entry point that helps users understand their current state.",
        },
        {
            icon: Activity,
            title: isArabic
                ? "متابعة يومية منظمة"
                : "Structured daily tracking",
            text: isArabic
                ? "المزاج، التوتر، الطاقة، النوم، والتركيز في مسار واحد منظم."
                : "Mood, stress, energy, sleep, and focus in one structured workflow.",
        },
        {
            icon: BookOpenText,
            title: isArabic ? "موارد معرفية" : "Knowledge resources",
            text: isArabic
                ? "مقالات وتمارين وأدلة تساعد المستخدم في التقدم خطوة بخطوة."
                : "Articles, exercises, and guides that help users move forward step by step.",
        },
        {
            icon: HeartHandshake,
            title: isArabic ? "دعم إنساني" : "Human-centered support",
            text: isArabic
                ? "واجهة هادئة وواضحة تحترم حساسية المجال النفسي."
                : "A calmer and clearer interface that respects the sensitivity of mental-health support.",
        },
    ];

    return (
        <div
            dir={isArabic ? "rtl" : "ltr"}
            className={`min-h-screen ${pageBg} relative overflow-hidden`}
        >
            <Head title={t.title} />
            <NavBar />

            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-16 end-0 h-[380px] w-[380px] rounded-full bg-[#7aa7bb]/20 blur-3xl" />
                <div className="absolute bottom-0 start-0 h-[300px] w-[300px] rounded-full bg-[#9cc7d8]/20 blur-3xl" />
            </div>

            <AnimatePresence>
                {(banner.success || banner.error) && (
                    <motion.div
                        initial={{ opacity: 0, y: -24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -24 }}
                        className="fixed top-24 z-[80] w-full px-4"
                    >
                        <div className="mx-auto max-w-xl">
                            <div
                                className={`rounded-2xl border px-4 py-4 text-sm font-semibold shadow-2xl backdrop-blur-xl ${
                                    banner.error
                                        ? isDark
                                            ? "border-red-500/20 bg-red-500/10 text-red-300"
                                            : "border-red-200 bg-red-50 text-red-700"
                                        : isDark
                                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                                          : "border-emerald-200 bg-emerald-50 text-emerald-700"
                                }`}
                            >
                                {banner.error || banner.success}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="relative z-10 pt-28">
                <section className="px-6 md:px-12 lg:px-16 pb-20">
                    <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold ${
                                    isDark
                                        ? "bg-white/5 border-white/10"
                                        : "bg-white/80 border-slate-200"
                                }`}
                            >
                                <Sparkles className="h-4 w-4 text-[#7aa7bb]" />
                                {t.heroBadge}
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.06 }}
                                className="mt-6 text-5xl md:text-7xl font-black leading-tight"
                            >
                                {hero?.title ||
                                    `${t.heroTitle1} ${t.heroTitle2}`}
                                <br />
                                <span className="bg-gradient-to-l from-[#c7e5d6] via-[#9ed0d8] to-[#7faabd] bg-clip-text text-transparent">
                                    {hero?.subtitle || t.heroTitle3}
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.12 }}
                                className={`mt-6 max-w-2xl text-lg leading-9 ${muted}`}
                            >
                                {t.heroText}
                            </motion.p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    href={
                                        admin
                                            ? route("admin.dashboard")
                                            : user
                                              ? route("home")
                                              : route("register")
                                    }
                                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] px-7 py-4 text-base font-bold text-white shadow-xl transition hover:scale-[1.02]"
                                >
                                    {t.ctaMain}
                                    <ArrowRight className="h-5 w-5" />
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => setAssessmentOpen(true)}
                                    className={`inline-flex items-center gap-2 rounded-2xl border px-7 py-4 text-base font-bold transition ${
                                        isDark
                                            ? "border-white/10 bg-white/5 text-white"
                                            : "border-slate-200 bg-white/85 text-slate-900"
                                    }`}
                                >
                                    {t.ctaSecondary}
                                </button>
                            </div>

                            {heroSections.length > 1 && (
                                <div className="mt-8 flex items-center gap-2">
                                    {heroSections.map((_, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => setSlide(index)}
                                            className={`h-2.5 rounded-full transition-all ${
                                                slide === index
                                                    ? "w-10 bg-[#7aa7bb]"
                                                    : isDark
                                                      ? "w-2.5 bg-white/30"
                                                      : "w-2.5 bg-slate-300"
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <GlassCard
                            isDark={isDark}
                            className="p-5 overflow-hidden"
                        >
                            {hero?.image ? (
                                <div className="relative overflow-hidden rounded-[28px] border border-white/10">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#081018]/70 via-transparent to-transparent z-10" />
                                    <img
                                        src={hero.image}
                                        alt={hero.title || "Mind Gate Hero"}
                                        className="h-[500px] w-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div
                                    className={`relative flex h-[500px] items-center justify-center overflow-hidden rounded-[28px] ${
                                        isDark
                                            ? "bg-gradient-to-br from-[#0b1824] to-[#112231]"
                                            : "bg-gradient-to-br from-[#eef6fa] to-[#dbeaf2]"
                                    }`}
                                >
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(122,167,187,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(156,199,216,0.22),transparent_28%)]" />
                                    <div className="relative z-10 text-center px-8">
                                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#7aa7bb] to-[#6797ab] text-white shadow-xl">
                                            <Brain className="h-10 w-10" />
                                        </div>
                                        <h3 className="text-3xl font-black">
                                            {isArabic
                                                ? "واجهة أوضح وأكثر هدوءًا"
                                                : "A calmer, clearer experience"}
                                        </h3>
                                        <p
                                            className={`mt-4 text-base leading-8 ${muted}`}
                                        >
                                            {isArabic
                                                ? "الهيرو الجديدة تعكس هوية المنصة النفسية بشكل احترافي وواضح."
                                                : "The new hero reflects the platform identity in a more professional and focused way."}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </GlassCard>
                    </div>
                </section>

                <section className="px-6 md:px-12 lg:px-16 pb-20">
                    <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {[
                            {
                                label: t.users,
                                value: stats.users ?? 0,
                                icon: Users,
                            },
                            {
                                label: t.specialists,
                                value: stats.specialists ?? 0,
                                icon: Stethoscope,
                            },
                            {
                                label: t.resources,
                                value: stats.resources ?? 0,
                                icon: BookOpenText,
                            },
                            {
                                label: t.checkins,
                                value: stats.today_checkins ?? 0,
                                icon: LineChart,
                            },
                        ].map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <GlassCard
                                    key={index}
                                    isDark={isDark}
                                    className="p-5"
                                >
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7aa7bb] to-[#6797ab] text-white shadow-lg">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div className="text-3xl font-black">
                                        {item.value}
                                    </div>
                                    <div className={`mt-2 text-sm ${muted}`}>
                                        {item.label}
                                    </div>
                                </GlassCard>
                            );
                        })}
                    </div>
                </section>

                <section className="px-6 md:px-12 lg:px-16 pb-20">
                    <div className="mx-auto max-w-7xl">
                        <SectionTitle
                            title={t.featuresTitle}
                            subtitle={t.featuresSubtitle}
                            isDark={isDark}
                        />

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                            {featureCards.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <GlassCard
                                        key={index}
                                        isDark={isDark}
                                        className="p-7"
                                    >
                                        <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7aa7bb] to-[#6797ab] text-white shadow-lg">
                                            <Icon className="h-7 w-7" />
                                        </div>
                                        <h3 className="text-xl font-extrabold">
                                            {item.title}
                                        </h3>
                                        <p
                                            className={`mt-3 text-sm leading-8 ${muted}`}
                                        >
                                            {item.text}
                                        </p>
                                    </GlassCard>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="px-6 md:px-12 lg:px-16 pb-20">
                    <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
                        <GlassCard isDark={isDark} className="p-8">
                            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7aa7bb] to-[#6797ab] text-white shadow-lg">
                                <NotebookPen className="h-7 w-7" />
                            </div>

                            <h3 className="text-3xl font-black">
                                {t.quickAssessmentTitle}
                            </h3>
                            <p className={`mt-4 text-base leading-8 ${muted}`}>
                                {t.quickAssessmentText}
                            </p>

                            <button
                                type="button"
                                onClick={() => setAssessmentOpen(true)}
                                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] px-6 py-4 text-sm font-bold text-white shadow-xl"
                            >
                                {t.ctaSecondary}
                                <ArrowRight className="h-4 w-4" />
                            </button>

                            {assessmentResult && (
                                <div
                                    className={`mt-6 rounded-3xl border p-5 ${
                                        isDark
                                            ? "border-white/10 bg-white/5"
                                            : "border-slate-200 bg-slate-50"
                                    }`}
                                >
                                    <div className="mb-2 text-lg font-extrabold">
                                        {t.resultTitle}
                                    </div>
                                    <div className="text-sm font-bold uppercase text-[#7aa7bb]">
                                        {assessmentResult.level}
                                    </div>
                                    <p
                                        className={`mt-3 text-sm leading-8 ${muted}`}
                                    >
                                        {assessmentResult.summary}
                                    </p>
                                    <p className="mt-3 text-sm font-semibold">
                                        {assessmentResult.recommendation}
                                    </p>
                                </div>
                            )}
                        </GlassCard>

                        <GlassCard isDark={isDark} className="p-8">
                            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7aa7bb] to-[#6797ab] text-white shadow-lg">
                                <Activity className="h-7 w-7" />
                            </div>

                            <h3 className="text-3xl font-black">
                                {t.dailyCheckinTitle}
                            </h3>
                            <p className={`mt-4 text-base leading-8 ${muted}`}>
                                {t.dailyCheckinText}
                            </p>

                            {user ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setCheckinOpen(true)}
                                        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] px-6 py-4 text-sm font-bold text-white shadow-xl"
                                    >
                                        {hasTodayCheckin
                                            ? t.todaySaved
                                            : t.submitCheckin}
                                        <ArrowRight className="h-4 w-4" />
                                    </button>

                                    {latestCheckin && (
                                        <div
                                            className={`mt-6 rounded-3xl border p-5 ${
                                                isDark
                                                    ? "border-white/10 bg-white/5"
                                                    : "border-slate-200 bg-slate-50"
                                            }`}
                                        >
                                            <div className="mb-3 text-lg font-extrabold">
                                                {isArabic
                                                    ? "آخر متابعة لك"
                                                    : "Your latest check-in"}
                                            </div>
                                            <div
                                                className={`grid grid-cols-2 gap-3 text-sm ${muted}`}
                                            >
                                                <div>
                                                    Mood: {latestCheckin.mood}
                                                    /10
                                                </div>
                                                <div>
                                                    Stress:{" "}
                                                    {latestCheckin.stress}/10
                                                </div>
                                                <div>
                                                    Energy:{" "}
                                                    {latestCheckin.energy}/10
                                                </div>
                                                <div>
                                                    Focus: {latestCheckin.focus}
                                                    /10
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link
                                    href={route("login")}
                                    className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] px-6 py-4 text-sm font-bold text-white shadow-xl"
                                >
                                    {isArabic
                                        ? "سجل الدخول للمتابعة اليومية"
                                        : "Login for daily tracking"}
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            )}
                        </GlassCard>
                    </div>
                </section>

                <section className="px-6 md:px-12 lg:px-16 pb-20">
                    <div className="mx-auto max-w-7xl">
                        <SectionTitle
                            title={t.specialistsTitle}
                            subtitle={t.specialistsSubtitle}
                            isDark={isDark}
                        />

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                            {featuredSpecialists.length ? (
                                featuredSpecialists.map((item) => (
                                    <GlassCard
                                        key={item.id}
                                        isDark={isDark}
                                        className="p-6"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div
                                                className={`h-16 w-16 overflow-hidden rounded-2xl ${isDark ? "bg-white/5" : "bg-slate-100"}`}
                                            >
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.full_name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center">
                                                        <Stethoscope className="h-7 w-7 text-[#7aa7bb]" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h3 className="truncate text-lg font-extrabold">
                                                    {item.full_name}
                                                </h3>
                                                <p className="mt-1 text-sm font-semibold text-[#7aa7bb]">
                                                    {item.job_title ||
                                                        item.specialization}
                                                </p>
                                                <p
                                                    className={`mt-3 line-clamp-3 text-sm leading-7 ${muted}`}
                                                >
                                                    {item.bio ||
                                                        item.specialization}
                                                </p>
                                            </div>
                                        </div>
                                    </GlassCard>
                                ))
                            ) : (
                                <GlassCard
                                    isDark={isDark}
                                    className="col-span-full p-8 text-center"
                                >
                                    <p className={muted}>{t.noSpecialists}</p>
                                </GlassCard>
                            )}
                        </div>

                        <div className="mt-8 text-center">
                            <Link
                                href={route("specialists.index")}
                                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] px-6 py-4 text-sm font-bold text-white shadow-xl"
                            >
                                {t.viewAllSpecialists}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="px-6 md:px-12 lg:px-16 pb-20">
                    <div className="mx-auto max-w-7xl">
                        <SectionTitle
                            title={t.resourcesTitle}
                            subtitle={t.resourcesSubtitle}
                            isDark={isDark}
                        />

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {featuredResources.length ? (
                                featuredResources.map((item) => (
                                    <GlassCard
                                        key={item.id}
                                        isDark={isDark}
                                        className="overflow-hidden"
                                    >
                                        <div
                                            className={`h-48 ${isDark ? "bg-white/5" : "bg-slate-100"}`}
                                        >
                                            {item.cover_image ? (
                                                <img
                                                    src={item.cover_image}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <BookOpenText className="h-10 w-10 text-[#7aa7bb]" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6">
                                            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold text-[#7aa7bb]">
                                                <span>{item.type}</span>
                                                {item.category ? (
                                                    <span>
                                                        • {item.category}
                                                    </span>
                                                ) : null}
                                                {item.read_time ? (
                                                    <span className="inline-flex items-center gap-1">
                                                        <Clock3 className="h-3.5 w-3.5" />
                                                        {item.read_time} min
                                                    </span>
                                                ) : null}
                                            </div>

                                            <h3 className="text-xl font-extrabold">
                                                {item.title}
                                            </h3>
                                            <p
                                                className={`mt-3 line-clamp-3 text-sm leading-8 ${muted}`}
                                            >
                                                {item.excerpt || ""}
                                            </p>

                                            <div className="mt-5">
                                                <Link
                                                    href={route(
                                                        "resources.show",
                                                        item.slug,
                                                    )}
                                                    className="inline-flex items-center gap-2 font-bold text-[#7aa7bb]"
                                                >
                                                    {isArabic
                                                        ? "قراءة المزيد"
                                                        : "Read more"}
                                                    <ArrowRight className="h-4 w-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    </GlassCard>
                                ))
                            ) : (
                                <GlassCard
                                    isDark={isDark}
                                    className="col-span-full p-8 text-center"
                                >
                                    <p className={muted}>{t.noResources}</p>
                                </GlassCard>
                            )}
                        </div>

                        <div className="mt-8 text-center">
                            <Link
                                href={route("resources.index")}
                                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] px-6 py-4 text-sm font-bold text-white shadow-xl"
                            >
                                {t.viewAllResources}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="px-6 md:px-12 lg:px-16 pb-24">
                    <div className="mx-auto max-w-7xl">
                        <GlassCard isDark={isDark} className="p-10">
                            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] items-center">
                                <div>
                                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7aa7bb] to-[#6797ab] text-white shadow-lg">
                                        <Building2 className="h-7 w-7" />
                                    </div>

                                    <h3 className="text-4xl font-black">
                                        {t.orgTitle}
                                    </h3>
                                    <p
                                        className={`mt-4 text-lg leading-9 ${muted}`}
                                    >
                                        {t.orgText}
                                    </p>

                                    <div className="mt-6 flex flex-wrap gap-3">
                                        {[
                                            isArabic
                                                ? "خصوصية عالية"
                                                : "High privacy",
                                            isArabic
                                                ? "تقييم ومتابعة"
                                                : "Assessment and follow-up",
                                            isArabic
                                                ? "قابلية توسع مؤسسية"
                                                : "Organization-ready",
                                        ].map((text, index) => (
                                            <div
                                                key={index}
                                                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                                                    isDark
                                                        ? "bg-white/5 text-white/85"
                                                        : "bg-slate-100 text-slate-700"
                                                }`}
                                            >
                                                <CheckCircle2 className="h-4 w-4 text-[#7aa7bb]" />
                                                {text}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div
                                    className={`rounded-[28px] border p-6 ${
                                        isDark
                                            ? "border-white/10 bg-white/5"
                                            : "border-slate-200 bg-slate-50"
                                    }`}
                                >
                                    <div className="space-y-4">
                                        {[
                                            isArabic
                                                ? "مسار استخدام واضح من أول دخول"
                                                : "A clear user flow from the first visit",
                                            isArabic
                                                ? "ربط بين التقييم والموارد والمتابعة"
                                                : "A connection between assessment, resources, and follow-up",
                                            isArabic
                                                ? "واجهة حديثة مرتبطة بالمود واللغة"
                                                : "A modern interface synced with theme and language",
                                            isArabic
                                                ? "هيكل رسمي قابل للتسليم والتوسع"
                                                : "A formal structure ready for delivery and expansion",
                                        ].map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3"
                                            >
                                                <Star className="mt-1 h-5 w-5 text-[#7aa7bb]" />
                                                <span
                                                    className={`text-sm leading-7 ${muted}`}
                                                >
                                                    {item}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </section>
            </main>

            <Footer />

            <AnimatePresence>
                {assessmentOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[90] bg-black/55 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.98 }}
                            className={`mx-auto mt-24 max-w-3xl rounded-[32px] border p-6 shadow-2xl ${
                                isDark
                                    ? "bg-[#081018] border-white/10 text-white"
                                    : "bg-white border-slate-200 text-slate-900"
                            }`}
                        >
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-2xl font-black">
                                    {t.quickAssessmentTitle}
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setAssessmentOpen(false)}
                                    className="rounded-xl p-2 hover:bg-white/5"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <form
                                onSubmit={submitAssessment}
                                className="space-y-5"
                            >
                                <div className="grid gap-5 md:grid-cols-2">
                                    <input
                                        type="text"
                                        placeholder={
                                            isArabic ? "الاسم" : "Name"
                                        }
                                        value={assessmentForm.full_name}
                                        onChange={(e) =>
                                            setAssessmentForm((prev) => ({
                                                ...prev,
                                                full_name: e.target.value,
                                            }))
                                        }
                                        className={`rounded-2xl border px-4 py-3 text-sm outline-none ${
                                            isDark
                                                ? "border-white/10 bg-white/5 text-white"
                                                : "border-slate-200 bg-slate-50"
                                        }`}
                                    />

                                    <input
                                        type="email"
                                        placeholder={
                                            isArabic
                                                ? "البريد الإلكتروني"
                                                : "Email"
                                        }
                                        value={assessmentForm.email}
                                        onChange={(e) =>
                                            setAssessmentForm((prev) => ({
                                                ...prev,
                                                email: e.target.value,
                                            }))
                                        }
                                        className={`rounded-2xl border px-4 py-3 text-sm outline-none ${
                                            isDark
                                                ? "border-white/10 bg-white/5 text-white"
                                                : "border-slate-200 bg-slate-50"
                                        }`}
                                    />
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    {[
                                        [
                                            "anxiety",
                                            isArabic ? "القلق" : "Anxiety",
                                        ],
                                        [
                                            "stress",
                                            isArabic ? "التوتر" : "Stress",
                                        ],
                                        [
                                            "sleep_quality",
                                            isArabic
                                                ? "جودة النوم"
                                                : "Sleep quality",
                                        ],
                                        [
                                            "mood_balance",
                                            isArabic
                                                ? "توازن المزاج"
                                                : "Mood balance",
                                        ],
                                        [
                                            "focus",
                                            isArabic ? "التركيز" : "Focus",
                                        ],
                                        [
                                            "energy",
                                            isArabic ? "الطاقة" : "Energy",
                                        ],
                                    ].map(([key, label]) => (
                                        <div key={key}>
                                            <label className="mb-2 block text-sm font-bold">
                                                {label}
                                            </label>
                                            <select
                                                value={assessmentForm[key]}
                                                onChange={(e) =>
                                                    setAssessmentForm(
                                                        (prev) => ({
                                                            ...prev,
                                                            [key]: Number(
                                                                e.target.value,
                                                            ),
                                                        }),
                                                    )
                                                }
                                                className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none ${
                                                    isDark
                                                        ? "border-white/10 bg-white/5 text-white"
                                                        : "border-slate-200 bg-slate-50"
                                                }`}
                                            >
                                                {[1, 2, 3, 4, 5].map((n) => (
                                                    <option key={n} value={n}>
                                                        {n}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="submit"
                                    disabled={assessmentLoading}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] px-6 py-4 text-base font-bold text-white shadow-xl"
                                >
                                    {assessmentLoading ? t.saving : t.send}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {checkinOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[90] bg-black/55 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.98 }}
                            className={`mx-auto mt-24 max-w-2xl rounded-[32px] border p-6 shadow-2xl ${
                                isDark
                                    ? "bg-[#081018] border-white/10 text-white"
                                    : "bg-white border-slate-200 text-slate-900"
                            }`}
                        >
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-2xl font-black">
                                    {t.dailyCheckinTitle}
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setCheckinOpen(false)}
                                    className="rounded-xl p-2 hover:bg-white/5"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <form
                                onSubmit={submitCheckin}
                                className="space-y-5"
                            >
                                <div className="grid gap-4 md:grid-cols-2">
                                    {[
                                        ["mood", isArabic ? "المزاج" : "Mood"],
                                        [
                                            "stress",
                                            isArabic ? "التوتر" : "Stress",
                                        ],
                                        [
                                            "energy",
                                            isArabic ? "الطاقة" : "Energy",
                                        ],
                                        [
                                            "focus",
                                            isArabic ? "التركيز" : "Focus",
                                        ],
                                    ].map(([key, label]) => (
                                        <div key={key}>
                                            <label className="mb-2 block text-sm font-bold">
                                                {label}
                                            </label>
                                            <select
                                                value={checkinForm[key]}
                                                onChange={(e) =>
                                                    setCheckinForm((prev) => ({
                                                        ...prev,
                                                        [key]: Number(
                                                            e.target.value,
                                                        ),
                                                    }))
                                                }
                                                className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none ${
                                                    isDark
                                                        ? "border-white/10 bg-white/5 text-white"
                                                        : "border-slate-200 bg-slate-50"
                                                }`}
                                            >
                                                {[
                                                    1, 2, 3, 4, 5, 6, 7, 8, 9,
                                                    10,
                                                ].map((n) => (
                                                    <option key={n} value={n}>
                                                        {n}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-bold">
                                        {isArabic
                                            ? "عدد ساعات النوم"
                                            : "Sleep hours"}
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="24"
                                        step="0.5"
                                        value={checkinForm.sleep_hours}
                                        onChange={(e) =>
                                            setCheckinForm((prev) => ({
                                                ...prev,
                                                sleep_hours: e.target.value,
                                            }))
                                        }
                                        className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none ${
                                            isDark
                                                ? "border-white/10 bg-white/5 text-white"
                                                : "border-slate-200 bg-slate-50"
                                        }`}
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-bold">
                                        {isArabic ? "ملاحظات" : "Notes"}
                                    </label>
                                    <textarea
                                        rows="4"
                                        value={checkinForm.notes}
                                        onChange={(e) =>
                                            setCheckinForm((prev) => ({
                                                ...prev,
                                                notes: e.target.value,
                                            }))
                                        }
                                        className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none ${
                                            isDark
                                                ? "border-white/10 bg-white/5 text-white"
                                                : "border-slate-200 bg-slate-50"
                                        }`}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={checkinLoading}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] px-6 py-4 text-base font-bold text-white shadow-xl"
                                >
                                    {checkinLoading ? t.saving : t.send}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
