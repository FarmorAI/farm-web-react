import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { WriteFormData, WriteFormProps } from "../../model/contents";
import { useNavigate, useParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { updateNotice } from "../../api/noticeApi.ts";
const WriteForm: React.FC<WriteFormProps> = ({ title, initialData }) => {
  const { register, handleSubmit, setValue, getValues, watch } =
    useForm<WriteFormData>();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const params = useParams();
  const noticeId = params.id ? parseInt(params.id, 10) : undefined;
  // :흰색_확인_표시: SunEditor의 내용을 실시간으로 감지하여 useForm과 동기화
  const watchedContent = watch("content", "");
  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title);
      setValue("content", initialData.content);
    }
  }, [initialData, setValue]);
  // :흰색_확인_표시: SunEditor 변경 시 useForm 동기화
  useEffect(() => {
    setValue("content", watchedContent, { shouldValidate: true });
  }, [watchedContent, setValue]);
  // :흰색_확인_표시: SunEditor 내용 변경 시 즉시 반영
  const handleContentChange = (newContent: string) => {
    console.log(":메모: SunEditor 내용 변경:", newContent);
    setValue("content", newContent, { shouldValidate: true });
  };
  // :흰색_확인_표시: 폼 제출 핸들러
  const handleFormSubmit = async (data: WriteFormData) => {
    setIsUploading(true);
    try {
      // :흰색_확인_표시: SunEditor 최신 내용 반영
      setValue("content", watchedContent);
      const latestContent = getValues("content"); // 최신 데이터 가져오기
      console.log(":로켓: 최신 content 값:", latestContent);
      const postData = {
        ...data,
        content: latestContent, // 최신 SunEditor 내용 반영
      };
      console.log(":로켓: 최종 전송 데이터:", postData);
      if (noticeId != null) {
        const res = await updateNotice(noticeId, postData);
        console.log(res);
      }
      navigate("/contents/notice");
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
                  setContents={watchedContent} // :흰색_확인_표시: 최신 값 동기화
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
