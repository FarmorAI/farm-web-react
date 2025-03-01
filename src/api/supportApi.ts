import axios from "axios";
import { InsertSupport, Support, SupportListResponse } from "../model/contents";
import { API_BASE_URL } from "./memberApi";

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
    insertParam: { category: string;  title: string; content: string }): Promise<InsertSupport | null> => {
        const { category, title, content } = insertParam;
        try {
            const response = await axios.post<InsertSupport>(`${API_BASE_URL}/inquiry`, { 
                insertParam: { category, title, content }
            });
            return response.data;
        } catch (error) {
            console.error("Error inserting inquiry:", error);
            return null;
        }
}