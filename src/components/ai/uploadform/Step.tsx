import { CloudUpload, Search, BarChart, CheckCircle } from "lucide-react";

const steps = [
  { icon: <CloudUpload size={40} className="text-blue-500 mb-2" />, title: "단계 1", desc: "파일을 업로드하여 AI 분석을 시작하세요." },
  { icon: <Search size={40} className="text-blue-500 mb-2" />, title: "단계 2", desc: "AI가 이미지를 분석하여 품질과 상태를 평가합니다." },
  { icon: <BarChart size={40} className="text-blue-500 mb-2" />, title: "단계 3", desc: "성숙도, 건강 상태 및 최적의 수확 시기를 예측합니다." },
  { icon: <CheckCircle size={40} className="text-blue-500 mb-2" />, title: "단계 4", desc: "최종 분석 결과를 제공하고 최적의 관리 방법을 제안합니다." }
];

const ProcessingSteps: React.FC = () => {
  return (
    <div className="mt-8 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          {step.icon}
          <h3 className="font-semibold text-lg">{step.title}</h3>
          <p className="text-gray-600">{step.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default ProcessingSteps;
