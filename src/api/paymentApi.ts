import axios from "axios";
import { PaymentResult } from "../model/subscription";
import { API_BASE_URL } from "./memberApi";


export const handlePaymentNaver = async(selectedPlan: string, selectedPrice: number): Promise<void> => {
   const response = await axios.post(`${API_BASE_URL}/payment/naverpay`, {
      subsPlan: selectedPlan,
      subsPrice: selectedPrice
   })
   const result = await response.data
   window.location.href = `https://test-m.pay.naver.com/payments/${result.body.reserveId}`
}

export const handlePaymentCancel = async(paymentResult: PaymentResult) => {
   try {
      const response = await axios.post(`${API_BASE_URL}/payment/cancel`, {
         paymentId: paymentResult.paymentId,
         subsPlan: paymentResult.subsPlan,
         subsPrice: paymentResult.subsPrice
      });
      alert(response.data.result);
   } catch (error) {
      console.log(error);
   }
}