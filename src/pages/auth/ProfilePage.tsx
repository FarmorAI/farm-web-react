import SubscriptionCard from "../../components/auth/profile/SubscriptionCard";
import ProfileCard from "../../components/auth/profile/ProfileCard";
import ProfileEditModal from "../../components/auth/profile/ProfileEditModal";
import { useProfile } from "../../hook/auth/useProfile";
import { useState } from "react";
import MyBoards from "../../components/auth/profile/MyBoard";
import InquiryHistory from "../../components/auth/profile/InquiryHistory";
import RecentAnalysisRecords from "../../components/auth/profile/RecentAnalysisRecords.tsx.tsx";
import PurchaseHistory from "../../components/auth/profile/PurchasedHistory.tsx";

// 구매한 상품 타입 정의
interface PurchasedItemType {
  id: number;
  name: string;
  option: string;
  price: number;
  quantity: number;
  imageUrl: string;
  status: string; // 주문 상태 추가
  orderDate: string; // 주문 일자 추가
}

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
    handleProfileImageChange,
    isLoading,
    error,
    refetch,
  } = useProfile();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [purchasedItems] = useState<PurchasedItemType[]>([
    // 초기 구매 내역 (예시 데이터, 다양한 상태와 주문 일자 추가)
    {
      id: 1,
      name: "유어플 비타민D 레몬맛[1개월분]",
      option: "옵션없음",
      price: 10000,
      quantity: 2,
      imageUrl: "https://via.placeholder.com/100",
      status: "결제완료",
      orderDate: "2023.02.18",
    },
    {
      id: 2,
      name: "프리미엄 오메가3 1000mg",
      option: "60캡슐",
      price: 35000,
      quantity: 1,
      imageUrl: "https://via.placeholder.com/100",
      status: "배송중",
      orderDate: "2023.02.15",
    },
    {
      id: 3,
      name: "칼슘 마그네슘 플러스",
      option: "90정",
      price: 25000,
      quantity: 1,
      imageUrl: "https://via.placeholder.com/100",
      status: "배송완료",
      orderDate: "2023.02.10",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const totalPages = 3; // 예시로 3페이지로 설정, 실제로는 데이터에 따라 동적 계산 필요

  const filteredPurchasedItems = purchasedItems.filter((item) =>
    item.name.includes(searchQuery) || `ORDER-${item.id}`.includes(searchQuery)
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
            <PurchaseHistory
              purchasedItems={filteredPurchasedItems}
              onSearch={setSearchQuery}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
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