import React, { useMemo, useState } from "react";
import axios from "axios";
import { Head } from "@inertiajs/react";
import { Brain, ArrowRight, Sparkles } from "lucide-react";
import NavV2 from "@/Components/NavBar";
import FooterV2 from "@/Components/Footer";
import useSitePreferences from "@/hooks/useSitePreferences";

axios.defaults.baseURL = window.location.origin;

function GlassCard({ children, isDark, className = "" }) {
    return (
        <div
            className={`rounded-[30px] border shadow-xl ${
                isDark
                    ? "border-white/10 bg-white/5"
                    : "border-slate-200 bg-white/85"
            } ${className}`}
        >
            {children}
        </div>
    );
}

export default function QuickAssessment() {
    const { isDark, isArabic } = useSitePreferences();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const [form, setForm] = useState({
        full_name: "",
        email: "",
        anxiety: 3,
        stress: 3,
        sleep_quality: 3,
        mood_balance: 3,
        focus: 3,
        energy: 3,
    });

    const t = useMemo(
        () => ({
            title: isArabic
                ? "التقييم الأولي - Mind Gate"
                : "Quick Assessment - Mind Gate",
            heading: isArabic ? "التقييم الأولي" : "Quick assessment",
            subtitle: isArabic
                ? "أجب عن مجموعة قصيرة من الأسئلة لتحصل على ملخص أولي وتوصية مبدئية."
                : "Answer a short set of questions to get an early summary and initial recommendation.",
            send: isArabic ? "إرسال التقييم" : "Submit assessment",
            sending: isArabic ? "جارٍ الإرسال..." : "Sending...",
            result: isArabic ? "النتيجة" : "Result",
        }),
        [isArabic],
    );

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(route("assessment.quick"), form);
            setResult(res.data?.result || null);
        } catch {
            setResult(null);
        } finally {
            setLoading(false);
        }
    };

    const pageBg = isDark
        ? "bg-[#081018] text-white"
        : "bg-[#f7fafc] text-slate-900";
    const muted = isDark ? "text-white/70" : "text-slate-600";

    return (
        <div
            dir={isArabic ? "rtl" : "ltr"}
            className={`min-h-screen ${pageBg}`}
        >
            <Head title={t.title} />
            <NavV2 />

            <main className="pt-28">
                <section className="px-6 md:px-12 lg:px-16 pb-20">
                    <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[1fr_0.95fr]">
                        <div>
                            <div
                                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold ${
                                    isDark
                                        ? "bg-white/5 border-white/10"
                                        : "bg-white/80 border-slate-200"
                                }`}
                            >
                                <Sparkles className="h-4 w-4 text-[#7aa7bb]" />
                                Mind Gate
                            </div>

                            <h1 className="mt-6 text-4xl md:text-6xl font-black">
                                {t.heading}
                            </h1>
                            <p className={`mt-4 text-lg leading-9 ${muted}`}>
                                {t.subtitle}
                            </p>

                            {result && (
                                <GlassCard isDark={isDark} className="mt-8 p-6">
                                    <div className="mb-2 text-lg font-extrabold">
                                        {t.result}
                                    </div>
                                    <div className="text-sm font-bold uppercase text-[#7aa7bb]">
                                        {result.level}
                                    </div>
                                    <p
                                        className={`mt-3 text-sm leading-8 ${muted}`}
                                    >
                                        {result.summary}
                                    </p>
                                    <p className="mt-3 text-sm font-semibold">
                                        {result.recommendation}
                                    </p>
                                </GlassCard>
                            )}
                        </div>

                        <GlassCard isDark={isDark} className="p-8">
                            <form onSubmit={submit} className="space-y-5">
                                <div className="grid gap-5 md:grid-cols-2">
                                    <input
                                        type="text"
                                        placeholder={
                                            isArabic ? "الاسم" : "Name"
                                        }
                                        value={form.full_name}
                                        onChange={(e) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                full_name: e.target.value,
                                            }))
                                        }
                                        className={`rounded-2xl border px-4 py-3 text-sm outline-none ${
                                            isDark
                                                ? "border-white/10 bg-white/5 text-white"
                                                : "border-slate-200 bg-white"
                                        }`}
                                    />

                                    <input
                                        type="email"
                                        placeholder={
                                            isArabic
                                                ? "البريد الإلكتروني"
                                                : "Email"
                                        }
                                        value={form.email}
                                        onChange={(e) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                email: e.target.value,
                                            }))
                                        }
                                        className={`rounded-2xl border px-4 py-3 text-sm outline-none ${
                                            isDark
                                                ? "border-white/10 bg-white/5 text-white"
                                                : "border-slate-200 bg-white"
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
                                                value={form[key]}
                                                onChange={(e) =>
                                                    setForm((prev) => ({
                                                        ...prev,
                                                        [key]: Number(
                                                            e.target.value,
                                                        ),
                                                    }))
                                                }
                                                className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none ${
                                                    isDark
                                                        ? "border-white/10 bg-white/5 text-white"
                                                        : "border-slate-200 bg-white"
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
                                    disabled={loading}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] px-6 py-4 text-base font-bold text-white shadow-xl"
                                >
                                    {loading ? t.sending : t.send}
                                    <ArrowRight className="h-5 w-5" />
                                </button>
                            </form>
                        </GlassCard>
                    </div>
                </section>
            </main>

            <FooterV2 />
        </div>
    );
}
