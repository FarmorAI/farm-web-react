import PageLayout from "../../components/pagelayout/PageLayout";

import PageComponent from "./PageComponent.tsx";
import SearchBar from "./SearchBar";
import {useEffect, useState} from "react";
import {getNoticeList} from "../../api/noticeApi.ts";
import { NoticeListResponse} from "../../model/contents.ts";
import NoticeList from "./notice/NoticeList.tsx";

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
                <div>
                    게시판 페이지 입니다.
                </div>
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
