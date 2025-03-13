import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteMember } from "../../../api/memberApi";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/slices/authslices";
import { removeCookie } from "../../../util/cookieUtill";

interface DeleteAccountModalProps {
  memberId: number;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ memberId, isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 


  const handleDeleteAccount = async () => {
    const success = await deleteMember(memberId);
    if (success) {
      dispatch(logoutUser()); // 🔹 Redux 상태 초기화
      removeCookie("jwt");
      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/"); // 🔹 탈퇴 후 메인 페이지로 이동
    } else {
      alert("회원 탈퇴 중 오류가 발생했습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-medium mb-4 text-red-600">회원 탈퇴 확인</h2>
        <p className="text-gray-700 mb-4">
          정말 탈퇴하시겠습니까? <br /> 탈퇴 후 계정 복구가 불가능합니다.
        </p>
        <div className="flex justify-between">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
            취소
          </button>
          <button onClick={handleDeleteAccount} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
