"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { RxLinkedinLogo, RxGithubLogo } from "react-icons/rx";
import { useLanguage } from "@/context/LanguageContext";

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const copyEmail = () => {
    navigator.clipboard.writeText("yaigenes@infrabio.dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="flex flex-col items-center py-20 px-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full text-center"
      >
        <h2 className="text-[40px] font-semibold text-white leading-tight">
          {t.sections.contact.title}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            {t.sections.contact.accent}
          </span>
        </h2>

        <p className="text-gray-400 text-lg mt-4 mb-10">{t.contact.sub}</p>

        <div className="flex flex-col gap-4">
          <a
            href="https://calendly.com/yaigenes/1-1-connect"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:from-purple-500 hover:to-cyan-500 transition-all text-center text-base"
          >
            {t.contact.email}
          </a>

          <div className="grid grid-cols-2 gap-4">
            <a
              href="https://www.linkedin.com/in/yaigenes"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl border border-[#2A0E61] bg-[#0d0628]/60 text-gray-300 hover:border-purple-500/50 hover:text-purple-300 transition-colors"
            >
              <RxLinkedinLogo size={18} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/YaiGenes"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl border border-[#2A0E61] bg-[#0d0628]/60 text-gray-300 hover:border-gray-500 hover:text-gray-200 transition-colors"
            >
              <RxGithubLogo size={18} />
              <span>GitHub</span>
            </a>
          </div>

          <button
            onClick={copyEmail}
            className="w-full py-3 rounded-xl border border-[#2A0E61] bg-transparent font-mono text-sm text-gray-500 hover:text-gray-300 hover:border-gray-500 transition-colors"
          >
            {copied ? t.contact.copied : t.contact.copy}
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
