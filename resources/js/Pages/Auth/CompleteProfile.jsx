import React, { useEffect, useMemo, useRef, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import {
    Brain,
    ChevronLeft,
    ChevronRight,
    Languages,
    Sun,
    Moon,
    HeartPulse,
    ShieldCheck,
    Flower2,
    MessageCircleHeart,
    Waves,
    BadgeCheck,
    CheckCircle2,
    Sparkles,
    MoonStar,
    Focus,
    BatteryMedium,
    HandHeart,
    Target,
    NotebookPen,
} from "lucide-react";

const COLORS = {
    primary: "#7aa7bb",
    primaryDark: "#6797ab",
    darkBg: "#0f181f",
    darkPanel: "rgba(16,24,32,0.92)",
    lightPanel: "rgba(255,255,255,0.90)",
    darkText: "#eef7fb",
    lightText: "#162636",
    darkMuted: "#97b7c7",
    lightMuted: "#557383",
};

const REVIEW_STEP = 13;

export default function CompleteProfile({
    user,
    profile,
    onboardingCompleted = false,
    debug = {},
}) {
    const [step, setStep] = useState(onboardingCompleted ? REVIEW_STEP : 1);
    const [showSuccessState, setShowSuccessState] =
        useState(!!onboardingCompleted);
    const [debugLogs, setDebugLogs] = useState([]);
    const saveClickedRef = useRef(false);

    const [locale, setLocale] = useState(
        typeof window !== "undefined"
            ? localStorage.getItem("mindgate-locale") || "ar"
            : "ar",
    );
    const [isDarkMode, setIsDarkMode] = useState(
        typeof window !== "undefined"
            ? localStorage.getItem("darkMode") === "true"
            : false,
    );

    const isArabic = locale === "ar";
    const dc = (darkValue, lightValue) => (isDarkMode ? darkValue : lightValue);

    const addDebug = (message, extra = null) => {
        const time = new Date().toLocaleTimeString();
        setDebugLogs((prev) =>
            [
                { id: `${Date.now()}-${Math.random()}`, time, message, extra },
                ...prev,
            ].slice(0, 30),
        );
        console.log("[ONBOARDING DEBUG]", message, extra || "");
    };

    useEffect(() => {
        localStorage.setItem("mindgate-locale", locale);
        document.documentElement.lang = locale;
        document.documentElement.dir = isArabic ? "rtl" : "ltr";
    }, [locale, isArabic]);

    useEffect(() => {
        localStorage.setItem("darkMode", isDarkMode ? "true" : "false");
    }, [isDarkMode]);

    useEffect(() => {
        addDebug("Page mounted", {
            onboardingCompleted,
            currentUrl:
                typeof window !== "undefined" ? window.location.href : null,
            debugFromBackend: debug,
        });
    }, []);

    useEffect(() => {
        addDebug("Step changed", { step });
    }, [step]);

    useEffect(() => {
        if (onboardingCompleted) {
            addDebug("Success state loaded from backend prop", {
                onboardingCompleted,
            });
            setShowSuccessState(true);
        }
    }, [onboardingCompleted]);

    const { data, setData, post, processing, errors } = useForm({
        current_mood: profile?.current_mood || "",
        stress_level: profile?.stress_level || "",
        anxiety_level: profile?.anxiety_level || "",
        sleep_quality: profile?.sleep_quality || "",
        focus_level: profile?.focus_level || "",
        energy_level: profile?.energy_level || "",
        support_history: profile?.support_history || "",
        primary_concern: profile?.primary_concern || "",
        support_goal: profile?.support_goal || "",
        preferred_support_style: profile?.preferred_support_style || "",
        notes: profile?.notes || "",
    });

    const t = useMemo(() => {
        const ar = {
            pageTitle: "إكمال الملف الشخصي",
            brand: "Mind Gate",
            heroTitle: "رحلتك نحو التوازن تبدأ بخطوات هادئة وواضحة",
            heroText:
                "هذا الإعداد الأولي يساعدنا على فهم حالتك بشكل أفضل لنقدّم لك تجربة أكثر دعمًا وتخصيصًا.",
            language: "English",
            darkMode: "الوضع الداكن",
            lightMode: "الوضع الفاتح",
            back: "رجوع",
            next: "متابعة",
            save: "حفظ وإنهاء الإعداد",
            saving: "جاري الحفظ...",
            done: "مكتمل",
            optional: "اختياري",
            successTitle: "تم حفظ معلوماتك بنجاح",
            successText:
                "اكتملت المرحلة الأولى من إعداد حسابك. يمكنك الآن الانتقال إلى الصفحة الرئيسية والبدء باستخدام المنصة.",
            successButton: "الانتقال إلى الصفحة الرئيسية",
            reviewTitle: "مراجعة سريعة",
            reviewText: "راجع أهم المعلومات قبل الحفظ النهائي.",
            completedLabel: "اكتمل",
            stepLabel: "الخطوة",
            of: "من",
           
            fields: {
                current_mood: "المزاج الحالي",
                stress_level: "الضغط",
                anxiety_level: "القلق",
                sleep_quality: "النوم",
                focus_level: "التركيز",
                energy_level: "الطاقة",
                support_history: "تجربة الدعم السابقة",
                primary_concern: "السبب الأساسي",
                support_goal: "الهدف",
                preferred_support_style: "أسلوب الدعم",
                notes: "ملاحظات إضافية",
            },
            concernLabel: "ما أكثر شيء يزعجك أو يرهقك هذه الفترة؟",
            concernPlaceholder:
                "مثال: التفكير الزائد، الخوف، الحزن، الضغط، الوحدة، ضعف التركيز...",
            goalLabel: "ما الذي ترغب في تحقيقه من خلال Mind Gate؟",
            goalPlaceholder:
                "مثال: هدوء أكثر، نوم أفضل، وضوح عاطفي، تقليل القلق...",
            notesLabel: "هل ترغب بإضافة أي شيء آخر؟",
            notesPlaceholder:
                "أي تفاصيل إضافية قد تساعدنا على فهم وضعك بشكل أفضل",
            cards: [
                {
                    icon: HeartPulse,
                    title: "كل إجابة مهمة",
                    text: "ما تشاركه هنا يساعدنا في بناء تجربة أدق وأكثر دعمًا لاحتياجاتك.",
                },
                {
                    icon: ShieldCheck,
                    title: "مساحة آمنة وهادئة",
                    text: "لا يوجد حكم عليك هنا. الهدف هو الفهم والدعم والوضوح.",
                },
                {
                    icon: Flower2,
                    title: "ليس مطلوبًا أن تكون بخير دائمًا",
                    text: "الصدق في التعبير عن حالتك الحالية أهم من الإجابة المثالية.",
                },
                {
                    icon: MessageCircleHeart,
                    title: "نبدأ من مكانك الحالي",
                    text: "نلتقي بك كما أنت الآن، ثم نساعد في تشكيل ما يأتي بعد ذلك.",
                },
                {
                    icon: Waves,
                    title: "التقدم تدريجي",
                    text: "الصحة النفسية تُبنى بخطوات صغيرة لكنها ذات معنى مع الوقت.",
                },
                {
                    icon: BadgeCheck,
                    title: "إكمال هذا بحد ذاته خطوة",
                    text: "تخصيص وقت للتعبير عن حالتك يُعد تقدّمًا مهمًا.",
                },
            ],
            steps: [
                {
                    title: "مرحبًا",
                    subtitle:
                        "سنكمل ملفك بخطوات مرتبة وهادئة ومناسبة لكل الشاشات.",
                },
                {
                    title: "كيف تصف شعورك اليوم؟",
                    subtitle: "اختر الخيار الأقرب لحالتك النفسية الآن.",
                },
                {
                    title: "كم مستوى الضغط لديك؟",
                    subtitle: "نود فهم حجم الضغط الذي تعيشه مؤخرًا.",
                },
                {
                    title: "كيف يبدو مستوى القلق لديك؟",
                    subtitle: "أخبرنا عن التوتر أو القلق الداخلي الذي تشعر به.",
                },
                {
                    title: "كيف كان نومك مؤخرًا؟",
                    subtitle: "النوم مؤشر مهم على التوازن النفسي والعاطفي.",
                },
                {
                    title: "كيف هو تركيزك خلال اليوم؟",
                    subtitle: "هذا يساعدنا على فهم الأثر المعرفي لحالتك.",
                },
                {
                    title: "كيف هو مستوى طاقتك؟",
                    subtitle: "اختر ما يعبّر عن نشاطك أو إرهاقك العام.",
                },
                {
                    title: "هل لديك تجربة دعم سابقة؟",
                    subtitle: "هذا يساعدنا على فهم خلفيتك وتوقعاتك.",
                },
                {
                    title: "ما السبب الأساسي لوجودك هنا؟",
                    subtitle: "شاركنا أبرز مشكلة تريد دعماً بشأنها.",
                },
                {
                    title: "ما الذي ترغب بتحقيقه؟",
                    subtitle: "وجود هدف واضح يساعدنا على تخصيص التجربة لك.",
                },
                {
                    title: "ما نوع الدعم الذي تفضله؟",
                    subtitle: "اختر الأسلوب الذي تشعر معه براحة أكبر.",
                },
                {
                    title: "هل هناك شيء إضافي؟",
                    subtitle: "يمكنك مشاركة أي تفاصيل إضافية إن رغبت.",
                },
                {
                    title: "المراجعة النهائية",
                    subtitle: "راجع أهم إجاباتك قبل الحفظ النهائي.",
                },
            ],
        };

        const en = {
            pageTitle: "Complete Profile",
            brand: "Mind Gate",
            heroTitle: "Your path toward balance begins with calm, clear steps",
            heroText:
                "This initial onboarding helps us understand your situation better so we can offer a more supportive and personalized experience.",
            language: "العربية",
            darkMode: "Dark mode",
            lightMode: "Light mode",
            back: "Back",
            next: "Continue",
            save: "Save and finish setup",
            saving: "Saving...",
            done: "completed",
            optional: "Optional",
            successTitle: "Your information has been saved",
            successText:
                "Your first setup stage is now complete. You can continue to the home page and begin your experience.",
            successButton: "Go to home page",
            reviewTitle: "Quick review",
            reviewText: "Review your key information before the final save.",
            completedLabel: "Completed",
            stepLabel: "Step",
            of: "of",
            fields: {
                current_mood: "Current mood",
                stress_level: "Stress",
                anxiety_level: "Anxiety",
                sleep_quality: "Sleep",
                focus_level: "Focus",
                energy_level: "Energy",
                support_history: "Support history",
                primary_concern: "Primary concern",
                support_goal: "Goal",
                preferred_support_style: "Support style",
                notes: "Additional notes",
            },
            concernLabel:
                "What has been troubling or exhausting you the most lately?",
            concernPlaceholder:
                "Example: overthinking, fear, sadness, stress, loneliness, low focus...",
            goalLabel: "What would you most like to achieve through Mind Gate?",
            goalPlaceholder:
                "Example: more calm, better sleep, emotional clarity, less anxiety...",
            notesLabel: "Would you like to add anything else?",
            notesPlaceholder:
                "Any extra details that may help us understand your situation better",
            cards: [
                {
                    icon: HeartPulse,
                    title: "Every answer matters",
                    text: "What you share here helps us build a more accurate and supportive experience around your needs.",
                },
                {
                    icon: ShieldCheck,
                    title: "A safe and calm space",
                    text: "You are not being judged. The goal is understanding, support, and clarity.",
                },
                {
                    icon: Flower2,
                    title: "You do not need to be okay all the time",
                    text: "Honesty about how you feel now matters more than a perfect answer.",
                },
                {
                    icon: MessageCircleHeart,
                    title: "We begin from where you are",
                    text: "We meet you in your current state, then help shape what comes next.",
                },
                {
                    icon: Waves,
                    title: "Progress is gradual",
                    text: "Mental wellness is built through small, meaningful steps over time.",
                },
                {
                    icon: BadgeCheck,
                    title: "Completing this is already progress",
                    text: "Taking time to express your state is an important first step.",
                },
            ],
            steps: [
                {
                    title: "Welcome",
                    subtitle:
                        "We will complete your profile in a structured, calm, screen-friendly way.",
                },
                {
                    title: "How would you describe how you feel today?",
                    subtitle:
                        "Choose the option that feels closest to your current emotional state.",
                },
                {
                    title: "How much stress are you under?",
                    subtitle:
                        "We want to understand the pressure you are experiencing lately.",
                },
                {
                    title: "What is your anxiety level like?",
                    subtitle:
                        "Tell us about the level of worry or internal tension you feel.",
                },
                {
                    title: "How has your sleep been recently?",
                    subtitle:
                        "Sleep is a major indicator of emotional and mental balance.",
                },
                {
                    title: "How is your focus during the day?",
                    subtitle:
                        "This helps us understand the cognitive impact of your current state.",
                },
                {
                    title: "How is your overall energy?",
                    subtitle:
                        "Choose what best reflects your activity or exhaustion level.",
                },
                {
                    title: "Do you have previous support experience?",
                    subtitle:
                        "This helps us understand your background and expectations.",
                },
                {
                    title: "What is the main reason you are here?",
                    subtitle: "Share the main issue you want support with.",
                },
                {
                    title: "What would you like to achieve?",
                    subtitle:
                        "A clear goal helps us personalize your experience better.",
                },
                {
                    title: "What kind of support do you prefer?",
                    subtitle:
                        "Choose the format that feels most comfortable for you.",
                },
                {
                    title: "Anything else to add?",
                    subtitle: "You can share any extra detail if you want.",
                },
                {
                    title: "Final review",
                    subtitle: "Review your key answers before the final save.",
                },
            ],
        };

        return isArabic ? ar : en;
    }, [isArabic]);

    const totalSteps = REVIEW_STEP;
    const progress = Math.round((step / totalSteps) * 100);
    const mobileHelperCard =
        t.cards[Math.max(Math.min(step, t.cards.length) - 1, 0)];

    const optionSets = useMemo(
        () => ({
            current_mood: isArabic
                ? [
                      {
                          value: "calm",
                          emoji: "😌",
                          title: "هادئ",
                          text: "أشعر بهدوء نسبي واستقرار عاطفي.",
                      },
                      {
                          value: "okay",
                          emoji: "🙂",
                          title: "مستقر",
                          text: "أنا بخير بشكل عام لكن لست بأفضل حال.",
                      },
                      {
                          value: "anxious",
                          emoji: "😟",
                          title: "قلق",
                          text: "هناك توتر أو قلق واضح مؤخرًا.",
                      },
                      {
                          value: "sad",
                          emoji: "😔",
                          title: "حزين",
                          text: "أشعر بثقل أو انخفاض عاطفي.",
                      },
                      {
                          value: "overwhelmed",
                          emoji: "😣",
                          title: "مرهق",
                          text: "كل شيء يبدو أكثر من اللازم الآن.",
                      },
                      {
                          value: "numb",
                          emoji: "😶",
                          title: "خامل شعوريًا",
                          text: "أشعر بانفصال أو فتور عاطفي.",
                      },
                  ]
                : [
                      {
                          value: "calm",
                          emoji: "😌",
                          title: "Calm",
                          text: "I feel relatively calm and emotionally steady.",
                      },
                      {
                          value: "okay",
                          emoji: "🙂",
                          title: "Stable",
                          text: "I feel generally okay, but not at my best.",
                      },
                      {
                          value: "anxious",
                          emoji: "😟",
                          title: "Anxious",
                          text: "There is clear worry or tension lately.",
                      },
                      {
                          value: "sad",
                          emoji: "😔",
                          title: "Sad",
                          text: "I feel emotionally heavy or low.",
                      },
                      {
                          value: "overwhelmed",
                          emoji: "😣",
                          title: "Overwhelmed",
                          text: "Everything feels like too much right now.",
                      },
                      {
                          value: "numb",
                          emoji: "😶",
                          title: "Numb",
                          text: "I feel disconnected or emotionally flat.",
                      },
                  ],
            stress_level: isArabic
                ? [
                      {
                          value: "low",
                          emoji: "🌿",
                          title: "منخفض",
                          text: "الضغط موجود لكنه ما زال تحت السيطرة.",
                      },
                      {
                          value: "moderate",
                          emoji: "⚖️",
                          title: "متوسط",
                          text: "الضغط واضح ويؤثر علي أحيانًا.",
                      },
                      {
                          value: "high",
                          emoji: "🔥",
                          title: "مرتفع",
                          text: "الضغط متكرر ويؤثر على راحتي.",
                      },
                      {
                          value: "severe",
                          emoji: "⛈️",
                          title: "شديد",
                          text: "الضغط يسيطر على جزء كبير من يومي.",
                      },
                  ]
                : [
                      {
                          value: "low",
                          emoji: "🌿",
                          title: "Low",
                          text: "Stress is present but still manageable.",
                      },
                      {
                          value: "moderate",
                          emoji: "⚖️",
                          title: "Moderate",
                          text: "Stress is noticeable and affects me sometimes.",
                      },
                      {
                          value: "high",
                          emoji: "🔥",
                          title: "High",
                          text: "Stress is frequent and affects my comfort.",
                      },
                      {
                          value: "severe",
                          emoji: "⛈️",
                          title: "Severe",
                          text: "Stress takes over a large part of my day.",
                      },
                  ],
            anxiety_level: isArabic
                ? [
                      {
                          value: "low",
                          emoji: "🌱",
                          title: "منخفض",
                          text: "القلق خفيف أو متقطع.",
                      },
                      {
                          value: "moderate",
                          emoji: "💭",
                          title: "متوسط",
                          text: "القلق ملحوظ في كثير من المواقف.",
                      },
                      {
                          value: "high",
                          emoji: "💢",
                          title: "مرتفع",
                          text: "القلق يؤثر بوضوح على أفكاري أو جسدي.",
                      },
                      {
                          value: "severe",
                          emoji: "🌪️",
                          title: "شديد",
                          text: "القلق يعطل جزءًا كبيرًا من يومي.",
                      },
                  ]
                : [
                      {
                          value: "low",
                          emoji: "🌱",
                          title: "Low",
                          text: "Anxiety is light or occasional.",
                      },
                      {
                          value: "moderate",
                          emoji: "💭",
                          title: "Moderate",
                          text: "Anxiety is noticeable in many situations.",
                      },
                      {
                          value: "high",
                          emoji: "💢",
                          title: "High",
                          text: "Anxiety affects my thoughts or body clearly.",
                      },
                      {
                          value: "severe",
                          emoji: "🌪️",
                          title: "Severe",
                          text: "Anxiety disrupts a large part of my day.",
                      },
                  ],
            sleep_quality: isArabic
                ? [
                      {
                          value: "restful",
                          emoji: "🌙",
                          title: "جيد",
                          text: "أنام بشكل مقبول وأستيقظ براحة.",
                      },
                      {
                          value: "average",
                          emoji: "🛏️",
                          title: "متوسط",
                          text: "النوم مقبول لكنه غير منتظم.",
                      },
                      {
                          value: "disturbed",
                          emoji: "😴",
                          title: "متقطع",
                          text: "النوم متقطع أو خفيف.",
                      },
                      {
                          value: "poor",
                          emoji: "🌑",
                          title: "ضعيف",
                          text: "النوم قصير أو غير مريح.",
                      },
                  ]
                : [
                      {
                          value: "restful",
                          emoji: "🌙",
                          title: "Restful",
                          text: "I sleep reasonably well and wake up rested.",
                      },
                      {
                          value: "average",
                          emoji: "🛏️",
                          title: "Average",
                          text: "Sleep is acceptable but inconsistent.",
                      },
                      {
                          value: "disturbed",
                          emoji: "😴",
                          title: "Disturbed",
                          text: "My sleep is interrupted or too light.",
                      },
                      {
                          value: "poor",
                          emoji: "🌑",
                          title: "Poor",
                          text: "Sleep is poor, short, or not restorative.",
                      },
                  ],
            focus_level: isArabic
                ? [
                      {
                          value: "good",
                          emoji: "🎯",
                          title: "جيد",
                          text: "أستطيع التركيز وإنجاز المهام بشكل معقول.",
                      },
                      {
                          value: "variable",
                          emoji: "🔄",
                          title: "متقلب",
                          text: "تركيزي يتغير بسرعة.",
                      },
                      {
                          value: "low",
                          emoji: "📉",
                          title: "منخفض",
                          text: "التشتت يؤثر بوضوح على يومي.",
                      },
                      {
                          value: "very_low",
                          emoji: "🌫️",
                          title: "منخفض جدًا",
                          text: "من الصعب أن أبقى على المسار أو أنهي المهام.",
                      },
                  ]
                : [
                      {
                          value: "good",
                          emoji: "🎯",
                          title: "Good",
                          text: "I can focus and complete tasks reasonably well.",
                      },
                      {
                          value: "variable",
                          emoji: "🔄",
                          title: "Variable",
                          text: "My focus comes and goes quickly.",
                      },
                      {
                          value: "low",
                          emoji: "📉",
                          title: "Low",
                          text: "Distraction clearly affects my day.",
                      },
                      {
                          value: "very_low",
                          emoji: "🌫️",
                          title: "Very low",
                          text: "It is hard to stay on track or finish tasks.",
                      },
                  ],
            energy_level: isArabic
                ? [
                      {
                          value: "stable",
                          emoji: "⚡",
                          title: "مستقرة",
                          text: "طاقتي مستقرة نسبيًا.",
                      },
                      {
                          value: "medium",
                          emoji: "🔋",
                          title: "متوسطة",
                          text: "الطاقة محدودة لكنها مقبولة.",
                      },
                      {
                          value: "low",
                          emoji: "🪫",
                          title: "منخفضة",
                          text: "التعب واضح ويؤثر على نشاطي.",
                      },
                      {
                          value: "drained",
                          emoji: "😫",
                          title: "مستنزفة",
                          text: "أشعر بالإرهاق معظم الوقت.",
                      },
                  ]
                : [
                      {
                          value: "stable",
                          emoji: "⚡",
                          title: "Stable",
                          text: "My energy feels relatively steady.",
                      },
                      {
                          value: "medium",
                          emoji: "🔋",
                          title: "Medium",
                          text: "Energy is limited but manageable.",
                      },
                      {
                          value: "low",
                          emoji: "🪫",
                          title: "Low",
                          text: "Fatigue is noticeable and affects my activity.",
                      },
                      {
                          value: "drained",
                          emoji: "😫",
                          title: "Drained",
                          text: "I feel exhausted most of the time.",
                      },
                  ],
            support_history: isArabic
                ? [
                      {
                          value: "none",
                          emoji: "🌼",
                          title: "لا",
                          text: "هذه أول مرة أحصل فيها على دعم نفسي.",
                      },
                      {
                          value: "limited",
                          emoji: "🕊️",
                          title: "بشكل محدود",
                          text: "جربت بعض الدعم سابقًا.",
                      },
                      {
                          value: "ongoing",
                          emoji: "🤝",
                          title: "نعم",
                          text: "لدي تجربة علاج أو دعم نفسي سابق.",
                      },
                  ]
                : [
                      {
                          value: "none",
                          emoji: "🌼",
                          title: "No, this is my first time",
                          text: "I have not had mental health support before.",
                      },
                      {
                          value: "limited",
                          emoji: "🕊️",
                          title: "A limited experience",
                          text: "I have tried some support in the past.",
                      },
                      {
                          value: "ongoing",
                          emoji: "🤝",
                          title: "Yes, I have prior experience",
                          text: "I received therapy or psychological support before.",
                      },
                  ],
            preferred_support_style: isArabic
                ? [
                      {
                          value: "guided",
                          emoji: "🧭",
                          title: "موجّه",
                          text: "أفضل التمارين الواضحة والدعم المنظم.",
                      },
                      {
                          value: "reflective",
                          emoji: "📝",
                          title: "تأملي",
                          text: "أرتاح أكثر مع الكتابة والتأمل الهادئ.",
                      },
                      {
                          value: "practical",
                          emoji: "🛠️",
                          title: "عملي",
                          text: "أفضل الأدوات المباشرة والتمارين القابلة للتطبيق.",
                      },
                      {
                          value: "balanced",
                          emoji: "⚖️",
                          title: "متوازن",
                          text: "أفضل مزيجًا بين العملي والتأملي.",
                      },
                  ]
                : [
                      {
                          value: "guided",
                          emoji: "🧭",
                          title: "Guided steps",
                          text: "I prefer clear exercises and structured support.",
                      },
                      {
                          value: "reflective",
                          emoji: "📝",
                          title: "Reflection and journaling",
                          text: "I feel better with writing and calm reflection.",
                      },
                      {
                          value: "practical",
                          emoji: "🛠️",
                          title: "Practical tools",
                          text: "I prefer direct exercises and actionable support.",
                      },
                      {
                          value: "balanced",
                          emoji: "⚖️",
                          title: "Balanced mix",
                          text: "I prefer a mix of practical and reflective support.",
                      },
                  ],
        }),
        [isArabic],
    );

    const inputStyle = (hasError = false) => ({
        backgroundColor: dc("rgba(255,255,255,0.06)", "#ffffff"),
        borderColor: hasError
            ? "#ef4444"
            : dc("rgba(255,255,255,0.12)", "#d2dfe7"),
        color: dc(COLORS.darkText, COLORS.lightText),
        minHeight: 56,
    });

    const iconMap = {
        current_mood: HeartPulse,
        stress_level: Waves,
        anxiety_level: ShieldCheck,
        sleep_quality: MoonStar,
        focus_level: Focus,
        energy_level: BatteryMedium,
        support_history: HandHeart,
        primary_concern: Brain,
        support_goal: Target,
        preferred_support_style: Sparkles,
        notes: NotebookPen,
    };

    const getLabelFromOptions = (fieldName, value) => {
        const choices = optionSets[fieldName] || [];
        const match = choices.find((item) => item.value === value);
        return match ? match.title : value;
    };

    const canContinue = useMemo(() => {
        if (showSuccessState) return false;

        switch (step) {
            case 2:
                return !!data.current_mood;
            case 3:
                return !!data.stress_level;
            case 4:
                return !!data.anxiety_level;
            case 5:
                return !!data.sleep_quality;
            case 6:
                return !!data.focus_level;
            case 7:
                return !!data.energy_level;
            case 8:
                return !!data.support_history;
            case 9:
                return !!String(data.primary_concern).trim();
            case 10:
                return !!String(data.support_goal).trim();
            case 11:
                return !!data.preferred_support_style;
            case 12:
                return true;
            case 13:
                return true;
            default:
                return true;
        }
    }, [step, data, showSuccessState]);

    const nextStep = () => {
        addDebug("Next clicked", { step, canContinue });
        if (!canContinue) return;
        if (step < REVIEW_STEP) setStep((prev) => prev + 1);
    };

    const prevStep = () => {
        addDebug("Back clicked", { step });
        if (showSuccessState) return;
        if (step > 1) setStep((prev) => prev - 1);
    };

    const submit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        addDebug("Form submit fired", {
            step,
            processing,
            showSuccessState,
            saveClickedRef: saveClickedRef.current,
        });

        if (showSuccessState) {
            addDebug("Blocked submit because success already shown");
            return;
        }

        if (step !== REVIEW_STEP) {
            addDebug("Blocked submit because not on review step", { step });
            return;
        }

        if (!saveClickedRef.current) {
            addDebug("Blocked submit because save button was not the source");
            return;
        }

        if (processing) {
            addDebug("Blocked submit because processing already true");
            return;
        }

        addDebug("POST /onboarding started", { data });

        post(route("onboarding.store"), {
            preserveScroll: true,
            forceFormData: false,
            onBefore: () => {
                addDebug("Inertia onBefore");
                return true;
            },
            onStart: () => addDebug("Inertia onStart"),
            onProgress: (event) =>
                addDebug("Inertia onProgress", event || null),
            onSuccess: (page) => {
                addDebug("Inertia onSuccess", page?.props || null);
            },
            onError: (formErrors) => {
                addDebug("Inertia onError", formErrors);
            },
            onFinish: () => {
                addDebug("Inertia onFinish");
                saveClickedRef.current = false;
            },
        });
    };

    const renderChoiceGrid = (fieldName) => {
        const choices = optionSets[fieldName] || [];

        return (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
                {choices.map(({ value, emoji, title, text }) => (
                    <button
                        key={value}
                        type="button"
                        onClick={() => {
                            addDebug("Option selected", { fieldName, value });
                            setData(fieldName, value);
                        }}
                        className={`w-full rounded-[20px] border p-4 sm:p-5 transition-all duration-200 ${isArabic ? "text-right" : "text-left"}`}
                        style={{
                            backgroundColor:
                                data[fieldName] === value
                                    ? dc(
                                          "rgba(122,167,187,0.14)",
                                          "rgba(122,167,187,0.10)",
                                      )
                                    : dc("rgba(255,255,255,0.04)", "#ffffff"),
                            borderColor:
                                data[fieldName] === value
                                    ? COLORS.primary
                                    : dc("rgba(255,255,255,0.12)", "#d7e4eb"),
                            boxShadow:
                                data[fieldName] === value
                                    ? "0 12px 24px rgba(122,167,187,0.16)"
                                    : "none",
                            minHeight: 96,
                        }}
                    >
                        <div
                            className={`flex ${isArabic ? "flex-row-reverse" : ""} items-start gap-3`}
                        >
                            <div className="text-2xl shrink-0">{emoji}</div>
                            <div className="min-w-0">
                                <div
                                    className="font-bold text-sm sm:text-base"
                                    style={{
                                        color: dc(
                                            COLORS.darkText,
                                            COLORS.lightText,
                                        ),
                                    }}
                                >
                                    {title}
                                </div>
                                <div
                                    className="mt-1.5 text-xs sm:text-sm leading-6"
                                    style={{
                                        color: dc(
                                            COLORS.darkMuted,
                                            COLORS.lightMuted,
                                        ),
                                    }}
                                >
                                    {text}
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
                {errors[fieldName] && (
                    <p className="text-xs text-red-500 xl:col-span-2">
                        {errors[fieldName]}
                    </p>
                )}
            </div>
        );
    };

    const renderStepContent = () => {
        if (showSuccessState) {
            return (
                <div className="min-h-full flex items-center justify-center py-2 sm:py-4">
                    <div className="max-w-xl w-full text-center space-y-5">
                        <div className="flex justify-center">
                            <div
                                className="w-20 h-20 rounded-[24px] flex items-center justify-center"
                                style={{
                                    backgroundColor: dc(
                                        "rgba(16,185,129,0.12)",
                                        "rgba(16,185,129,0.10)",
                                    ),
                                    border: "1px solid rgba(16,185,129,0.18)",
                                }}
                            >
                                <CheckCircle2 size={38} color="#10b981" />
                            </div>
                        </div>

                        <div>
                            <h3
                                className="text-2xl sm:text-3xl font-bold"
                                style={{
                                    color: dc(
                                        COLORS.darkText,
                                        COLORS.lightText,
                                    ),
                                }}
                            >
                                {t.successTitle}
                            </h3>
                            <p
                                className="mt-3 text-sm sm:text-base leading-7 mx-auto"
                                style={{
                                    color: dc(
                                        COLORS.darkMuted,
                                        COLORS.lightMuted,
                                    ),
                                }}
                            >
                                {t.successText}
                            </p>
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={() => {
                                    addDebug(
                                        "Home button clicked from success page",
                                    );
                                    window.location.href = "/home";
                                }}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-white font-bold text-sm sm:text-base"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #7aa7bb, #6797ab)",
                                    boxShadow:
                                        "0 10px 24px rgba(122,167,187,0.28)",
                                    minHeight: 48,
                                }}
                            >
                                {t.successButton}
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        if (step === 1) {
            return (
                <div className="space-y-5 max-w-3xl">
                    <div>
                        <div
                            className="w-16 h-16 rounded-[22px] flex items-center justify-center"
                            style={{
                                background:
                                    "linear-gradient(135deg, #7aa7bb, #6797ab)",
                                boxShadow: "0 12px 28px rgba(122,167,187,0.22)",
                            }}
                        >
                            <Brain size={30} className="text-white" />
                        </div>

                        <h3
                            className="text-2xl sm:text-3xl font-bold leading-tight mt-4"
                            style={{
                                color: dc(COLORS.darkText, COLORS.lightText),
                            }}
                        >
                            {isArabic
                                ? `مرحبًا ${user?.fullname || user?.name || ""}`
                                : `Welcome, ${user?.fullname || user?.name || ""}`}
                        </h3>

                        <p
                            className="mt-3 text-sm sm:text-base leading-7"
                            style={{
                                color: dc(COLORS.darkMuted, COLORS.lightMuted),
                            }}
                        >
                            {isArabic
                                ? "سنمر معًا على مجموعة قصيرة ومرتبة من الخطوات لبناء ملف أوضح يساعدنا على دعمك لاحقًا بشكل أفضل."
                                : "We will go through a short and structured set of steps to build a clearer profile that supports you better later."}
                        </p>
                    </div>

                    <div
                        className="rounded-[20px] border p-4 sm:p-5"
                        style={{
                            backgroundColor: dc(
                                "rgba(188,220,207,0.08)",
                                "#f2f8f5",
                            ),
                            borderColor: dc(
                                "rgba(188,220,207,0.16)",
                                "#d8ebe2",
                            ),
                        }}
                    >
                        <p
                            className="text-sm leading-7"
                            style={{
                                color: dc(COLORS.darkMuted, COLORS.lightMuted),
                            }}
                        >
                            {isArabic
                                ? "أجب بناءً على شعورك الحالي. لا توجد إجابة مثالية، فقط إجابات تساعدنا على فهمك بشكل أفضل."
                                : "Answer based on how you feel now. There are no perfect answers, only answers that help us understand you better."}
                        </p>
                    </div>
                </div>
            );
        }

        if (step === 2) return renderChoiceGrid("current_mood");
        if (step === 3) return renderChoiceGrid("stress_level");
        if (step === 4) return renderChoiceGrid("anxiety_level");
        if (step === 5) return renderChoiceGrid("sleep_quality");
        if (step === 6) return renderChoiceGrid("focus_level");
        if (step === 7) return renderChoiceGrid("energy_level");
        if (step === 8) return renderChoiceGrid("support_history");
        if (step === 11) return renderChoiceGrid("preferred_support_style");

        if (step === 9) {
            return (
                <div className="max-w-3xl">
                    <label
                        className="block text-xs sm:text-sm font-semibold mb-2"
                        style={{ color: dc("#dceaf0", "#2c4a5c") }}
                    >
                        {t.concernLabel}
                    </label>
                    <input
                        type="text"
                        value={data.primary_concern}
                        onChange={(e) =>
                            setData("primary_concern", e.target.value)
                        }
                        placeholder={t.concernPlaceholder}
                        className="w-full py-4 px-4 sm:px-5 rounded-[20px] border outline-none transition-all text-sm sm:text-base"
                        style={inputStyle(!!errors.primary_concern)}
                    />
                    {errors.primary_concern && (
                        <p className="text-xs mt-2 text-red-500">
                            {errors.primary_concern}
                        </p>
                    )}
                </div>
            );
        }

        if (step === 10) {
            return (
                <div className="max-w-3xl">
                    <label
                        className="block text-xs sm:text-sm font-semibold mb-2"
                        style={{ color: dc("#dceaf0", "#2c4a5c") }}
                    >
                        {t.goalLabel}
                    </label>
                    <textarea
                        rows={5}
                        value={data.support_goal}
                        onChange={(e) =>
                            setData("support_goal", e.target.value)
                        }
                        placeholder={t.goalPlaceholder}
                        className="w-full py-4 px-4 sm:px-5 rounded-[20px] border outline-none transition-all text-sm sm:text-base resize-none"
                        style={inputStyle(!!errors.support_goal)}
                    />
                    {errors.support_goal && (
                        <p className="text-xs mt-2 text-red-500">
                            {errors.support_goal}
                        </p>
                    )}
                </div>
            );
        }

        if (step === 12) {
            return (
                <div className="max-w-3xl">
                    <div className="flex items-center gap-2 mb-2">
                        <label
                            className="block text-xs sm:text-sm font-semibold"
                            style={{ color: dc("#dceaf0", "#2c4a5c") }}
                        >
                            {t.notesLabel}
                        </label>
                        <span
                            className="text-[10px] sm:text-xs px-2 py-1 rounded-full"
                            style={{
                                backgroundColor: dc(
                                    "rgba(255,255,255,0.08)",
                                    "#eef5f8",
                                ),
                                color: dc(COLORS.darkMuted, COLORS.lightMuted),
                            }}
                        >
                            {t.optional}
                        </span>
                    </div>
                    <textarea
                        rows={6}
                        value={data.notes}
                        onChange={(e) => setData("notes", e.target.value)}
                        placeholder={t.notesPlaceholder}
                        className="w-full py-4 px-4 sm:px-5 rounded-[20px] border outline-none transition-all text-sm sm:text-base resize-none"
                        style={inputStyle(!!errors.notes)}
                    />
                    {errors.notes && (
                        <p className="text-xs mt-2 text-red-500">
                            {errors.notes}
                        </p>
                    )}
                </div>
            );
        }

        const reviewItems = [
            ["current_mood", data.current_mood],
            ["stress_level", data.stress_level],
            ["anxiety_level", data.anxiety_level],
            ["sleep_quality", data.sleep_quality],
            ["focus_level", data.focus_level],
            ["energy_level", data.energy_level],
            ["support_history", data.support_history],
            ["primary_concern", data.primary_concern],
            ["support_goal", data.support_goal],
            ["preferred_support_style", data.preferred_support_style],
            ["notes", data.notes],
        ];

        return (
            <div className="space-y-4 max-w-4xl">
                <div>
                    <div className="flex justify-center sm:justify-start">
                        <div
                            className="w-16 h-16 rounded-[22px] flex items-center justify-center"
                            style={{
                                backgroundColor: dc(
                                    "rgba(16,185,129,0.12)",
                                    "rgba(16,185,129,0.08)",
                                ),
                                border: "1px solid rgba(16,185,129,0.18)",
                            }}
                        >
                            <CheckCircle2 size={30} color="#10b981" />
                        </div>
                    </div>
                    <h3
                        className="text-xl sm:text-2xl font-bold mt-4"
                        style={{ color: dc(COLORS.darkText, COLORS.lightText) }}
                    >
                        {t.reviewTitle}
                    </h3>
                    <p
                        className="mt-2 text-sm sm:text-base"
                        style={{
                            color: dc(COLORS.darkMuted, COLORS.lightMuted),
                        }}
                    >
                        {t.reviewText}
                    </p>
                </div>

                <div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 rounded-[22px] border p-4 sm:p-5"
                    style={{
                        backgroundColor: dc(
                            "rgba(255,255,255,0.05)",
                            "#f8fbfd",
                        ),
                        borderColor: dc("rgba(255,255,255,0.12)", "#dbe7ee"),
                    }}
                >
                    {reviewItems.map(([key, value]) => {
                        const Icon = iconMap[key];
                        const displayValue = [
                            "current_mood",
                            "stress_level",
                            "anxiety_level",
                            "sleep_quality",
                            "focus_level",
                            "energy_level",
                            "support_history",
                            "preferred_support_style",
                        ].includes(key)
                            ? getLabelFromOptions(key, value)
                            : value || "-";

                        return (
                            <div
                                key={key}
                                className="rounded-[18px] p-4"
                                style={{
                                    backgroundColor: dc(
                                        "rgba(255,255,255,0.04)",
                                        "#ffffff",
                                    ),
                                    border: `1px solid ${dc("rgba(255,255,255,0.08)", "#e3edf2")}`,
                                }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    {Icon ? (
                                        <Icon
                                            size={16}
                                            color={COLORS.primary}
                                        />
                                    ) : null}
                                    <p
                                        className="text-[11px] sm:text-xs"
                                        style={{
                                            color: dc(
                                                COLORS.darkMuted,
                                                COLORS.lightMuted,
                                            ),
                                        }}
                                    >
                                        {t.fields[key]}
                                    </p>
                                </div>
                                <p
                                    className="text-sm sm:text-base font-semibold break-words"
                                    style={{
                                        color: dc(
                                            COLORS.darkText,
                                            COLORS.lightText,
                                        ),
                                    }}
                                >
                                    {displayValue}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <>
            <Head title={t.pageTitle} />

            <div
                dir={isArabic ? "rtl" : "ltr"}
                className="min-h-[100dvh] w-full"
                style={{
                    background: isDarkMode
                        ? "linear-gradient(180deg, #0d141a 0%, #121c24 45%, #101920 100%)"
                        : "linear-gradient(180deg, #f6fbfd 0%, #edf5f8 45%, #e8f1f5 100%)",
                }}
            >
                <div className="min-h-[100dvh] grid grid-cols-1 2xl:grid-cols-[1.02fr_1.24fr]">
                    <aside
                        className="hidden 2xl:flex min-h-[100dvh] px-10 py-10 border-e"
                        style={{
                            borderColor: dc(
                                "rgba(255,255,255,0.08)",
                                "#d9e5ec",
                            ),
                            background: isDarkMode
                                ? "radial-gradient(circle at top, rgba(122,167,187,0.12), transparent 36%)"
                                : "radial-gradient(circle at top, rgba(122,167,187,0.10), transparent 36%)",
                        }}
                    >
                        <div className="w-full my-auto max-w-2xl">
                            <div className="flex items-center gap-3 mb-8">
                                <div
                                    className="w-14 h-14 rounded-[20px] flex items-center justify-center"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #7aa7bb, #6797ab)",
                                        boxShadow:
                                            "0 12px 30px rgba(122,167,187,0.28)",
                                    }}
                                >
                                    <Brain size={24} className="text-white" />
                                </div>
                                <div>
                                    <h1
                                        className="text-xl font-bold"
                                        style={{
                                            color: dc(
                                                COLORS.darkText,
                                                COLORS.lightText,
                                            ),
                                        }}
                                    >
                                        {t.brand}
                                    </h1>
                                    <p
                                        className="text-sm"
                                        style={{
                                            color: dc(
                                                COLORS.darkMuted,
                                                COLORS.lightMuted,
                                            ),
                                        }}
                                    >
                                        {t.heroTitle}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-10">
                                <h2
                                    className="text-5xl font-bold leading-tight"
                                    style={{
                                        color: dc(
                                            COLORS.darkText,
                                            COLORS.lightText,
                                        ),
                                    }}
                                >
                                    {t.heroTitle}
                                </h2>
                                <p
                                    className="mt-4 text-lg leading-8 max-w-xl"
                                    style={{
                                        color: dc(
                                            COLORS.darkMuted,
                                            COLORS.lightMuted,
                                        ),
                                    }}
                                >
                                    {t.heroText}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {t.cards.map((card, idx) => {
                                    const Icon = card.icon;
                                    return (
                                        <div
                                            key={idx}
                                            className="rounded-[24px] p-5 border"
                                            style={{
                                                backgroundColor: dc(
                                                    "rgba(255,255,255,0.05)",
                                                    "#ffffff",
                                                ),
                                                borderColor: dc(
                                                    "rgba(255,255,255,0.10)",
                                                    "#d9e7ee",
                                                ),
                                            }}
                                        >
                                            <div className="mb-3">
                                                <Icon
                                                    size={20}
                                                    color={COLORS.primary}
                                                />
                                            </div>
                                            <h3
                                                className="font-bold text-base leading-7"
                                                style={{
                                                    color: dc(
                                                        COLORS.darkText,
                                                        COLORS.lightText,
                                                    ),
                                                }}
                                            >
                                                {card.title}
                                            </h3>
                                            <p
                                                className="mt-2 text-sm leading-6"
                                                style={{
                                                    color: dc(
                                                        COLORS.darkMuted,
                                                        COLORS.lightMuted,
                                                    ),
                                                }}
                                            >
                                                {card.text}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>

                    <section className="min-h-[100dvh] p-0 sm:p-3 lg:p-4 flex">
                        <form
                            onSubmit={submit}
                            className="flex-1 flex"
                            autoComplete="off"
                            noValidate
                        >
                            <div
                                className="flex-1 min-h-[100dvh] sm:min-h-0 grid grid-rows-[auto_auto_minmax(0,1fr)_auto] rounded-none sm:rounded-[28px] border-0 sm:border overflow-hidden"
                                style={{
                                    backgroundColor: dc(
                                        "rgba(16,24,32,0.74)",
                                        "rgba(255,255,255,0.82)",
                                    ),
                                    borderColor: dc(
                                        "rgba(255,255,255,0.10)",
                                        "#d8e5ec",
                                    ),
                                    backdropFilter: "blur(18px)",
                                    WebkitBackdropFilter: "blur(18px)",
                                    boxShadow: isDarkMode
                                        ? "0 20px 60px rgba(0,0,0,0.20)"
                                        : "0 20px 60px rgba(77,115,139,0.10)",
                                }}
                            >
                                <div
                                    className="shrink-0 px-4 sm:px-5 lg:px-6 pt-4 pb-4 border-b"
                                    style={{
                                        borderColor: dc(
                                            "rgba(255,255,255,0.10)",
                                            "#dfe9ef",
                                        ),
                                        backgroundColor: dc(
                                            "rgba(16,24,32,0.88)",
                                            "rgba(255,255,255,0.92)",
                                        ),
                                    }}
                                >
                                    <div className="flex items-start justify-between gap-3 mb-4">
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 2xl:hidden mb-2">
                                                <div
                                                    className="w-9 h-9 rounded-[14px] flex items-center justify-center"
                                                    style={{
                                                        background:
                                                            "linear-gradient(135deg, #7aa7bb, #6797ab)",
                                                    }}
                                                >
                                                    <Brain
                                                        size={18}
                                                        className="text-white"
                                                    />
                                                </div>
                                                <span
                                                    className="font-bold text-sm"
                                                    style={{
                                                        color: dc(
                                                            COLORS.darkText,
                                                            COLORS.lightText,
                                                        ),
                                                    }}
                                                >
                                                    {t.brand}
                                                </span>
                                            </div>

                                            <p
                                                className="text-xs sm:text-sm font-semibold"
                                                style={{
                                                    color: COLORS.primary,
                                                }}
                                            >
                                                {showSuccessState
                                                    ? t.completedLabel
                                                    : `${t.stepLabel} ${step} ${t.of} ${totalSteps}`}
                                            </p>

                                            <h2
                                                className="text-lg sm:text-2xl font-bold mt-1 leading-tight"
                                                style={{
                                                    color: dc(
                                                        COLORS.darkText,
                                                        COLORS.lightText,
                                                    ),
                                                }}
                                            >
                                                {showSuccessState
                                                    ? t.successTitle
                                                    : t.steps[step - 1].title}
                                            </h2>

                                            <p
                                                className="text-xs sm:text-sm mt-2 leading-6 max-w-2xl"
                                                style={{
                                                    color: dc(
                                                        COLORS.darkMuted,
                                                        COLORS.lightMuted,
                                                    ),
                                                }}
                                            >
                                                {showSuccessState
                                                    ? t.successText
                                                    : t.steps[step - 1]
                                                          .subtitle}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setLocale((prev) =>
                                                        prev === "ar"
                                                            ? "en"
                                                            : "ar",
                                                    )
                                                }
                                                className="h-10 px-3 rounded-2xl border inline-flex items-center gap-2 text-xs sm:text-sm font-semibold"
                                                style={{
                                                    backgroundColor: dc(
                                                        "rgba(255,255,255,0.06)",
                                                        "rgba(255,255,255,0.92)",
                                                    ),
                                                    borderColor: dc(
                                                        "rgba(255,255,255,0.10)",
                                                        "#d6e4eb",
                                                    ),
                                                    color: dc(
                                                        "#eef7fb",
                                                        "#1d3442",
                                                    ),
                                                }}
                                            >
                                                <Languages size={16} />
                                                <span className="hidden sm:inline">
                                                    {t.language}
                                                </span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setIsDarkMode(
                                                        (prev) => !prev,
                                                    )
                                                }
                                                className="h-10 px-3 rounded-2xl border inline-flex items-center gap-2 text-xs sm:text-sm font-semibold"
                                                style={{
                                                    backgroundColor: dc(
                                                        "rgba(255,255,255,0.06)",
                                                        "rgba(255,255,255,0.92)",
                                                    ),
                                                    borderColor: dc(
                                                        "rgba(255,255,255,0.10)",
                                                        "#d6e4eb",
                                                    ),
                                                    color: dc(
                                                        "#eef7fb",
                                                        "#1d3442",
                                                    ),
                                                }}
                                            >
                                                {isDarkMode ? (
                                                    <Sun size={16} />
                                                ) : (
                                                    <Moon size={16} />
                                                )}
                                                <span className="hidden sm:inline">
                                                    {isDarkMode
                                                        ? t.lightMode
                                                        : t.darkMode}
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div
                                            className="flex-1 h-2 rounded-full overflow-hidden"
                                            style={{
                                                backgroundColor: dc(
                                                    "rgba(255,255,255,0.08)",
                                                    "#e4edf2",
                                                ),
                                            }}
                                        >
                                            <div
                                                className="h-full rounded-full transition-all duration-300"
                                                style={{
                                                    width: `${showSuccessState ? 100 : progress}%`,
                                                    background:
                                                        "linear-gradient(90deg, #7aa7bb, #6797ab)",
                                                }}
                                            />
                                        </div>

                                        <div
                                            className="hidden sm:inline-flex items-center gap-2 rounded-2xl px-3 py-2 border"
                                            style={{
                                                backgroundColor: dc(
                                                    "rgba(255,255,255,0.05)",
                                                    "#f5fafc",
                                                ),
                                                borderColor: dc(
                                                    "rgba(255,255,255,0.10)",
                                                    "#d8e5ec",
                                                ),
                                            }}
                                        >
                                            <Sparkles
                                                size={16}
                                                color={COLORS.primary}
                                            />
                                            <span
                                                className="text-sm font-medium"
                                                style={{
                                                    color: dc(
                                                        COLORS.darkMuted,
                                                        COLORS.lightMuted,
                                                    ),
                                                }}
                                            >
                                                {showSuccessState
                                                    ? "100%"
                                                    : `${progress}% ${t.done}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {!showSuccessState && (
                                    <div className="2xl:hidden shrink-0 px-4 sm:px-5 pt-4">
                                        <div
                                            className="rounded-[20px] p-4 border"
                                            style={{
                                                backgroundColor: dc(
                                                    "rgba(255,255,255,0.04)",
                                                    "#ffffff",
                                                ),
                                                borderColor: dc(
                                                    "rgba(255,255,255,0.10)",
                                                    "#d8e5ec",
                                                ),
                                            }}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="mb-2">
                                                    <mobileHelperCard.icon
                                                        size={18}
                                                        color={COLORS.primary}
                                                    />
                                                </div>
                                                <div className="min-w-0">
                                                    <h3
                                                        className="font-bold text-sm"
                                                        style={{
                                                            color: dc(
                                                                COLORS.darkText,
                                                                COLORS.lightText,
                                                            ),
                                                        }}
                                                    >
                                                        {mobileHelperCard.title}
                                                    </h3>
                                                    <p
                                                        className="mt-1.5 text-xs leading-6"
                                                        style={{
                                                            color: dc(
                                                                COLORS.darkMuted,
                                                                COLORS.lightMuted,
                                                            ),
                                                        }}
                                                    >
                                                        {mobileHelperCard.text}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div
                                    className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-5 lg:px-6 py-4 sm:py-5 lg:py-6"
                                    style={{
                                        paddingBottom: showSuccessState
                                            ? "max(env(safe-area-inset-bottom, 0px), 24px)"
                                            : "max(env(safe-area-inset-bottom, 0px), 112px)",
                                    }}
                                >
                                    

                                    {renderStepContent()}
                                </div>

                                {!showSuccessState && (
                                    <div
                                        className="shrink-0 px-4 sm:px-5 lg:px-6 py-3 sm:py-4 border-t"
                                        style={{
                                            borderColor: dc(
                                                "rgba(255,255,255,0.10)",
                                                "#dfe9ef",
                                            ),
                                            backgroundColor: dc(
                                                "rgba(16,24,32,0.92)",
                                                "rgba(255,255,255,0.95)",
                                            ),
                                            paddingBottom:
                                                "calc(env(safe-area-inset-bottom, 0px) + 12px)",
                                        }}
                                    >
                                        <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                                            <button
                                                type="button"
                                                onClick={prevStep}
                                                disabled={
                                                    step === 1 || processing
                                                }
                                                className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl text-sm sm:text-base font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                                                style={{
                                                    backgroundColor: dc(
                                                        "rgba(255,255,255,0.04)",
                                                        "#ffffff",
                                                    ),
                                                    border: `1px solid ${dc("rgba(255,255,255,0.12)", "#d8e5ec")}`,
                                                    color: dc(
                                                        "#d9eaf1",
                                                        "#2d4a5c",
                                                    ),
                                                    minHeight: 48,
                                                }}
                                            >
                                                <ChevronLeft size={18} />
                                                {t.back}
                                            </button>

                                            {step < REVIEW_STEP ? (
                                                <button
                                                    type="button"
                                                    onClick={nextStep}
                                                    disabled={
                                                        !canContinue ||
                                                        processing
                                                    }
                                                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-2xl text-sm sm:text-base text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
                                                    style={{
                                                        background:
                                                            "linear-gradient(135deg, #7aa7bb, #6797ab)",
                                                        boxShadow:
                                                            "0 10px 24px rgba(122,167,187,0.30)",
                                                        minHeight: 48,
                                                    }}
                                                >
                                                    {t.next}
                                                    <ChevronRight size={18} />
                                                </button>
                                            ) : (
                                                <button
                                                    type="submit"
                                                    onClick={() => {
                                                        saveClickedRef.current = true;
                                                        addDebug(
                                                            "Save button clicked",
                                                            { step },
                                                        );
                                                    }}
                                                    disabled={processing}
                                                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-2xl text-sm sm:text-base text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
                                                    style={{
                                                        background:
                                                            "linear-gradient(135deg, #7aa7bb, #6797ab)",
                                                        boxShadow:
                                                            "0 10px 24px rgba(122,167,187,0.30)",
                                                        minHeight: 48,
                                                    }}
                                                >
                                                    {processing
                                                        ? t.saving
                                                        : t.save}
                                                    <ChevronRight size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
}
