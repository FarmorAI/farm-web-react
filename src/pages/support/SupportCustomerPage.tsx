import { useState } from "react";
import PageLayout from "../../components/pagelayout/PageLayout";
import SupportForm from "../../components/support/SupportForm";
import SupportPrivacy from "./SupportPrivacy";

/**
 * 컴포넌트 분리 & 타입 재사용
 * 핸들러 분리 및 리셋 로직 개선
 */
const SupportCustomerPage = () => {
  const [formData, setFormData] = useState({
    inquiryType: "",
    title: "",
    content: "",
    agree: false,
  });

  return (
    <PageLayout title="1:1 문의" activeItem="support">
      <div className="min-h-screen flex flex-col items-rights p-6 ">
        <div className="w-full max-w-5xl bg-white shadow-md rounded-xl p-8">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">궁금한 사항을 남겨주십시오.</h2>
          <p className="text-gray-600 mb-6">문의 내용을 확인하여 답변을 드리겠습니다.</p>
          <SupportPrivacy formData={formData} setFormData={setFormData} />
          <SupportForm formData={formData} setFormData={setFormData} />
        </div>
      </div>
    </PageLayout>
  );
};

export default SupportCustomerPage;