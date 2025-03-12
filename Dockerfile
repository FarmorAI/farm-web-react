# 1️⃣ Node.js 기반 빌드 단계
FROM node:18 AS build

# 2️⃣ 작업 디렉터리 설정
WORKDIR /app

# 3️⃣ package.json과 package-lock.json 복사 및 의존성 설치
COPY package.json package-lock.json ./
RUN npm install

# 4️⃣ 프로젝트 소스 복사
COPY . .

# 5️⃣ TypeScript 및 Vite 빌드 실행
RUN npm run build

# 6️⃣ Nginx를 사용하여 정적 파일 제공
FROM nginx:alpine

# 7️⃣ 빌드된 React 앱을 Nginx의 기본 서비스 디렉터리에 복사
COPY --from=build /app/dist /usr/share/nginx/html

# 8️⃣ Nginx 포트 설정
EXPOSE 80

# 9️⃣ Nginx 실행
CMD ["nginx", "-g", "daemon off;"]