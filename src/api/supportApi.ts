import axios from "axios";
import { InsertSupport, Support, SupportListResponse } from "../model/contents";
import { API_BASE_URL } from "./memberApi";
import { getCookie } from "../util/cookieUtill";

export const getSupportList = async (
    pageParam: { page: number; size: number }): Promise<SupportListResponse[]> => {
        const { page, size } = pageParam;
        try {
            const response = await axios.get<SupportListResponse[]>(`${API_BASE_URL}/inquiry/list`, { 
                params: { page, size }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching support list", error);
            return [];
        }
};

export const getSupportById = async (id: number): Promise<Support | null> => {
    try {
        const response = await axios.get<Support>(`${API_BASE_URL}/inquiry/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching inquiry with ID ${id}:`, error);
        return null;
    }
};

export const insertSupport = async (
    insertParam: { category: string; title: string; content: string },
    token: string // ✅ 토큰 추가
): Promise<InsertSupport | null> => {
    const { category, title, content } = insertParam;
    try {
        const response = await axios.post<InsertSupport>(`${API_BASE_URL}/inquiry`, 
            { insertParam: { category, title, content } }, // ✅ 요청 바디
            { headers: { Authorization: `Bearer ${token}` } } // ✅ JWT 토큰 포함
        );
        return response.data;
    } catch (error) {
        console.error("Error inserting inquiry:", error);
        return null;
    }
};


export const deleteSupport = async (inquiryId: number): Promise<boolean> => {
    const token = getCookie("jwt");
    if (!token) {
        console.error("JWT 토큰이 없습니다.");
        return false;
    }
    try {
        await axios.delete(`${API_BASE_URL}/inquiry/${inquiryId}`, {headers: {Authorization: `Bearer ${token}`}});
        return true;
    } catch (error) {
        console.error(`문의사항 삭제 실패`, error);
        return false;
    }
}