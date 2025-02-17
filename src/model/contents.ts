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