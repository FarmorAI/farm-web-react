import React from "react";

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

interface PurchaseHistoryUIProps {
  orders: OrderType[];
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  getStatusLabel: (status: string) => string;
  getStatusColor: (status: string) => string;
}

const PurchaseHistoryUI: React.FC<PurchaseHistoryUIProps> = ({
  orders,
  selectedStatus,
  setSelectedStatus,
  searchQuery,
  setSearchQuery,
  getStatusLabel,
  getStatusColor,
}) => {
  // 상태 필터 옵션
  const statusOptions = ["전체", "입금대기", "결제완료", "배송중", "배송완료", "주문취소"];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 card-hover">
      <h2 className="text-lg font-medium mb-4">구매 내역</h2>
      
      {/* 검색 및 필터 */}
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-2">
        <div className="flex gap-2">
          {statusOptions.map((status) => (
            <button
              key={status}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedStatus === status
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setSelectedStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="주문번호 또는 상품명 검색"
          className="px-3 py-1 border rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 주문 목록 */}
      {orders.length === 0 ? (
        <p className="text-center text-gray-500 py-4">구매 내역이 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.orderNumber} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="font-medium">주문번호: {order.orderNumber}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
              </div>
              
              {/* 주문 상품 목록 */}
              <div className="space-y-2">
                {order.orderItems.map((item) => (
                  <div key={item.orderDetailId} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="ml-2">{item.pname}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        {item.quantity}개
                      </span>
                    </div>
                    <span>{item.price.toLocaleString()}원</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-2 text-right font-medium">
                총 결제금액: {order.totalAmount.toLocaleString()}원
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchaseHistoryUI;