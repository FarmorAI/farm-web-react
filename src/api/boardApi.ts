import axios from "axios";
import { Board, BoardListResponse } from "../model/contents";

const API_BASE_URL = "http://localhost:6060/api";


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


