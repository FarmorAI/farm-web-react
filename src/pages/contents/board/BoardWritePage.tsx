import { useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { useForm } from "react-hook-form";
import PageLayout from "../../../components/pagelayout/PageLayout";
import { useNavigate } from "react-router-dom";
import { insertBoard } from "../../../api/boardApi";
import { getCookie } from "../../../util/cookieUtill";

interface FormData {
  title: string;
}

const BoardWritePage = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    const token = getCookie("jwt"); // JWT 토큰 가져오기
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const boardData = {
        title: data.title,
        content: content, // SunEditor에서 작성한 내용
      };

      const response = await insertBoard(boardData, token);
      if (response) {
        alert("공지사항이 등록되었습니다.");
        navigate("/contents/board"); // 공지사항 목록으로 이동
      } else {
        alert("공지사항 등록 실패");
      }
    } catch (error) {
      console.error("공지사항 등록 오류:", error);
      alert("오류가 발생했습니다.");
    }
  };

  return (
      <PageLayout title="게시판 작성" activeItem="게시판 작성">
        <div className="max-w-7xl mx-auto p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <table className="w-full border border-gray-300">
              <tbody>
              <tr className="border-b">
                <td className="bg-gray-100 px-4 py-2 font-semibold w-1/5">제목</td>
                <td className="px-4 py-2">
                  <input
                      type="text"
                      {...register("title", { required: true })}
                      className="w-full p-2 border rounded"
                      placeholder="제목을 입력하세요"
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
              </tbody>
            </table>
            <div className="flex justify-end mt-8 space-x-4">
              <button
                  type="button"
                  onClick={() => navigate("/contents/board")}
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
      </PageLayout>
  );
};

export default BoardWritePage;