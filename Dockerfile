# 1️⃣ Node.js 기반 Vite 빌드 단계
FROM node:18 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# 2️⃣ Nginx로 정적 파일 서빙
FROM nginx:alpine

# ✅ 올바른 Nginx 설정 파일 복사
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# ✅ Vite 빌드 결과를 Nginx 기본 서비스 디렉토리에 복사
COPY --from=build /app/dist /usr/share/nginx/html

# 3️⃣ Nginx 포트 설정
EXPOSE 80

# 4️⃣ Nginx 실행
CMD ["nginx", "-g", "daemon off;"]