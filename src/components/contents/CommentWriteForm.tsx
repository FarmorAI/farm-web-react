import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { insertComment } from "../../api/commentApi";

interface CommentWriteFormProps {
    boardId: number;
    parentId?: number | null; // 부모 댓글 ID (대댓글일 경우)
    onSubmitComment: (content: string, parentId?: number | null) => void;
}

const CommentWriteForm: React.FC<CommentWriteFormProps> = ({ boardId, parentId = null, onSubmitComment }) => {
    const [content, setContent] = useState<string>("");
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;
        const success = await insertComment({ boardId, content, parentId });
        if (success) {
            setContent(""); // 입력 필드 초기화
            onSubmitComment(content, parentId); // ❌ 여기서 API 호출 금지
        }else {
            setModalMessage("댓글을 등록할 수 없습니다.");
            setShowModal(true);
        }
    };

    return (
        <div className="comment-write-form">
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col sm={10}>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder={parentId === null ? "댓글을 작성하세요..." : "답글을 작성하세요..."}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Col>
                    <Col sm={2} className="d-flex align-items-center">
                        <Button variant={parentId === null ? "primary" : "secondary"} type="submit" className="d-block w-100">
                            {parentId === null ? "등록" : "답글 달기"}
                        </Button>
                    </Col>
                </Row>
            </Form>
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

    );
};

export default CommentWriteForm;