import axios from "axios"
import { API_BASE_URL } from "./memberApi"
import { getCookie } from "../util/cookieUtill"

export interface AiListResponse {
   aiResultId: number 
   createdAt: string
   imageUrl: string
   memberId: number 
   rateA: number
   rateB: number
   rateS: number
}

export const handleAiList = async () => {
   try {
      const response = await axios.get<AiListResponse[]>(
         `${API_BASE_URL}/ai`,
         {
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${getCookie('jwt')}`
            }
         }
      )
      return response.data

   } catch (error) {
      console.error(error)
      throw error;
   }
}