# 1️⃣ Node.js 기반 빌드 단계
FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# 2️⃣ Nginx로 정적 파일 서빙
FROM nginx:alpine

# ✅ Nginx 설정 파일 복사 (conf.d/default.conf 사용)
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# ✅ 빌드된 React 앱을 Nginx 기본 서비스 디렉토리에 복사
COPY --from=build /app/dist /usr/share/nginx/html

# 3️⃣ Nginx 포트 설정
EXPOSE 3030

# 4️⃣ Nginx 실행
CMD ["nginx", "-g", "daemon off;"]