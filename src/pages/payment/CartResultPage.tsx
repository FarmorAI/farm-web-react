import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { CartItemType } from '../../model/product'

const CartResultPage: React.FC = () => {
    const [searchParams] = useSearchParams();

    // 결제 성공 여부 확인
    const isSuccess = searchParams.get("resultCode") === "Success";

    // 결제 시간 설정
    const datetime = isSuccess ? new Date().toISOString().split('T')[0] : null;

    // 결제 결과 상태 저장
    const [paymentResult] = useState({
        orderId: searchParams.get("paymentId"),
        totalAmount: searchParams.get("subsPrice"),
        resultCode: searchParams.get("resultCode"),
        items: JSON.parse(searchParams.get("items") || "[]") as CartItemType[],
    });

    return (
        <div className="mx-auto m-5 p-8 max-w-3xl rounded-lg shadow-md">
            <div className="flex items-center">
                <div className={`text-lg font-semibold ${isSuccess ? "text-green-500" : "text-red-500"}`}>
                    {isSuccess ? "🎉 결제가 완료되었습니다!" : "⚠️ 결제에 실패했습니다."}
                </div>
            </div>

            <div className="border-t border-gray-200 my-3"></div>

            <div className="space-y-4">
                <h5 className="text-lg font-semibold">🧾 주문 정보</h5>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <p className="mt-3 mb-1">🆔 주문번호</p>
                        <strong>{paymentResult.orderId}</strong>
                        <p className="mt-3 mb-1">💳 결제수단</p>
                        <strong>네이버페이</strong>
                    </div>
                    <div>
                        <p className="mt-3 mb-1">📅 결제일자</p>
                        <strong>{datetime}</strong>
                        <p className="mt-3 mb-1">💰 결제금액</p>
                        <strong>{paymentResult.totalAmount}원</strong>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 my-3"></div>

            <div className="space-y-4">
                <h5 className="text-lg font-semibold">🛒 구매한 상품</h5>
                {paymentResult.items.length > 0 ? (
                    <ul className="space-y-3">
                        {paymentResult.items.map((item, index) => (
                            <li key={index} className="flex items-center gap-6 border p-3 rounded-md">
                                <div className="w-24">
                                    <img src={item.imageUrl} className="rounded-lg w-full" alt={item.name} />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-gray-500">
                                        {item.quantity}개 x {item.price.toLocaleString()}원
                                    </p>
                                </div>
                                <strong>{(item.price * item.quantity).toLocaleString()}원</strong>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">구매한 상품이 없습니다.</p>
                )}
            </div>

            <div className="border-t border-gray-200 my-3"></div>

            <div className="flex justify-center gap-4">
                <Link to="/">
                    <button className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
                        홈으로
                    </button>
                </Link>
                {isSuccess && (
                    <Link to="/orders">
                        <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                            주문 내역 보기
                        </button>
                    </Link>
                )}
                {/*{!isSuccess && (*/}
                {/*    <button className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"*/}
                {/*            onClick={() => handlePaymentCancel(paymentResult)}>*/}
                {/*        다시 결제하기*/}
                {/*    </button>*/}
                {/*)}*/}
            </div>
        </div>
    );
};

export default CartResultPage;