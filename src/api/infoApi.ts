import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_SPRING_API_URL}/api`;

export const fetchBlogData = async (query: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/info`, {
            params: { query },
        });
        console.log("블로그 정보 :", response.data.documents)
        return response.data.documents; // 블로그 데이터 배열 반환
    } catch (error) {
        console.error("블로그 데이터를 불러오는 중 오류 발생:", error);
        return [];
    }
};
