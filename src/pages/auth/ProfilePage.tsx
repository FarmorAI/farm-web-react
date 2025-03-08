import SubscriptionCard from "../../components/auth/profile/SubscriptionCard";
import AnalysisChart from "../../components/auth/profile/AnalysisChart";
import ProfileCard from "../../components/auth/profile/ProfileCard";
import ProfileEditModal from "../../components/auth/profile/ProfileEditModal";
import { useProfile } from "../../hook/auth/useProfile";
import {useEffect, useState} from "react";
import MyBoards from "../../components/auth/profile/MyBoard";
import InquiryHistory from "../../components/auth/profile/InquiryHistory";
import AnalysisGallery from "../../components/auth/profile/AnalysisGallery";
import axios from "axios";
import { getCookie } from "../../util/cookieUtill.ts";
import { API_BASE_URL } from "../../api/memberApi.ts";
import RecentAnalysisRecords from "../../components/auth/profile/RecentAnalysisRecords.tsx.tsx";
const ProfilePage = () => {
  const {
    profileImage,
    userInfo,
    nickname,
    phone,
    address,
    isNicknameAvailable,
    isNicknameChecked,
    handleCheckNickname,
    handleUpdateProfile,
    isLoading,
    error,
    refetch,
  } = useProfile();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // :흰색_확인_표시: 프로필 이미지 변경 핸들러
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
        refetch(); // :흰색_확인_표시: 프로필 변경 후 데이터 새로 요청
      } else {
        console.error("Image upload failed:", response);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  useEffect(() => {
    // 비동기 함수 선언
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/notice/profile`, {
                headers:
                    {
                        Authorization: `Bearer ${getCookie("jwt")}`,
                    },
            });
          console.log(response)
      } catch (err)
          {
          console.log(err);
      }
    };

    fetchData(); // 함수 호출
  }, []);

  if (isLoading) return <p className="text-center text-gray-600">로딩 중...</p>;
  if (error)
    return (
        <p className="text-center text-red-500">
          사용자 정보를 가져오는 중 오류가 발생했습니다.
        </p>
    );
  return (
      <main className="bg-gray-50 max-w-8xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* 프로필 카드 */}
            <ProfileCard
                profileImage={profileImage}
                userInfo={userInfo}
                openEditModal={() => setIsEditModalOpen(true)}
                handleProfileImageChange={handleProfileImageChange} // :흰색_확인_표시: 추가된 부분
            />
            {/* 구독 정보 */}
            <SubscriptionCard />
            {/* 분석 통계 */}
            <AnalysisChart />
            {/* 내 게시글 */}
            <MyBoards />
            {/* 문의 내역 */}
            <InquiryHistory />
            {/* :흰색_확인_표시: 최근 분석 기록을 전체 너비로 배치 */}
            <div className="col-span-full">
              <RecentAnalysisRecords />
            </div>
            {/* :흰색_확인_표시: 분석 이미지 갤러리도 전체 너비로 배치 */}
            <div className="col-span-full">
              <AnalysisGallery />
            </div>
          </div>
        </div>
        {/* 회원정보 수정 모달 */}
        {isEditModalOpen && (
            <ProfileEditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                userInfo={{
                  memberId: userInfo?.memberId || 0,
                  nickname,
                  phone,
                  address,
                }}
                isNicknameChecked={isNicknameChecked}
                isNicknameAvailable={isNicknameAvailable ?? false}
                handleCheckNickname={handleCheckNickname}
                handleUpdateProfile={handleUpdateProfile}
                onProfileUpdate={refetch}
            />
        )}
      </main>
  );
};
export default ProfilePage;