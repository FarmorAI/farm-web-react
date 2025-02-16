export interface Notice {
  notice_id: number;
  title: string;
  content?: string; // ✅ content를 선택적으로 추가 (없어도 오류 발생하지 않음)
  writer: string;
  views: number;
  created_at: string;
}
