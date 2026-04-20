"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors shadow-lg"
    >
      Print / Save as PDF
    </button>
  );
}
