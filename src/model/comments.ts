// 댓글 데이터 인터페이스
export interface Comment {
    commentId: number;
    boardId: number;
    memberId: number;
    writer: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    ref: number;   // 댓글 그룹을 식별하는 컬럼
    depth: number; // 댓글의 깊이
    level: number; // 댓글의 정렬 순서 (대댓글의 경우, 부모 댓글의 level + 1)
    parentId?: number | null; // 부모 댓글의 ID (대댓글일 경우 필요)
}

// 댓글 작성 데이터 인터페이스
export interface InsertComment {
    boardId: number;
    content: string;
    ref: number; // 원댓글 그룹의 ref ID
    depth: number; // 댓글의 깊이
    level: number; // 댓글의 레벨 (부모 댓글 기준)
    parentId?: number | null; // 부모 댓글 ID, 대댓글인 경우 필요
}

// 댓글 목록 조회 응답 인터페이스
export interface CommentListResponse {
    dtoList: Comment[];
    pageRequestDto: PageRequestDto;
    prev: boolean;
    next: boolean;
    totalCount: number;
    prevPage: number;
    nextPage: number;
    totalPage: number;
    current: number;
}

// 페이지 요청 DTO (페이징 처리 관련)
export interface PageRequestDto {
    page: number;
    size: number;
    offset: number;
}
