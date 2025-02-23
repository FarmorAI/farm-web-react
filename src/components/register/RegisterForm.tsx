import React, { useState } from "react";
import { checkEmail, checkNickname, registerUser } from "../../api/memberApi";
import { useValid } from "../../hook/register/useValid";
import { InputField } from "./InputField";
import { AddressFields } from "./AddressFields";
import { TermsAgreement } from "./TermsAgreement";
import { useNavigate } from "react-router-dom";

export const initState = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  nickname: "",
  birthdate: "",
  phone: "",
  postcode: "",
  address: "",
  extraAddress: "",
  detailAddress: "",
};

export type FormType = typeof initState;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initState);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<
    boolean | null
  >(null);
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(
    null
  );
  const [agreeAll, setAgreeAll] = useState(false);
  const [checkedTerms, setCheckedTerms] = useState({
    age: false,
    terms: false,
    privacy: false,
    marketing: false,
  });

  // 수정된 훅 호출 (추가된 인자 2개 포함)
  const { validMessage, isValid } = useValid(
    formData,
    isEmailChecked,
    isNicknameChecked,
    isEmailAvailable,
    isNicknameAvailable
  );

  const handleEmailCheck = async () => {
    if (!isValid.email) {
      alert("유효한 이메일 형식을 입력해주세요.");
      return;
    }
    setIsLoading(true);
    try {
      const isDuplicate = await checkEmail(formData.email); // API에서 가져온 값 (true: 중복, false: 사용 가능)
      console.log("API 응답 (중복 여부):", isDuplicate);

      // 상태 업데이트 (true면 중복된 이메일, false면 사용 가능)
      setIsEmailAvailable(isDuplicate); // 반전하여 사용 가능 여부 저장
      setIsEmailChecked(false); // 중복 확인 완료 상태 업데이트
    } catch (error) {
      console.error("이메일 확인 중 오류 발생:", error);
      alert("이메일 확인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNicknameCheck = async () => {
    // if (!isValid.nickname) {
    //   alert("유효한 닉네임 형식을 입력해주세요.");
    //   return;
    // }
    setIsLoading(true);
    try {
      const isDuplicate = await checkNickname(formData.nickname); // API에서 가져온 값 (true: 중복, false: 사용 가능)
      console.log("API 응답 (닉네임 중복 여부):", isDuplicate);

      // 상태 업데이트 (true면 중복된 닉네임, false면 사용 가능)
      setIsNicknameAvailable(!isDuplicate);
      setIsNicknameChecked(false); // 중복 확인 완료 상태 업데이트
    } catch (error) {
      console.error("닉네임 확인 중 오류 발생:", error);
      alert("닉네임 확인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "email") setIsEmailChecked(false);
    if (name === "nickname") setIsNicknameChecked(false);
  };

  const handleAgreeAllChange = () => {
    const newAgreeAll = !agreeAll;
    setAgreeAll(newAgreeAll);
    setCheckedTerms({
      age: newAgreeAll,
      terms: newAgreeAll,
      privacy: newAgreeAll,
      marketing: newAgreeAll,
    });
  };

  const handleIndividualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCheckedTerms((prev) => {
      const newCheckedTerms = { ...prev, [name]: checked };
      setAgreeAll(Object.values(newCheckedTerms).every(Boolean));
      return newCheckedTerms;
    });
  };

  // 현재 유효성 검사 결과를 콘솔에 출력하여 확인
  console.log("isValid 상태:", isValid);
  console.log("isEmailChecked 상태:", isEmailChecked);
  console.log("isNicknameChecked 상태:", isNicknameChecked);
  console.log("isEmailAvailable 상태:", isEmailAvailable);
  console.log("isNicknameAvailable 상태:", isNicknameAvailable);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !isValid.email ||
      !isValid.password ||
      !isValid.confirmPassword ||
      !isValid.nickname
    ) {
      alert("입력값을 확인해주세요.");
      return;
    }
    if (isEmailChecked || isNicknameChecked) {
      alert("이메일과 닉네임 중복 확인을 해주세요.");
      return;
    }
    if (!isEmailAvailable || !isNicknameAvailable) {
      alert("사용 가능한 이메일과 닉네임을 선택해주세요.");
      return;
    }
    if (!checkedTerms.age || !checkedTerms.terms || !checkedTerms.privacy) {
      alert("필수 약관에 동의해야 회원가입이 가능합니다.");
      return;
    }

    setIsLoading(true);
    try {
      const userData = {
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname,
        phone: formData.phone,
        name: formData.name,
        address:
          `${formData.address} ${formData.extraAddress} ${formData.detailAddress}`.trim(),
        birthDate: formData.birthdate,
      };
      const success = await registerUser(userData);
      if (success) {
        alert("회원가입이 완료되었습니다.");
        setFormData(initState);
        navigate("/auth/login");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 🚀 엔터 입력 방지
    }
  };

  return (
    <div className="bg-gray min-h-screen">
      <div className="max-w-8xl mx-auto px-4 py-12">
        <div className="max-w-md mx-auto rounded-lg shadow-xl">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-center mb-8">회원가입</h1>
            <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
              <div className="space-y-6">
                <InputField
                  label="이메일"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="이메일 형식으로 입력해주세요."
                  disabled={isLoading}
                  message={validMessage.emailMessage}
                  isValid={isValid.email}
                  isAvailable={isEmailAvailable}
                  onButtonClick={handleEmailCheck}
                  buttonText="중복확인"
                />
                <InputField
                  label="비밀번호"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="8~16자 영문, 숫자, 특수문자 조합"
                  disabled={isLoading}
                  message={validMessage.passwordMessage}
                />
                <InputField
                  label="비밀번호 확인"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="비밀번호 재입력"
                  disabled={isLoading}
                  message={validMessage.confirmPasswordMessage}
                />
                <InputField
                  label="이름"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="이름을 입력해주세요."
                  disabled={isLoading}
                />
                <InputField
                  label="닉네임"
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  placeholder="닉네임을 입력해주세요."
                  disabled={isLoading}
                  message={validMessage.nicknameMessage}
                  isValid={isValid.nickname}
                  isAvailable={isNicknameAvailable}
                  onButtonClick={handleNicknameCheck}
                  buttonText="중복확인"
                />
                <InputField
                  label="생년월일"
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                  placeholder=""
                  disabled={isLoading}
                />
                <InputField
                  label="휴대폰 번호"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="'-' 없이 입력"
                  disabled={isLoading}
                />
                <AddressFields
                  formData={formData}
                  setFormData={setFormData}
                  isLoading={isLoading}
                />
                <TermsAgreement
                  agreeAll={agreeAll}
                  checkedTerms={checkedTerms}
                  handleAgreeAllChange={handleAgreeAllChange}
                  handleIndividualChange={handleIndividualChange}
                  isLoading={isLoading}
                />
                <button
                  type="submit"
                  className="!rounded-button w-full px-4 py-3 bg-custom text-white text-lg font-medium hover:bg-custom/90 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? "처리중..." : "회원가입"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
