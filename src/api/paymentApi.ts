import axios from "axios";
import { PaymentResult } from "../model/subscription";

const API_BASE_URL = "http://localhost:6060/api";

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