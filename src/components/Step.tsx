import React from "react";

interface StepProps {
  number: number;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ number, title, description }) => {
  return (
    <div className="border-l-4 border-blue-500 pl-4 mb-6">
      <h3 className="text-xl font-bold">
        Step {number}: {title}
      </h3>
      <p className="text-gray-700 mt-1">{description}</p>
    </div>
  );
};

export default Step;
