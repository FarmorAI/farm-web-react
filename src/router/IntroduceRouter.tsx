import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

// Lazy 로딩된 컴포넌트
const Team = lazy(() => import("../pages/introduce/TeamPage"));
const Project = lazy(() => import("../pages/introduce/ProjectPage"));

// ✅ introduceRoutes 배열을 export
export const introduceRoutes: RouteObject[] = [
  {
    path: "introduce/team",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Team />
      </Suspense>
    ),
  },
  {
    path: "introduce/project",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Project />
      </Suspense>
    ),
  },
];
