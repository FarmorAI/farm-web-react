import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (category: string) => void;
  totalResults: number;
}

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  totalResults,
}: SearchBarProps) => {
  const [searchCategory, setSearchCategory] = useState("전체");

  const handleSearchClick = () => {
    handleSearch(searchCategory);
  };

  return (
    <div className="p-4 rounded-lg mb-6 flex justify-between items-center">
      <span className="text-sm text-gray-600">
        총 <strong className="text-blue-600">{totalResults}</strong>건의
        검색결과입니다.
      </span>
      <div className="flex space-x-2">
        {/* 🔹 검색 기준 선택 */}
        <select
          className="border border-black rounded px-2 py-1 text-sm appearance-none bg-white w-[80px] h-[38px] cursor-pointer"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        >
          <option value="전체">전체</option>
          <option value="제목">제목</option>
          <option value="내용">내용</option>
          <option value="작성자">작성자</option>
        </select>

        {/* 🔹 검색어 입력 */}
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          className="w-64 border border-gray-300 rounded-lg px-4 py-2 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* 🔹 검색 버튼 */}
        <button
          onClick={handleSearchClick}
          className="text-gray-400 hover:text-blue-500"
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
