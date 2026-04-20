"use client";

import { Socials } from "@/constants";
import Image from "next/image";
import React, { useState } from "react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { useLanguage, type Language } from "@/context/LanguageContext";

const LANG_LABELS: Record<Language, string> = { en: "EN", de: "DE", fr: "FR" };

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const NAV_LINKS = [
    { href: "#about",      label: t.nav.about },
    { href: "#experience", label: t.nav.experience },
    { href: "#projects",   label: t.nav.projects },
    { href: "#lab",        label: t.nav.lab },
    { href: "#contact",    label: t.nav.contact },
  ];

  return (
    <>
      <div id="main-navbar" className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-6 md:px-10">
        <div className="w-full h-full flex flex-row items-center justify-between m-auto">
          <a
            href="#about-me"
            className="h-auto w-auto flex flex-row items-center"
          >
            <Image
              src="/logo-last.png"
              alt="logo"
              width={70}
              height={70}
              className="cursor-pointer hover:animate-slowspin"
            />
            <span className="font-display font-bold ml-[10px] hidden md:block text-gray-300">
              Yaigenes — Site Reliability Engineer
            </span>
          </a>

          <div className="hidden md:flex items-center border border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200 gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="cursor-pointer hover:text-purple-400 transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/cv"
              className="cursor-pointer text-purple-400 hover:text-purple-300 transition-colors font-medium text-sm border border-purple-500/40 px-3 py-1 rounded-full hover:border-purple-400"
            >
              {t.nav.viewCv}
            </a>
            <div className="flex items-center gap-0.5 border-l border-[#7042f861] pl-4 ml-1">
              {(["en", "de", "fr"] as Language[]).map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`text-[11px] px-1.5 py-0.5 rounded transition-colors font-mono ${
                    language === lang
                      ? "text-purple-400 bg-purple-500/10"
                      : "text-gray-600 hover:text-gray-300"
                  }`}
                >
                  {LANG_LABELS[lang]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-row items-center gap-4">
            {Socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <Image
                  src={social.src}
                  alt={social.name}
                  width={24}
                  height={24}
                  className="opacity-75 hover:opacity-100 transition-opacity"
                />
              </a>
            ))}

            <button
              className="md:hidden text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <RxCross2 size={22} /> : <RxHamburgerMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed top-[65px] left-0 right-0 z-40 bg-[#030014]/95 backdrop-blur-md border-b border-[#2A0E61] md:hidden">
          <div className="flex flex-col px-6 py-4 gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-gray-300 hover:text-purple-400 transition-colors border-b border-[#2A0E61]/50 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/cv"
              onClick={() => setMobileOpen(false)}
              className="py-3 text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >
              {t.nav.viewCv}
            </a>
            <div className="flex items-center gap-2 pt-2">
              {(["en", "de", "fr"] as Language[]).map(lang => (
                <button
                  key={lang}
                  onClick={() => { setLanguage(lang); setMobileOpen(false); }}
                  className={`text-xs px-3 py-1.5 rounded font-mono border transition-colors ${
                    language === lang
                      ? "text-purple-400 border-purple-500/40 bg-purple-500/10"
                      : "text-gray-500 border-[#2A0E61] hover:text-gray-300"
                  }`}
                >
                  {LANG_LABELS[lang]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
