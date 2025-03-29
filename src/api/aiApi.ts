import axios from "axios"
import { API_BASE_URL } from "./memberApi"
import { getCookie } from "../util/cookieUtill"

export interface AppleResult {
   aiResultId: number;
   appleResultId: number;
   redRatio: number;
   greenRatio: number;
   brownRatio: number;
   ripeness: number;
   grade: string;
   createdAt: string;
}
export interface AiListResponse {
   aiResultId: number
   createdAt: string
   imageUrl: string
   memberId: number
   rateA: number
   rateB: number
   rateS: number
   appleCount: number;
   redRatio: number;
   greenRatio: number;
   brownRatio: number;
   applesResults?: AppleResult[];
}


// AI 분석 결과 리스트 가져오기
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


// AI 분석 결과 가져오기
export const handleAiGetById = async (aiResultId: number) => {
   try {
      const response = await axios.get<AiListResponse>(
         `${API_BASE_URL}/ai/${aiResultId}`,
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


// AI 분석 결과 삭제하기
export const handleAiDelete = async (aiResultId: number) => {
   try {
      const response = await axios.delete<AiListResponse>(
         `${API_BASE_URL}/ai/${aiResultId}`,
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