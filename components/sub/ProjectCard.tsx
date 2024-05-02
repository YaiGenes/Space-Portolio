import Image from "next/image";
import React from "react";

interface Props {
  company: string;
  src: string;
  title: string;
  description: string;
  techtitle: string;
  outtitle: string;
  techdescription: string;
  outdescription: string;
}

const ProjectCard = ({ company, src, title, description, techtitle, techdescription, outtitle, outdescription }: Props) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] projectCard">
      <Image
        src={src}
        alt={title}
        width={1000}
        height={1000}
        className="w-full object-contain"
      />

      <div className="relative p-4">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <h1 className="text-xl font-semibold text-white">{company}</h1>
        <p className="mt-2 text-gray-300">{description}</p>
        <h2 className="mt-2 text-xl font-bold text-white">{outtitle}</h2>
        <p className="mt-1 text-l text-purple-300">{outdescription}</p>
        <h3 className="mt-2 text-l font-semibold text-white">{techtitle}</h3>
        <p className="mt-2 text-gray-300">{techdescription}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
