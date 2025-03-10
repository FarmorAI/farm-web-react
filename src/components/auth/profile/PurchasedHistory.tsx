import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../api/memberApi.ts";
import { getCookie } from "../../../util/cookieUtill.ts";
import axios from "axios";
import { Link } from "react-router-dom";

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

const PurchaseHistory: React.FC<{ memberId?: number | null }> = ({ memberId }) => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUserOrders = async (memberId: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/order/member/${memberId}`, {
        headers: { Authorization: `Bearer ${getCookie("jwt")}` },
      });
      console.log("API 응답:", response.data);
      return response.data.data || [];
    } catch (error) {
      console.error("❌ 주문 내역 조회 실패:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadOrders = async () => {
      const data = await fetchUserOrders(memberId || 0);
      setOrders(data);
    };
    loadOrders();
  }, [memberId]);

  // ✅ 주문 상태를 한글로 변환하는 함수
  const getStatusLabel = (status: string): string => {
    const statusMap: { [key: string]: string } = {
      PENDING: "입금대기",
      PAID: "결제완료",
      SHIPPED: "배송중",
      DELIVERED: "배송완료",
      CANCELLED: "주문취소",
    };
    return statusMap[status] || "미정";
  };

  // ✅ 상태별 CSS 적용
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-700";
      case "SHIPPED":
        return "bg-blue-100 text-blue-700";
      case "DELIVERED":
        return "bg-gray-100 text-gray-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  // ✅ 검색 및 상태 필터링
  const filteredOrders = (orders || []).filter((order) => {
    const matchesSearch =
        (order.orderNumber?.includes(searchQuery) ?? false) ||
        (order.orderItems?.some((item) => item.pname?.includes(searchQuery)) ?? false);

    const matchesStatus = selectedStatus === "전체" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium">📦 내 주문 내역</h2>

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

        {/* 주문 상태 필터 */}
        <div className="flex flex-wrap gap-2 mt-4">
          {["전체", "결제완료", "배송중", "배송완료", "주문취소"].map((status) => (
              <button
                  key={status}
                  className={`px-4 py-2 text-sm rounded-lg ${
                      selectedStatus === status ? "bg-blue-500 text-white" : "border border-gray-300"
                  }`}
                  onClick={() => setSelectedStatus(status)}
              >
                {status}
              </button>
          ))}
        </div>

        {/* ✅ 주문 목록 */}
        <div className="mt-6 space-y-6">
          {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                  <div key={order.ordersId} className="border rounded-lg p-5 shadow-md bg-white">
                    {/* 주문 상단 정보 */}
                   <div className="border-b pb-2 mb-4">
                      <p className="text-lg font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
                      <p className="text-lg text-gray-600 mt-1">주문 번호: {order.orderNumber || "N/A"}</p>
                      <div className="flex justify-end">
                        <Link to={`/order/${order.ordersId}`} className="text-blue-500 text-lg hover:underline">
                          주문 상세보기
                        </Link>
                      </div>
                    </div>

                    {/* 주문 상태 */}
                    <p className="text-gray-500 text-sm mb-3">
                <span className={`px-2 py-1 rounded ${getStatusColor(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
                    </p>

                    {/* 주문 상품 목록 */}
                    <div className="space-y-3 mt-3">
                      {order.orderItems?.map((item) => (
                          <div key={item.orderDetailId} className="flex items-center gap-4 border-b pb-3 last:border-none">
                            <img src={item.imageUrl} alt={item.pname} className="w-16 h-16 object-cover rounded-md" />
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
                      <p className="text-blue-600">{order.totalAmount.toLocaleString()}원</p>
                    </div>

                    {/* 하단 버튼 */}
                    <div className="flex justify-between mt-4">
                      <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100">
                        주문취소
                      </button>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        배송조회
                      </button>
                    </div>
                  </div>
              ))
          ) : (
              <p className="text-center text-gray-500 mt-4">📦 주문 내역이 없습니다.</p>
          )}
        </div>
      </div>
  );
};

export default PurchaseHistory;