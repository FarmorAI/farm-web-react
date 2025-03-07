import React from "react";

interface TermsAgreementProps {
  agreeAll: boolean;
  checkedTerms: {
    age: boolean;
    terms: boolean;
    privacy: boolean;
    marketing: boolean;
  };
  handleAgreeAllChange: () => void;
  handleIndividualChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

export const TermsAgreement: React.FC<TermsAgreementProps> = ({
  agreeAll,
  checkedTerms,
  handleAgreeAllChange,
  handleIndividualChange,
  isLoading,
}) => (
  <div className="space-y-4">
    <div className="flex items-center">
      <input
        type="checkbox"
        id="all"
        checked={agreeAll}
        onChange={handleAgreeAllChange}
        className="w-4 h-4 text-custom border-gray-300 rounded focus:ring-custom"
        disabled={isLoading}
      />
      <label htmlFor="all" className="ml-2 text-sm font-medium text-gray-700">전체동의</label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        id="age"
        name="age"
        checked={checkedTerms.age}
        onChange={handleIndividualChange}
        className="w-4 h-4 text-custom border-gray-300 rounded focus:ring-custom"
        disabled={isLoading}
      />
      <label htmlFor="age" className="ml-2 text-sm text-gray-700">만 14세 이상입니다 (필수)</label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        id="terms"
        name="terms"
        checked={checkedTerms.terms}
        onChange={handleIndividualChange}
        className="w-4 h-4 text-custom border-gray-300 rounded focus:ring-custom"
        disabled={isLoading}
      />
      <label htmlFor="terms" className="ml-2 text-sm text-gray-700">서비스 이용약관 동의 (필수)</label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        id="privacy"
        name="privacy"
        checked={checkedTerms.privacy}
        onChange={handleIndividualChange}
        className="w-4 h-4 text-custom border-gray-300 rounded focus:ring-custom"
        disabled={isLoading}
      />
      <label htmlFor="privacy" className="ml-2 text-sm text-gray-700">개인정보 수집 및 이용 동의 (필수)</label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        id="marketing"
        name="marketing"
        checked={checkedTerms.marketing}
        onChange={handleIndividualChange}
        className="w-4 h-4 text-custom border-gray-300 rounded focus:ring-custom"
        disabled={isLoading}
      />
      <label htmlFor="marketing" className="ml-2 text-sm text-gray-700">마케팅 활용 동의 및 광고 수신 동의 (선택)</label>
    </div>
  </div>
);
