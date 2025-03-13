import React from "react";

interface OrderType {
  orderNumber: string;
  ordersId: number;
  totalAmount: number;
  createdAt: string;
  status: string;
  orderItems: {
    orderDetailId: number;
    productId: number;
    price: number;
    quantity: number;
    pname: string;
    imageUrl: string;
  }[];
}

interface OrderStatusCountsProps {
  orders: OrderType[];
}

const OrderStatusCounts: React.FC<OrderStatusCountsProps> = ({ orders }) => {
  // 상태별 주문 수 계산
  const statusCounts: Record<string, number> = {
    전체: orders.length,
    입금대기: orders.filter((order) => order.status === "PENDING").length,
    결제완료: orders.filter((order) => order.status === "PAID").length,
    배송중: orders.filter((order) => order.status === "SHIPPED").length,
    배송완료: orders.filter((order) => order.status === "DELIVERED").length,
    주문취소: orders.filter((order) => order.status === "CANCELLED").length,
  };
  return (
    <div className="flex justify-between items-center mt-4 p-4 bg-gray-50 rounded-lg">
      {["전체", "입금대기", "결제완료", "배송중", "배송완료", "주문취소"].map((status) => (
        <div key={status} className="flex flex-col items-center">
          <p className="text-2xl font-semibold text-gray-800">{statusCounts[status]}</p>
          <p className="text-sm text-gray-500">{status}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusCounts;