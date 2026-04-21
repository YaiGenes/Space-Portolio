import Image from "next/image";
import React from "react";
import ProjectCardHeader, { type ProjectVariant } from "./ProjectCardHeader";

interface Props {
  company: string;
  src: string;
  title: string;
  soltitle: string;
  description: string;
  soldescription: string;
  techtitle: string;
  outtitle: string;
  techdescription: string;
  outdescription: string;
  desctitle: string;
  impactStat?: string;
  impactLabel?: string;
  githubUrl?: string;
  demoUrl?: string;
  variant?: ProjectVariant;
}

const ProjectCard = ({
  company,
  src,
  title,
  soltitle,
  description,
  soldescription,
  techtitle,
  techdescription,
  outtitle,
  outdescription,
  desctitle,
  impactStat,
  impactLabel,
  githubUrl,
  demoUrl,
  variant,
}: Props) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] projectCard">
      {variant ? (
        <ProjectCardHeader variant={variant} impactStat={impactStat} impactLabel={impactLabel} />
      ) : (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={src}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="relative p-5">
        <p className="text-xs font-mono text-purple-400 mb-1">{company}</p>
        <h3 className="text-xl font-semibold text-white leading-snug">{title}</h3>

        {!variant && impactStat && impactLabel && (
          <div className="mt-3 inline-flex flex-col items-center justify-center rounded-lg border border-purple-500/40 bg-purple-950/30 px-4 py-2">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              {impactStat}
            </span>
            <span className="font-mono text-xs text-gray-400 uppercase tracking-wider mt-0.5">
              {impactLabel}
            </span>
          </div>
        )}

        <h4 className="mt-4 text-sm font-semibold text-gray-200">{desctitle}</h4>
        <p className="mt-1 text-sm text-gray-400 leading-relaxed">{description}</p>

        <h4 className="mt-3 text-sm font-semibold text-gray-200">{soltitle}</h4>
        <p className="mt-1 text-sm text-gray-400 leading-relaxed">{soldescription}</p>

        <h4 className="mt-3 text-sm font-semibold text-gray-200">{outtitle}</h4>
        <p className="mt-1 text-sm text-purple-300 leading-relaxed">{outdescription}</p>

        <h4 className="mt-4 text-xs font-mono text-gray-500 uppercase tracking-wider">{techtitle}</h4>
        <p className="mt-1 text-xs text-gray-400">{techdescription}</p>

        {(githubUrl || demoUrl) && (
          <div className="mt-4 flex gap-3">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-600 text-sm text-gray-300 hover:border-purple-400 hover:text-purple-400 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </a>
            )}
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-600 text-sm text-gray-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                </svg>
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
