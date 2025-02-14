import { useEffect, useState } from "react";
import { ReactNode } from "react";
import {
  FaSearch,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import PageLayout from "../../components/pagelayout/PageLayout"; // ✅ 공통 레이아웃 사용

interface Notice {
  id: number;
  title: string;
  writer: string;
  createdate: string;
  views: number;
  fileType?: "pdf" | "word" | "excel";
}

const fileIcons: Record<string, ReactNode> = {
  pdf: <FaFilePdf className="text-red-500" />,
  word: <FaFileWord className="text-blue-500" />,
  excel: <FaFileExcel className="text-green-500" />,
};

const BoardList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 📌 API 호출 함수
  const fetchNotices = async () => {
    try {
      setIsLoading(true);
      // 데이터 불러오기 (API 연결 시 적용)
    } catch (error) {
      console.error("데이터를 불러오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSearch = () => {
    const filtered = notices.filter((notice) =>
      notice.title.includes(searchQuery)
    );
    setNotices(filtered);
  };

  return (
    <PageLayout title="자료실" activeItem="자료실">
      {/* 검색 바 */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 flex justify-between">
        <span className="text-sm text-gray-600">
          총 <strong className="text-blue-600">{notices.length}</strong>건의 검색결과입니다.
        </span>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            className="w-64 border border-gray-300 rounded-lg px-4 py-2 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch} className="text-gray-400 hover:text-blue-500">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* 테이블 */}
      {isLoading ? (
        <div className="text-center py-10 text-gray-500">데이터를 불러오는 중...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                {["번호", "제목", "첨부파일", "작성자", "등록일", "조회"].map((header, idx) => (
                  <th key={idx} className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {notices.map((notice) => (
                <tr key={notice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">{notice.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-blue-600">{notice.title}</td>
                  <td className="px-6 py-4 text-sm">{notice.fileType ? fileIcons[notice.fileType] : null}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{notice.writer}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{notice.createdate}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{notice.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 페이지네이션 */}
      <div className="flex justify-center p-4">
        <button className="px-3 py-2 text-gray-500 hover:bg-gray-100">
          <FaChevronLeft />
        </button>
        {[1, 2, 3, 4, 5].map((num) => (
          <button key={num} className="px-4 py-2 text-gray-700 hover:bg-gray-200">
            {num}
          </button>
        ))}
        <button className="px-3 py-2 text-gray-500 hover:bg-gray-100">
          <FaChevronRight />
        </button>
      </div>
    </PageLayout>
  );
};

export default BoardList;
