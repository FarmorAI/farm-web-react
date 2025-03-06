import axios from "axios";
import { API_BASE_URL } from "./memberApi";

/**
 * 파일 업로드 요청
 * @param files 업로드할 파일 리스트
 * @returns 업로드된 파일명 리스트
 */
export const uploadFiles = async (files: FileList | null): Promise<string[]> => {
    if (!files || files.length === 0) {
        return [];
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]); // 파일 배열 추가
    }

    try {
        const response = await axios.post<{ uploadedFiles: string[] }>(
            `${API_BASE_URL}/board/file/upload`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

        return response.data.uploadedFiles || [];
    } catch (error) {
        console.error("파일 업로드 중 오류 발생:", error);
        return [];
    }
};
