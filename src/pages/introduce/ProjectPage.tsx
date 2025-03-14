import React, { useState, useEffect } from "react";

const heroSlides = [
  "/assets/images/introduce/apple1.jpg",
  "/assets/images/introduce/apple2.png",
  "/assets/images/introduce/apple3.jpg",
];

const ProjectPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50 font-['Noto_Sans_KR']">
      {/* Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <img
          src={heroSlides[currentIndex]}
          alt="Hero Slide"
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 flex justify-center items-center text-center px-12 text-white h-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">AI 객체 인식 시스템</h1>
            <p className="text-xl mb-8">
              AI 기술과 데이터 분석을 활용하여 사과 분석 정보를 제공합니다.
            </p>
          </div>
        </div>
      </div>
      {/* 핵심 가치 */}
      <div className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-900">핵심 가치</h2>
        <p className="mt-4 text-lg text-gray-600">객체 인식을 활용한 AI 기술로 실현하는 농업의 새로운 가치</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">
          {[
            { icon: "fa-microscope", title: "정확한 분석", desc: "AI 기술을 활용한 정밀한 사과 상태 분석" },
            { icon: "fa-chart-bar", title: "데이터 기반 진단", desc: "실시간 데이터 수집과 분석으로 사과의 생육 상태를 과학적으로 진단" },
            { icon: "fa-robot", title: "AI 예측 시스템", desc: "AI 기반 예측 시스템으로 사과의 생육 상태 변화를 미리 파악" },
          ].map((item, index) => (
            <div key={index} className="p-8 rounded-lg bg-gray-50 text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-red-100">
                <i className={`fas ${item.icon} text-2xl text-red-500`}></i>
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 스마트팜 기능 */}
      <div className="py-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-gray-900">AI 객체 인식 기능</h2>
        <p className="mt-4 text-lg text-gray-600">AI 기술을 활용한 스마트한 사과 재배 시스템</p>
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-12">
          <img
            src="/assets/images/introduce/사과ai분석.png"
            alt="사과ai분석"
            className="rounded-lg shadow-lg w-2/4 sm:w-1/3 ml-40"
            />
          <div className="w-full sm:w-1/2 text-left">
            <h3 className="text-2xl font-bold mb-4">AI 사과 생육상태 분석</h3>
            <p className="text-gray-600 mb-6">사과의 생육 상태를 분석하여 최적의 재배 환경을 제안합니다.</p>
            <ul className="space-y-4">
              {[
                "생육 상태 분석 및 진단",
                "병해충 조기 감지 시스템",
                "생장 데이터 분석 및 예측",
              ].map((text, i) => (
                <li key={i} className="flex items-center">
                  <i className="fas fa-check text-red-500 mr-3"></i>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* 스마트팜 도입 효과 */}
      <div className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-900">스마트팜 도입 효과</h2>
        <p className="mt-4 text-lg text-gray-600">AI 기반 사과 관리로 생산성과 품질을 혁신적으로 개선</p>
        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto mt-10">
          {[{
            icon: "fa-camera",
            title: "실시간 AI 분석 시스템",
            desc: "사과 사진을 업로드하면 AI가 사과의 성장 상태, 건강 상태, 병해충 여부 등을 실시간으로 분석합니다. 이를 통해 사과의 현재 상태를 정확히 파악하고, 문제점을 조기에 발견하여 빠르게 대응할 수 있습니다."
          }, {
            icon: "fa-chart-line",
            title: "생산성 및 품질 향상",
            desc: "AI의 분석과 개선 방안을 통해 딸기의 생산성을 극대화하고, 품질을 향상시킬 수 있습니다. 이를 통해 농가의 수익을 높이고, 소비자에게 더 나은 품질의 사과를 제공할 수 있습니다."
          }].map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-12 flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <i className={`fas ${item.icon} text-2xl text-red-500`}></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
