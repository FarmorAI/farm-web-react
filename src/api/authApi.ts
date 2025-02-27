import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtill";
import { API_BASE_URL } from "./memberApi";

// ✅ 응답 데이터 타입 정의
interface UserResponse {
  email: string;
  nickname: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include", // 쿠키 전송 허용
  }),
  endpoints: (builder) => ({
    login: builder.mutation<{ email: string; nickname: string }, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
      }),
      transformResponse: (response: UserResponse, meta) => {
        console.log("🛠 로그인 응답 헤더:", meta?.response?.headers);
        const token = meta?.response?.headers?.get("Authorization")?.split(" ")[1];
        console.log(token);
        if (token) {
          setCookie("jwt", token);
        }
        return response; // ✅ response 타입이 명확해짐
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      transformResponse: () => {
        removeCookie("jwt");
      },
    }),

    getUserInfo: builder.query<UserResponse, void>({
      query: () => ({
        url: "/member/user",
        method: "GET",
        headers: { Authorization: `Bearer ${getCookie("jwt")}` },
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetUserInfoQuery } = authApi;
