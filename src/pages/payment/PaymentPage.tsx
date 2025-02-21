import { useCallback, useEffect, useState } from 'react'
import { SubscriptionPlan } from '../../model/subscription';
import { useSearchParams } from 'react-router-dom';
import SubsCard from './SubsCard'
import PaymentForm from './PaymentForm';
import { handlePaymentNaver } from '../../api/paymentApi';

const PaymentPage = () => {
   const [searchParams] = useSearchParams();
   const [selectedPlan, setSelectedPlan] = useState<string>('선택없음');
   const [selectedPrice, setSelectedPrice] = useState<number>(0);
   const [termsChecked, setTermsChecked] = useState<boolean>(false);
   const [privacyChecked, setPrivacyChecked] = useState<boolean>(false);

   // 구독 상품 리스트
   const subsList: SubscriptionPlan[] = [
      {
         title: 'Basic',
         price: 1000,
         features: ['기본 리포트 제공', '스마트팜 관련 정보 제공', '이벤트 참여 가능']
      },
      {
         title: 'Premium',
         price: 2000,
         features: ['상세 리포트 제공', '스마트팜 관련 정보 및 AI서비스 제공', '이벤트 참여 가능']
      }
   ];


   // 카드 클릭 시, 상태 변경 (useCallback을 통해 렌더링 시, 함수 재생성 방지)
   const handleCardClick = useCallback((plan: string, price: number) => {
      setSelectedPlan(plan);
      setSelectedPrice(price);
   }, []);

   // searchParams 변경 시 동작
   useEffect(() => {
      const message = searchParams.get("message")
      if(message) { alert(message); }
   }, [searchParams]);

   const handlePayment = async() => {
      if(!termsChecked || !privacyChecked) {
         alert('이용약관과 개인정보처리방침에 동의해주세요!');
         return;
      }

      if(selectedPlan === '선택없음') {
         alert('구독 상품을 선택해주세요!');
         return;
      }

      try {
         await handlePaymentNaver(selectedPlan, selectedPrice);
      } catch (error) {
         console.error("결제요청 오류: ", error);
      }
   }

   return (
      <div className="container my-5" style={{ maxWidth: '800px' }}>
         <p className="text-center mb-2 fw-bold text-2xl">스마트팜 멤버십 구독</p>
         <p className="text-center mb-5 text-lg">지속 가능한 농업을 위한 합리적 선택</p>
         
         <div className="row g-4 mb-5">
            {subsList.map((plan, index) => (
               <SubsCard key={index} plan={plan} isSelected={selectedPlan === plan.title} onSelect={handleCardClick}/>
            ))}
         </div>

         <PaymentForm
            selectedPlan={selectedPlan}
            selectedPrice={selectedPrice}
            termsChecked={termsChecked}
            privacyChecked={privacyChecked}
            onTermsChange={setTermsChecked}
            onPrivacyChange={setPrivacyChecked}
            onPayment={handlePayment}
         />
      </div>
   )
}

export default PaymentPage