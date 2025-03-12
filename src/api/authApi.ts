import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtill";
import { API_BASE_URL } from "./memberApi";

// ✅ 응답 데이터 타입 정의
export interface UserResponse {
  email: string;
  nickname: string;
  imageUrl?: string;
  memberRole : string
}

export interface Getinfo {
  email: string;
  nickname: string;
  name: string 
  address: string;
  phone: string;
  imageUrl?: string;
  birthDate: string;
  memberId: number
  memberRole: string
  updatedAt: string
  createdAt: string
}

export interface GetSubs {
  paymentId: number
  amount: number
  token: string
  createdAt: string
  paymentMethod: string
  status: string
  planName: string
  daysDiff: number
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include", // 쿠키 전송 허용
  }),
  tagTypes: ["User", "SubsInfo"],
  endpoints: (builder) => ({
    // 로그인
    login: builder.mutation<{ data: { token: string; user: UserResponse } }, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
      }),
      transformResponse: (response: { data: { token: string; user: UserResponse } }, meta) => {
        console.log("🛠 로그인 응답 헤더:", meta?.response?.headers);
        const token = meta?.response?.headers?.get("Authorization")?.split(" ")[1];
        console.log(token);
        if (token) {
          setCookie("jwt", token);
        }
        return response; // ✅ 전체 응답 유지
      },
    }),

    // 로그아웃
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      transformResponse: () => {
        removeCookie("jwt");
      },
    }),

    // 회원정보
    getUserInfo: builder.query<Getinfo, void>({
      query: () => ({
        url: "/member/user",
        method: "GET",
        headers: { Authorization: `Bearer ${getCookie("jwt")}` },
      }),
      providesTags: ["User"],
    }),

    // 구독정보
    getSubsInfo: builder.query<GetSubs, void>({
      query: () => ({
        url: "/payment/subsInfo",
        method: "GET",
        headers: { Authorization: `Bearer ${getCookie("jwt")}` }
      }),
      providesTags: ["SubsInfo"]  // 구독 정보 변경 시 업데이트 가능하도록 태그 설정
    })
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetUserInfoQuery, useGetSubsInfoQuery } = authApi;
