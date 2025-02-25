import { useState } from "react";
import PageLayout from "../../components/pagelayout/PageLayout";

const SupportCustomerPage = () => {
  const [formData, setFormData] = useState({
    inquiryType: "",
    subInquiryType: "",
    title: "",
    content: "",
    agree: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("개인정보 수집 및 이용에 동의해야 합니다.");
      return;
    }
    console.log("Form submitted:", formData);
    alert("문의가 성공적으로 제출되었습니다.");
  };

  return (
    <PageLayout title="1:1 문의" activeItem="support">
      <div>
    <div className="min-h-screen flex flex-col items-rights p-6 ">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-xl p-8">
        <div className="flex items-center mb-6">
        </div>
        <h2 className="text-xl font-semibold text-blue-600 mb-2">궁금한 사항을 남겨주십시오.</h2>
        <p className="text-gray-600 mb-6">문의 내용을 확인하여 답변을 드리겠습니다.</p>
        
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">개인정보 수집 및 이용 목적</h3>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>문의 내용 확인 및 답변 처리</li>
            <li>서비스 품질 개선 및 고객 만족도 조사</li>
            <li>새로운 서비스 및 이벤트 안내</li>
          </ul>
          <p className="mt-3 text-sm text-gray-500">수집된 개인정보는 문의 처리 완료 후 3개월간 보관되며, 이후 안전하게 파기됩니다.</p>
          <div className="flex items-start mt-4">
            <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
            <label className="ml-2 text-sm text-gray-700">개인정보 수집 및 이용에 동의합니다</label>
          </div>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">문의 유형 <span className="text-red-500">*</span></label>
            <select name="inquiryType" required value={formData.inquiryType} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option value="">선택해주세요</option>
              <option value="general">일반 문의</option>
              <option value="service">서비스 이용 문의</option>
              <option value="support">기술 지원</option>
              <option value="partnership">제휴 문의</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">제목 <span className="text-red-500">*</span></label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="제목을 입력해주세요" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">내용 <span className="text-red-500">*</span></label>
            <textarea name="content" required rows={10} value={formData.content} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="문의 내용을 입력해주세요"></textarea>
          </div>
          <div className="flex justify-center space-x-4">
            <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">등록</button>
            <button type="reset" className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300" onClick={() => setFormData({ inquiryType: "", subInquiryType: "", title: "", content: "", agree: false })}>취소</button>
          </div>
        </form>
      </div>
    </div>
    </div>
    </PageLayout>
  );
};

export default SupportCustomerPage;
