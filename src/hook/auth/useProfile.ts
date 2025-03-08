import { useState, useEffect } from "react";
import { useGetUserInfoQuery } from "../../api/authApi";
import { checkNickname, updateUserProfile } from "../../api/memberApi";

export const useProfile = () => {
  const { data: userInfo =null, isLoading, error, refetch } = useGetUserInfoQuery();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<boolean | null>(null);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setProfileImage(userInfo.imageUrl || null);
      setNickname(userInfo.nickname || "");
      setPhone(userInfo.phone || "");
      setAddress(userInfo.address || "");
    }
  }, [userInfo]);

  const handleCheckNickname = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    const isDuplicate = await checkNickname(nickname);
    setIsNicknameAvailable(!isDuplicate);
    setIsNicknameChecked(true);
  };

  const handleUpdateProfile = async () => {
    if (!userInfo || !isNicknameChecked) {
      alert("닉네임 중복 확인을 먼저 해주세요.");
      return;
    }

    if (isNicknameAvailable === false) {
      alert("이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.");
      return;
    }

    const success = await updateUserProfile(userInfo.memberId, {
      nickname,
      phone,
      address,
    });

    if (success) {
      alert("회원정보가 성공적으로 수정되었습니다.");
      refetch();
    } else {
      alert("회원정보 수정에 실패했습니다.");
    }
  };

  return {
    userInfo, // ✅ userInfo 추가
    profileImage,
    nickname,
    phone,
    address,
    isNicknameAvailable,
    isNicknameChecked,
    setNickname,
    setPhone,
    setAddress,
    handleCheckNickname,
    handleUpdateProfile,
    isLoading,
    error,
    refetch,
  };
};
