const InquiryHistory = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 card-hover">
      <h2 className="text-lg font-medium mb-4">문의 내역</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span>생육환경 설정 문의</span>
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            답변완료
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>시스템 오류 문의</span>
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
            검토중
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>분석 결과 관련 문의</span>
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
            대기중
          </span>
        </div>
      </div>
    </div>
  );
};

export default InquiryHistory;
