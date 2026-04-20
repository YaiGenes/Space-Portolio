"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { slideInFromLeft, slideInFromRight } from "@/utils/motion";
import { useLanguage } from "@/context/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  const stats = [
    { value: "5+",        label: t.stats.years    },
    { value: "234+",      label: t.stats.clusters },
    { value: "-25.9%",   label: t.stats.compute  },
    { value: "CHF 642K+", label: t.stats.saved    },
    { value: "1,400+",   label: t.stats.commits  },
  ];
  return (
    <section
      id="about"
      className="flex flex-col items-center justify-center py-20 px-10"
    >
      <h2 className="text-[40px] font-semibold text-white py-10">
        {t.sections.about.title} <span className="text-purple-400">{t.sections.about.accent}</span>
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }}
          variants={slideInFromLeft(0.4)}
          className="flex-shrink-0"
        >
          <div className="relative w-56 h-56 rounded-full overflow-hidden border-2 border-purple-500/50 shadow-lg shadow-purple-900/40">
            <Image
              src="/profile.jpg"
              alt="Yaiser Avila Rodríguez"
              fill
              className="object-cover object-center"
            />
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }}
          variants={slideInFromRight(0.4)}
          className="flex flex-col gap-4 text-gray-300"
        >
          <p className="text-lg leading-relaxed">{t.about.bio1}</p>
          <p className="text-lg leading-relaxed">{t.about.bio2}</p>
          <p className="text-lg leading-relaxed">{t.about.bio3}</p>
          <div className="flex flex-wrap gap-3 mt-2">
            <a
              href="https://www.linkedin.com/in/yaigenes"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg border border-purple-500/50 text-sm text-purple-300 hover:bg-purple-500/10 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/YaiGenes"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg border border-gray-600 text-sm text-gray-300 hover:border-gray-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href="mailto:yaigenes@infrabio.dev"
              className="px-4 py-2 rounded-lg border border-cyan-500/50 text-sm text-cyan-300 hover:bg-cyan-500/10 transition-colors"
            >
              yaigenes@infrabio.dev
            </a>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-16 max-w-5xl w-full">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center rounded-xl border border-[#2A0E61] bg-[#0d0628]/60 p-6"
          >
            <span className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 ${stat.value.length > 8 ? "text-2xl" : "text-4xl"}`}>
              {stat.value}
            </span>
            <span className="mt-2 text-xs text-gray-400 text-center uppercase tracking-wider">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;
