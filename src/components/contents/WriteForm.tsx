import { useForm } from "react-hook-form";
import { WriteFormData, WriteFormProps } from "../../model/contents";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { uploadFiles } from "../../api/fileApi"; // 파일 업로드 API 추가

const WriteForm: React.FC<WriteFormProps> = ({ title, onSubmit }) => {
  const { register, handleSubmit } = useForm<WriteFormData>();
  const [content, setContent] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false); // 업로드 상태 추가
  const navigate = useNavigate();

  // 파일 선택 시 상태 업데이트
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(event.target.files);
    }
  };

  // 폼 제출 시 파일 업로드 후 게시글 저장
  const handleFormSubmit = async (data: WriteFormData) => {
    setIsUploading(true); // 업로드 시작
    let uploadedFileNames: string[] = [];

    try {
      if (selectedFiles) {
        uploadedFileNames = await uploadFiles(selectedFiles); // 파일 업로드 요청
      }

      // 게시글 데이터 구성
      const postData = {
        ...data,
        content,
        files: uploadedFileNames, // 업로드된 파일명 추가
      };

      onSubmit(postData,content); // 게시글 데이터 전달
      alert("게시글이 성공적으로 등록되었습니다!"); // 성공 메시지
      navigate("/contents/board"); // 게시판 목록 페이지로 이동 (예시)
    } catch (error) {
      alert("게시글 작성 중 오류가 발생했습니다."); // 오류 메시지 표시
      console.error("게시글 작성 오류:", error);
    } finally {
      setIsUploading(false); // 업로드 상태 초기화
    }
  };

  return (
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <table className="w-full border border-gray-300">
            <tbody>
            <tr className="border-b">
              <td className="bg-gray-100 px-4 py-2 font-semibold w-1/5">제목</td>
              <td className="px-4 py-2">
                <input
                    type="text"
                    {...register("title", { required: true })}
                    className="w-full p-2 border rounded"
                />
              </td>
            </tr>
            <tr>
              <td className="bg-gray-100 px-4 py-2 font-semibold align-top">내용</td>
              <td className="px-4 py-4">
                <SunEditor
                    setContents={content}
                    onChange={setContent}
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
            <tr>
              <td className="bg-gray-100 px-4 py-2 font-semibold">파일 업로드</td>
              <td className="px-4 py-2">
                <input type="file" multiple {...register("file1")} onChange={handleFileChange} />
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
                className={`px-4 py-2 text-white rounded ${isUploading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
                type="submit"
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
