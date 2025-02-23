import axios from "axios";
import { API_BASE_URL } from "./memberApi";


export const detectObjects = async (imageFile: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
        const response = await axios.post(`${API_BASE_URL}/detect`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            responseType: "blob",  // 이미지 데이터를 Blob 형태로 받아옴
        });
        return URL.createObjectURL(response.data);  // 이미지 URL 생성
    } catch (error) {
        console.error("Error detecting objects:", error);
        return null;
    }
};