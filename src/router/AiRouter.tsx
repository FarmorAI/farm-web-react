import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

// Lazy 로딩된 컴포넌트
const UploadForm = lazy(() => import("../pages/ai/UploadFormPage"));
const UploadList = lazy(() => import("../pages/ai/UploadResultPage"));

// ✅ aiRoutes 배열을 export
export const aiRoutes: RouteObject[] = [
  {
    path: "ai/uploadform",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <UploadForm />
      </Suspense>
    ),
  },
  {
    path: "ai/uploadlist",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <UploadList />
      </Suspense>
    ),
  },
];
