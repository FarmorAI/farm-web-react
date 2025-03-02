import axios from "axios";
import { Board, BoardListResponse, InsertBoard } from "../model/contents";
import { API_BASE_URL } from "./memberApi";


export const getBoardList = async (pageParam: {page: number; size:number }): Promise<BoardListResponse[] | null> =>{
  const {page, size} = pageParam;
  try {
    const response= await axios.get<BoardListResponse[]>(`${API_BASE_URL}/board/list`, {params : {page, size}});
    return response.data;
  } catch (error) {
    console.error("Error fetching board list:", error);
    return [];
  }
}

export const getBoardById = async (id: number) : Promise<Board | null> =>{
  try {
    const response = await axios.get<Board>(`${API_BASE_URL}/board/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching board with ID ${id}:`, error);
    return null;
  }
}

interface BoardInsertData {
  title: string;
  content: string;
}


/**
 * 게시글 추가 (파일 포함 가능)
 */
export const insertBoard = async (boardData: BoardInsertData, token : string): Promise<InsertBoard| null> => {
  try {
      // 올바른 요청 형식
      const response = await axios.post<InsertBoard>(
          `${API_BASE_URL}/board`,
          boardData, // 기존 { boardinsert: {title, content} } → { title, content }
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