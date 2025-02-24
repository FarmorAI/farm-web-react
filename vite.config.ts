import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 포트번호 변경
    port: 3030,
    // 서버 프록시 설정
    proxy: {
      '/api': {
        target: 'http://localhost:6060',               // 프록시할 대상 서버 : Node.js 백엔드 서버 주소
        changeOrigin: true,                             // 요청 헤더의 Origin을 Node.js 서버로 변경
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),  // '/api'를 제거
      },
    }
  }
})