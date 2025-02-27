import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

// Lazy 로딩된 컴포넌트
const Login = lazy(() => import("../pages/auth/LoginPage"));
const Register = lazy(() => import("../pages/auth/RegisterPage"));
const LoginFind = lazy(() => import("../pages/auth/FindPage"));
const Mypage = lazy(() => import("../pages/auth/ProfilePage"));
// @ts-ignore
const KakaoRedirect = lazy(() => import("../pages/auth/KakaoRedirectPage"));
const NaverRedirect = lazy(() => import("../pages/auth/NaverRedirectPage"));
// ✅ authRoutes 배열을 export
export const authRoutes: RouteObject[] = [
  {
    path: "auth/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "auth/register",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "auth/login/find",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginFind />
      </Suspense>
    ),
  },
  {
    path: "auth/mypage",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Mypage />
      </Suspense>
    ),

  },
  {
    path : "auth/kakao/callback",
    element : (
        <Suspense fallback={<div>Loading...</div>}>
          <KakaoRedirect />
        </Suspense>
    )
  },
  {
    path: "auth/naver/callback",
    element: (
        <Suspense fallback={<div>Loading...</div>}>
          <NaverRedirect />
        </Suspense>
    ),
  },
];
