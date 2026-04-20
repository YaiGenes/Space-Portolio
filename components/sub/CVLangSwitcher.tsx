"use client";

import { useLanguage, type Language } from "@/context/LanguageContext";

const LABELS: Record<Language, string> = { en: "EN", de: "DE", fr: "FR" };

export default function CVLangSwitcher() {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-2 py-1.5 shadow-sm">
      {(["en", "de", "fr"] as Language[]).map(lang => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`text-xs px-1.5 py-0.5 rounded font-mono transition-colors ${
            language === lang
              ? "text-purple-700 bg-purple-100 font-semibold"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          {LABELS[lang]}
        </button>
      ))}
    </div>
  );
}
