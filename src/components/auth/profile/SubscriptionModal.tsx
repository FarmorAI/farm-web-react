import React from 'react'
import { GetSubs } from '../../../api/authApi';
import { handlePaymentCancel } from '../../../api/paymentApi';
import { PaymentResult } from '../../../model/subscription';
import premium from '/assets/images/subs/gold_premium.png';
import basic from '/assets/images/subs/apple_basic.png';

interface SubscriptionModalProps {
   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
   paymentResult: GetSubs | null;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ setIsModalOpen, paymentResult }) => {
   const cancelParam: PaymentResult = paymentResult ? {
      subsPlan: paymentResult.planName,
      subsPrice: String(paymentResult.amount),
      resultCode: paymentResult.token,
      paymentId: String(paymentResult.paymentId)
   } : {
      subsPlan: "N/A",
      subsPrice: "N/A",
      resultCode: "N/A",
      paymentId: "N/A"
   };

   return (
      <div
         className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
         onClick={() => setIsModalOpen(false)} // 바깥 클릭 시 닫힘
      >
         <div
            className="bg-white p-6 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록 설정
         >
            {paymentResult ? (
               <div className="mx-auto p-5 max-w-3xl rounded-lg shadow-md">
                  <div className="space-y-4">
                     <h5 className="text-lg font-semibold">구독 관리</h5>
                     <p className="text-gray-700">구독을 취소하거나 변경할 수 있습니다.</p>
                     <div className="grid grid-cols-2 gap-8">
                        <div>
                           <p className="mt-3 mb-1">주문번호</p>
                           <strong>{paymentResult.token}</strong>
                           <p className="mt-3 mb-1">결제수단</p>
                           <strong>네이버페이</strong>
                        </div>
                        <div>
                           <p className="mt-3 mb-1">결제일자</p>
                           <strong>{paymentResult.createdAt}</strong>
                           <p className="mt-3 mb-1">결제금액</p>
                           <strong>{paymentResult.amount}원 (1개월)</strong>
                        </div>
                     </div>
                  </div>

                  <div className="border-t border-gray-200 my-3"></div>

                  <div className="space-y-4">
                     <h5 className="text-lg font-semibold">구독 상품</h5>
                     <div className="flex items-center gap-6">
                        <div className="w-24">
                           <img src={paymentResult.planName == 'Basic' ? basic:premium} className="rounded-lg w-full" alt="상품 이미지" />
                        </div>
                        <div className="flex-1">
                           <p className="font-semibold">{paymentResult.planName} 구독</p>
                           <p className="text-gray-500">
                              구독 기간: 1개월<br />
                              구독 가격: {paymentResult.amount}원/월
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className="border-t border-gray-200 my-3"></div>
                  <div className="flex justify-center gap-4">
                     <button className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-green-700 transition-colors"
                        onClick={() => handlePaymentCancel(cancelParam)}>
                           결제취소
                     </button>
                     <button onClick={() => setIsModalOpen(false)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors">
                           닫기
                     </button>
                  </div>
               </div>
            ) : (
               <p>구독 정보 불러오는 중...</p>
            )}
         </div>
      </div>
   )
}

export default SubscriptionModal