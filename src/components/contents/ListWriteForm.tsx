import { useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// props 인터페이스 정의
interface WriteFormProps {
  title: string; // 작성 페이지의 제목 (예: 게시판, 공지사항)
  submitAction: (data: { title: string; content: string }) => Promise<boolean>; // 데이터 제출 함수 (API 호출)
  navigatePath: string; // 작성 완료 후 이동할 경로
}

const WriteForm = ({ title, submitAction, navigatePath }: WriteFormProps) => {
  const { register, handleSubmit } = useForm<{ title: string }>(); // React Hook Form 사용
  const [content, setContent] = useState(""); // SunEditor에서 작성한 내용 상태 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // 제출 함수
  const onSubmit = async (data: { title: string }) => {
    try {
      const isSuccess = await submitAction({ title: data.title, content }); // props로 받은 API 호출
      if (isSuccess) {
        alert(`${title}이(가) 등록되었습니다.`);
        navigate(navigatePath); // 작성 완료 후 페이지 이동
      } else {
        alert(`${title} 등록 실패`);
      }
    } catch (error) {
      console.error(`${title} 등록 오류:`, error);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="w-full border border-gray-300">
          <tbody>
            <tr className="border-b">
              <td className="bg-gray-100 px-4 py-2 font-semibold w-1/5">제목</td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  {...register("title", { required: true })} // 제목 입력 필드 등록
                  className="w-full p-2 border rounded"
                  placeholder="제목을 입력하세요"
                />
              </td>
            </tr>
            <tr>
              <td className="bg-gray-100 px-4 py-2 font-semibold align-top">내용</td>
              <td className="px-4 py-4">
                <SunEditor
                  setContents={content} // 초기값 설정
                  onChange={setContent} // 입력값 변경 핸들러
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
            onClick={() => navigate(navigatePath)} // 취소 버튼 클릭 시 해당 경로로 이동
            className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
          >
            취소
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            type="submit"
          >
            작성 완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteForm;
