import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getNoticeById, updateNotice } from "../../api/noticeApi";
import { getBoardById, updateBoard } from "../../api/boardApi";
import { WriteFormData } from "../../model/contents";

const useFetchUpdate = (title: string) => {
  const { id } = useParams<{ id?: string }>();
  const contentId = id ? parseInt(id, 10) : undefined;

  const { register, handleSubmit, setValue, getValues } = useForm<WriteFormData>();
  const [content, setContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<{ title: string; content: string } | null>(null);

  // title을 기반으로 type 결정
  const type = title === "공지사항 수정" ? "notice" : "board";

  // API 호출 함수 선택 (useMemo로 메모이제이션)
  const getContentById = useMemo(
    () => (type === "notice" ? getNoticeById : getBoardById),
    [type]
  );
  const updateContent = useMemo(
    () => (type === "notice" ? updateNotice : updateBoard),
    [type]
  );

  useEffect(() => {
    if (!contentId) return;

    (async () => {
      const data = await getContentById(contentId);
      if (data) {
        setValue("title", data.title ?? "");
        setContent(data.content ?? "");
        setInitialData({
          title: data.title ?? "",
          content: data.content ?? "",
        });
      }
    })();
  }, [contentId, setValue, getContentById]); // getContentById 추가

  const onSubmit = async (data: WriteFormData) => {
    if (!contentId) return;
    setIsSubmitting(true);

    try {
      setValue("content", content);
      const updatedContent = getValues("content");

      const isSuccess = await updateContent(contentId, {
        title: data.title,
        content: updatedContent,
      });

      if (isSuccess) {
        navigate(`/contents/${type}/${contentId}`);
      } else {
        alert(`${type === "notice" ? "공지사항" : "게시판"} 수정 실패`);
      }
    } catch (error) {
      console.error(`${type === "notice" ? "공지사항" : "게시판"} 수정 오류:`, error);
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
    isEdit: true,
    initialData,
  };
};

export default useFetchUpdate;