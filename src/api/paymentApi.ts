import axios from "axios";
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

export const handlePaymentCancel = async(token: string) => {
   try {
      const response = await axios.post(`${API_BASE_URL}/payment/cancel`, { token });
      alert(response.data.result + " 결제 취소 완료!");
   } catch (error) {
      console.log(error);
   }
}