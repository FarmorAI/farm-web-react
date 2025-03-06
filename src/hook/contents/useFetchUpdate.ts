import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getNoticeById, updateNotice } from "../../api/noticeApi";

interface WriteFormData {
  title: string;
}

// 커스텀 훅
const useFetchUpdate = () => {
  const { id } = useParams<{ id?: string }>();
  const noticeId = id ? parseInt(id, 10) : undefined;
  const { register, handleSubmit, setValue } = useForm<WriteFormData>();
  const [content, setContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // 기존 공지사항 데이터를 가져와서 초기화
  useEffect(() => {
    if (!noticeId) return;

    (async () => {
      const notice = await getNoticeById(noticeId);
      if (notice) {
        setValue("title", notice.title ?? ""); // ✅ undefined 방지
        setContent(notice.content ?? ""); // ✅ undefined 방지
      }
    })();
  }, [noticeId, setValue]);

  // 공지사항 수정 요청
  const onSubmit = async (data: WriteFormData) => {
    if (!noticeId) return;
    setIsSubmitting(true);

    try {
      const isSuccess = await updateNotice(noticeId, {
        title: data.title,
        content,
      });

      if (isSuccess) {
        alert("공지사항이 수정되었습니다.");
        navigate(`/contents/notice/${noticeId}`);
      } else {
        alert("공지사항 수정 실패");
      }
    } catch (error) {
      console.error("공지사항 수정 오류:", error);
      alert("오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    content,
    setContent,
    isSubmitting,
    navigate,
  };
};

export default useFetchUpdate;
