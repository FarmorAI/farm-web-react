import { useState, useCallback, useMemo } from "react";
import SubscriptionCard from "../../components/auth/profile/SubscriptionCard";
import ProfileCard from "../../components/auth/profile/ProfileCard";
import ProfileEditModal from "../../components/auth/profile/ProfileEditModal";
import { useProfileCardModal } from "../../hook/auth/profile/useProfileCard.ts";
import MyBoards from "../../components/auth/profile/MyBoard";
import InquiryHistory from "../../components/auth/profile/InquiryHistory";
import RecentAnalysisRecords from "../../components/auth/profile/RecentAnalysisRecords.tsx";
import { usePurchaseHistory } from "../../hook/auth/profile/usePurchaseHistory.ts";
import PurchaseHistoryUI from "../../components/auth/profile/PurchasedHistory.tsx";
import { memo } from "react";

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
  } = useProfileCardModal();

  // memberId 메모이제이션
  const memoizedMemberId = useMemo(() => memberId, [memberId]);

  // 구매 내역 훅 사용
  const {
    orders,
    selectedStatus,
    setSelectedStatus,
    searchQuery,
    setSearchQuery,
    getStatusLabel,
    getStatusColor,
  } = usePurchaseHistory(memoizedMemberId);

  // props 메모이제이션
  const memoizedOrders = useMemo(() => orders, [orders]);
  const memoizedSetSelectedStatus = useCallback(setSelectedStatus, [setSelectedStatus]); 
  const memoizedSetSearchQuery = useCallback(setSearchQuery, [setSearchQuery]);

  // 모달 상태 및 핸들러
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const openEditModal = useCallback(() => setIsEditModalOpen(true), []);
  const closeEditModal = useCallback(() => setIsEditModalOpen(false), []);

  // userInfo 메모이제이션
  const memoizedUserInfo = useMemo(
    () => ({
      memberId: userInfo?.memberId || 0,
      nickname,
      phone,
      address,
    }),
    [userInfo, nickname, phone, address]
  );

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
          <MemoizedProfileCard
            profileImage={profileImage}
            userInfo={userInfo}
            openEditModal={openEditModal}
            handleProfileImageChange={handleProfileImageChange}
          />
          {/* 구독 정보 */}
          <MemoizedSubscriptionCard />
          {/* 최근 분석 기록 */}
          <MemoizedRecentAnalysisRecords />
          {/* 내 게시글 */}
          <MemoizedMyBoards />
          {/* 문의 내역 */}
          <MemoizedInquiryHistory />
          {/* 구매 내역 */}
          <div className="col-span-full">
            <MemoizedPurchaseHistoryUI
              orders={memoizedOrders}
              selectedStatus={selectedStatus}
              setSelectedStatus={memoizedSetSelectedStatus}
              searchQuery={searchQuery}
              setSearchQuery={memoizedSetSearchQuery}
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
          onClose={closeEditModal}
          userInfo={memoizedUserInfo}
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

// memo로 감싼 컴포넌트들
const MemoizedProfileCard = memo(ProfileCard);
const MemoizedSubscriptionCard = memo(SubscriptionCard);
const MemoizedRecentAnalysisRecords = memo(RecentAnalysisRecords);
const MemoizedMyBoards = memo(MyBoards);
const MemoizedInquiryHistory = memo(InquiryHistory);
const MemoizedPurchaseHistoryUI = memo(PurchaseHistoryUI);

export default ProfilePage;