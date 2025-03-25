import axios from "axios";
import { API_BASE_URL } from "./memberApi";
import { getCookie } from "../util/cookieUtill";

export interface Comment {
    commentId: number;
    boardId: number;
    memberId: number;
    writer: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    ref: number;
    depth: number;
    level: number;
    parentId?: number | null;
}

/**
 * 댓글 목록 조회
 */
export const getCommentList = async (boardId: number): Promise<Comment[] | null> => {
    try {
        const response = await axios.get<Comment[]>(`${API_BASE_URL}/board/comments/${boardId}`);
        return response.data;
    } catch (error) {
        console.error(`댓글 목록 조회 실패 (boardId: ${boardId}):`, error);
        return null;
    }
};

/**
 * 댓글 추가
 */
export const insertComment = async (commentData: { boardId: number; content: string; parentId?: number | null }) => {
    const token = getCookie("jwt");
    if (!token) {
        console.error("🚨 JWT 토큰이 없습니다.");
        return false;
    }

    try {
        const response = await axios.post(
            `${API_BASE_URL}/board/comments`,
            commentData, // ✅ memberId 없이 보냄 (백엔드에서 자동 설정)
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data.result === "success";
    } catch (error) {
        console.error("🚨 댓글 등록 실패:", error);
        return false;
    }
};



/**
 * 댓글 삭제
 */
export const deleteComment = async (commentId: number): Promise<boolean> => {
    const token = getCookie("jwt");
    if (!token) {
        console.error("JWT 토큰이 없습니다.");
        return false;
    }

    try {
        const response = await axios.delete(`${API_BASE_URL}/board/comments/${commentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.result === "success";
    } catch (error) {
        console.error(`댓글 삭제 실패 (commentId: ${commentId}):`, error);
        return false;
    }
};

/**
 * 댓글 수정
 */
export const updateComment = async (commentId: number, content: string): Promise<boolean> => {
    const token = getCookie("jwt");
    if (!token) {
        console.error("JWT 토큰이 없습니다.");
        return false;
    }

    try {
        const response = await axios.put(`${API_BASE_URL}/board/comments/${commentId}`, { content }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data.result === "success";
    } catch (error) {
        console.error(`댓글 수정 실패 (commentId: ${commentId}):`, error);
        return false;
    }
};
