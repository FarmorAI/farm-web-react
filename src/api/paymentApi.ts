import axios from "axios";
import { PaymentResult } from "../model/subscription";
import { API_BASE_URL } from "./memberApi";
import { getCookie } from "../util/cookieUtill";


export const handlePaymentNaver = async(selectedPlan: string, selectedPrice: number): Promise<void> => {
   const response = await axios.post(`${API_BASE_URL}/payment/naverpay`, {
      subsPlan: selectedPlan,
      subsPrice: selectedPrice
   }, {
      headers: { 
         "Content-Type": "application/json", 
         "Authorization": `Bearer ${getCookie("jwt")}`
      }
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