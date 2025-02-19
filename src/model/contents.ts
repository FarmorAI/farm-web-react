export interface Notice {
  noticeId: number;
  title: string;
  content?: string; // 선택적 필드
  writer: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface PageRequestDto {
  page: number;
  size: number;
  title?: string | null;
  content?: string | null;
  offset: number;
}

export interface NoticeListResponse {
  dtoList: Notice[];
  pageNumList: number[];
  pageRequestDto: PageRequestDto;
  prev: boolean;
  next: boolean;
  totalCount: number;
  prevPage: number;
  nextPage: number;
  totalPage: number;
  current: number;
}

export interface Board {
  boardId: number;
  title: string;
  content?: string; // 선택적 필드
  writer: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface BoardListResponse {
  dtoList: Board[];
  pageNumList: number[];
  pageRequestDto: PageRequestDto;
  prev: boolean;
  next: boolean;
  totalCount: number;
  prevPage: number;
  nextPage: number;
  totalPage: number;
  current: number;
}

export interface WriteFormProps {
  title: string; // 페이지 제목
  onSubmit: (data: WriteFormData, content: string) => void; // 제출 함수
}

export interface WriteFormData {
  title: string;
  file1?: FileList;
}
