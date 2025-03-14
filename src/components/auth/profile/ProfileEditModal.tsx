import React, { useEffect, useState, ReactNode } from "react";
import { checkNickname, updateUserProfile } from "../../../api/memberApi";

interface ProfileEditModalProps {
  userInfo: {
    memberId: number;
    nickname: string;
    phone: string;
    address: string;
  };
  isOpen: boolean; // ✅ 모달 열림 여부
  onClose: () => void;
  onProfileUpdate: () => void;
  isNicknameChecked: boolean; // ✅ 추가됨
  isNicknameAvailable: boolean | null;
  handleCheckNickname: () => Promise<void>;
  handleUpdateProfile: () => Promise<void>;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  onProfileUpdate,
  userInfo,
}) => {
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [phone, setPhone] = useState(userInfo.phone);
  const [address, setAddress] = useState(userInfo.address);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<
    boolean | null
  >(null);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); // ✅ 저장 버튼 비활성화 관리
  const [phoneError, setPhoneError] = useState<string | ReactNode>(null);

  // ✅ 모달이 열릴 때 userInfo 값으로 초기화
  useEffect(() => {
    if (isOpen) {
      setNickname(userInfo.nickname);
      setPhone(userInfo.phone);
      setAddress(userInfo.address);
      setIsNicknameAvailable(null);
      setIsNicknameChecked(false);
      setPhoneError(null); // ✅ 연락처 오류 초기화
    }
  }, [isOpen, userInfo]);

  

  // ✅ 닉네임 중복 확인 함수
  const handleCheckNickname = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      const isDuplicate = await checkNickname(nickname);
      setIsNicknameAvailable(!isDuplicate);
      setIsNicknameChecked(true);
    } catch (error) {
      console.error("닉네임 중복 확인 실패:", error);
      alert("닉네임 중복 확인 중 오류가 발생했습니다.");
    }
  };

  // ✅ 연락처 유효성 검사 함수
  const validatePhone = (phoneValue: string): boolean => {
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    return phoneRegex.test(phoneValue);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
  
    if (newPhone && !validatePhone(newPhone)) {
      setPhoneError(
        <>
          <p>연락처는 010-XXXX-XXXX 형식이어야 합니다.</p>
          <p className="text-gray-500">(예: 010-1234-5678)</p>
        </>
      );
    } else {
      setPhoneError(null);
    }
  };
  

  // ✅ 회원정보 수정 함수
  const handleUpdateProfile = async () => {
    // ✅ 수정된 부분: 닉네임 변경 여부 확인
    const isNicknameChanged = nickname !== userInfo.nickname;
    if (isNicknameChanged && !isNicknameChecked) {
      alert("닉네임 중복 확인을 먼저 해주세요.");
      return;
    }
    if (isNicknameChanged && isNicknameAvailable === false) {
      alert("이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.");
      return;
    }

    // ✅ 추가: 연락처 유효성 검사
    if (phone && !validatePhone(phone)) {
      alert("연락처 형식이 올바르지 않습니다. 010-XXXX-XXXX 형식을 지켜주세요.");
      return;
    }

    setIsUpdating(true);

    try {
      const success = await updateUserProfile(userInfo.memberId, {
        nickname,
        phone,
        address,
      });

      if (success) {
        alert("회원정보가 성공적으로 수정되었습니다.");
        onProfileUpdate();
        onClose();
      } else {
        alert("회원정보 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원정보 수정 실패:", error);
      alert("회원정보 수정 중 오류가 발생했습니다.");
    } finally {
      setIsUpdating(false); // ✅ 저장 버튼 다시 활성화
    }
  };

  if (!isOpen) return null; // ✅ 모달이 닫혀있으면 렌더링 안 함

  // ✅ 수정된 부분: 닉네임 변경 여부 확인 변수 추가
  const isNicknameChanged = nickname !== userInfo.nickname;
  // ✅ 수정된 부분: 저장 버튼 활성화 조건 동적 설정 (연락처 유효성 추가)
  const isSaveDisabled: boolean = !!(
    isUpdating ||
    (isNicknameChanged &&
      (!isNicknameChecked || isNicknameAvailable === false)) ||
    (phone && phoneError !== null)
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-medium mb-4">회원정보 수정</h2>

        {/* 닉네임 입력 및 중복 확인 버튼 */}
        <div className="mb-4">
          <label className="block text-gray-700">닉네임</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setIsNicknameChecked(false);
                setIsNicknameAvailable(null);
              }}
              className="flex-1 p-2 border rounded-lg h-10"
              disabled={isUpdating}
            />
            <button
              onClick={handleCheckNickname}
              className={`w-24 px-2 py-2 h-10 rounded-lg text-white ${
                isUpdating
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={isUpdating}
            >
              중복확인
            </button>
          </div>
          {isNicknameAvailable === false && (
            <p className="text-red-500 text-sm mt-1">
              이미 사용 중인 닉네임입니다.
            </p>
          )}
          {isNicknameAvailable === true && isNicknameChecked && (
            <p className="text-green-500 text-sm mt-1">
              사용 가능한 닉네임입니다.
            </p>
          )}
        </div>

        {/* 휴대폰 번호 입력 */}
        <div className="mb-4">
          <label className="block text-gray-700">연락처</label>
          <input
            type="text"
            value={phone}
            onChange={handlePhoneChange} // ✅ 변경: 실시간 유효성 검사 적용
            className="w-full p-2 border rounded-lg"
            disabled={isUpdating}
            placeholder="예: 010-1234-5678"
          />
          {phoneError && (
            <p className="text-red-500 text-sm mt-1">{phoneError}</p>
          )} {/* ✅ 연락처 유효성 오류 메시지 표시 */}
        </div>

        {/* 주소 입력 */}
        <div className="mb-4">
          <label className="block text-gray-700">주소</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded-lg"
            disabled={isUpdating}
          />
        </div>

        {/* 버튼 */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            disabled={isUpdating}
          >
            취소
          </button>
          <button
            onClick={handleUpdateProfile}
            disabled={isSaveDisabled}
            className={`px-4 py-2 rounded-lg text-white ${
              isSaveDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isUpdating ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;