import SubscriptionCard from "../../components/auth/profile/SubscriptionCard";
import ProfileCard from "../../components/auth/profile/ProfileCard";
import ProfileEditModal from "../../components/auth/profile/ProfileEditModal";
import { useProfileCard } from "../../hook/auth/profile/useProfileCard.ts";
import { useState } from "react";
import MyBoards from "../../components/auth/profile/MyBoard";
import InquiryHistory from "../../components/auth/profile/InquiryHistory";
import RecentAnalysisRecords from "../../components/auth/profile/RecentAnalysisRecords.tsx";
import { usePurchaseHistory } from "../../hook/auth/profile/usePurchaseHistory.ts";
import PurchaseHistoryUI from "../../components/auth/profile/PurchasedHistory.tsx";



const ProfilePage = () => {
  const {
    memberId,
    profileImage,
    userInfo,
    nickname,
    phone,
    address,
    isNicknameAvailable,
    isNicknameChecked,
    handleCheckNickname,
    handleUpdateProfile,
    handleProfileImageChange,
    isLoading,
    error,
    refetch,
  } = useProfileCard();

  // 구매 내역 커스텀 훅 사용
  const {
    orders,
    selectedStatus,
    setSelectedStatus,
    searchQuery,
    setSearchQuery,
    getStatusLabel,
    getStatusColor,
  } = usePurchaseHistory(memberId);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
            handleProfileImageChange={handleProfileImageChange}
          />
          {/* 구독 정보 */}
          <SubscriptionCard />
          {/* 최근 분석 기록 */}
          <RecentAnalysisRecords />
          {/* 내 게시글 */}
          <MyBoards />
          {/* 문의 내역 */}
          <InquiryHistory />
          {/* 구매 내역 (전체 너비로 가로 배치) */}
          <div className="col-span-full">
            <PurchaseHistoryUI
              orders={orders}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              getStatusLabel={getStatusLabel}
              getStatusColor={getStatusColor}
            />
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
