import { useState } from "react";
interface CartItemType {
    id: number;
    name: string;
    option: string;
    price: number;
    quantity: number;
    imageUrl: string;
}
const initialCart: CartItemType[] = [
    {
        id: 1,
        name: "유어플 비타민D 레몬맛[1개월분]",
        option: "옵션없음",
        price: 10000,
        quantity: 1,
        imageUrl: "https://via.placeholder.com/100",
    },
    {
        id: 2,
        name: "프리미엄 오메가3 1000mg",
        option: "60캡슐",
        price: 35000,
        quantity: 1,
        imageUrl: "https://via.placeholder.com/100",
    },
    {
        id: 3,
        name: "칼슘 마그네슘 플러스",
        option: "90정",
        price: 25000,
        quantity: 2,
        imageUrl: "https://via.placeholder.com/100",
    },
    {
        id: 4,
        name: "프로바이오틱스 플로라",
        option: "30포",
        price: 18000,
        quantity: 1,
        imageUrl: "https://via.placeholder.com/100",
    },
    {
        id: 5,
        name: "코엔자임 Q10 100mg",
        option: "60캡슐",
        price: 40000,
        quantity: 1,
        imageUrl: "https://via.placeholder.com/100",
    },
    {
        id: 6,
        name: "루테인 플러스 아스타잔틴",
        option: "50정",
        price: 30000,
        quantity: 1,
        imageUrl: "https://via.placeholder.com/100",
    },
    {
        id: 7,
        name: "멀티비타민 에너지",
        option: "120정",
        price: 45000,
        quantity: 1,
        imageUrl: "https://via.placeholder.com/100",
    },
];
const ProductCartPage = () => {
    const [cart, setCart] = useState<CartItemType[]>(initialCart);
    const [selectedItems, setSelectedItems] = useState<number[]>(
        initialCart.map((item) => item.id)
    ); // 초기값으로 모든 아이템 선택
    // :흰색_확인_표시: 수량 변경 핸들러
    const handleQuantityChange = (id: number, amount: number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + amount) }
                    : item
            )
        );
    };
    // :흰색_확인_표시: 전체 선택/해제 핸들러
    const handleSelectAll = (checked: boolean) => {
        setSelectedItems(checked ? cart.map((item) => item.id) : []);
    };
    // :흰색_확인_표시: 개별 선택/해제 핸들러
    const handleSelectItem = (id: number) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((itemId) => itemId !== id)
                : [...prevSelected, id]
        );
    };
    // :흰색_확인_표시: 선택된 상품 삭제 핸들러
    const handleDelete = (id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
        setSelectedItems((prevSelected) =>
            prevSelected.filter((itemId) => itemId !== id)
        );
    };
    // :흰색_확인_표시: 선택된 상품 삭제
    const handleDeleteSelected = () => {
        setCart((prevCart) =>
            prevCart.filter((item) => !selectedItems.includes(item.id))
        );
        setSelectedItems([]);
    };
    // :흰색_확인_표시: 각 상품의 총 가격 (상품 가격 × 수량)
    const getItemTotal = (item: CartItemType) => item.price * item.quantity;
    // :흰색_확인_표시: 개별 상품 기준으로 배송비 적용 (3만 원 이상 무료, 미만 3천 원)
    const getShippingFee = (item: CartItemType) =>
        getItemTotal(item) >= 30000 ? 0 : 3000;
    // :흰색_확인_표시: 선택된 상품만 필터링 (하단 계산용)
    const selectedCart = cart.filter((item) => selectedItems.includes(item.id));
    // :흰색_확인_표시: 선택된 상품의 총 가격 계산
    const totalPrice = selectedCart.reduce(
        (acc, item) => acc + getItemTotal(item),
        0
    );
    // :흰색_확인_표시: 선택된 상품의 전체 배송비 합산
    const totalShippingFee = selectedCart.reduce(
        (acc, item) => acc + getShippingFee(item),
        0
    );
    // :흰색_확인_표시: 최종 결제 금액
    const finalPrice = totalPrice + totalShippingFee;
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
                                checked={
                                    selectedItems.length === cart.length && cart.length > 0
                                }
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
                                    <p className="text-sm font-medium text-gray-900">
                                        {item.name}
                                    </p>
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
                            ✅ 무료배송 적용,
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
            {/* :흰색_확인_표시: 선택 상품 삭제 버튼 */}
            <div className="mt-4 flex justify-between">
                <button
                    onClick={handleDeleteSelected}
                    className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-red-600"
                    disabled={selectedItems.length === 0}
                >
                    선택 상품 삭제
                </button>
            </div>
            {/* :흰색_확인_표시: 주문 요약 */}
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
                                {totalShippingFee === 0
                                    ? "무료"
                                    : `${totalShippingFee.toLocaleString()}원`}
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
            {/* :흰색_확인_표시: 주문 버튼 */}
            <div className="mt-8 flex justify-end">
                <button
                    className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 mr-4"
                    disabled={selectedItems.length === 0}
                >
                    선택 상품 주문
                </button>
                <button
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    disabled={cart.length === 0}
                >
                    전체 상품 주문
                </button>
            </div>
        </main>
    );
};
export default ProductCartPage;