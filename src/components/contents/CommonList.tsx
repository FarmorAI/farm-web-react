import { useParams } from "react-router-dom";
import PageLayout from "../pagelayout/PageLayout.tsx";
import ListComponent from "./ListComponent";
import DetailComponent from "./DetailComponent.tsx";

interface CommonListPageProps {
  title: string;
  activeItem: string;
}

const CommonContents = ({ title, activeItem }: CommonListPageProps) => {
  const { id } = useParams<{ id?: string }>(); // ✅ URL에서 ID 가져오기
  const parsedId = id ? parseInt(id, 10) : 0; // ✅ id 없을 경우 기본값 0

  let type: "board" | "notice" | "support" | null = null;

  if (title === "공지사항") {
    type = "notice";
  } else if (title === "게시판") {
    type = "board";
  } else if (title === "고객문의") {
    type = "support";
  }

  return (
    <PageLayout title={title} activeItem={activeItem}>
      {/* ✅ ID가 있을 경우 DetailComponent, 없으면 ListComponent 렌더링 */}
      {type ? (parsedId ? <DetailComponent type={type} id={parsedId} /> : <ListComponent type={type} />) : <div>기본 페이지입니다.</div>}
    </PageLayout>
  );
};

export default CommonContents;
