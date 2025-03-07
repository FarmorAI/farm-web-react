import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_SPRING_API_URL}/api`;

export const fetchDistributionData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/distribution/get`);
        console.log("정규분포 데이터:", response.data);
        return response.data; // JSON 데이터 반환
    } catch (error) {
        console.error("정규분포 데이터를 불러오는 중 오류 발생:", error);
        return [];
    }
};
