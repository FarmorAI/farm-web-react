import { useEffect, useState } from "react";
import { NoticeListResponse } from "../../../model/contents.ts";
import { getNoticeList } from "../../../api/noticeApi.ts";

import useMove from "../../../hook/useMove.ts";
import PageComponent from "../PageComponent.tsx";
import SearchBar from "../SearchBar.tsx"; // ✅ 검색바 추가

const NoticeList = () => {
  const { moveToRead, moveToList, moveToWrite, size, page, refresh } = useMove();

  // ✅ notices를 객체로 설정
  const [notices, setNotices] = useState<NoticeListResponse | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // 🔹 검색어 상태 추가
  const [filteredNotices, setFilteredNotices] = useState<NoticeListResponse | null>(null);

  useEffect(() => {
    const noticeDB = async () => {
      try {
        const res = await getNoticeList({ page, size });

        if (Array.isArray(res)) {
          setNotices(res[0]);
          setFilteredNotices(res[0]); // 🔹 초기 데이터 설정
        } else {
          setNotices(res);
          setFilteredNotices(res); // 🔹 초기 데이터 설정
        }
      } catch (error) {
        console.error("Error fetching notices:", error);
        setNotices(null);
        setFilteredNotices(null);
      }
    };
    noticeDB();
  }, [size, page, refresh]);

  // 🔹 검색 기능 추가
  const handleSearch = (category: string) => {
    if (!notices) return;

    const filtered = notices.dtoList.filter((notice) => {
      switch (category) {
        case "제목":
          return notice.title.includes(searchQuery);
        case "내용":
          return notice.content?.includes(searchQuery); // `content`가 있을 경우 검색
        case "작성자":
          return notice.writer.includes(searchQuery);
        default:
          return (
            notice.title.includes(searchQuery) ||
            notice.content?.includes(searchQuery) ||
            notice.writer.includes(searchQuery)
          );
      }
    });

    setFilteredNotices({ ...notices, dtoList: filtered });
  };

  console.log(filteredNotices);

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      {/* ✅ 검색바 추가 */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        totalResults={filteredNotices?.dtoList.length || 0}
      />

      <table className="w-full border-t border-b border-gray-300">
        <thead>
          <tr className="bg-gray-50 text-left">
            {["번호", "제목", "작성자", "등록일", "조회"].map((header, idx) => (
              <th
                key={idx}
                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {filteredNotices?.dtoList.map((notice) => (
            <tr key={notice.noticeId} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-500">
                {notice.noticeId}
              </td>
              <td
                className="px-6 py-4 text-sm font-medium text-blue-600 cursor-pointer"
                onClick={() => moveToRead(notice.noticeId)}
              >
                {notice.title}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {notice.writer}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(notice.createdAt).toLocaleDateString("ko-KR")}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {notice.views}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredNotices && (
        <PageComponent
          serverData={{
            current: page,
            totalPage: filteredNotices.totalPage,
            pageNumList: filteredNotices.pageNumList,
          }}
          movePage={moveToList}
        />
      )}
      {/* ✅ 글 작성 버튼 (페이지네이션 바로 옆) */}
      <button
        onClick={moveToWrite} // 글 작성 페이지 이동 함수
        className="px-6 py-2 mx-20 mb-5  bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        글 작성
      </button>
    </div>
  );
};

export default NoticeList;
