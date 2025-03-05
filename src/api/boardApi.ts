import axios from "axios";
import { Board, BoardListResponse } from "../model/contents";
import { API_BASE_URL } from "./memberApi";

export const getBoardList = async (pageParam: {
  page: number;
  size: number;
}): Promise<BoardListResponse[] | null> => {
  const { page, size } = pageParam;
  try {
    const response = await axios.get<BoardListResponse[]>(
      `${API_BASE_URL}/board/list`,
      { params: { page, size } }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching board list:", error);
    return [];
  }
};

export const getBoardById = async (id: number): Promise<Board | null> => {
  try {
    const response = await axios.get<Board>(`${API_BASE_URL}/board/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching board with ID ${id}:`, error);
    return null;
  }
};

interface BoardInsertData {
  title: string;
  content: string;
  files?: FileList | null;
}

// 게시글 등록 (파일 포함 가능)
export const insertBoard = async (
  boardData: BoardInsertData,
  token: string
): Promise<{ result: string; uploadedFiles?: string[] } | null> => {
  try {
    // FormData 객체 생성
    const formData = new FormData();

    // board JSON을 String으로 변환 후 추가
    formData.append(
      "board",
      JSON.stringify({ title: boardData.title, content: boardData.content })
    );

    // 파일이 있을 경우 추가
    if (boardData.files) {
      Array.from(boardData.files).forEach((file) => {
        formData.append("files", file);
      });
    }

    // 요청 보내기 (multipart/form-data)
    const response = await axios.post<{
      result: string;
      uploadedFiles?: string[];
    }>(`${API_BASE_URL}/board`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // JWT 토큰 추가
        "Content-Type": "multipart/form-data", // ⬅️ multipart/form-data로 변경
      },
    });

    return response.data;
  } catch (error) {
    console.error("게시글 등록 실패:", error);
    return null;
  }
};

/**
 * 게시글 삭제
 */
export const deleteBoard = async (id: number): Promise<boolean> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/board/${id}`);
    return response.status === 200; // 성공 시 true 반환
  } catch (error) {
    console.error(`Error deleting board with ID ${id}:`, error);
    return false;
  }
};
