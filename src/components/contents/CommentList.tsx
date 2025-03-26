import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { getCommentList, insertComment, deleteComment } from "../../api/commentApi";
import CommentWriteForm from "./CommentWriteForm";
import { Comment } from "../../api/commentApi";

interface CommentListProps {
    boardId: number;
}

const CommentList: React.FC<CommentListProps> = ({ boardId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [replyContent, setReplyContent] = useState<Map<number, string>>(new Map());

    // 🔹 모달 상태 추가
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        console.log("useEffect 실행됨");
        fetchComments();
    }, [boardId]);

    const fetchComments = async () => {
        const commentData = await getCommentList(boardId);
        if (commentData) setComments(commentData);
    };

    const handleNewCommentSubmit = async () => {
        fetchComments();
    };

    const handleReplyChange = (parentId: number, content: string) => {
        setReplyContent((prev) => new Map(prev).set(parentId, content));
    };

    const handleReplySubmit = async (parentId: number) => {
        const content = replyContent.get(parentId) || "";
        if (content.trim()) {
            const success = await insertComment({ boardId, content, parentId });
            if (success) {
                fetchComments();
                setReplyContent((prev) => {
                    const newMap = new Map(prev);
                    newMap.delete(parentId);
                    return newMap;
                });
            } else {
                setModalMessage("답글을 등록할 수 없습니다.");
                setShowModal(true);
            }
        }
    };

    const handleDelete = async (commentId: number) => {
        const success = await deleteComment(commentId);
        if (success) {
            fetchComments();
            setModalMessage("댓글이 삭제되었습니다.");
            setShowModal(true);
        } else {
            setModalMessage("댓글을 삭제할 수 없습니다.");
            setShowModal(true);
        }
    };

    return (
        <section className="bg-white dark:bg-gray-900 py-4 lg:py-6 antialiased">
            {/* ✅ 게시글 상세 내용과 동일한 가로 크기로 조정 */}
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    댓글 ({comments.length})
                </h2>

                <CommentWriteForm boardId={boardId} onSubmitComment={handleNewCommentSubmit} />

                {comments.map((comment, index) => (
                    <div key={comment.commentId} style={{ paddingLeft: `${comment.level * 20}px` }}>
                        <div className="flex justify-between items-center text-sm text-gray-900 dark:text-white">
                            <div className="flex items-center space-x-2">
                                <span className="font-semibold">{comment.writer}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{comment.createdAt}</span>
                            </div>
                            <button
                                className="p-1 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => handleDelete(comment.commentId)}
                            >
                                삭제
                            </button>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-400 mt-1">{comment.content}</p>
                        <div className="flex items-center justify-between mt-2">
                            <button
                                onClick={() => handleReplyChange(comment.commentId, "")}
                                className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                            >
                                답글달기
                            </button>
                        </div>
                        {replyContent.has(comment.commentId) && (
                            <Form onSubmit={(e) => {
                                e.preventDefault();
                                handleReplySubmit(comment.commentId);
                            }}>
                                <Row className="mb-3">
                                    <Col sm={10}>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder="답글을 작성하세요..."
                                            value={replyContent.get(comment.commentId) || ""}
                                            onChange={(e) => handleReplyChange(comment.commentId, e.target.value)}
                                        />
                                    </Col>
                                    <Col sm={2} className="d-flex align-items-center">
                                        <Button variant="secondary" type="submit" className="d-block w-100">
                                            답글 달기
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                        {index !== comments.length - 1 && <hr className="my-4 border-gray-200 dark:border-gray-700" />}
                    </div>
                ))}

                {/* ✅ 부트스트랩 모달 */}
                {showModal && (
                    <>
                        <div className="modal-backdrop fade show"></div>
                        <div className="modal fade show d-block" tabIndex={-1} role="dialog">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <p>{modalMessage}</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>확인</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </section>
    );
};

export default CommentList;
