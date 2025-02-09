import { useState } from "react";

interface Notice {
  id: number;
  title: string;
  content: string;
  writer: string;
  updatedate?: string;  // 수정된 날짜 (선택적)
  createdate: string;   // 작성 날짜
}

const noticeData: Notice[] = [
  { id: 409, title: "2025년 성장능력향상 프로그램 교육생 모집 (~2/21 18:00)", content: "2025년 성장능력향상 프로그램 모집 공고입니다.", writer: "관리자", createdate: "2025-02-06" },
  { id: 408, title: "2025년 데이터 기반 스마트농업 확산지원 사업 컨소시엄 모집 공고", content: "스마트농업 확산 지원 사업에 대한 모집 안내입니다.", writer: "관리자", createdate: "2024-12-03", updatedate: "2024-12-10" },
  { id: 407, title: "스마트팜 청년창업 보육센터 2025년 교육생 선발(8기) 안내", content: "청년창업 보육센터 교육생 모집 공고입니다.", writer: "장재훈", createdate: "2025-01-23" },
  { id: 406, title: "스마트팜코리아 서버 작업 안내", content: "서버 작업 일정 및 영향도 안내입니다.", writer: "관리자", createdate: "2025-01-16" },
  { id: 405, title: "2025년 청년농업인 영농정착지원사업 모집 (~25.2.5.)", content: "청년농업인을 위한 영농정착지원사업 모집 공고입니다.", writer: "관리자", createdate: "2024-12-18" },
  { id: 404, title: "축산분야 ICT융복합 확산사업 상담센터 운영 안내", content: "축산분야 ICT융복합 상담센터 운영에 대한 변경 사항 안내입니다.", writer: "관리자", createdate: "2024-11-21", updatedate: "2024-11-25" },
];

const NoticeBoard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // 검색 기능: 제목에 검색어가 포함된 항목만 필터링
  const filteredNotices = noticeData.filter((notice) =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">공지사항</h2>
      
      {/* 검색 입력창 */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600">총 {filteredNotices.length}건이 검색되었습니다.</span>
        <div className="relative">
          <input
            type="text"
            placeholder="검색어를 입력해주세요..."
            className="border rounded-md py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 공지사항 리스트 */}
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border border-gray-300 px-4 py-2">번호</th>
            <th className="border border-gray-300 px-4 py-2">제목</th>
            <th className="border border-gray-300 px-4 py-2">작성자</th>
            <th className="border border-gray-300 px-4 py-2">최종 수정일</th>
          </tr>
        </thead>
        <tbody>
          {filteredNotices.map((notice) => (
            <tr key={notice.id} className="border-b border-gray-300 hover:bg-gray-50">
              <td className="border px-4 py-2 text-center">{notice.id}</td>
              <td className="border px-4 py-2">
                <a href="#" className="text-blue-600 hover:underline">{notice.title}</a>
              </td>
              <td className="border px-4 py-2 text-center">{notice.writer}</td>
              <td className="border px-4 py-2 text-center">
                {notice.updatedate ? notice.updatedate : notice.createdate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NoticeBoard;
