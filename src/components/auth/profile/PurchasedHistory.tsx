import React from "react";
import { Link } from "react-router-dom";
import OrderStatusCounts from "./OrderStatusCounts"; // 상태별 주문 수 표시 컴포넌트

interface OrderItemType {
  orderDetailId: number;
  productId: number;
  price: number;
  quantity: number;
  pname: string;
  imageUrl: string;
}

interface OrderType {
  orderNumber: string;
  ordersId: number;
  totalAmount: number;
  createdAt: string;
  status: string;
  orderItems: OrderItemType[];
}

interface PurchaseHistoryProps {
  orders: OrderType[];
  selectedStatus: string;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  getStatusLabel: (status: string) => string;
  getStatusColor: (status: string) => string;
}

// ✅ 상태 이름 매핑 (UI에서 보여지는 이름 <-> 실제 order.status 값 + 색상 추가)
const statusMapping: Record<string, { label: string; color: string }> = {
  PENDING: { label: "입금대기", color: "bg-yellow-200 text-yellow-800" },
  PAID: { label: "결제완료", color: "bg-green-200 text-green-800" },
  SHIPPED: { label: "배송중", color: "bg-blue-200 text-blue-800" },
  DELIVERED: { label: "배송완료", color: "bg-gray-200 text-gray-800" },
  CANCELLED: { label: "주문취소", color: "bg-red-200 text-red-800" },
};

const PurchaseHistoryUI: React.FC<PurchaseHistoryProps> = ({
  orders,
  selectedStatus,
  setSelectedStatus,
  searchQuery,
  setSearchQuery,
  getStatusLabel,
  getStatusColor,
}) => {
  const statusLabelToKey = Object.fromEntries(
    Object.entries(statusMapping).map(([key, value]) => [value.label, key])
  );

  // ✅ 상태 필터링 + 검색 적용
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      selectedStatus === "전체" ||
      order.status === statusLabelToKey[selectedStatus];
    const matchesSearch =
      searchQuery.trim() === "" ||
      order.orderNumber.includes(searchQuery) ||
      order.orderItems.some((item) => item.pname.includes(searchQuery));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium">📦 주문/배송조회 (최근 6개월)</h2>

      {/* ✅ 상태별 주문 수 카운트 */}
      <OrderStatusCounts orders={orders} />

      {/* 검색창 */}
      <div className="relative mt-4">
        <input
          type="text"
          placeholder="주문번호 또는 상품명 검색"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* ✅ 주문 상태 필터 */}
      <div className="flex flex-wrap gap-2 mt-4">
        {["전체", ...Object.values(statusMapping).map((s) => s.label)].map(
          (status) => (
            <button
              key={status}
              className={`px-4 py-2 text-sm rounded-lg ${
                selectedStatus === status
                  ? "bg-blue-500 text-white"
                  : "border border-gray-300"
              }`}
              onClick={() => setSelectedStatus(status)}
            >
              {status}
            </button>
          )
        )}
      </div>

      {/* ✅ 주문 목록 */}
      <div className="mt-6 space-y-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.orderNumber}
              className="border rounded-lg p-5 shadow-md bg-white"
            >
              {/* 주문 정보 */}
              <div className="border-b pb-2 mb-4">
                <p className="text-lg font-semibold">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-lg text-gray-600 mt-1">
                  주문 번호: {order.orderNumber}
                </p>
                <div className="flex justify-end">
                  <Link
                    to={`/order/${order.ordersId}`}
                    className="text-blue-500 text-lg hover:underline"
                  >
                    주문 상세보기
                  </Link>
                </div>
              </div>

              {/* ✅ 주문 상태 */}
              <p className="text-gray-500 text-sm mb-3">
                <span
                  className={`px-3 py-1 rounded-full ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusLabel(order.status)}
                </span>
              </p>

              {/* 주문 상품 목록 */}
              <div className="space-y-3 mt-3">
                {order.orderItems.map((item) => (
                  <div
                    key={item.orderDetailId}
                    className="flex items-center gap-4 border-b pb-3 last:border-none"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.pname}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{item.pname}</p>
                      <p className="text-gray-500 text-sm">
                        {item.price.toLocaleString()}원 × {item.quantity}개
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 총 결제 금액 */}
              <div className="flex justify-between mt-4 text-lg font-semibold">
                <p>총 결제 금액 :</p>
                <p className="text-blue-600">
                  {order.totalAmount.toLocaleString()}원
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">
            📦 해당 주문 내역이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistoryUI;
