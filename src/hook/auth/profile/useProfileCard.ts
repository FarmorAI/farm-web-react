import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useGetUserInfoQuery } from "../../../api/authApi.ts";
import { checkNickname, updateUserProfile } from "../../../api/memberApi.ts";
import { getCookie } from "../../../util/cookieUtill.ts";
import { API_BASE_URL } from "../../../api/memberApi.ts";

export const useProfileCardModal = () => {
  const {
    data: userInfo = null,
    isLoading,
    error,
    refetch,
  } = useGetUserInfoQuery();

  const [memberId, setMemberId] = useState<number | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<boolean | null>(null);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [jwtToken, setJwtToken] = useState(getCookie("jwt"));

  useEffect(() => {
    setJwtToken(getCookie("jwt"));
  }, []);

  useEffect(() => {
    if (jwtToken) {
      refetch();
    }
  }, [jwtToken, refetch]); // ✅ JWT 변경 시에만 refetch 실행

  useEffect(() => {
    if (userInfo) {
      setMemberId(userInfo.memberId);
      setProfileImage(userInfo.imageUrl || null);
      setNickname(userInfo.nickname || "");
      setPhone(userInfo.phone || "");
      setAddress(userInfo.address || "");
    }
  }, [userInfo]);

  // ✅ 닉네임 중복 확인 (useCallback 적용)
  const handleCheckNickname = useCallback(async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    const isDuplicate = await checkNickname(nickname);
    setIsNicknameAvailable(!isDuplicate);
    setIsNicknameChecked(true);
  }, [nickname]);

  // ✅ 회원정보 수정 (setState 먼저 적용 후 refetch 최소화)
  const handleUpdateProfile = useCallback(async () => {
    if (!userInfo || !isNicknameChecked || isNicknameAvailable === false) {
      alert("닉네임 중복 확인을 먼저 하거나 사용 가능한 닉네임을 입력해주세요.");
      return;
    }

    const success = await updateUserProfile(userInfo.memberId, {
      nickname,
      phone,
      address,
    });

    if (success) {
      alert("회원정보가 성공적으로 수정되었습니다.");
      setNickname(nickname); // ✅ 로컬 상태 업데이트 (불필요한 refetch 방지)
      setPhone(phone);
      setAddress(address);
      refetch(); // ✅ 성공적으로 수정된 경우에만 refetch 실행
    } else {
      alert("회원정보 수정에 실패했습니다.");
    }
  }, [userInfo, nickname, phone, address, isNicknameChecked, isNicknameAvailable, refetch]);

  // ✅ 프로필 이미지 변경 (useCallback 적용)
  const handleProfileImageChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await axios.put(
        `${API_BASE_URL}/member/auth/upload-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getCookie("jwt")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Uploaded Image URL:", response.data.imageUrl);
        setProfileImage(response.data.imageUrl); // ✅ 즉시 업데이트
        refetch(); // ✅ 프로필 변경 후 데이터 새로 요청
      } else {
        console.error("Image upload failed:", response);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  }, [refetch]);

  return {
    memberId,
    userInfo,
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
    handleProfileImageChange,
    isLoading,
    error,
    refetch,
  };
};