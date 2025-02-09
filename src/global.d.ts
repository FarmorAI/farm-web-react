export {}; // 👈 모듈로 인식되도록 추가

declare global {
  interface Window {
    daum: unknown; // 👈 any 대신 unknown 사용 권장
  }
}
