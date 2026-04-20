"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const HeroContent = () => {
  const { t } = useLanguage();
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">{t.hero.badge}</h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span>
            {t.hero.h1}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {t.hero.h1accent}
            </span>
            {t.hero.h2}
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-5 max-w-[600px]"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          variants={slideInFromLeft(1)}
          className="flex flex-row gap-4"
        >
          <a
            href="#about"
            className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px] px-6"
          >
            {t.hero.ctaAbout}
          </a>
          <a
            href="/resume.pdf"
            download
            className="py-2 px-6 text-center text-white cursor-pointer rounded-lg max-w-[200px] border border-[#7042f8] hover:bg-[#7042f820] transition-colors"
          >
            {t.hero.ctaCv}
          </a>
        </motion.div>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        <Image
          src="/mainIconsdark.svg"
          alt="work icons"
          height={650}
          width={650}
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
