import React from "react";

const MyBoards: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 card-hover">
      <h2 className="text-lg font-medium mb-4">내 게시글</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span>딸기 재배 팁 공유합니다</span>
          <span className="text-sm text-gray-500">2024-01-15</span>
        </div>
        <div className="flex justify-between items-center">
          <span>수확 시기 질문드립니다</span>
          <span className="text-sm text-gray-500">2024-01-10</span>
        </div>
        <div className="flex justify-between items-center">
          <span>병해충 관련 문의</span>
          <span className="text-sm text-gray-500">2024-01-05</span>
        </div>
      </div>
    </div>
  );
};

export default MyBoards;
