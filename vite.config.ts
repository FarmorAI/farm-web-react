import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
/**
 * loadEnv
 *
 * mode :
 *    현재 실행 모드를 나타냄 ('development', 'production' 등)
 *    npm run dev로 실행하면 'development' 값을 반환
 *    npm run build로 실행하면 'production' 값을 반환
 *
 * process.cwd() :
 *    현재 작업 디렉토리(Current Working Directory)의 경로를 반환
 *
 * "VITE_" :
 *    환경변수의 접두사(prefix)를 지정
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    plugins: [react()],
    server: {
      port: parseInt(env.VITE_PORT),
      proxy: {
        "/api": {
          target: env.VITE_SPRING_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
