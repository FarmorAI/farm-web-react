import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Suspense } from "react";
import Layout from "../layout/Layout";
import WeatherDisplay from "../pages/weather/WeatherDisplay";
import { authRoutes } from "./AuthRouter";
import { aiRoutes } from "./AiRouter";
import { boardRoutes } from "./ContentsRouter";
import { supportRoutes } from "./SupportRouter";
import { introduceRoutes } from "./IntroduceRouter";
import { paymentRoutes } from "./PaymentRouter";

// ✅ Suspense 적용 (라우트 전체에 로딩 표시)
const withSuspense = (routes: RouteObject[]): RouteObject[] =>
  routes.map((route) => ({
    ...route,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        {route.element}
      </Suspense>
    ),
  }));


const Root = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // 공통 레이아웃
    children: [
      {
        index: true,
        element: <WeatherDisplay />,
      },
      ...withSuspense(authRoutes),
      ...withSuspense(aiRoutes),
      ...withSuspense(boardRoutes),
      ...withSuspense(supportRoutes),
      ...withSuspense(introduceRoutes),
      ...withSuspense(paymentRoutes)
    ],
  },
]);

export default Root;
