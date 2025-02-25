import React, { useEffect } from "react";
import { FormType } from "./RegisterForm"; // FormType 임포트

declare global {
  interface Window {
    daum: {
      Postcode: new (options: {
        oncomplete: (data: {
          zonecode: string;
          roadAddress: string;
          jibunAddress: string;
          bname: string;
          buildingName: string;
          userSelectedType: string;
        }) => void;
      }) => { open: () => void };
    };
  }
}

interface AddressFieldsProps {
  formData: FormType; // FormType으로 타입 지정
  setFormData: React.Dispatch<React.SetStateAction<FormType>>; // FormType으로 타입 지정
  isLoading: boolean;
}

export const AddressFields: React.FC<AddressFieldsProps> = ({ formData, setFormData, isLoading }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const openPostcodePopup = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        const addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
        const extraAddr = data.bname && /[동|로|가]$/g.test(data.bname)
          ? `(${data.bname}${data.buildingName ? ', ' + data.buildingName : ''})`
          : '';
        setFormData((prev: FormType) => ({
          ...prev,
          postcode: data.zonecode,
          address: addr,
          extraAddress: extraAddr,
        }));
      },
    }).open();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormType) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="address-input-group">
      <label htmlFor="postcode" className="d-flex me-3 mb-2">주소</label>
      <div className="flex gap-2">
        <input
          className="flex-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-custom focus:border-custom"
          id="postcode"
          placeholder="우편 번호"
          value={formData.postcode}
          readOnly
        />
        <button
          type="button"
          className="!rounded-button px-4 py-2 bg-custom text-white hover:bg-custom/90 disabled:opacity-50"
          onClick={openPostcodePopup}
          disabled={isLoading}
        >
          우편번호 찾기
        </button>
      </div>
      <input
        className="form-control mb-2 mt-2"
        id="address"
        placeholder="도로명 주소"
        value={formData.address}
        readOnly
      />
      <input
        className="form-control mb-2 mt-2"
        id="extraAddress"
        placeholder="참고항목"
        value={formData.extraAddress}
        readOnly
      />
      <input
        className="form-control mb-2 mt-2"
        id="detailAddress"
        name="detailAddress"
        placeholder="상세 주소"
        value={formData.detailAddress}
        onChange={handleChange}
        disabled={isLoading}
      />
    </div>
  );
};