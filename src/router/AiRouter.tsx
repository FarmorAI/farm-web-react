import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

// Lazy 로딩된 컴포넌트
const UploadFormPage = lazy(() => import("../pages/ai/UploadFormPage"));
const UploadResultPage = lazy(() => import("../pages/ai/UploadResultPage"));
const AIUploadPage = lazy(() => import("../pages/ai/AIUploadPage"));

// ✅ aiRoutes 배열을 export
export const aiRoutes: RouteObject[] = [
  {
    path: "ai/uploadform",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <UploadFormPage />
      </Suspense>
    ),
  },
  {
    path: "ai/uploadlist",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <UploadResultPage />
      </Suspense>
    ),
  },
  {
    path: "ai/aiupload",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AIUploadPage />
      </Suspense>
    ),
  },
];
