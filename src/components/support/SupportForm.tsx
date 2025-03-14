import React from 'react'
import { InquiryFormProps } from '../../model/support'
import { insertSupport } from '../../api/supportApi';
import { useNavigate } from 'react-router-dom';

// model > support 디렉토리에 타입 interface 생성
const SupportForm: React.FC<InquiryFormProps> = ({ formData, setFormData }) => {
   const navigate = useNavigate();

   // e는 이벤트 객체로 HTMLInputElement, HTMLTextAreaElement, HTMLSelectElement 
   // 즉, <input> <textarea> <select> 등에서 이벤트가 발생하면 name, value, type을 가져옴
   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }));
   };

   // 등록버튼 클릭 시, 정보 동의가 false이면, 알림창 출력
   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.agree) {
         alert("개인정보 수집 및 이용에 동의해야 합니다.")
         return;
      }

      try {
         insertSupport({
            category: formData.inquiryType,
            title: formData.title,
            content: formData.content
         })
         alert("문의가 성공적으로 제출되었습니다.");
         navigate('/support/list');
      } catch(error) {
         console.error("Error inserting inquiry:", error);
      }
   }

   // 취소 버튼 클릭 시, FormData 초기화
   const resetForm = () => {
      setFormData({ inquiryType: "", title: "", content: "", agree: false })
   }

   return (
      <form className="space-y-6" onSubmit={handleSubmit}>
         <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
               문의 유형 <span className="text-red-500">*</span>
            </label>
            <select
               name="inquiryType"
               required
               value={formData.inquiryType}
               onChange={handleChange}
               className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
               <option value="">선택해주세요</option>
               <option value="GENERAL">일반 문의</option>
               <option value="BILLING">결제 문의</option>
               <option value="TECHNICAL">서비스 이용 문의</option>
               <option value="OTHER">기타</option>
            </select>
         </div>
         <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
               제목 <span className="text-red-500">*</span>
            </label>
            <input
               type="text"
               name="title"
               required
               value={formData.title}
               onChange={handleChange}
               className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
               placeholder="제목을 입력해주세요"
            />
         </div>
         <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
               내용 <span className="text-red-500">*</span>
            </label>
            <textarea
               name="content"
               required
               rows={10}
               value={formData.content}
               onChange={handleChange}
               className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
               placeholder="문의 내용을 입력해주세요"
            />
         </div>
         <div className="flex justify-center space-x-4">
            <button
               type="submit"
               className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
               등록
            </button>
            <button
               type="reset"
               className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300"
               onClick={resetForm}
            >
               취소
            </button>
         </div>
      </form>
   )
}

export default SupportForm