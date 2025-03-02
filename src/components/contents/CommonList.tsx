import PageLayout from "../pagelayout/PageLayout.tsx";

import NoticeList from "./notice/NoticeList.tsx";
import BoardList from "./board/BoardList.tsx";
import SupportList from "./support/SupportList.tsx";

interface CommonListPageProps {
  title: string;
  activeItem: string;
}

const CommonContents = ({ title, activeItem }: CommonListPageProps) => {
  if (title === "공지사항") {
    return (
      <PageLayout title={title} activeItem={activeItem}>
        <NoticeList />
      </PageLayout>
    );
  } else if (title === "게시판") {
    return (
      <PageLayout title={title} activeItem={activeItem}>
        <BoardList />
      </PageLayout>
    );
  } else if (title === "고객문의") {
    return (
      <PageLayout title={title} activeItem={activeItem}>
        <SupportList />
      </PageLayout>
    );
  }

  return (
    <PageLayout title={title} activeItem={activeItem}>
      <div>기본 페이지입니다.</div>
    </PageLayout>
  );
};

export default CommonContents;
