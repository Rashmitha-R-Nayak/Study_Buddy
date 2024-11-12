import React from "react";

interface TeamMemberProps {
  name: string;
  role: string;
  imageSrc: string;
}

export default function TeamMember({ name, role, imageSrc }: TeamMemberProps) {
  return (
    <div className="flex flex-col items-center bg-gray-800 text-zinc-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-6 w-full sm:w-80 md:w-72 lg:w-56">
      <img
        src={imageSrc}
        alt={`${name}`}
        className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-blue-500"
      />
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-sm font-light">{role}</p>
    </div>
  );
}
