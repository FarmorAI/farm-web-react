import useDetail from "../../hook/contents/useFetchDetail";
import PageLayout from "../pagelayout/PageLayout";
import { useParams, useNavigate } from "react-router-dom";

interface DetailComponentProps {
  type: "board" | "notice" | "support";
  id: number;
}
const DetailComponent: React.FC<DetailComponentProps> = ({ type}) => {
  const { id } = useParams<{ id: string }>(); // URL에서 id 가져오기
  const parsedId = id ? parseInt(id, 10) : undefined;
  const navigate = useNavigate();
  const { data, isLoading, deleteItem } = useDetail({ type, id: parsedId ?? 0 });

  // id가 없을 경우 예외 처리
  if (!parsedId) {
    return <div>잘못된 접근입니다.</div>;
  }


  if (isLoading) {
    return <div className="text-center py-10 text-gray-500">데이터를 불러오는 중...</div>;
  }

  if (!data) {
    return <div className="text-center py-10 text-gray-500">데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <PageLayout title="상세 페이지" activeItem={type}>
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg">
        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            <tr className="border-b">
              <td className="bg-gray-100 px-4 py-2 font-semibold w-1/5">글 유형</td>
              <td className="px-4 py-2">{type === "board" ? "게시판" : type === "notice" ? "공지사항" : "고객문의"}</td>
              <td className="bg-gray-100 px-4 py-2 font-semibold">등록일</td>
              <td className="px-4 py-2">{new Date(data.createdAt).toLocaleString()}</td>
            </tr>
            <tr className="border-b">
              <td className="bg-gray-100 px-4 py-2 font-semibold">제목</td>
              <td className="px-4 py-2" colSpan={3}>{data.title}</td>
            </tr>
            <tr className="border-b">
              <td className="bg-gray-100 px-4 py-2 font-semibold">조회</td>
              <td className="px-4 py-2" colSpan={3}>{data.views}</td>
            </tr>
            <tr>
              <td className="bg-gray-100 px-4 py-24 font-semibold align-top">내용</td>
              <td className="px-4 py-28 min-h-[550px]" colSpan={3}>{data.content}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end mt-6 space-x-4">
          <button className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">수정</button>
          <button onClick={deleteItem} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">삭제</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => navigate(-1)}>
            뒤로가기
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default DetailComponent;
