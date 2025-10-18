import React from "react";
import type { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section className="my-8 p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">{title}</h2>
      {children}
    </section>
  );
};

export default Section;
