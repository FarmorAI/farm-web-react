import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Suspense } from "react";
import Layout from "../layout/Layout";
import WeatherDisplay from "../pages/weather/WeatherDisplay";
import InfoDisplay from "../pages/weather/PestDisplay.tsx";

import { authRoutes } from "./AuthRouter";
import { aiRoutes } from "./AiRouter";
import { boardRoutes } from "./ContentsRouter";
import { supportRoutes } from "./SupportRouter";
import { introduceRoutes } from "./IntroduceRouter";
import { paymentRoutes } from "./PaymentRouter";
import {productRouter} from "./ProductRouter.tsx";
import BlogDisplay from "../pages/weather/BlogDisplay.tsx";
import TechDisplay from "../pages/weather/TechDisplay.tsx";
import Banner from "../pages/weather/Banner.tsx"
import GraphDisplay from "../pages/weather/GraphDisplay.tsx";
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
          element: (
              <div>
                  <Banner />
                  <div className="flex gap-4 p-6 justify-center">
                      <WeatherDisplay />
                      <BlogDisplay query={"사과"} />
                      <InfoDisplay />
                  </div>
                  <div className="mt-6">
                    <TechDisplay query={"사과"}/>
                      <GraphDisplay />
                  </div>
              </div>
        )
      },
      ...withSuspense(authRoutes),
      ...withSuspense(aiRoutes),
      ...withSuspense(boardRoutes),
      ...withSuspense(supportRoutes),
      ...withSuspense(introduceRoutes),
      ...withSuspense(paymentRoutes),
      ...withSuspense(productRouter),
    ],
  },
]);

export default Root;
