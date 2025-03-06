import axios from "axios";
import {
    InsertNotice,
    Notice,
    NoticeListResponse,
} from "../model/contents";
import { API_BASE_URL } from "./memberApi";
import { getCookie } from "../util/cookieUtill.ts";

export const getNoticeList = async (pageParam: {
    page: number;
    size: number;
}): Promise<NoticeListResponse[]> => {
    const { page, size } = pageParam;
    try {
        const response = await axios.get<NoticeListResponse[]>(
            `${API_BASE_URL}/notice/list`,
            { params: { page, size } }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching notice list:", error);
        return [];
    }
};

export const getNoticeById = async (id: number): Promise<Notice | null> => {
    try {
        const response = await axios.get<Notice>(`${API_BASE_URL}/notice/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching notice with ID ${id}:`, error);
        return null;
    }
};

interface NoticeInsertData {
    title: string;
    content: string;
}

export const insertNotice = async (
    noticeData: NoticeInsertData,
    token: string
): Promise<InsertNotice | null> => {
    try {
        // 올바른 요청 형식
        const response = await axios.post<InsertNotice>(
            `${API_BASE_URL}/notice`,
            noticeData, // 기존 { noticeinsert: {title, content} } → { title, content }
            {
                headers: {
                    Authorization: `Bearer ${token}`, // JWT 추가
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("공지사항 등록 실패:", error);
        return null;
    }
};

export const deleteNotice = async (noticeId: number): Promise<boolean> => {
    const token = getCookie("jwt");
    if (!token) {
        console.error("JWT 토큰이 없습니다.");
        return false;
    }
    try {
        await axios.delete(`${API_BASE_URL}/notice/${noticeId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return true;
    } catch (error) {
        console.error(`공지사항 삭제 실패`, error);
        return false;
    }
};
export const updateNotice = async (noticeId: number, noticeData: { title: string; content: string }) => {
    const token = getCookie("jwt");
    if (!token) {
      console.error("🚨 JWT 토큰이 없습니다.");
      return false;
    }
  
    try {
      console.log("📡 공지사항 수정 요청 데이터:", noticeData.content); // ✅ 요청 데이터 확인
      console.log(noticeData.content);
      
      
  
      const response = await axios.put(`${API_BASE_URL}/notice/${noticeId}`, noticeData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log("✅ 서버 응답:", response.data); // ✅ 응답 확인
  
      return response.data.result === "success";
    } catch (error) {
      console.error("🚨 공지사항 수정 실패:", error);
      return false;
    }
  };
  
