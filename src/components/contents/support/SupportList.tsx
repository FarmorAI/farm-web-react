import React, { useEffect, useState } from 'react'
import SearchBar from '../SearchBar'
import PageComponent from '../PageComponent'
import { SupportListResponse } from '../../../model/contents';
import useMove from '../../../hook/useMove';
import { getSupportList } from '../../../api/supportApi';

const SupportList = () => {
    const { moveToRead, moveToList, moveToWrite, size, page, refresh } = useMove();
    const [supports, setSupports] = useState<SupportListResponse | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredSupport, setFilteredSupport] = useState<SupportListResponse | null>(null);

    useEffect(() => {
        const supportDB = async () => {
            try {
                const res = await getSupportList({ page, size });

                if (Array.isArray(res)) {
                    setSupports(res[0]);
                    setFilteredSupport(res[0]); // 🔹 초기 데이터 설정
                } else {
                    setSupports(res);
                    setFilteredSupport(res); // 🔹 초기 데이터 설정
                }
            } catch (error) {
                console.error("Error fetching notices:", error);
                setSupports(null);
                setFilteredSupport(null);
            }
        };
        supportDB();
    }, [size, page, refresh]);

    // 🔹 검색 기능 추가
    const handleSearch = (category: string) => {
        if (!supports) return;

        const filtered = supports.dtoList.filter((notice) => {
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

        setFilteredSupport({ ...supports, dtoList: filtered });
    };

    console.log(filteredSupport);

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            {/* ✅ 검색바 추가 */}
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                totalResults={filteredSupport?.dtoList.length || 0}
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
                    {filteredSupport?.dtoList.map((supports) => (
                        <tr key={supports.inquiryId} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-500">
                                {supports.inquiryId}
                            </td>
                            <td
                                className="px-6 py-4 text-sm font-medium text-blue-600 cursor-pointer"
                                onClick={() => moveToRead(supports.inquiryId)}
                            >
                                {supports.title}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                {supports.writer}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                {new Date(supports.createdAt).toLocaleDateString("ko-KR")}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                {supports.views}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {filteredSupport && (
                <PageComponent
                    serverData={{
                        current: page,
                        totalPage: filteredSupport.totalPage,
                        pageNumList: filteredSupport.pageNumList,
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
    )
}

export default SupportList
