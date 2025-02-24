import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import authReducer from "./slices/authslices";

export const store = configureStore({
  reducer: {
    auth: authReducer, // 로그인 상태 관리
    [authApi.reducerPath]: authApi.reducer, // RTK Query API 상태 관리
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware), // RTK Query 미들웨어 추가
});

export type RootState = ReturnType<typeof store.getState>; // 전체 상태 타입
export type AppDispatch = typeof store.dispatch; // Redux Dispatch 타입

