"use client";

import React, { useState } from "react";
import ProjectCard from "../sub/ProjectCard";
import { useLanguage } from "@/context/LanguageContext";
import { projects } from "@/constants/content";

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const { t, language } = useLanguage();
  const data = projects[language];
  const visible = showAll ? data : data.slice(0, 3);

  return (
    <div className="flex flex-col items-center justify-center py-20" id="projects">
      <h2 className="text-[40px] font-semibold text-white py-10">
        {t.sections.projects.title}{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          {t.sections.projects.accent}
        </span>
      </h2>

      <div className="h-full w-full flex flex-col md:flex-wrap md:flex-row gap-10 px-10">
        {visible.map((p, i) => (
          <ProjectCard
            key={i}
            company={p.company}
            src={p.src}
            title={p.title}
            desctitle={t.projectLabels.problem}
            description={p.description}
            soltitle={t.projectLabels.solution}
            soldescription={p.soldescription}
            techtitle={t.projectLabels.technologies}
            techdescription={p.techdescription}
            outtitle={t.projectLabels.outcome}
            outdescription={p.outdescription}
            impactStat={p.impactStat}
            impactLabel={p.impactLabel}
            githubUrl={p.githubUrl}
          />
        ))}
      </div>

      <button
        onClick={() => setShowAll(!showAll)}
        className="mt-12 px-8 py-3 rounded-full border border-[#7042f861] text-gray-300 hover:text-purple-400 hover:border-purple-500/50 transition-colors text-sm font-mono"
      >
        {showAll ? t.projectLabels.showLess : t.projectLabels.showAll}
      </button>
    </div>
  );
};

export default Projects;
