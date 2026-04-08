import React, {
    useState,
    useEffect,
    useRef,
    useMemo,
    useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Brain,
    ArrowRight,
    ArrowLeft,
    MessageCircle,
    X,
    ShieldCheck,
    Sparkles,
    Sun,
    Moon,
    Search,
    HeartHandshake,
    BookOpenText,
    Activity,
    CheckCircle2,
    NotebookPen,
    Clock3,
    Users,
    Star,
    CircleHelp,
} from "lucide-react";
import { Head, usePage, Link } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../Components/Nav";
import Footer from "../Components/Footer";
import ChatBot from "../Components/ChatBot";

const FeatureCard = ({ item, isDarkMode }) => {
    const Icon = item.icon;

    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            className={`rounded-3xl p-6 h-full border transition-all duration-300 ${
                isDarkMode
                    ? "bg-gray-800/90 border-gray-700 hover:border-gray-600"
                    : "bg-white border-gray-200 hover:border-blue-200"
            } shadow-sm hover:shadow-xl`}
        >
            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-4">
                <Icon size={26} className="text-blue-600" />
            </div>

            <h3
                className={`text-xl font-bold mb-3 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                }`}
            >
                {item.title}
            </h3>

            <p
                className={`text-sm leading-7 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
            >
                {item.description}
            </p>
        </motion.div>
    );
};

const ToolCard = ({ item, isDarkMode, onPrimaryAction }) => {
    const Icon = item.icon;

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.25 }}
            className={`rounded-3xl p-6 border h-full flex flex-col ${
                isDarkMode
                    ? "bg-gray-800/90 border-gray-700"
                    : "bg-white border-gray-200"
            } shadow-sm hover:shadow-xl`}
        >
            <div className="flex items-start justify-between gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center">
                    <Icon size={24} className="text-blue-600" />
                </div>
                <span
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                        isDarkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-blue-50 text-blue-700"
                    }`}
                >
                    {item.badge}
                </span>
            </div>

            <h3
                className={`text-xl font-bold mb-3 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                }`}
            >
                {item.title}
            </h3>

            <p
                className={`text-sm leading-7 flex-grow ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
            >
                {item.description}
            </p>

            <button
                type="button"
                onClick={onPrimaryAction}
                className="mt-6 inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
                {item.cta}
                <ArrowRight size={16} />
            </button>
        </motion.div>
    );
};

const HomePage = ({ auth }) => {
    const { props } = usePage();
    const {
        heroSections = [],
        flash = {},
        translations = {},
    } = props;

    const sharedAuth = props.auth || auth || {};
    const user = sharedAuth?.user || null;

    const toolsRef = useRef(null);
    const searchRef = useRef(null);

    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window === "undefined") return false;
        const savedMode = localStorage.getItem("darkMode");
        if (savedMode !== null) return savedMode === "true";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isTooltipVisible, setIsTooltipVisible] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        localStorage.setItem("darkMode", isDarkMode ? "true" : "false");
        document.documentElement.classList.toggle("dark", isDarkMode);
    }, [isDarkMode]);

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    useEffect(() => {
        const timer = setTimeout(() => setIsTooltipVisible(false), 4000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (heroSections.length > 1) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % heroSections.length);
            }, 5000);

            return () => clearInterval(timer);
        }
    }, [heroSections]);

    const toggleChat = useCallback(() => {
        setIsChatOpen((prev) => !prev);
    }, []);

    const toggleDarkMode = useCallback(() => {
        setIsDarkMode((prev) => !prev);
    }, []);

    const scrollToTools = useCallback(() => {
        toolsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    const scrollToSearch = useCallback(() => {
        searchRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    const supportTopics = useMemo(
        () => [
            {
                title: "Managing Anxiety",
                category: "anxiety",
                description:
                    "Gentle support paths for worry, racing thoughts, and emotional overload.",
                href: "#",
            },
            {
                title: "Better Sleep Habits",
                category: "sleep",
                description:
                    "Daily routines and calming practices to improve rest and nighttime balance.",
                href: "#",
            },
            {
                title: "Stress Reset",
                category: "stress",
                description:
                    "Short, practical techniques to reduce tension and regain steadiness.",
                href: "#",
            },
            {
                title: "Focus and Clarity",
                category: "focus",
                description:
                    "Simple exercises to organize thoughts and reduce mental distraction.",
                href: "#",
            },
            {
                title: "Mood Check-ins",
                category: "mood",
                description:
                    "Structured emotional reflection to help you better understand your state.",
                href: "#",
            },
            {
                title: "Guided Journaling",
                category: "journaling",
                description:
                    "Prompts that help you express feelings safely and meaningfully.",
                href: "#",
            },
        ],
        [],
    );

    const filteredTopics = useMemo(() => {
        if (!searchQuery.trim()) return supportTopics;

        const q = searchQuery.toLowerCase().trim();

        return supportTopics.filter(
            (item) =>
                item.title.toLowerCase().includes(q) ||
                item.category.toLowerCase().includes(q) ||
                item.description.toLowerCase().includes(q),
        );
    }, [searchQuery, supportTopics]);

    const featureCards = [
        {
            icon: Brain,
            title: "Personalized mental wellness journey",
            description:
                "Mind Gate helps each user begin from their current emotional state and move through a guided, supportive experience.",
        },
        {
            icon: MessageCircle,
            title: "AI companion with a calm tone",
            description:
                "A supportive AI assistant can help users explore feelings, reflect, and discover useful next steps in a safe way.",
        },
        {
            icon: ShieldCheck,
            title: "Private, respectful, and user-centered",
            description:
                "The platform is designed to feel safe, non-judgmental, and focused on trust from the very first interaction.",
        },
    ];

    const platformTools = [
        {
            icon: Activity,
            badge: "Daily",
            title: "Mood tracking",
            description:
                "Check in with your emotional state regularly and build a clearer understanding of how you are feeling over time.",
            cta: "Start a check-in",
        },
        {
            icon: NotebookPen,
            badge: "Reflect",
            title: "Guided journaling",
            description:
                "Use simple writing prompts to process thoughts, reduce overwhelm, and create more emotional clarity.",
            cta: "Open journaling prompts",
        },
        {
            icon: HeartHandshake,
            badge: "Support",
            title: "Calming exercises",
            description:
                "Access breathing routines, grounding practices, and short supportive exercises for stressful moments.",
            cta: "Explore exercises",
        },
        {
            icon: BookOpenText,
            badge: "Learn",
            title: "Wellness resources",
            description:
                "Read practical mental wellness content designed in a clear, approachable, and supportive way.",
            cta: "Browse resources",
        },
    ];

    const steps = [
        {
            number: "01",
            title: "Begin with your current state",
            description:
                "Users start by understanding and expressing how they feel right now.",
        },
        {
            number: "02",
            title: "Receive guided support",
            description:
                "Mind Gate recommends calm, useful next steps based on needs and goals.",
        },
        {
            number: "03",
            title: "Build healthier habits over time",
            description:
                "Small, repeated actions help users develop more stability and emotional balance.",
        },
    ];

    const trustPoints = [
        "Structured onboarding that feels calm and clear",
        "Supportive tone instead of pressure or judgment",
        "Useful daily tools that are easy to return to",
        "Modern, responsive interface for all screen sizes",
    ];

    return (
        <div
            className={`min-h-screen ${
                isDarkMode
                    ? "dark bg-gray-900 text-white"
                    : "bg-gray-50 text-gray-900"
            }`}
        >
            <Head>
                <title>Mind Gate - Mental Wellness Platform</title>
                <meta
                    name="description"
                    content="Mind Gate is a modern mental wellness platform that offers guided support, emotional reflection tools, and a calm AI companion."
                />
            </Head>

            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

            <Navbar
                user={user}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
            />

            {/* Hero */}
            <section className="relative min-h-screen w-full overflow-hidden">
                {heroSections.length > 0 ? (
                    <>
                        <div className="absolute inset-0">
                            <AnimatePresence initial={false} mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="absolute inset-0"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/70" />
                                    <img
                                        src={
                                            heroSections[currentSlide]?.image ||
                                            "/images/placeholder-hero.jpg"
                                        }
                                        alt={
                                            heroSections[currentSlide]?.title ||
                                            "Mind Gate Hero"
                                        }
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src =
                                                "/images/placeholder-hero.jpg";
                                        }}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="relative z-10 min-h-screen flex items-center">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                                <div className="max-w-4xl">
                                    <motion.h1
                                        key={`title-${currentSlide}`}
                                        initial={{ opacity: 0, y: 24 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight"
                                    >
                                        {heroSections[currentSlide]?.title ||
                                            translations.hero_section_title ||
                                            "Mind Gate"}
                                    </motion.h1>

                                    <motion.p
                                        key={`subtitle-${currentSlide}`}
                                        initial={{ opacity: 0, y: 24 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.1,
                                        }}
                                        className="mt-6 text-lg sm:text-xl lg:text-2xl text-white/90 leading-8 max-w-3xl"
                                    >
                                        {heroSections[currentSlide]?.subtitle ||
                                            translations.journey_planner_subtitle ||
                                            "A calm digital space for guided support, emotional awareness, and healthier daily habits."}
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, y: 24 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.2,
                                        }}
                                        className="mt-10 flex flex-col sm:flex-row gap-4"
                                    >
                                        <Link
                                            href={user ? "/home" : "/register"}
                                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition-colors font-bold text-base shadow-xl"
                                        >
                                            {user
                                                ? "Go to your space"
                                                : "Start your journey"}
                                            <ArrowRight size={18} />
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={scrollToTools}
                                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/10 border border-white/30 backdrop-blur-sm text-white hover:bg-white/20 transition-colors font-bold text-base"
                                        >
                                            Explore platform tools
                                        </button>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {heroSections.length > 1 && (
                            <>
                                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex justify-between px-4 md:px-8">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setCurrentSlide((prev) =>
                                                prev === 0
                                                    ? heroSections.length - 1
                                                    : prev - 1,
                                            )
                                        }
                                        className="p-3 rounded-2xl bg-white/15 backdrop-blur-sm text-white hover:bg-white/25 transition-colors"
                                        aria-label="Previous slide"
                                    >
                                        <ArrowLeft size={22} />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setCurrentSlide((prev) =>
                                                prev === heroSections.length - 1
                                                    ? 0
                                                    : prev + 1,
                                            )
                                        }
                                        className="p-3 rounded-2xl bg-white/15 backdrop-blur-sm text-white hover:bg-white/25 transition-colors"
                                        aria-label="Next slide"
                                    >
                                        <ArrowRight size={22} />
                                    </button>
                                </div>

                                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                                    {heroSections.map((_, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() =>
                                                setCurrentSlide(index)
                                            }
                                            className={`h-2 rounded-full transition-all ${
                                                currentSlide === index
                                                    ? "w-8 bg-white"
                                                    : "w-2 bg-white/50"
                                            }`}
                                            aria-label={`Slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <div className="min-h-screen flex items-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_#60a5fa,_transparent_30%),radial-gradient(circle_at_bottom_left,_#38bdf8,_transparent_25%)]" />

                        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                            <div className="max-w-4xl">
                                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight">
                                    {translations.hero_section_title ||
                                        "Mind Gate"}
                                </h1>
                                <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-white/85 leading-8 max-w-3xl">
                                    {translations.journey_planner_subtitle ||
                                        "A supportive digital platform for emotional awareness, guided reflection, and healthier daily habits."}
                                </p>

                                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href={user ? "/home" : "/register"}
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition-colors font-bold text-base shadow-xl"
                                    >
                                        {user
                                            ? "Go to your space"
                                            : "Start your journey"}
                                        <ArrowRight size={18} />
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={scrollToSearch}
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors font-bold text-base"
                                    >
                                        Explore support topics
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* Quick intro strip */}
            <section
                className={`py-8 border-y ${
                    isDarkMode
                        ? "bg-gray-900 border-gray-800"
                        : "bg-white border-gray-200"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        {
                            icon: ShieldCheck,
                            title: "Safe experience",
                            text: "Designed to feel calm, private, and respectful.",
                        },
                        {
                            icon: Sparkles,
                            title: "Guided support",
                            text: "Clear next steps instead of overwhelming choices.",
                        },
                        {
                            icon: Users,
                            title: "Built for real users",
                            text: "Responsive, modern, and easy to use on all screens.",
                        },
                    ].map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className={`rounded-2xl p-5 ${
                                    isDarkMode
                                        ? "bg-gray-800/70"
                                        : "bg-gray-50"
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-11 h-11 rounded-xl bg-blue-600/10 flex items-center justify-center">
                                        <Icon
                                            size={20}
                                            className="text-blue-600"
                                        />
                                    </div>
                                    <div>
                                        <h3
                                            className={`font-bold mb-1 ${
                                                isDarkMode
                                                    ? "text-white"
                                                    : "text-gray-900"
                                            }`}
                                        >
                                            {item.title}
                                        </h3>
                                        <p
                                            className={`text-sm leading-6 ${
                                                isDarkMode
                                                    ? "text-gray-300"
                                                    : "text-gray-600"
                                            }`}
                                        >
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Search topics */}
            <section
                ref={searchRef}
                className={`py-20 ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-50"
                }`}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2
                            className={`text-3xl md:text-5xl font-black mb-4 ${
                                isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                        >
                            Explore support topics
                        </h2>
                        <p
                            className={`text-lg ${
                                isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                        >
                            Search for areas like stress, sleep, mood, anxiety,
                            focus, or journaling.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto relative mb-10">
                        <Search
                            className={`absolute left-5 top-1/2 -translate-y-1/2 ${
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                            size={22}
                        />

                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={
                                translations.search_placeholder ||
                                "Search support topics..."
                            }
                            className={`w-full pl-14 pr-14 py-5 border-2 rounded-2xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                isDarkMode
                                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                            }`}
                        />

                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                className={`absolute right-5 top-1/2 -translate-y-1/2 ${
                                    isDarkMode
                                        ? "text-gray-400 hover:text-white"
                                        : "text-gray-500 hover:text-gray-900"
                                }`}
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredTopics.map((topic, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -4 }}
                                className={`rounded-3xl p-6 border ${
                                    isDarkMode
                                        ? "bg-gray-800 border-gray-700"
                                        : "bg-white border-gray-200"
                                } shadow-sm hover:shadow-lg transition-all`}
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="inline-flex px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-600/10 text-blue-600">
                                        {topic.category}
                                    </span>
                                </div>

                                <h3
                                    className={`text-xl font-bold mb-3 ${
                                        isDarkMode
                                            ? "text-white"
                                            : "text-gray-900"
                                    }`}
                                >
                                    {topic.title}
                                </h3>

                                <p
                                    className={`text-sm leading-7 ${
                                        isDarkMode
                                            ? "text-gray-300"
                                            : "text-gray-600"
                                    }`}
                                >
                                    {topic.description}
                                </p>

                                <button
                                    type="button"
                                    onClick={toggleChat}
                                    className="mt-5 inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                                >
                                    Ask the AI assistant
                                    <ArrowRight size={16} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core value section */}
            <section
                className={`py-20 ${
                    isDarkMode ? "bg-gray-950" : "bg-white"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mb-12">
                        <h2
                            className={`text-3xl md:text-5xl font-black mb-4 ${
                                isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                        >
                            A home page that matches the Mind Gate idea
                        </h2>
                        <p
                            className={`text-lg leading-8 ${
                                isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                        >
                            Instead of travel deals and destinations, the page
                            now introduces the platform as a modern mental
                            wellness experience focused on support, clarity, and
                            meaningful daily use.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featureCards.map((item, index) => (
                            <FeatureCard
                                key={index}
                                item={item}
                                isDarkMode={isDarkMode}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Platform tools */}
            <section
                ref={toolsRef}
                className={`py-20 ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-50"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2
                            className={`text-3xl md:text-5xl font-black mb-4 ${
                                isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                        >
                            Platform tools
                        </h2>
                        <p
                            className={`text-lg ${
                                isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                        >
                            Practical sections the user can actually use inside
                            the platform.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {platformTools.map((item, index) => (
                            <ToolCard
                                key={index}
                                item={item}
                                isDarkMode={isDarkMode}
                                onPrimaryAction={toggleChat}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Journey steps */}
            <section
                className={`py-20 ${
                    isDarkMode ? "bg-gray-950" : "bg-white"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 items-start">
                        <div>
                            <h2
                                className={`text-3xl md:text-5xl font-black mb-5 ${
                                    isDarkMode ? "text-white" : "text-gray-900"
                                }`}
                            >
                                How the user journey works
                            </h2>
                            <p
                                className={`text-lg leading-8 ${
                                    isDarkMode
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                }`}
                            >
                                The experience begins with understanding the
                                user’s current state, then offering calm support
                                paths, and finally encouraging small repeated
                                habits that create real progress.
                            </p>

                            <div className="mt-8 space-y-4">
                                {trustPoints.map((point, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3"
                                    >
                                        <CheckCircle2
                                            size={20}
                                            className="text-blue-600 mt-1"
                                        />
                                        <p
                                            className={`text-sm sm:text-base leading-7 ${
                                                isDarkMode
                                                    ? "text-gray-300"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            {point}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            {steps.map((item, index) => (
                                <div
                                    key={index}
                                    className={`rounded-3xl p-6 border ${
                                        isDarkMode
                                            ? "bg-gray-800 border-gray-700"
                                            : "bg-gray-50 border-gray-200"
                                    }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shrink-0">
                                            {item.number}
                                        </div>
                                        <div>
                                            <h3
                                                className={`text-xl font-bold mb-2 ${
                                                    isDarkMode
                                                        ? "text-white"
                                                        : "text-gray-900"
                                                }`}
                                            >
                                                {item.title}
                                            </h3>
                                            <p
                                                className={`text-sm leading-7 ${
                                                    isDarkMode
                                                        ? "text-gray-300"
                                                        : "text-gray-600"
                                                }`}
                                            >
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust / benefits */}
            <section
                className={`py-20 ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-50"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2
                            className={`text-3xl md:text-5xl font-black mb-4 ${
                                isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                        >
                            Why this direction fits Mind Gate
                        </h2>
                        <p
                            className={`text-lg ${
                                isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                        >
                            The page now reflects a serious, supportive, and
                            modern platform instead of a travel marketplace.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {[
                            {
                                icon: ShieldCheck,
                                title: "Trust-first design",
                                description:
                                    "A calm visual language that supports the project identity.",
                            },
                            {
                                icon: Clock3,
                                title: "Useful daily return value",
                                description:
                                    "The interface encourages check-ins, reflection, and regular use.",
                            },
                            {
                                icon: CircleHelp,
                                title: "Clear support pathways",
                                description:
                                    "Users can quickly understand what they can do next.",
                            },
                            {
                                icon: Star,
                                title: "Professional presentation",
                                description:
                                    "The home page feels official, modern, and aligned with the platform idea.",
                            },
                        ].map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={index}
                                    className={`rounded-3xl p-6 border ${
                                        isDarkMode
                                            ? "bg-gray-800 border-gray-700"
                                            : "bg-white border-gray-200"
                                    } shadow-sm`}
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-4">
                                        <Icon
                                            size={24}
                                            className="text-blue-600"
                                        />
                                    </div>
                                    <h3
                                        className={`text-xl font-bold mb-3 ${
                                            isDarkMode
                                                ? "text-white"
                                                : "text-gray-900"
                                        }`}
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        className={`text-sm leading-7 ${
                                            isDarkMode
                                                ? "text-gray-300"
                                                : "text-gray-600"
                                        }`}
                                    >
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section
                className={`py-20 ${
                    isDarkMode ? "bg-gray-950" : "bg-white"
                }`}
            >
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        className={`rounded-[32px] p-8 sm:p-10 lg:p-14 text-center border ${
                            isDarkMode
                                ? "bg-gray-800 border-gray-700"
                                : "bg-gradient-to-br from-blue-50 to-white border-blue-100"
                        } shadow-xl`}
                    >
                        <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mx-auto mb-6">
                            <Brain size={30} className="text-blue-600" />
                        </div>

                        <h2
                            className={`text-3xl md:text-5xl font-black mb-4 ${
                                isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                        >
                            Ready to continue shaping Mind Gate?
                        </h2>

                        <p
                            className={`text-lg leading-8 max-w-3xl mx-auto ${
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                        >
                            This version gives you a home page that actually
                            matches the mental wellness idea, looks professional,
                            and stays clean across screen sizes.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                type="button"
                                onClick={toggleChat}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition-colors font-bold"
                            >
                                Open AI assistant
                                <MessageCircle size={18} />
                            </button>

                            <Link
                                href="/ContactPage"
                                className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold transition-colors ${
                                    isDarkMode
                                        ? "bg-gray-700 text-white hover:bg-gray-600"
                                        : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50"
                                }`}
                            >
                                Contact us
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer isDarkMode={isDarkMode} />

            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
                {isTooltipVisible && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`relative max-w-xs p-4 rounded-2xl shadow-lg ${
                            isDarkMode
                                ? "bg-gray-800 text-white"
                                : "bg-white text-gray-900 border border-gray-200"
                        }`}
                    >
                        <button
                            type="button"
                            onClick={() => setIsTooltipVisible(false)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                        >
                            <X size={16} />
                        </button>
                        <p className="text-sm font-semibold mb-1">
                            Need support?
                        </p>
                        <p className="text-xs opacity-80 leading-6">
                            The Mind Gate assistant can help you explore tools
                            and support topics.
                        </p>
                    </motion.div>
                )}

                <ChatBot
                    isChatOpen={isChatOpen}
                    toggleChat={toggleChat}
                    isDarkMode={isDarkMode}
                />
            </div>
        </div>
    );
};

export default HomePage;