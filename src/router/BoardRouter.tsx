import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

// Lazy 로딩된 컴포넌트
const BoardList = lazy(() => import("../pages/contents/board/BoardListPage"));
const NoticeList = lazy(
  () => import("../pages/contents/notice/NoticeListPage")
);
const NoticeDetail = lazy(() => import("../pages/contents/notice/NoticeDetailPage")); // ✅ 상세 페이지 추가

// ✅ boardRoutes 배열을 export
export const boardRoutes: RouteObject[] = [
  {
    path: "contents/board",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <BoardList />
      </Suspense>
    ),
  },
  {
    path: "contents/notice",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NoticeList />
      </Suspense>
    ),
  },
  {
    path: "contents/notice/:id", // ✅ 동적 라우팅 추가 (공지사항 상세보기)
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NoticeDetail />
      </Suspense>
    ),
  },
];
