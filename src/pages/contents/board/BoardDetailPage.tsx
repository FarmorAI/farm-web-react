import { useParams } from "react-router-dom";
import BoardDetail from "../../../components/contents/board/BoardDetail";

const BoardDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return <BoardDetail boardId={id ? parseInt(id, 10) : undefined} />;
};

export default BoardDetailPage;
