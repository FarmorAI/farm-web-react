import React, { useState } from 'react'
import { PaymentResult } from '../../model/subscription'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const PaymentResultPage: React.FC = () => {
   const [searchParams] = useSearchParams()

   const datetime = (searchParams.get("resultCode") === "Success")
      ? new Date().toISOString().split('T')[0] : null

   const [paymentResult] = useState<PaymentResult>({
      subsPlan: searchParams.get("subsPlan"),
      subsPrice: searchParams.get("subsPrice"),
      resultCode: searchParams.get("resultCode"),
      paymentId: searchParams.get("paymentId")
   })

   return (
      <>
         <div className="mx-auto m-5 p-8 max-w-3xl rounded-lg shadow-md">
            <div className="flex items-center">
               <div>{paymentResult.resultCode}</div>
               <p className="text-gray-500">주문해 주셔서 감사합니다.</p>
            </div>

            <div className="border-t border-gray-200 my-3"></div>

            <div className="space-y-4">
               <h5 className="text-lg font-semibold">주문 정보</h5>
               <div className="grid grid-cols-2 gap-8">
                  <div>
                     <p className="mt-3 mb-1">주문번호</p>
                     <strong>{paymentResult.paymentId}</strong>
                     <p className="mt-3 mb-1">결제수단</p>
                     <strong>네이버페이</strong>
                  </div>
                  <div>
                     <p className="mt-3 mb-1">결제일자</p>
                     <strong>{datetime}</strong>
                     <p className="mt-3 mb-1">결제금액</p>
                     <strong>{paymentResult.subsPrice}원 (1개월)</strong>
                  </div>
               </div>
            </div>

            <div className="border-t border-gray-200 my-3"></div>

            <div className="space-y-4">
               <h5 className="text-lg font-semibold">구독 상품</h5>
               <div className="flex items-center gap-6">
                  <div className="w-24">
                     <img src="https://via.placeholder.com/100" className="rounded-lg w-full" alt="상품 이미지" />
                  </div>
                  <div className="flex-1">
                     <p className="font-semibold">{paymentResult.subsPlan} 구독</p>
                     <p className="text-gray-500">
                        구독 기간: 1개월<br />
                        월 {paymentResult.subsPrice}원
                     </p>
                  </div>
               </div>
            </div>

            <div className="border-t border-gray-200 my-3"></div>

            <div className="flex justify-center gap-4">
               <Link to="/">
                  <button className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
                     홈으로
                  </button>
               </Link>
               <Link to={`/api/users/payment/cancel?paymentId=${paymentResult.paymentId}&subsPrice=${paymentResult.subsPrice}&server=react`}>
                  <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                     결제취소
                  </button>
               </Link>
            </div>
         </div>
      </>
   )
}

export default PaymentResultPage