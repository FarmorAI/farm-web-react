import axios from "axios";
import { Board, BoardListResponse, InsertBoard } from "../model/contents";
import { API_BASE_URL } from "./memberApi";
import { getCookie } from "../util/cookieUtill";

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
): Promise<InsertBoard | null> => {
  try {
    // 올바른 요청 형식
    const response = await axios.post<InsertBoard>(
      `${API_BASE_URL}/board`,
      boardData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // JWT 추가
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("게시판 등록 실패:", error);
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


export const updateBoard = async (boardId: number, boardData: { title: string; content: string }) => {
  const token = getCookie("jwt");
  if (!token) {
    console.error("🚨 JWT 토큰이 없습니다.");
    return false;
  }

  try {
    console.log("📡 게시판 수정 요청 데이터:", boardData.content); // ✅ 요청 데이터 확인
    console.log(boardData.content);
    
    

    const response = await axios.put(`${API_BASE_URL}/board/${boardId}`, boardData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("✅ 서버 응답:", response.data); // ✅ 응답 확인

    return response.data.result === "success";
  } catch (error) {
    console.error("🚨 게시판 수정 실패:", error);
    return false;
  }
};
