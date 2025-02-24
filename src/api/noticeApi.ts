import axios from "axios";
import { InsertNotice, Notice, NoticeListResponse} from "../model/contents";
import { API_BASE_URL } from "./memberApi";



  export const getNoticeList = async (pageParam : { page: number; size: number }): Promise<NoticeListResponse[]> => {
    const { page, size } = pageParam;
    try {
      const response = await axios.get<NoticeListResponse[]>(`${API_BASE_URL}/notice/list`, {params : {page, size}});
      return response.data;
    } catch (error) {
      console.error("Error fetching notice list:", error);
      return [];
    }
  };

export const getNoticeById = async (id: number): Promise<Notice | null> => {
  try {
    const response = await axios.get<Notice>(`${API_BASE_URL}/notice/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching notice with ID ${id}:`, error);
    return null;
  }
};

export const insertNotice = async (noticeinsert: {title: string; content:string }): Promise<InsertNotice | null> => {
  const { title, content } = noticeinsert;
  try {
    const response = await axios.post<InsertNotice>(`${API_BASE_URL}/notice`, {noticeinsert: {title, content}});
    return response.data;
  } catch (error) {
    console.error("Error inserting notice:", error);
    return null;
  }
}