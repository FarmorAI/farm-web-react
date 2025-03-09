// components/auth/profile/PurchaseHistory.tsx
import React, { useState } from "react";

interface PurchasedItemType {
  id: number;
  name: string;
  option: string;
  price: number;
  quantity: number;
  imageUrl: string;
  status: string; // 주문 상태를 추가 (예: "결제완료", "배송중" 등)
}

interface PurchaseHistoryProps {
  purchasedItems: PurchasedItemType[];
  onSearch: (query: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PurchaseHistory: React.FC<PurchaseHistoryProps> = ({
  purchasedItems,
  onSearch,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("전체");
  const [searchQuery, setSearchQuery] = useState("");

  // 상태별 주문 수 계산
  const getStatusCount = (status: string) => {
    return purchasedItems.filter((item) => item.status === status).length;
  };

  // 필터링된 항목 계산
  const filteredItems = purchasedItems.filter((item) => {
    const matchesSearch =
      item.name.includes(searchQuery) || `ORDER-${item.id}`.includes(searchQuery);
    const matchesStatus =
      selectedStatus === "전체" || item.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // 각 항목의 총 가격 계산
  const getItemTotal = (item: PurchasedItemType) => item.price * item.quantity;



  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* 주문 현황 섹션 */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">주문 현황</h3>
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-600">입금대기</p>
            <p className="text-2xl font-bold text-gray-900">{getStatusCount("입금대기")}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">결제완료</p>
            <p className="text-2xl font-bold text-gray-900">{getStatusCount("결제완료")}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">배송준비중</p>
            <p className="text-2xl font-bold text-gray-900">{getStatusCount("배송준비중")}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">배송중</p>
            <p className="text-2xl font-bold text-gray-900">{getStatusCount("배송중")}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">배송완료</p>
            <p className="text-2xl font-bold text-gray-900">{getStatusCount("배송완료")}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">구매 내역</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="주문번호 또는 상품명 검색"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 text-sm" // w-64로 고정 너비, pr-4로 패딩 조정, text-sm으로 폰트 크기 조정
              onChange={handleSearchChange}
              value={searchQuery}
            />
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          className={`px-4 py-2 text-sm rounded-lg ${
            selectedStatus === "전체"
              ? "bg-custom text-white"
              : "border border-gray-300"
          }`}
          onClick={() => handleStatusFilter("전체")}
        >
          전체
        </button>
        <button
          className={`px-4 py-2 text-sm rounded-lg ${
            selectedStatus === "결제완료"
              ? "bg-custom text-white"
              : "border border-gray-300"
          }`}
          onClick={() => handleStatusFilter("결제완료")}
        >
          결제완료
        </button>
        <button
          className={`px-4 py-2 text-sm rounded-lg ${
            selectedStatus === "배송준비중"
              ? "bg-custom text-white"
              : "border border-gray-300"
          }`}
          onClick={() => handleStatusFilter("배송준비중")}
        >
          배송준비중
        </button>
        <button
          className={`px-4 py-2 text-sm rounded-lg ${
            selectedStatus === "배송중"
              ? "bg-custom text-white"
              : "border border-gray-300"
          }`}
          onClick={() => handleStatusFilter("배송중")}
        >
          배송중
        </button>
        <button
          className={`px-4 py-2 text-sm rounded-lg ${
            selectedStatus === "배송완료"
              ? "bg-custom text-white"
              : "border border-gray-300"
          }`}
          onClick={() => handleStatusFilter("배송완료")}
        >
          배송완료
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-y border-gray-200">
              <th className="py-4 text-left font-medium">주문번호</th>
              <th className="py-4 text-left font-medium w-1/3">상품명</th>
              <th className="py-4 text-right font-medium">결제금액</th>
              <th className="py-4 text-center font-medium">주문일자</th>
              <th className="py-4 text-center font-medium">주문상태</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
              >
                <td className="py-4">ORDER-{item.id.toString().padStart(3, "0")}</td>
                <td className="py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td className="py-4 text-right">
                  {getItemTotal(item).toLocaleString()}원
                </td>
                <td className="py-4 text-center">
                  {new Date().toISOString().split("T")[0]}
                </td>
                <td className="py-4 text-center">
                  <span className="px-2 py-1 text-sm bg-green-100 text-green-800 rounded">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseHistory;