import { useParams } from "react-router-dom";
import NoticeDetail from "../../../components/contents/notice/NoticeDetail";

const NoticeDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return <NoticeDetail noticeId={id ? parseInt(id, 10) : undefined} />;
};

export default NoticeDetailPage;
