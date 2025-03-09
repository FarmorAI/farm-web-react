import {CartItemType} from "../../model/product";
import axios from "axios";
import {API_BASE_URL} from "../../api/memberApi.ts";
import {getCookie} from "../../util/cookieUtill.ts";

interface ProductCartUIProps {
    cart: CartItemType[];
    selectedItems: number[];
    totalPrice: number;
    totalShippingFee: number;
    finalPrice: number;
    handleSelectAll: (checked: boolean) => void;
    handleSelectItem: (id: number) => void;
    handleQuantityChange: (id: number, amount: number) => void;
    handleDelete: (id: number) => void;
    handleDeleteSelected: () => void;
}

const ProductCart: React.FC<ProductCartUIProps> = ({
                                                       cart,
                                                       selectedItems,
                                                       totalPrice,
                                                       totalShippingFee,
                                                       finalPrice,
                                                       handleSelectAll,
                                                       handleSelectItem,
                                                       handleQuantityChange,
                                                       handleDelete,
                                                       handleDeleteSelected,
                                                   }) => {
    // ✅ 각 상품의 총 가격 (상품 가격 × 수량)
    const getItemTotal = (item: CartItemType) => item.price * item.quantity;

    // ✅ 개별 상품 기준으로 배송비 적용 (3만 원 이상 무료, 미만 3천 원)
    const getShippingFee = (item: CartItemType) =>
        getItemTotal(item) >= 30000 ? 0 : 3000;

    const handlePaymentNaver = async (selectedItems: CartItemType[]): Promise<void> => {
        if (selectedItems.length === 0) {
            alert("결제할 상품을 선택해주세요.");
            return;
        }
        console.log("선택된 상품:", selectedItems);
        try {
            // ✅ 주문 생성 요청 (배송비 포함)
            const orderResponse = await axios.post(`${API_BASE_URL}/order`, {
                orderItems: selectedItems.map((item) => ({
                    productId: item.productId,
                    price: item.price,
                    quantity: item.quantity,
                })),
                totalAmount: selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
                shippingFee: totalShippingFee,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie("jwt")}`,
                }
            });
            console.log(orderResponse);
            // ✅ 네이버페이 결제 요청 (주문 ID 포함)
            const paymentResponse = await axios.post(`${API_BASE_URL}/payment/naverpay/cart`, {
                items: selectedItems.map((item) => ({
                    productId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
                totalShippingFee: totalShippingFee,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie("jwt")}`,
                }
            });

            // ✅ 백엔드 응답 확인
            console.log("백엔드 응답:", paymentResponse.data);

            // ✅ 네이버페이 리다이렉트 URL 확인
            const { reserveId } = paymentResponse.data.body;
            if (!reserveId) {
                throw new Error("reserveId가 응답에 없습니다.");
            }

            // ✅ 네이버페이 결제 페이지로 이동
            const reserveUrl = `https://test-m.pay.naver.com/payments/${reserveId}`;
            window.location.href = reserveUrl;

        } catch (error) {
            console.error("네이버페이 결제 오류:", error);
            alert("결제 요청에 실패했습니다.");
        }
    };

    // ✅ 선택된 상품만 필터링
    const selectedCartItems = cart.filter((item) => selectedItems.includes(item.id));

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">장바구니</h1>
            <div className="bg-white shadow overflow-hidden rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                            <input
                                type="checkbox"
                                onChange={(e) => handleSelectAll(e.target.checked)}
                                checked={selectedItems.length === cart.length && cart.length > 0}
                                className="h-4 w-4 text-custom border-gray-300 rounded"
                            />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                            상품 정보
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                            수량
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                            상품금액
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                            합계
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                            배송비
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                            삭제
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {cart.map((item) => (
                        <tr key={item.id}>
                            <td className="px-6 py-4">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(item.id)}
                                    onChange={() => handleSelectItem(item.id)}
                                    className="h-4 w-4 text-custom border-gray-300 rounded"
                                />
                            </td>
                            <td className="px-6 py-4 flex items-center">
                                <img
                                    className="h-20 w-20 object-cover"
                                    src={item.imageUrl}
                                    alt={item.name}
                                />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                    <p className="text-sm text-gray-500">{item.option}</p>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleQuantityChange(item.id, -1)}
                                        className="border border-gray-300 px-2 py-1 text-sm"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="text"
                                        value={item.quantity}
                                        readOnly
                                        className="w-12 text-center mx-2 border-gray-300 rounded-md"
                                    />
                                    <button
                                        onClick={() => handleQuantityChange(item.id, 1)}
                                        className="border border-gray-300 px-2 py-1 text-sm"
                                    >
                                        +
                                    </button>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                {item.price.toLocaleString()}원
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                {getItemTotal(item).toLocaleString()}원
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                {getShippingFee(item) === 0 ? (
                                    <span className="text-green-500 font-semibold">
                      ✅ 무료배송 적용
                    </span>
                                ) : (
                                    <>
                      <span className="text-red-500 font-semibold">
                        {getShippingFee(item).toLocaleString()}원
                      </span>
                                        <p className="text-xs text-gray-500 mt-1">
                                            🚚 30,000원 이상 무료배송
                                        </p>
                                    </>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="text-red-500 hover:text-red-700 text-sm"
                                >
                                    삭제
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-between">
                <button
                    onClick={handleDeleteSelected}
                    className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-red-600"
                    disabled={selectedItems.length === 0}
                >
                    선택 상품 삭제
                </button>
            </div>
            <div className="bg-white shadow rounded-lg p-6 mt-8">
                <div className="flex justify-center items-center">
                    <div className="flex space-x-12">
                        <div>
                            <p className="text-base text-gray-500">
                                총 {selectedItems.length} 개의 상품금액
                            </p>
                            <p className="mt-2 text-2xl font-semibold text-gray-900">
                                {totalPrice.toLocaleString()}원
                            </p>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-plus text-gray-400 mx-6 text-xl"></i>
                        </div>
                        <div>
                            <p className="text-base text-gray-500">배송비</p>
                            <p className="mt-2 text-2xl font-semibold text-gray-900">
                                {totalShippingFee === 0 ? "무료" : `${totalShippingFee.toLocaleString()}원`}
                            </p>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-equals text-gray-400 mx-6 text-xl"></i>
                        </div>
                        <div>
                            <p className="text-base text-gray-500">결제예정금액</p>
                            <p className="mt-2 text-2xl font-semibold text-custom">
                                {finalPrice.toLocaleString()}원
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex justify-end">
                <button
                    className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 mr-4"
                    disabled={selectedItems.length === 0}
                    onClick={() => handlePaymentNaver(selectedCartItems)} // 선택 상품 결제
                >
                    선택 상품 주문
                </button>
                <button
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    disabled={cart.length === 0}
                    onClick={() => handlePaymentNaver(selectedCartItems)} // 선택된 상품만 결제
                >
                    전체 상품 주문
                </button>
            </div>
        </main>
    );
};

export default ProductCart;