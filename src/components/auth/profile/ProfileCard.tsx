import React, { useState } from "react";
import DeleteAccountModal from "./DeleteAccountModal";
interface ProfileCardProps {
  profileImage: string | null;
  userInfo: {
    email: string;
    nickname: string;
    createdAt: string;
    address: string;
    phone: string;
    memberId: number;
  } | null;
  openEditModal: () => void;
  handleProfileImageChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void; // :흰색_확인_표시: 추가
}
const ProfileCard: React.FC<ProfileCardProps> = ({
  profileImage,
  userInfo,
  openEditModal,
  handleProfileImageChange,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <>
      <div className="col-span-2 bg-white rounded-lg shadow-lg p-6 flex items-center relative">
        <button
          className="absolute top-6 right-7 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition"
          onClick={openEditModal}
        >
          회원정보 수정
        </button>

        {/* ✅ 회원탈퇴 버튼 */}
        <button
          className="absolute bottom-6 right-7 bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          회원탈퇴
        </button>

        <div className="flex flex-col items-center w-1/3">
          <img
            src={profileImage || "https://via.placeholder.com/100"}
            alt="프로필 사진"
            className="w-32 h-32 rounded-full object-cover mb-2"
          />
          <label className="text-blue-600 hover:text-blue-800 mt-1 cursor-pointer">
            <i className="fas fa-camera mr-1"></i> 프로필 변경
            <input type="file" accept="image/*" className="hidden" onChange={handleProfileImageChange} />
          </label>
        </div>

        <div className="w-2/3 pl-6 border-l border-gray-300">
          <h2 className="text-lg font-medium mb-4">기본 정보</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="w-24 text-gray-600">아이디:</span>
              <span className="font-medium">{userInfo?.email || "알 수 없음"}</span>
            </div>
            <div className="flex items-center">
              <span className="w-24 text-gray-600">닉네임:</span>
              <span className="font-medium">{userInfo?.nickname || "알 수 없음"}</span>
            </div>
            <div className="flex items-center">
              <span className="w-24 text-gray-600">연락처:</span>
              <span className="font-medium">{userInfo?.phone || "알 수 없음"}</span>
            </div>
            <div className="flex items-center">
              <span className="w-24 text-gray-600">주소:</span>
              <span className="font-medium">{userInfo?.address || "알 수 없음"}</span>
            </div>
            <div className="flex items-center">
              <span className="w-24 text-gray-600">가입일:</span>
              <span className="font-medium">
                {userInfo?.createdAt ? new Date(userInfo.createdAt).toLocaleDateString() : "알 수 없음"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 회원 탈퇴 모달 추가 */}
      {userInfo && (
        <DeleteAccountModal
          memberId={userInfo.memberId}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </>
  );
};

export default ProfileCard;
