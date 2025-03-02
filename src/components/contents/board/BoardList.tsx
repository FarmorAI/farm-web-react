import { useEffect, useState } from "react";
import { BoardListResponse } from "../../../model/contents";
import { getBoardList } from "../../../api/boardApi";

import useMove from "../../../hook/useMove";
import SearchBar from "../SearchBar";
import PageComponent from "../PageComponent";
import { getCookie } from "../../../util/cookieUtill";

const BoardList = () => {
  const { moveToWrite, moveToList, moveToRead, page, size, refresh } =
    useMove();

  const [boards, setBoards] = useState<BoardListResponse | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBoards, setFilteredBoards] =
    useState<BoardListResponse | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token= getCookie("jwt");
    setIsLoggedIn(!!token);
    const boardDB = async () => {
      try {
        const res = await getBoardList({ page, size });
        if (Array.isArray(res)) {
          setBoards(res[0]);
          setFilteredBoards(res[0]);
        } else {
          setBoards(res);
          setFilteredBoards(res);
        }
      } catch (error) {
        console.error("Error fetching boards:", error);
        setBoards(null);
        setFilteredBoards(null);
      }
    };
    boardDB();
  }, [page, size, refresh]);

  //검색기능 추가
  const handleSearch = (category: string) => {
    if (!boards) return;

    const filtered = boards.dtoList.filter((board) => {
      switch (category) {
        case "제목":
          return board.title.includes(searchQuery);
        case "내용":
          return board.content?.includes(searchQuery); // `content`가 있을 경우 검색
        case "작성자":
          return board.writer.includes(searchQuery);
        default:
          return (
            board.title.includes(searchQuery) ||
            board.content?.includes(searchQuery) ||
            board.writer.includes(searchQuery)
          );
      }
    });

    setFilteredBoards({ ...boards, dtoList: filtered });
  };

  console.log(filteredBoards);

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      {/* 검색바 추가 */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        totalResults={filteredBoards?.dtoList.length || 0}
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
          {filteredBoards?.dtoList.map((board) => (
            <tr key={board.boardId} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-500">
                {board.boardId}
              </td>
              <td
                className="px-6 py-4 text-sm font-medium text-blue-600 cursor-pointer"
                onClick={() => moveToRead(board.boardId)}
              >
                {board.title}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {board.writer}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(board.createdAt).toLocaleDateString("ko-KR")}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{board.views}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredBoards && (
        <PageComponent
          serverData={{
            current: page,
            totalPage: filteredBoards.totalPage,
            pageNumList: filteredBoards.pageNumList,
          }}
          movePage={moveToList}
        />
      )}
    {/* ✅ 토큰이 있는 경우에만 글 작성 버튼을 보여줌 */}
      {isLoggedIn && (
        <button
          onClick={moveToWrite} // 글 작성 페이지 이동 함수
          className="px-6 py-2 mx-20 mb-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          글 작성
        </button>
      )}
    </div>
  );
};

export default BoardList;
