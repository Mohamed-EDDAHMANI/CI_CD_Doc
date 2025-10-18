import React from "react";

interface KeywordData {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  color: string;
  fullContent?: {
    introduction: string;
    keyPoints: string[];
    useCases: string[];
    bestPractices: string[];
  };
}

interface DetailViewProps {
  data: KeywordData;
  onBack: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ data, onBack }) => {
  if (!data.fullContent) {
    return null;
  }

  const content = data.fullContent;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
        >
          <span className="text-2xl transform group-hover:-translate-x-1 transition-transform">←</span>
          <span>Retour au Dashboard</span>
        </button>

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${data.gradient} opacity-5`}></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className={`text-7xl bg-gradient-to-br ${data.gradient} w-32 h-32 rounded-3xl flex items-center justify-center text-white shadow-2xl`}>
                {data.icon}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-3">
                  {data.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-600">
                  {data.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <span className="text-4xl">📖</span>
            Introduction
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {content.introduction}
          </p>
        </div>

        {/* Key Points Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="text-4xl">🔑</span>
            Points Clés
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {content.keyPoints.map((point, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-xl border-l-4 hover:shadow-md transition-all hover:translate-x-1" style={{borderColor: `rgb(59 130 246)`}}>
                <div className="flex items-start gap-3">
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${data.gradient} font-bold text-xl mt-1 flex-shrink-0`}>
                    {index + 1}.
                  </span>
                  <p className="text-gray-700 leading-relaxed">{point}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="text-4xl">💡</span>
            Cas d'Usage
          </h2>
          <div className="space-y-4">
            {content.useCases.map((useCase, index) => (
              <div key={index} className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${data.gradient} flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  {index + 1}
                </div>
                <p className="text-gray-700 leading-relaxed pt-2.5 text-base">{useCase}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Best Practices Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="text-4xl">✨</span>
            Meilleures Pratiques
          </h2>
          <div className="space-y-3">
            {content.bestPractices.map((practice, index) => (
              <div key={index} className="flex items-start gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${data.gradient} text-2xl font-bold flex-shrink-0`}>
                  ✓
                </span>
                <p className="text-gray-700 leading-relaxed pt-1">{practice}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={onBack}
            className={`bg-gradient-to-r ${data.gradient} text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
          >
            ← Retour au Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
