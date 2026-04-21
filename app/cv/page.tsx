import React from "react";
import { Raleway } from "next/font/google";
import PrintButton from "@/components/sub/PrintButton";
import CVLangSwitcher from "@/components/sub/CVLangSwitcher";
import CVContent from "@/components/main/CVContent";

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata = { title: "CV — Yaiser Avila Rodríguez" };

export default function CVPage() {
  return (
    <main className={`${raleway.className} bg-gray-100 min-h-screen flex items-start justify-center py-8`}>
      <style dangerouslySetInnerHTML={{ __html: `
        #main-navbar { display: none !important; }
        canvas { display: none !important; }
        @media print {
          @page { margin: 6mm; size: A4; }
          .no-print { display: none !important; }
          body, html, main { background: white !important; margin: 0; padding: 0; }
          .cv-outer { box-shadow: none !important; margin: 0 !important; width: 100% !important; }
          [class*="fixed"] { display: none !important; }
          footer { display: none !important; }
        }
      ` }} />

      <div className="no-print fixed top-4 right-4 z-50 flex gap-2 items-center">
        <CVLangSwitcher />
        <a
          href="/"
          className="px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-400 shadow-sm transition-colors"
        >
          ← Back
        </a>
        <PrintButton />
      </div>

      <CVContent />
    </main>
  );
}
