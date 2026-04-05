import React from "react";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    ArrowRight,
    ArrowLeft,
    Sparkles,
    Brain,
    Heart,
    Shield,
    Users,
    HeartHandshake,
    MessageCircle,
    BadgeCheck,
    Stethoscope,
    Building2,
    CheckCircle2,
    Star,
    Clock,
    TrendingUp,
    Info,
} from "lucide-react";

const About = ({ auth }) => {
    const user = auth?.user || null;
    const canGoBack = window.history.length > 2;
    const backgroundImage = "/images/word.png";

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    };

    // Timeline
    const timeline = [
        {
            year: "٢٠٢٢",
            title: "البداية",
            description:
                "وُلدت فكرة MindBridge من رغبة حقيقية في تقليص الفجوة بين الأفراد والدعم النفسي المتخصص.",
        },
        {
            year: "٢٠٢٣",
            title: "الانطلاق",
            description:
                "إطلاق النسخة الأولى من المنصة وتحقيق أول ١٠٠٠ مستخدم خلال الأشهر الثلاثة الأولى.",
        },
        {
            year: "٢٠٢٤",
            title: "التوسع",
            description:
                "توسيع شبكة المعالجين لتشمل تخصصات متعددة، وإطلاق حلول الشركات والمؤسسات.",
        },
        {
            year: "٢٠٢٥",
            title: "الريادة",
            description:
                "منصة رائدة في الصحة النفسية الرقمية تجمع الذكاء الاصطناعي مع الخبرة البشرية في مكان واحد.",
        },
    ];

    // Stats
    const stats = [
        { icon: Users, value: "+١٠٠٠", label: "مستخدم نشط" },
        { icon: Stethoscope, value: "+٥٠", label: "معالج معتمد" },
        { icon: Clock, value: "٢٤/٧", label: "دعم متواصل" },
        { icon: BadgeCheck, value: "٩٨٪", label: "رضا المستخدمين" },
    ];

    // Core values
    const values = [
        {
            icon: Heart,
            title: "الإنسانية",
            description:
                "نؤمن أن كل شخص يستحق الدعم النفسي بغض النظر عن ظروفه.",
            color: "from-pink-500 to-rose-500",
        },
        {
            icon: Brain,
            title: "الابتكار",
            description:
                "نستخدم أحدث تقنيات الذكاء الاصطناعي لتحسين تجربة الصحة النفسية.",
            color: "from-[#6797ab] to-[#4a7f96]",
        },
        {
            icon: Shield,
            title: "الأمان",
            description:
                "خصوصيتك خط أحمر — بيانات مشفّرة وسرية تامة في كل تفاعل.",
            color: "from-emerald-500 to-teal-500",
        },
        {
            icon: HeartHandshake,
            title: "الثقة",
            description:
                "نبني علاقة طويلة الأمد مع مستخدمينا قائمة على الشفافية والاحترام.",
            color: "from-purple-500 to-indigo-500",
        },
    ];

    // What sets us apart
    const features = [
        "تقييم نفسي أولي مدعوم بالذكاء الاصطناعي",
        "توصية ذكية بأنسب معالج بناءً على حالتك",
        "جلسات أونلاين آمنة ومشفّرة بالكامل",
        "مرافق يومي لمتابعة المزاج والتوتر",
        "تنبيهات مبكرة عند ظهور علامات الإرهاق",
        "حلول مؤسسية مخصصة للشركات والفرق",
    ];

    return (
        <div
            dir="rtl"
            className="min-h-screen w-full relative overflow-hidden bg-[#f4f8fb]"
        >
            <Head title="من نحن - MindBridge" />

            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${backgroundImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#163040]/70 via-[#173444]/65 to-[#122734]/80 z-0" />

            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-[#9cc7d8]/20 rounded-full blur-3xl z-0" />
            <div className="absolute bottom-0 left-0 w-[380px] h-[380px] bg-[#bcdccf]/20 rounded-full blur-3xl z-0" />

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

                {/* ===== Hero Section ===== */}
                <section className="relative pt-16 pb-20 px-6 md:px-12 lg:px-16">
                    <div className="max-w-7xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-md"
                        >
                            <Sparkles className="w-5 h-5 text-[#b9dfcf]" />
                            <span className="text-[#d8efe6] font-semibold text-sm tracking-wide">
                                قصتنا ورسالتنا
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-7xl font-black text-white leading-tight drop-shadow-2xl mb-6"
                        >
                            نحن هنا لأن
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#c7e5d6] via-[#9ed0d8] to-[#7faabd]">
                                صحتك النفسية تهمنا
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-xl text-[#e8f1f5] max-w-3xl mx-auto mb-12 leading-9"
                        >
                            MindBridge لم تُبنَ كمنصة تقنية فحسب — بُنيت كجسر
                            حقيقي بين الإنسان وما يحتاجه من دعم نفسي، في الوقت
                            المناسب وبالطريقة الأنسب.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <Link
                                href="/register"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] hover:from-[#6d9bb0] hover:to-[#5f8ea2] text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-[#7aa7bb]/30 transition-all duration-300 hover:scale-105"
                            >
                                ابدأ رحلتك الآن
                                <Brain className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* ===== Stats Section ===== */}
                <section className="py-14 border-y border-white/10 px-6 md:px-12 lg:px-16">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="grid grid-cols-2 md:grid-cols-4 gap-8"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    className="text-center group"
                                >
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 border border-white/20 mb-4 group-hover:bg-white/15 transition-all duration-300 backdrop-blur-md">
                                        <stat.icon className="w-8 h-8 text-[#c6e4d5]" />
                                    </div>
                                    <h3 className="text-4xl font-black text-white mb-2">
                                        {stat.value}
                                    </h3>
                                    <p className="text-[#d1e0e7] text-sm">
                                        {stat.label}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ===== Our Story + Timeline ===== */}
                <section className="py-20 px-6 md:px-12 lg:px-16">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="grid md:grid-cols-2 gap-12 items-center"
                        >
                            {/* Text */}
                            <div>
                                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white/10 border border-white/20 rounded-full backdrop-blur-md">
                                    <Star className="w-4 h-4 text-[#b9dfcf]" />
                                    <span className="text-sm font-semibold text-[#d8efe6]">
                                        قصتنا
                                    </span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                                    بُنينا من أجلك،
                                    <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#c7e5d6] to-[#7faabd]">
                                        لأجل صحتك
                                    </span>
                                </h2>

                                <div className="space-y-5 text-[#e0ebf0] text-lg leading-9">
                                    <p>
                                        بدأت MindBridge من سؤال بسيط: لماذا يصعب
                                        على الناس طلب المساعدة النفسية؟ الحرج،
                                        التكلفة، وصعوبة إيجاد المختص المناسب —
                                        كانت هذه أكبر العوائق.
                                    </p>
                                    <p>
                                        قررنا بناء منصة تزيل هذه العوائق كلها.
                                        منصة تجعل الخطوة الأولى نحو الدعم النفسي
                                        سهلة، سريعة، وخالية من الحرج.
                                    </p>
                                    <p>
                                        اليوم، نفخر بأن MindBridge أصبحت وجهة
                                        موثوقة لآلاف المستخدمين الباحثين عن دعم
                                        نفسي حقيقي في بيئة آمنة.
                                    </p>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="relative">
                                <div className="absolute right-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#7aa7bb] to-[#bcdccf]" />
                                <div className="space-y-8">
                                    {timeline.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.2 }}
                                            className="relative pr-20"
                                        >
                                            <div className="absolute right-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#7aa7bb] to-[#6797ab] flex items-center justify-center font-bold text-xs text-white border-4 border-[#122734]">
                                                {item.year}
                                            </div>
                                            <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-5 shadow-xl transition-all duration-300 hover:bg-white/15">
                                                <h3 className="text-white font-extrabold text-lg mb-1">
                                                    {item.title}
                                                </h3>
                                                <p className="text-[#e0ebf0] text-sm leading-7">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ===== Core Values ===== */}
                <section className="py-20 px-6 md:px-12 lg:px-16">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="text-center mb-14"
                        >
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                                ما الذي{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#c7e5d6] to-[#7faabd]">
                                    يحرّكنا؟
                                </span>
                            </h2>
                            <p className="text-xl text-[#d1e0e7] max-w-2xl mx-auto leading-8">
                                قيمنا الجوهرية تشكّل كل قرار نتخذه وكل تجربة
                                نبنيها لمستخدمينا
                            </p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {values.map((value, index) => (
                                <motion.div
                                    key={index}
                                    variants={scaleIn}
                                    whileHover={{ y: -8 }}
                                    className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 shadow-xl transition-all duration-300 hover:bg-white/15"
                                >
                                    <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl opacity-60" />
                                    <div className="relative">
                                        <div
                                            className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${value.color} mb-6`}
                                        >
                                            <value.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-white font-extrabold text-xl mb-3">
                                            {value.title}
                                        </h3>
                                        <p className="text-[#e0ebf0] text-sm leading-7">
                                            {value.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ===== What Sets Us Apart ===== */}
                <section className="py-20 px-6 md:px-12 lg:px-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Visual Side */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="aspect-square rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl flex items-center justify-center overflow-hidden shadow-2xl">
                                    <TrendingUp className="w-64 h-64 text-white/10" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#7aa7bb]/20 to-[#bcdccf]/10" />
                                </div>
                                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-[#7aa7bb] to-[#6797ab] rounded-3xl flex items-center justify-center shadow-xl">
                                    <HeartHandshake className="w-16 h-16 text-white" />
                                </div>
                            </motion.div>

                            {/* Content Side */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                                    لماذا تختار{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#c7e5d6] to-[#7faabd]">
                                        MindBridge؟
                                    </span>
                                </h2>
                                <p className="text-xl text-[#d1e0e7] mb-8 leading-8">
                                    نتجاوز حدود التطبيقات التقليدية لنقدم دعمًا
                                    نفسيًا حقيقيًا ومتكاملًا
                                </p>

                                <div className="space-y-4">
                                    {features.map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-center gap-4 p-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl hover:bg-white/15 transition-all duration-300"
                                        >
                                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#7aa7bb] to-[#6797ab] flex items-center justify-center">
                                                <CheckCircle2 className="w-5 h-5 text-white" />
                                            </div>
                                            <span className="text-[#e0ebf0] text-base">
                                                {feature}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ===== CTA Section ===== */}
                <section className="py-20 px-6 md:px-12 lg:px-16">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-12 text-center shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#9cc7d8]/20 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#bcdccf]/20 rounded-full blur-3xl" />

                            <div className="relative">
                                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-md">
                                    <Sparkles className="w-5 h-5 text-[#b9dfcf]" />
                                    <span className="text-[#d8efe6] font-semibold text-sm">
                                        خطوة واحدة تكفي
                                    </span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                                    مستعد لتبدأ رحلتك؟
                                </h2>
                                <p className="text-xl text-[#d1e0e7] mb-10 max-w-2xl mx-auto leading-8">
                                    انضم لآلاف المستخدمين الذين وجدوا في
                                    MindBridge المكان الآمن للدعم النفسي الذي
                                    يستحقونه
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    {!user ? (
                                        <Link
                                            href="/register"
                                            className="group px-10 py-4 bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] hover:from-[#6d9bb0] hover:to-[#5f8ea2] text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-[#7aa7bb]/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            ابدأ مجانًا الآن
                                            <Brain className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        </Link>
                                    ) : (
                                        <Link
                                            href="/dashboard"
                                            className="group px-10 py-4 bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] hover:from-[#6d9bb0] hover:to-[#5f8ea2] text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-[#7aa7bb]/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            انتقل للوحة التحكم
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    )}
                                    <Link
                                        href="/ContactPage"
                                        className="group px-10 py-4 bg-white/10 hover:bg-white/20 border border-white/25 text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                                    >
                                        تحدث مع فريقنا
                                        <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
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
                            href="/contact"
                            className="hover:text-[#d1e0e7] transition-colors"
                        >
                            تواصل معنا
                        </a>
                    </div>
                    <p>© 2025 MindBridge. جميع الحقوق محفوظة.</p>
                </footer>
            </div>
        </div>
    );
};

export default About;
