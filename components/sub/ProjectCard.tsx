import Image from "next/image";
import React from "react";

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
  desctitle: string
}

const ProjectCard = ({ company, src, title, soltitle, description, soldescription, techtitle, techdescription, outtitle, outdescription, desctitle }: Props) => {
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
        <h2 className="mt-2 text-xl font-bold text-white">{desctitle}</h2>
        <p className="mt-2 text-gray-300">{description}</p>
        <h2 className="mt-2 text-xl font-bold text-white">{soltitle}</h2>
        <p className="mt-2 text-gray-300">{soldescription}</p>
        <h2 className="mt-2 text-xl font-bold text-white">{outtitle}</h2>
        <p className="mt-1 text-l text-purple-300">{outdescription}</p>
        <h3 className="mt-2 text-l font-semibold text-white">{techtitle}</h3>
        <p className="mt-2 text-gray-300">{techdescription}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
