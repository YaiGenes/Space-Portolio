import React from "react";
import { RxGithubLogo, RxLinkedinLogo } from "react-icons/rx";

const Footer = () => {
  return (
    <footer className="w-full border-t border-[#2A0E61]/50 bg-transparent text-gray-400 py-8 px-6 md:px-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-display font-semibold text-white text-sm">
            Yaiser Avila Rodríguez
          </span>
          <span className="text-xs text-gray-500">Site Reliability Engineer</span>
        </div>

        <nav className="flex items-center gap-6 text-sm">
          <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
          <a href="#experience" className="hover:text-purple-400 transition-colors">Experience</a>
          <a href="#projects" className="hover:text-purple-400 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/yaigenes"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-purple-400 transition-colors"
          >
            <RxLinkedinLogo size={18} />
          </a>
          <a
            href="https://github.com/YaiGenes"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-gray-200 transition-colors"
          >
            <RxGithubLogo size={18} />
          </a>
          <a
            href="mailto:yaigenes@infrabio.dev"
            className="font-mono text-xs hover:text-purple-400 transition-colors"
          >
            yaigenes@infrabio.dev
          </a>
        </div>
      </div>

      <p className="text-center text-xs text-gray-600 mt-6">
        &copy; Yaiser Avila Rodríguez 2026
      </p>
    </footer>
  );
};

export default Footer;
