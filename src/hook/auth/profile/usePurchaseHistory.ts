import { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../api/memberApi";
import { getCookie } from "../../../util/cookieUtill";

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

export const usePurchaseHistory = (memberId?: number | null) => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("전체");
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ API 호출 함수 (useCallback 적용)
  const fetchUserOrders = useCallback(async (id: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/order/member/${id}`, {
        headers: { Authorization: `Bearer ${getCookie("jwt")}` },
      });
      console.log("API 응답:", response.data);
      return response.data.data || [];
    } catch (error) {
      console.error("❌ 주문 내역 조회 실패:", error);
      return [];
    }
  }, []);

  // ✅ 주문 데이터 로드 (memberId 변경 시 실행)
  useEffect(() => {
    if (!memberId) return;
    const loadOrders = async () => {
      const data = await fetchUserOrders(memberId);
      setOrders(data);
    };
    loadOrders();
  }, [memberId, fetchUserOrders]);

  // ✅ 상태 매핑 (useMemo 최적화)
  const statusMap = useMemo(
    () => ({
      PENDING: "입금대기",
      PAID: "결제완료",
      SHIPPED: "배송중",
      DELIVERED: "배송완료",
      CANCELLED: "주문취소",
    }),
    []
  );

  // ✅ 상태 라벨 변환 (TypeScript 오류 해결)
  const getStatusLabel = useCallback(
    (status: string): string => statusMap[status as keyof typeof statusMap] || "미정",
    [statusMap]
  );

  // ✅ 상태별 색상 설정 (useCallback 적용)
  const getStatusColor = useCallback((status: string) => {
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
  }, []);

  // ✅ 필터링된 주문 목록 (useMemo 적용)
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.orderNumber?.includes(searchQuery) ||
        order.orderItems?.some((item) => item.pname?.includes(searchQuery));

      // ✅ `Object.keys(statusMap)` 대신 `Object.entries`를 사용하여 비교
      const matchesStatus =
        selectedStatus === "전체" ||
        Object.entries(statusMap).some(([key, value]) => key === order.status && value === selectedStatus);

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, selectedStatus, statusMap]); // ✅ statusMap을 의존성에서 제거

  return {
    orders: filteredOrders,
    selectedStatus,
    setSelectedStatus, // ✅ 불필요한 useCallback 제거
    searchQuery,
    setSearchQuery, // ✅ 불필요한 useCallback 제거
    getStatusLabel,
    getStatusColor,
  };
};
