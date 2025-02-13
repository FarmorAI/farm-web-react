import React, { useEffect, useState } from "react";

// FormType 정의

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
const initState = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  nickname: "",
  birthdate: "",
  phone: "",
  postcode: '',
  address: '',
  extraAddress: '',
  detailAddress: '',
};

type FormType = typeof initState;

const useValid = (form: FormType, isEmailChecked: boolean, isNicknameChecked: boolean) => {
  const [validMessage, setValidMessage] = useState({
    emailMessage: "",
    passwordMessage: "",
    confirmPasswordMessage: "",
    nicknameMessage: "",
  });

  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    nickname: false,
  });

  useEffect(() => {
    if (form.email === '') {
      setValidMessage((prev) => ({ ...prev, emailMessage: '' }));//입력 전에는 메세지 표시 안함
      setIsValid((prev) => ({ ...prev, email: false }));
      return;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(form.email)) {
      setValidMessage((prev) => ({ ...prev, emailMessage: "올바른 이메일 형식이 아닙니다." }));
      setIsValid((prev) => ({ ...prev, email: false }));
    } else {
      setValidMessage((prev) => ({
        ...prev,
        emailMessage: isEmailChecked ? "" : "중복 확인 해주세요.",
      }));
      setIsValid((prev) => ({ ...prev, email: true }));
    }
  }, [form.email, isEmailChecked]);

  useEffect(() => {
    if (form.password === "") {
      setValidMessage((prev) => ({ ...prev, passwordMessage: "" }));
      setIsValid((prev) => ({ ...prev, password: false }));
      return;
    }
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,15}$/;
    if (!regex.test(form.password)) {
      setValidMessage((prev) => ({ ...prev, passwordMessage: "숫자, 영문, 특수문자를 포함하여 최소 8자를 입력해주세요" }));
      setIsValid((prev) => ({ ...prev, password: false }));
    } else {
      setValidMessage((prev) => ({ ...prev, passwordMessage: "" }));
      setIsValid((prev) => ({ ...prev, password: true }));
    }
  }, [form.password]);

  useEffect(() => {
    if (form.confirmPassword === "") {
      setValidMessage((prev) => ({ ...prev, confirmPasswordMessage: "" }));
      setIsValid((prev) => ({ ...prev, confirmPassword: false }));
      return;
    }

    if (form.password !== form.confirmPassword) {
      setValidMessage((prev) => ({ ...prev, confirmPasswordMessage: "비밀번호가 일치하지 않습니다." }));
      setIsValid((prev) => ({ ...prev, confirmPasswordMessage: false }));
    } else {
      setValidMessage((prev) => ({ ...prev, confirmPasswordMessage: "" }));
      setIsValid((prev) => ({ ...prev, confirmPasswordMessage: true }));
    }
  }, [form.password, form.confirmPassword]);

  useEffect(() => {
    if (form.nickname === '') {
      setValidMessage((prev) => ({ ...prev, nicknameMessage: '' })); // 입력 전에는 메시지 표시 안 함
      setIsValid((prev) => ({ ...prev, nickname: false }));
      return;
    }
  
    // 닉네임 형식 유효성 검사 (예: 최소 2자 이상, 특수문자 금지)
    const regex = /^[a-zA-Z0-9가-힣]{2,10}$/;
    if (!regex.test(form.nickname)) {
      setValidMessage((prev) => ({ ...prev, nicknameMessage: "닉네임은 2~10자의 한글, 영문, 숫자로만 이루어질 수 있습니다." }));
      setIsValid((prev) => ({ ...prev, nickname: false }));
    } else {
      setValidMessage((prev) => ({
        ...prev,
        nicknameMessage: isNicknameChecked ? "" : "중복 확인 해주세요.",
      }));
      setIsValid((prev) => ({ ...prev, nickname: true }));
    }
  }, [form.nickname, isNicknameChecked]);
  
  return { validMessage, isValid };
}
const Register: React.FC = () => {
  const [formData, setFormData] = useState(initState);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const { validMessage, isValid } = useValid(formData, isEmailChecked, isNicknameChecked);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<boolean | null>(null);
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(
    null
  );

  //체크박스 상태 관리
  const [agreeAll, setAgreeAll] = useState(false);
  const [checkedTerms, setCheckedTerms] = useState({
    age: false,
    terms: false,
    privacy: false,
    marketing: false
  })


  const handleNicknameCheck = () => {
    if (formData.nickname === "test") {
      setIsNicknameAvailable(false);
    } else {
      setIsNicknameAvailable(true);
    }
    setIsNicknameChecked(true);
  };

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "email") setIsEmailAvailable(null);//이메일 입력값이 변경되면 중복 확인 결과 초기화
  };

  //이메일 중복확인
  const handleEmailCheck = () => {
    if (isValid.email) {
      setIsEmailChecked(true); // 나중에 실제 API로 중복 확인 로직 작성
    } else {
      alert("유효한 이메일 형식을 입력해주세요."); // 이메일 형식이 맞지 않으면 중복 확인 불가
    }
  };
  
  
  ////////////////////// 다음주소 찾기 API ///////////////////////
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

        setFormData((prev) => ({
          ...prev,
          postcode: data.zonecode,
          roadAddress: addr,
          extraAddress: extraAddr,
        }));
      },
    }).open();
  };
  ////////////////////// 다음주소 찾기 API ///////////////////////


  //전체 동의 체크박스 핸들러
  const handleAgreeAllChange = () => {
    const newAgreeAll = !agreeAll;
    setAgreeAll(newAgreeAll);
    setCheckedTerms({
      age: newAgreeAll,
      terms: newAgreeAll,
      privacy: newAgreeAll,
      marketing: newAgreeAll
    })
  }

  // 개별 체크박스 핸들러
  const handleIndividualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCheckedTerms((prev) => {
      const newCheckedTerms = {
        ...prev,
        [name]: checked,
      };
      //전체 동의 상태 업데이트
      const allChecked = Object.values(newCheckedTerms).every(Boolean);
      setAgreeAll(allChecked);
      return newCheckedTerms;
    })
  }


  //회원가입 작동 로직
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 회원가입 로직
    if (!isValid.email || !isValid.password || !isValid.confirmPassword || !isValid.nickname) {
      alert("입력값을 확인해주세요.");
      return;
    }
    if (isValid.password !== isValid.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
      return;
    }
    if (!checkedTerms.age || !checkedTerms.terms || !checkedTerms.privacy) {
      alert("필수 약관에 동의해야 회원가입이 가능합니다.");
      return;
    }
    console.log("회원가입 성공", formData);
  };


  return (
    <div className="bg-gray min-h-screen">
      <div className="max-w-8xl mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-center mb-8">회원가입</h1>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* 이메일 입력 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이메일
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                      className="flex-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-custom focus:border-custom"
                      placeholder="이메일 형식으로 입력해주세요."
                    />
                    <button
                      type="button"
                      onClick={handleEmailCheck}
                      className="!rounded-button px-4 py-2 bg-custom text-white hover:bg-custom/90"
                    >
                      중복확인
                    </button>
                  </div>
                  {/* 유효성 검사 메시지 */}
                  {validMessage.emailMessage && (
                    <p className={`text-sm mt-1 ${isValid.email ? "text-yellow-500" : "text-red-500"}`}>
                      {validMessage.emailMessage}
                    </p>
                  )}
                  {isEmailAvailable !== null && (
                    <p className={`text-sm mt-1 ${isEmailAvailable ? "text-green-500" : "text-red-500"}`}>
                      {isEmailAvailable
                        ? "사용 가능한 이메일입니다."
                        : "이미 사용 중인 이메일입니다."}
                    </p>
                  )}
                </div>

                {/* 비밀번호 입력 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    비밀번호
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-custom focus:border-custom "
                    placeholder="8~16자 영문, 숫자, 특수문자 조합"
                  />
                  {validMessage.passwordMessage && (
                    <p className="text-red-500 text-sm mt-1">{validMessage.passwordMessage}</p>
                  )}
                </div>
                {/* 비밀번호 재입력 */}
                <div>
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-custom focus:border-custom "
                    placeholder="비밀번호 재입력"
                  />
                  {validMessage.confirmPasswordMessage && (
                    <p className="text-red-500 text-sm mt-1">{validMessage.confirmPasswordMessage}</p>
                  )}
                </div>

                {/* 이름 입력 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이름
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-custom focus:border-custom"
                    placeholder="이름을 입력해주세요."
                  />
                </div>

                {/* 닉네임 입력 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    닉네임
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="nickname"
                      onChange={handleChange}
                      className="flex-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-custom focus:border-custom"
                      placeholder="닉네임을 입력해주세요."
                    />
                    <button
                      type="button"
                      onClick={handleNicknameCheck}
                      className="!rounded-button px-4 py-2 bg-custom text-white hover:bg-custom/90"
                    >
                      중복확인
                    </button>
                  </div>
                  {validMessage.nicknameMessage && (
                    <p className="text-yellow-500 text-sm mt-1">{validMessage.nicknameMessage}</p>
                  )}
                  {isNicknameAvailable !== null && (
                    <p className={`text-sm mt-1 ${isNicknameAvailable ? "text-green-500" : "text-red-500"}`}>
                      {isNicknameAvailable ? "사용 가능한 닉네임입니다." : "이미 사용 중인 닉네임입니다."}
                    </p>
                  )}
                </div>

                {/* 생년월일 입력 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    생년월일
                  </label>
                  <input
                    type="date"
                    name="birthdate"
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-custom focus:border-custom"
                  />
                </div>

                {/* 휴대폰 번호 입력 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    휴대폰 번호
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      name="phone"
                      onChange={handleChange}
                      className="flex-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-custom focus:border-custom"
                      placeholder="'-' 없이 입력"
                    />
                    <button
                      type="button"
                      className="!rounded-button px-4 py-2 bg-custom text-white hover:bg-custom/90"
                    >
                      인증하기
                    </button>
                  </div>
                </div>

                {/* 주소 입력 */}
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
                    <button type="button" className="!rounded-button px-4 py-2 bg-custom text-white hover:bg-custom/90" onClick={openPostcodePopup}>우편번호 찾기</button>
                  </div>
                </div>
                <input
                  className="form-control mb-2 mt-2"
                  id="roadAddress"
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
                />

                {/* 약관 동의 */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="all"
                      checked={agreeAll}
                      onChange={handleAgreeAllChange}
                      className="w-4 h-4 text-custom border-gray-300 rounded focus:ring-custom"
                    />
                    <label
                      htmlFor="all"
                      className="ml-2 text-sm font-medium text-gray-700"
                    >
                      전체동의
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="age"
                      name="age"
                      checked={checkedTerms.age}
                      onChange={handleIndividualChange}
                      className="w-4 h-4 text-custom border-gray-300 rounded focus:ring-custom"
                    />
                    <label htmlFor="age" className="ml-2 text-sm text-gray-700">
                      만 14세 이상입니다 (필수)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      checked={checkedTerms.terms}
                      onChange={handleIndividualChange}
                      className="w-4 h-4 text-custom border-gray-300 rounded focus:ring-custom"
                    />
                    <label
                      htmlFor="terms"
                      className="ml-2 text-sm text-gray-700"
                    >
                      서비스 이용약관 동의 (필수)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="privacy"
                      name="privacy"
                      checked={checkedTerms.privacy}
                      onChange={handleIndividualChange}
                      className="w-4 h-4 text-custom border-gray-300 rounded focus:ring-custom"
                    />
                    <label
                      htmlFor="privacy"
                      className="ml-2 text-sm text-gray-700"
                    >
                      개인정보 수집 및 이용 동의 (필수)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="marketing"
                      name="marketing"
                      checked={checkedTerms.marketing}
                      onChange={handleIndividualChange}
                      className="w-4 h-4 text-custom border-gray-300 rounded focus:ring-custom"
                    />
                    <label
                      htmlFor="marketing"
                      className="ml-2 text-sm text-gray-700"
                    >
                      마케팅 활용 동의 및 광고 수신 동의 (선택)
                    </label>
                  </div>
                </div>

                {/* 회원가입 버튼 */}
                <button
                  type="submit"
                  className="!rounded-button w-full px-4 py-3 bg-custom text-white text-lg font-medium hover:bg-custom/90"
                >
                  회원가입
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
