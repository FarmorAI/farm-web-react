// import { useState, useEffect } from "react";
// import { Notice } from "../../model/contents";
// import { getNoticeList } from "../../api/noticeApi";
//
// export const useNotices = () => {
//   const [allNotices, setAllNotices] = useState<Notice[]>([]);
//   const [notices, setNotices] = useState<Notice[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const noticesPerPage = 10;
//
//   useEffect(() => {
//     const fetchNotices = async () => {
//       try {
//         setIsLoading(true);
//         const data = await getNoticeList();
//         setAllNotices(data);
//         setNotices(data);
//       } catch (error) {
//         console.error("데이터를 불러오는 중 오류 발생:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchNotices();
//   }, []);
//
//   const handleSearch = () => {
//     if (searchQuery.trim() === "") {
//       setNotices(allNotices);
//     } else {
//       setNotices(allNotices.filter((notice) => notice.title.includes(searchQuery)));
//     }
//   };
//
//   return {
//     notices: notices.slice((currentPage - 1) * noticesPerPage, currentPage * noticesPerPage),
//     searchQuery,
//     setSearchQuery,
//     handleSearch,
//     isLoading,
//     currentPage,
//     setCurrentPage,
//     totalNotices: notices.length,
//   };
// };
