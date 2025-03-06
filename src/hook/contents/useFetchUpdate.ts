import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getNoticeById, updateNotice } from "../../api/noticeApi";
import { WriteFormData } from "../../model/contents";

const useFetchUpdate = () => {
  const { id } = useParams<{ id?: string }>();
  const noticeId = id ? parseInt(id, 10) : undefined;
  // getValues 추가
  const { register, handleSubmit, setValue, getValues } = useForm<WriteFormData>();
  const [content, setContent] = useState<string>(""); // 내용 상태
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<{ title: string; content: string } | null>(null);

  // 기존 공지사항 데이터를 가져와서 초기화
  useEffect(() => {
    if (!noticeId) return;

    (async () => {
      const notice = await getNoticeById(noticeId);
      if (notice) {
        setValue("title", notice.title ?? ""); // 제목 설정
        setContent(notice.content ?? "");         // 내용 상태 설정
        setInitialData({
          title: notice.title ?? "",
          content: notice.content ?? "",
        });
      }
    })();
  }, [noticeId, setValue]);

  // 공지사항 수정 요청
  const onSubmit = async (data: WriteFormData) => {
    if (!noticeId) return;
    setIsSubmitting(true);

    try {
      // useForm과 content 상태 동기화
      setValue("content", content);
      // getValues로 최신 content 값 가져오기
      const updatedContent = getValues("content");
      
      const isSuccess = await updateNotice(noticeId, {
        title: data.title,
        content: updatedContent,
      });

      if (isSuccess) {
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
    isEdit: true, // 수정 모드 활성화
    initialData,
  };
};

export default useFetchUpdate;
