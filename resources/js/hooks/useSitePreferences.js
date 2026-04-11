import { useEffect, useMemo, useState } from "react";

const THEME_KEY = "mindgate_theme";
const LOCALE_KEY = "mindgate_locale";
const EVENT_NAME = "mindgate:preferences-changed";

function applyPreferences(theme, locale) {
    if (typeof document === "undefined") return;

    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
}

function emitPreferences(theme, locale) {
    if (typeof window === "undefined") return;

    window.dispatchEvent(
        new CustomEvent(EVENT_NAME, {
            detail: { theme, locale },
        }),
    );
}

export default function useSitePreferences() {
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined") return "dark";
        return localStorage.getItem(THEME_KEY) || "dark";
    });

    const [locale, setLocale] = useState(() => {
        if (typeof window === "undefined") return "ar";
        return localStorage.getItem(LOCALE_KEY) || "ar";
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        localStorage.setItem(THEME_KEY, theme);
        localStorage.setItem(LOCALE_KEY, locale);
        applyPreferences(theme, locale);
        emitPreferences(theme, locale);
    }, [theme, locale]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleStorage = () => {
            const nextTheme = localStorage.getItem(THEME_KEY) || "dark";
            const nextLocale = localStorage.getItem(LOCALE_KEY) || "ar";

            setTheme(nextTheme);
            setLocale(nextLocale);
            applyPreferences(nextTheme, nextLocale);
        };

        const handlePreferencesChanged = (event) => {
            const nextTheme =
                event?.detail?.theme ||
                localStorage.getItem(THEME_KEY) ||
                "dark";
            const nextLocale =
                event?.detail?.locale ||
                localStorage.getItem(LOCALE_KEY) ||
                "ar";

            setTheme(nextTheme);
            setLocale(nextLocale);
            applyPreferences(nextTheme, nextLocale);
        };

        window.addEventListener("storage", handleStorage);
        window.addEventListener(EVENT_NAME, handlePreferencesChanged);

        applyPreferences(theme, locale);

        return () => {
            window.removeEventListener("storage", handleStorage);
            window.removeEventListener(EVENT_NAME, handlePreferencesChanged);
        };
    }, []);

    const isDark = theme === "dark";
    const isArabic = locale === "ar";

    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        localStorage.setItem(THEME_KEY, nextTheme);
        applyPreferences(nextTheme, locale);
        emitPreferences(nextTheme, locale);
    };

    const toggleLocale = () => {
        const nextLocale = locale === "ar" ? "en" : "ar";
        setLocale(nextLocale);
        localStorage.setItem(LOCALE_KEY, nextLocale);
        applyPreferences(theme, nextLocale);
        emitPreferences(theme, nextLocale);
    };

    return useMemo(
        () => ({
            theme,
            locale,
            isDark,
            isArabic,
            toggleTheme,
            toggleLocale,
            setTheme,
            setLocale,
        }),
        [theme, locale, isDark, isArabic],
    );
}
