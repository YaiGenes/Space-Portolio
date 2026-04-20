"use client";

import {
  Backend_skill,
  Frontend_skill,
  Observability_skill,
  Full_stack,
} from "@/constants";
import React from "react";
import SkillDataProvider from "../sub/SkillDataProvider";
import { useLanguage } from "@/context/LanguageContext";

const categories = [
  { label: "Continuous Delivery",           skills: Frontend_skill },
  { label: "Cloud & Infrastructure as Code", skills: Backend_skill },
  { label: "Observability & Reliability",   skills: Observability_skill },
  { label: "Automation & AI",               skills: Full_stack },
];

const Skills = () => {
  const { t } = useLanguage();
  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center gap-10 py-20 px-10 overflow-hidden"
    >
      <h2 className="text-[40px] font-semibold text-white">
        {t.sections.skills}
      </h2>

      <div className="max-w-5xl w-full flex flex-col gap-12">
        {categories.map((cat) => (
          <div key={cat.label} className="flex flex-col gap-5">
            <h3 className="font-mono text-xs uppercase tracking-widest text-purple-400">
              {cat.label}
            </h3>
            <div className="flex flex-row flex-wrap gap-10 items-end">
              {cat.skills.map((skill, index) => (
                <SkillDataProvider
                  key={index}
                  src={skill.Image}
                  width={skill.width}
                  height={skill.height}
                  index={index}
                  label={skill.skill_name}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
        <video
          className="w-full h-full object-cover"
          preload="none"
          playsInline
          loop
          muted
          autoPlay
          src="/cards-video.webm"
        />
      </div>
    </section>
  );
};

export default Skills;
