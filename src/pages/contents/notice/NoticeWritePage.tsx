import PageLayout from "../../../components/pagelayout/PageLayout";
import { insertNotice } from "../../../api/noticeApi";
import { getCookie } from "../../../util/cookieUtill";
import WriteForm from "../../../components/contents/ListWriteForm";

const NoticeWritePage = () => {
  // 공지사항 등록 API 호출 함수
  const submitNotice = async (noticeData: {
    title: string;
    content: string;
  }): Promise<boolean> => {
    const token = getCookie("jwt"); // JWT 토큰 가져오기
    if (!token) {
      alert("로그인이 필요합니다.");
      return false;
    }
    const response = await insertNotice(noticeData, token);

    return !!response; // response가 존재하면 true, 없으면 false 반환
  };

  return (
    <PageLayout title="공지사항 작성" activeItem="공지사항 작성">
      {/* 공통 WriteForm을 사용하여 공지사항 작성 UI 렌더링 */}
      <WriteForm
        title="공지사항"
        submitAction={submitNotice}
        navigatePath="/contents/notice"
      />
    </PageLayout>
  );
};

export default NoticeWritePage;
