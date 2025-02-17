import React from 'react'
import { PaymentFormProps } from '../../model/subscription'

const PaymentForm: React.FC<PaymentFormProps> = ({
   selectedPlan, selectedPrice,
   termsChecked, privacyChecked,
   onTermsChange, onPrivacyChange, onPayment
}) => {
   return (
      <div className="p-4 rounded border" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
         <h4 className="mb-4">결제 정보</h4>

         <form className="p-3 mb-3 bg-light">
            <p className="fw-bold">선택한 구독상품</p>
            <div className="d-flex justify-content-between mb-3 mt-2">
               <span id="selected-plan">{selectedPlan}</span>
               <div>
                  <span id="selected-price" className="fw-bold fs-5">₩{selectedPrice}</span>
                  <span style={{ fontSize: 'clamp(0.6rem, 1.0vw, 0.9rem)' }}>/월</span>
               </div>
            </div>

            <div className="form-check">
               <input type="checkbox" className="form-check-input" id="termsCheck"
                  checked={termsChecked} onChange={(e) => onTermsChange(e.target.checked)} required />
               <a href="#" data-bs-toggle="modal" data-bs-target="#termsModal">
                  이용약관
               </a>에 동의합니다.
            </div>

            <div className="form-check">
               <input type="checkbox" className="form-check-input" id="privacyCheck"
                  checked={privacyChecked} onChange={(e) => onPrivacyChange(e.target.checked)} required />
               <a href="#" data-bs-toggle="modal" data-bs-target="#privacyModal">
                  개인정보처리방침
               </a>에 동의합니다.
            </div>
         </form>

         <button id="naverPayBtn" className="btn btn-success w-100" onClick={onPayment}>
            네이버페이 결제
         </button>
      </div>
   )
}

export default PaymentForm