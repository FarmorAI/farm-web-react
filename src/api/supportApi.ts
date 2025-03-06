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
    insertParam: { category: string;  title: string; content: string },
    token: string
): Promise<InsertSupport | null> => {
        const { category, title, content } = insertParam;
        try {
            const response = await axios.post<InsertSupport>(`${API_BASE_URL}/inquiry`, 
                { category, title, content },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            console.error("문의 작성 오류:", error);
            return null;
        }
}


export const deleteSupport = async (id: number): Promise<boolean> => {
    const token = getCookie("jwt");
    if (!token) {
        console.error("JWT 토큰 없음");
        return false;
    }

    try {
        const response = await axios.delete(`${API_BASE_URL}/inquiry/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.status === 200; // 성공 시 true
    } catch (error) {
        console.error(`문의 삭제 에러 ${id}:`, error);
        return false;
    }
}


export const updateSupport = async (
    id: number, updateParam: { category: string;  title: string; content: string, createAt: string }
): Promise<boolean> => {
    try {
        const response = await axios.put<Support>(`${API_BASE_URL}/inquiry/${id}`, {
            inquiryId: id,
            category: updateParam.category,
            title: updateParam.title,
            content: updateParam.content,
            createAt: updateParam.createAt
        });
        console.log(response.data)
        return response.status === 200;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update inquiry");
    }
}