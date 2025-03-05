import { useEffect, useState } from "react";
import { getCookie } from "../../util/cookieUtill";
import { getBoardList } from "../../api/boardApi";
import { getNoticeList } from "../../api/noticeApi";
import { getSupportList } from "../../api/supportApi";
import {
  BoardListResponse,
  NoticeListResponse,
  SupportListResponse,
} from "../../model/contents";

interface FetchListProps {
  type: "board" | "notice" | "support";
  page: number;
  size: number;
  refresh: boolean;
}

// 🔹 `T`를 제네릭으로 추가하여 반환 타입을 지정할 수 있도록 변경
const useFetchList = <
  T extends BoardListResponse | NoticeListResponse | SupportListResponse
>({
  type,
  page,
  size,
  refresh,
}: FetchListProps) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = getCookie("jwt");
    setIsLoggedIn(!!token);

    const fetchData = async () => {
      try {
        let res;
        if (type === "board") {
          res = await getBoardList({ page, size });
        } else if (type === "notice") {
          res = await getNoticeList({ page, size });
        } else {
          res = await getSupportList({ page, size }); // 🔹 고객문의 API 추가
        }
        setData((Array.isArray(res) ? res[0] : res) as T);
      } catch (error) {
        console.error(`Error fetching ${type} list:`, error);
        setData(null);
      }
    };

    fetchData();
  }, [type, page, size, refresh]);

  return { data, isLoggedIn };
};

export default useFetchList;
