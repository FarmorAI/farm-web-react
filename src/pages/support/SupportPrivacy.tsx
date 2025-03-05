import React from 'react'
import { PrivacyProps } from '../../model/support'

const SupportPrivacy: React.FC<PrivacyProps> = ({ formData, setFormData }) => {
   // 동의 체크 상태 업데이트 함수
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, agree: e.target.checked }));
   };

   return (
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
         <h3 className="text-lg font-medium text-gray-900 mb-2">개인정보 수집 및 이용 목적</h3>
         <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>문의 내용 확인 및 답변 처리</li>
            <li>서비스 품질 개선 및 고객 만족도 조사</li>
            <li>새로운 서비스 및 이벤트 안내</li>
         </ul>
         <p className="mt-3 text-sm text-gray-500">
            수집된 개인정보는 문의 처리 완료 후 3개월간 보관되며, 이후 안전하게 파기됩니다.
         </p>
         <div className="flex items-start mt-4">
            <input
               type="checkbox"
               name="agree"
               checked={formData.agree}
               onChange={handleChange}
               className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">개인정보 수집 및 이용에 동의합니다</label>
         </div>
      </div>
   )
}

export default SupportPrivacy