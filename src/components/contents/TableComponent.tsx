import { useNavigate } from "react-router-dom";
import { Notice } from "../../model/contents";

interface TableComponentProps {
  notices: Notice[];
  isLoading: boolean;
}

const TableComponent = ({ notices, isLoading }: TableComponentProps) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="text-center py-10 text-gray-500">데이터를 불러오는 중...</div>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 text-left">
            {["번호", "제목", "작성자", "등록일", "조회"].map((header, idx) => (
              <th key={idx} className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {notices.map((notice) => (
            <tr key={notice.notice_id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-500">{notice.notice_id}</td>
              {/* ✅ 제목 클릭 시 상세보기 페이지로 이동 */}
              <td
                className="px-6 py-4 text-sm font-medium text-blue-600 cursor-pointer"
                onClick={() => navigate(`/contents/notice/${notice.notice_id}`)}
              >
                {notice.title}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{notice.writer}</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(notice.created_at).toLocaleDateString("ko-KR")}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{notice.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
