import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtill";
import { API_BASE_URL } from "./memberApi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL, // 백엔드 API 주소
    credentials: "include", // 쿠키 전송 허용
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
      }),
      transformResponse: (response, meta) => {
        console.log("🛠 로그인 응답 헤더:", meta?.response?.headers);
        const token = meta?.response?.headers
          .get("Authorization")
          ?.split(" ")[1];
        console.log(token);
        if (token) {
          setCookie("jwt", token); // ✅ JWT 저장
        }
        return response; // 기존 응답 반환
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      transformResponse: () => {
        removeCookie("jwt"); // 로그아웃 시 쿠키 삭제
      },
    }),

    getUserInfo: builder.query({
      query: () => ({
        url: "/member/user",
        method: "GET",
        headers: { Authorization: `Bearer ${getCookie("jwt")}` }, // 쿠키에서 토큰을 가져와 헤더에 포함
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetUserInfoQuery } =
  authApi;
