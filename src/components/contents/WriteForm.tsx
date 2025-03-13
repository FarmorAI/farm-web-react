import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { WriteFormData, WriteFormProps } from "../../model/contents";
import { useNavigate, useParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { updateNotice } from "../../api/noticeApi.ts";
import { updateBoard } from "../../api/boardApi.ts"; // ✅ 게시판 API 추가

const WriteForm: React.FC<WriteFormProps> = ({ title, initialData }) => {
  const { register, handleSubmit, setValue, getValues, watch } =
    useForm<WriteFormData>();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const params = useParams();
  const contentId = params.id ? parseInt(params.id, 10) : undefined;

  // `title`을 기준으로 `type` 결정
  const type = title === "공지사항 수정" ? "notice" : "board";

  // SunEditor의 내용을 실시간으로 감지하여 useForm과 동기화
  const watchedContent = watch("content", "");

  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title);
      setValue("content", initialData.content);
    }
  }, [initialData, setValue]);

  useEffect(() => {
    setValue("content", watchedContent, { shouldValidate: true });
  }, [watchedContent, setValue]);

  const handleContentChange = (newContent: string) => {
    console.log("📝 SunEditor 내용 변경:", newContent);
    setValue("content", newContent, { shouldValidate: true });
  };

  const handleFormSubmit = async (data: WriteFormData) => {
    setIsUploading(true);
    try {
      setValue("content", watchedContent);
      const latestContent = getValues("content");

      const postData = {
        ...data,
        content: latestContent,
      };

      console.log("🚀 최종 전송 데이터:", postData);

      if (contentId != null) {
        // ✅ `type`을 기반으로 API 호출 분기
        const res =
          type === "notice"
            ? await updateNotice(contentId, postData)
            : await updateBoard(contentId, postData);

        console.log(res);
      }

      // ✅ 동적으로 해당 페이지로 이동
      navigate(`/contents/${type}`);
    } catch (error) {
      alert("게시글 수정 중 오류가 발생했습니다.");
      console.error("게시글 수정 오류:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <table className="w-full border border-gray-300">
          <tbody>
            <tr className="border-b">
              <td className="bg-gray-100 px-4 py-2 font-semibold w-1/5">
                제목
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  {...register("title", { required: true })}
                  className="w-full p-2 border rounded"
                />
              </td>
            </tr>
            <tr>
              <td className="bg-gray-100 px-4 py-2 font-semibold align-top">
                내용
              </td>
              <td className="px-4 py-4">
                <SunEditor
                  setContents={watchedContent}
                  onChange={handleContentChange}
                  setOptions={{
                    height: "400px",
                    buttonList: [
                      ["bold", "underline", "italic", "strike"],
                      ["font", "align", "list", "image", "link"],
                    ],
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end mt-8 space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            disabled={isUploading}
          >
            취소
          </button>
          <button
            type="submit"
            className={`px-4 py-2 text-white rounded ${
              isUploading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isUploading}
          >
            {isUploading ? "업로드 중..." : "작성 완료"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteForm;
