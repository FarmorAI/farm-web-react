import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

// Lazy 로딩된 컴포넌트
const SupportList = lazy(() => import("../pages/support/SupportListPage"));
const SupportCustomerPage = lazy(() => import("../pages/support/SupportCustomerPage"));

// ✅ supportRoutes 배열을 export
export const supportRoutes: RouteObject[] = [
  {
    path: "support/list",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <SupportList />
      </Suspense>
    ),
  },
  {
    path: "support/customer",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <SupportCustomerPage />
      </Suspense>
    ),
  },
];
