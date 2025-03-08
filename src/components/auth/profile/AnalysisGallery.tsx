import React from "react";

const AnalysisGallery: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-medium mb-4">분석 이미지 갤러리</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { status: "양호", date: "2024-01-20" },
          { status: "양호", date: "2024-01-19" },
          { status: "주의", date: "2024-01-18" },
          { status: "양호", date: "2024-01-17" },
        ].map((item, index) => (
          <div key={index} className="relative group">
            <img
              src="https://via.placeholder.com/300"
              className="rounded-lg w-full h-48 object-cover"
              alt="분석 이미지"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
              <p className="text-sm">생육상태: {item.status}</p>
              <p className="text-xs">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisGallery;