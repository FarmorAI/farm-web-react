import { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserInfoQuery } from "../../api/authApi";
import { checkNickname, updateUserProfile } from "../../api/memberApi";
import { getCookie } from "../../util/cookieUtill.ts";
import { API_BASE_URL } from "../../api/memberApi.ts";

export const useProfile = () => {
  const { data: userInfo = null, isLoading, error, refetch } = useGetUserInfoQuery();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<boolean | null>(null);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [ jwtToken , setJwtToken ] = useState(getCookie("jwt"));
  
  useEffect(() => {
    setJwtToken(getCookie("jwt")); // ✅ JWT 변경 시 상태 업데이트
  }, []); // 🔥 최초 실행 시 한 번만 실행
  
  useEffect(() => {
    refetch();
  }, [jwtToken, refetch]); // ✅ jwt 값이 변경되면 refetch 실행

  
  useEffect(() => {
    if (userInfo) {
      setProfileImage(userInfo.imageUrl || null);
      setNickname(userInfo.nickname || "");
      setPhone(userInfo.phone || "");
      setAddress(userInfo.address || "");
    }
  }, [userInfo]);
  


  // ✅ 닉네임 중복 확인
  const handleCheckNickname = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    const isDuplicate = await checkNickname(nickname);
    setIsNicknameAvailable(!isDuplicate);
    setIsNicknameChecked(true);
  };

  // ✅ 회원정보 수정
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

  // ✅ 프로필 이미지 변경
  const handleProfileImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await axios.put(`${API_BASE_URL}/member/auth/upload-profile`, formData, {
        headers: {
          "Authorization": `Bearer ${getCookie("jwt")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("Uploaded Image URL:", response.data.imageUrl);
        refetch(); // ✅ 프로필 변경 후 데이터 새로 요청
      } else {
        console.error("Image upload failed:", response);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return {
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
    handleProfileImageChange, // ✅ 추가됨!
    isLoading,
    error,
    refetch,
  };
};
