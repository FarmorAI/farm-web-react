import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNoticeById } from "../../../api/noticeApi";
import { Notice } from "../../../model/contents";
import useMove from "../../../hook/useMove.ts";

interface NoticeDetailProps {
  noticeId?: number; // ✅ props로 noticeId를 받을 수 있도록 추가
}

const NoticeDetail: React.FC<NoticeDetailProps> = ({ noticeId }) => {
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { moveToList } = useMove();

  useEffect(() => {
    const fetchNotice = async () => {
      if (!noticeId) return;
      setIsLoading(true);
      try {
        const data = await getNoticeById(noticeId);
        setNotice(data);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotice();
  }, [noticeId]);

  if (isLoading) return <div className="text-center py-10 text-gray-500">데이터를 불러오는 중...</div>;
  if (!notice) return <div className="text-center py-10 text-gray-500">공지사항을 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-semibold mb-4">{notice.title}</h1>
      <div className="border-t border-gray-200 pt-4">
        <p><strong>작성자:</strong> {notice.writer}</p>
        <p><strong>등록일:</strong> {new Date(notice.created_at).toLocaleDateString()}</p>
        <p><strong>조회수:</strong> {notice.views}</p>
      </div>
      <div className="mt-6 p-4 bg-gray-50 border rounded-md">
        <p>{notice.content}</p>
      </div>
      <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => moveToList()}>
        목록으로
      </button>
    </div>
  );
};

export default NoticeDetail;
