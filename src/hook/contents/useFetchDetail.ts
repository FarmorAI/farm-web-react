import { useEffect, useState } from "react";
import { getBoardById, deleteBoard } from "../../api/boardApi";
import { getNoticeById, deleteNotice } from "../../api/noticeApi";
import { getSupportById, deleteSupport } from "../../api/supportApi";
import { Board, Notice, Support } from "../../model/contents";
import { useNavigate } from "react-router-dom";

interface UseDetailProps {
  type: "board" | "notice" | "support";
  id: number;
}

const useDetail = ({ type, id }: UseDetailProps) => {
  const [data, setData] = useState<Board | Notice | Support | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        if (type === "board") res = await getBoardById(id);
        else if (type === "notice") res = await getNoticeById(id);
        else res = await getSupportById(id);

        setData(res ?? null);
      } catch (error) {
        console.error(`${type} 데이터 불러오기 실패:`, error);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [type, id]);

  const deleteItem = async () => {
    let isDeleted = false;

    try {
      if (type === "board") isDeleted = await deleteBoard(id);
      else if (type === "notice") isDeleted = await deleteNotice(id);
      else isDeleted = await deleteSupport(id);

      if (isDeleted) {
        alert(`${type === "board" ? "게시글" : type === "notice" ? "공지사항" : "고객문의"}이(가) 삭제되었습니다.`);
        
        // ✅ 데이터를 `null`로 설정하여 불필요한 참조 제거
        setData(null);

        // ✅ 비동기 리디렉트 후 UI 업데이트를 위해 `await` 사용
        await new Promise((resolve) => setTimeout(resolve, 0));

        // ✅ 삭제 후 해당 리스트 페이지로 이동
        if (type === "support") {
          navigate("/support/list");  // 🔹 고객문의는 별도 경로로 이동
        } else {
          navigate(`/contents/${type}`);
        }
      } else {
        alert("삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error(`${type} 삭제 중 오류 발생:`, error);
    }
  };

  return { data, isLoading, deleteItem };
};

export default useDetail;
