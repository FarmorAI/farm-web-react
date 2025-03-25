import { useParams } from "react-router-dom";
import DetailComponent from "../../../components/contents/DetailComponent";

const BoardDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>잘못된 접근입니다.</div>; // ✅ `id`가 없는 경우 예외 처리
  }
  return (
      <div>
        {/* 게시글 상세 컴포넌트 */}
        <DetailComponent type="board" id={parseInt(id, 10)} />
      </div>
  );
};

export default BoardDetailPage;