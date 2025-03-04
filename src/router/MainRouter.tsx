import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

// ✅ Lazy 로딩된 컴포넌트
const Main = lazy(() => import("../pages/Main.tsx"));

// ✅ mainRoutes 배열을 export
export const mainRoutes: RouteObject[] = [
    {
        path: "/",
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <Main />
            </Suspense>
        ),
    },
];
