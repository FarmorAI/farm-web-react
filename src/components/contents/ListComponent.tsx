import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import PageComponent from "./PageComponent";
import useMove from "../../hook/useMove";
import useFetchList from "../../hook/contents/useFetchList";
import {
  Board,
  Notice,
  Support,
  BoardListResponse,
  NoticeListResponse,
  SupportListResponse,
} from "../../model/contents";

const isBoard = (item: Board | Notice | Support): item is Board =>
  "boardId" in item;
const isNotice = (item: Board | Notice | Support): item is Notice =>
  "noticeId" in item;
const isSupport = (item: Board | Notice | Support): item is Support =>
  "inquiryId" in item;

const ListComponent = ({ type }: { type: "board" | "notice" | "support" }) => {
  const { moveToWrite, moveToList, moveToRead, page, size, refresh } = useMove();
  const { data, isLoggedIn } = useFetchList<
    BoardListResponse | NoticeListResponse | SupportListResponse
  >({ type: type as "board" | "notice" | "support", page, size, refresh });

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [totalResults, setTotalResults] = useState(0); // ✅ 전체 검색 개수 상태 추가
  const [ isSearching, setIsSearching ] = useState(false);

  useEffect(() => {
    if (!isSearching && data) {
      setFilteredData(data);
      setTotalResults(data?.totalCount || 0); // ✅ 검색이 아닐 때 전체 개수 유지
    }
  }, [data, isSearching]);



  const handleSearch = (category: string) => {
    if (!data) return;

    const filtered = data.dtoList.filter((item) => {
      switch (category) {
        case "제목":
          return item.title.includes(searchQuery);
        case "내용":
          return item.content?.includes(searchQuery);
        case "작성자":
          return item.writer?.includes(searchQuery) || false;
        default:
          return (
            item.title.includes(searchQuery) ||
            item.content?.includes(searchQuery) ||
            item.writer?.includes(searchQuery) ||
            false
          );
      }
    });

    setFilteredData(
      isBoard(data?.dtoList[0])
        ? { ...(data as BoardListResponse), dtoList: filtered as Board[] }
        : isNotice(data?.dtoList[0])
        ? { ...(data as NoticeListResponse), dtoList: filtered as Notice[] }
        : isSupport(data?.dtoList[0])
        ? { ...(data as SupportListResponse), dtoList: filtered as Support[] }
        : null
    );
    setTotalResults(filtered.length); // ✅ 검색된 개수 반영
    setIsSearching(true); // ✅ 검색 실행됨
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        totalResults={isSearching ? totalResults : data?.totalCount || 0} // ✅ 검색 중이면 검색된 개수, 아니면 전체 개수
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
          {filteredData?.dtoList.map((item) => (
            <tr
              key={
                isBoard(item)
                  ? item.boardId
                  : isNotice(item)
                  ? item.noticeId
                  : item.inquiryId
              }
              className="hover:bg-gray-50"
            >
              <td className="px-6 py-4 text-sm text-gray-500">
                {isBoard(item)
                  ? item.boardId
                  : isNotice(item)
                  ? item.noticeId
                  : item.inquiryId}
              </td>
              <td
                className="px-6 py-4 text-sm font-medium text-blue-600 cursor-pointer"
                onClick={() =>
                  moveToRead(
                    isBoard(item)
                      ? item.boardId
                      : isNotice(item)
                      ? item.noticeId
                      : item.inquiryId, type
                  )
                }
              >
                {item.title}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{item.writer}</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(item.createdAt).toLocaleDateString("ko-KR")}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{item.views}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredData && (
        <PageComponent
          serverData={{
            current: page,
            totalPage: filteredData.totalPage,
            pageNumList: filteredData.pageNumList,
          }}
          movePage={moveToList}
        />
      )}

      {isLoggedIn && type !== "support" && (
        <button
          onClick={moveToWrite}
          className="px-6 py-2 mx-20 mb-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          글 작성
        </button>
      )}
    </div>
  );
};

export default ListComponent;
