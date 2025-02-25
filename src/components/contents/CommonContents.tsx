import PageLayout from "../../components/pagelayout/PageLayout";

import NoticeList from "./notice/NoticeList.tsx";
import BoardList from "./board/BoardList.tsx";

interface CommonListPageProps {
  title: string;
  activeItem: string;
}

const CommonContents = ({ title, activeItem }: CommonListPageProps) => {


    if (title === "공지사항") {

        return (
            <PageLayout title={title} activeItem={activeItem}>
                <NoticeList/>
            </PageLayout>

        )
    }
    else if (title === "게시판") {
        return (
            <PageLayout title={title} activeItem={activeItem}>
                <BoardList/>
            </PageLayout>
        )
    }

  return (
    <PageLayout title={title} activeItem={activeItem}>
     <div>
         기본 페이지입니다.
     </div>
    </PageLayout>
  );
};

export default CommonContents;
