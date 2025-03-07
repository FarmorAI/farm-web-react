import React, { useEffect, useState } from "react";
import { checkNickname, updateUserProfile } from "../../../api/memberApi";

interface ProfileEditModalProps {
  userInfo: {
    memberId: number;
    nickname: string;
    phone: string;
    address: string;
  };
  isOpen: boolean;  // ✅ 모달 열림 여부
  onClose: () => void;
  onProfileUpdate: () => void;
  isNicknameChecked: boolean;  // ✅ 추가됨
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
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<boolean | null>(null);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); // ✅ 저장 버튼 비활성화 관리

  // ✅ 모달이 열릴 때 userInfo 값으로 초기화
  useEffect(() => {
    if (isOpen) {
      setNickname(userInfo.nickname);
      setPhone(userInfo.phone);
      setAddress(userInfo.address);
      setIsNicknameAvailable(null);
      setIsNicknameChecked(false);
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

  // ✅ 회원정보 수정 함수
  const handleUpdateProfile = async () => {
    if (!isNicknameChecked) {
      alert("닉네임 중복 확인을 먼저 해주세요.");
      return;
    }
    if (isNicknameAvailable === false) {
      alert("이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.");
      return;
    }

    setIsUpdating(true); // ✅ 저장 버튼 비활성화

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
                isUpdating ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={isUpdating}
            >
              중복확인
            </button>
          </div>
          {isNicknameAvailable === false && (
            <p className="text-red-500 text-sm mt-1">이미 사용 중인 닉네임입니다.</p>
          )}
          {isNicknameAvailable === true && isNicknameChecked && (
            <p className="text-green-500 text-sm mt-1">사용 가능한 닉네임입니다.</p>
          )}
        </div>

        {/* 휴대폰 번호 입력 */}
        <div className="mb-4">
          <label className="block text-gray-700">휴대폰 번호</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded-lg"
            disabled={isUpdating}
          />
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
            disabled={!isNicknameChecked || isNicknameAvailable === false || isUpdating}
            className={`px-4 py-2 rounded-lg text-white ${
              !isNicknameChecked || isNicknameAvailable === false || isUpdating
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
