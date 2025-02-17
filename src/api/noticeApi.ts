import axios from "axios";
import {Notice, NoticeListResponse} from "../model/contents";

const API_BASE_URL = "http://localhost:6060/api";

  export const getNoticeList = async (pageParam): Promise<NoticeListResponse[]> => {
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
