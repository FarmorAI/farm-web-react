import { useState } from "react";
import SubscriptionModal from "./SubscriptionModal"
import { useGetSubsInfoQuery } from "../../../api/authApi";

const SubscriptionCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: paymentResult = null } = useGetSubsInfoQuery();

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 card-hover">
        <h2 className="text-lg font-medium mb-4">구독 정보</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">구독 등급</span>
            <span className="text-lg font-medium text-green-600">{paymentResult?.planName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">구독 시작일</span>
            <span className="text-lg font-medium">{paymentResult?.createdAt.split(" ")[0]}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">남은 일수</span>
            <span className="text-lg font-medium text-green-600">{paymentResult?.daysDiff}</span>
          </div>
          <div className="flex justify-end">
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              구독 관리
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && <SubscriptionModal setIsModalOpen={setIsModalOpen} paymentResult={paymentResult} />}
    </>
  );
};

export default SubscriptionCard;
