"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { experiences } from "@/constants/content";

const Experience = () => {
  const { t, language } = useLanguage();
  const data = experiences[language];

  return (
    <section id="experience" className="flex flex-col items-center py-20 px-10">
      <h2 className="text-[40px] font-semibold text-white py-10">
        {t.sections.experience.title} <span className="text-purple-400">{t.sections.experience.accent}</span>
      </h2>

      <div className="relative max-w-4xl w-full">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-purple-700 to-transparent md:-translate-x-px" />

        <div className="flex flex-col gap-12">
          {data.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-6 ${
                idx % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-purple-500 border-2 border-[#030014] md:-translate-x-1.5 -translate-y-0.5 top-2" />

              <div className="ml-10 md:ml-0 md:w-1/2 md:px-8">
                <div className="rounded-xl border border-[#2A0E61] bg-[#0d0628]/60 p-5 hover:border-purple-500/50 transition-colors">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                      <p className="text-purple-400 font-semibold">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-400">{exp.period}</span>
                      <p className="text-xs text-gray-500">{exp.location}</p>
                    </div>
                  </div>

                  <ul className="mt-3 space-y-1.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-sm text-gray-300 flex gap-2">
                        <span className="text-purple-400 mt-0.5 flex-shrink-0">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs rounded-full border border-purple-500/30 text-purple-300 bg-purple-950/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
