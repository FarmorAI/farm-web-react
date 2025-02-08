import React, { useState } from 'react';

const Register: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isIdAvailable, setIsIdAvailable] = useState<boolean | null>(null);
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(null);

  const handleIdCheck = () => {
    // 중복 확인 로직 (예: API 호출)
    setIsIdAvailable(true); // 임시로 true 설정
  };

  const handleEmailCheck = () => {
    // 중복 확인 로직 (예: API 호출)
    setIsEmailAvailable(true); // 임시로 true 설정
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 회원가입 로직
    console.log({ userId, password, name, email, birthdate, phone, address });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-8xl mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-center mb-8">회원가입</h1>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* 아이디 입력 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">아이디</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="flex-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-custom focus:border-custom"
                      placeholder="5~20자 영문, 숫자 조합"
                    />
                    <button
                      type="button"
                      onClick={handleIdCheck}
                      className="!rounded-button px-4 py-2 bg-custom text-white hover:bg-custom/90"
                    >
                      중복확인
                    </button>
                  </div>
                  {isIdAvailable !== null && (
                    <p className="text-sm mt-1">
                      {isIdAvailable ? '사용 가능한 아이디입니다.' : '이미 사용 중인 아이디입니다.'}
                    </p>
                  )}
                </div>

                {/* 비밀번호 입력 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-custom focus:border-custom"
                    placeholder="8~16자 영문, 숫자, 특수문자 조합"
                  />
                </div>

                {/* 이름 입력 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-custom focus:border-custom"
                  />
                </div>

                {/* 이메일 입력 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-custom focus:border-custom"
                    />
                    <button
                      type="button"
                      onClick={handleEmailCheck}
                      className="!rounded-button px-4 py-2 bg-custom text-white hover:bg-custom/90"
                    >
                      중복확인
                    </button>
                  </div>
                  {isEmailAvailable !== null && (
                    <p className="text-sm mt-1">
                      {isEmailAvailable ? '사용 가능한 이메일입니다.' : '이미 사용 중인 이메일입니다.'}
                    </p>
                  )}
                </div>

                {/* 생년월일 입력 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">생년월일</label>
                  <input
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-custom focus:border-custom"
                  />
                </div>

                {/* 휴대폰 번호 입력 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">휴대폰 번호</label>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      className="!rounded-button w-full px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      주소 검색
                    </button>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-custom focus:border-custom"
                      placeholder="상세주소 입력"
                    />
                  </div>
                </div>

                {/* 약관 동의 */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="all"
                      className="w-4 h-4 text-custom border-gray-300 rounded focus:ring-custom"
                    />
                    <label htmlFor="all" className="ml-2 text-sm font-medium text-gray-700">
                      전체동의
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="age"
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
                      className="w-4 h-4 text-custom border-gray-300 rounded focus:ring-custom"
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                      서비스 이용약관 동의 (필수)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="privacy"
                      className="w-4 h-4 text-custom border-gray-300 rounded focus:ring-custom"
                    />
                    <label htmlFor="privacy" className="ml-2 text-sm text-gray-700">
                      개인정보 수집 및 이용 동의 (필수)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="marketing"
                      className="w-4 h-4 text-custom border-gray-300 rounded focus:ring-custom"
                    />
                    <label htmlFor="marketing" className="ml-2 text-sm text-gray-700">
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