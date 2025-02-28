import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

// Lazy 로딩된 컴포넌트
const BoardList = lazy(() => import("../pages/contents/board/BoardListPage"));
const BoardWritePage = lazy(() => import("../pages/contents/board/BoardWritePage")); // ✅ 게시판 작성 페이지 추가
const BoardDetail = lazy(() => import("../pages/contents/board/BoardDetailPage")); // ✅ 상세 페이지 추가

const NoticeList = lazy(() => import("../pages/contents/notice/NoticeListPage"));
const NoticeDetail = lazy(() => import("../pages/contents/notice/NoticeDetailPage")); // ✅ 상세 페이지 추가
const NoticeWritePage = lazy(() => import("../pages/contents/notice/NoticeWritePage"));

const SupportList = lazy(() => import("../components/contents/support/SupportList"));
const SupportDetail = lazy(() => import("../components/contents/support/SupportDetail"))

// ✅ boardRoutes 배열을 export
export const boardRoutes: RouteObject[] = [
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
  {
    path: "contents/notice/write", // ✅ 동적 라우팅 추가 (공지사항 상세보기)
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NoticeWritePage />
      </Suspense>
    ),
  },
  {
    path: "contents/board",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <BoardList />
      </Suspense>
    ),
  },
  {
    path: "contents/board/:id", // ✅ 동적 라우팅 추가 (게시판 상세보기)
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <BoardDetail />
      </Suspense>
    ),
  },
  {
    path: "contents/board/write", // ✅ 동적 라우팅 추가 (게시판 상세보기)
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <BoardWritePage />
      </Suspense>
    ),
  },
  {
    path: "contents/support",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <SupportList />
      </Suspense>
    ),
  },
  {
    path: "contents/support/:id", // ✅ 동적 라우팅 추가 (게시판 상세보기)
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <SupportDetail />
      </Suspense>
    ),
  }
];