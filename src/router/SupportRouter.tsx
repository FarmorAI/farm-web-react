import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

// Lazy 로딩된 컴포넌트
const SupportListPage = lazy(() => import("../pages/support/SupportListPage"));
const SupportCustomerPage = lazy(() => import("../pages/support/SupportCustomerPage"));
const SupportDetailPage = lazy(() => import("../pages/support/SupportDetailPage"));

// ✅ supportRoutes 배열을 export
export const supportRoutes: RouteObject[] = [
  {
    path: "/support",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <SupportCustomerPage />
      </Suspense>
    ),
  },
  {
    path: "/support/list",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <SupportListPage />
      </Suspense>
    ),
  },
  {
    path: "/support/:id", // ✅ 동적 라우팅 추가 (고객문의 상세보기)
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <SupportDetailPage />
      </Suspense>
    ),
  },
];
