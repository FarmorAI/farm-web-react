import { Card, Button, Container, Row, Col, Form} from "react-bootstrap";
import { useState } from "react";

const products = [
    { id: 1, name: "유기농 사과", category: "과일", seller: "Janey", date: "2025. 2. 18.", stock: 20, image: "/apple.jpg", price: "₩5,000" },
    { id: 2, name: "신선한 당근", category: "채소", seller: "Johnny", date: "2025. 2. 26.", stock: 15, image: "/carrot.jpg", price: "₩3,000" },
    { id: 3, name: "제철 딸기", category: "과일", seller: "Janey", date: "2025. 2. 18.", stock: 10, image: "/strawberry.jpg", price: "₩7,000" },
];

const categories = ["전체", "과일", "채소"];

const ProductListPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [searchTerm, setSearchTerm] = useState("");

    // 필터링된 상품 목록
    const filteredProducts = products.filter((product) =>
        (selectedCategory === "전체" || product.category === selectedCategory) &&
        product.name.includes(searchTerm)
    );

    return (
        <Container className="py-5">
            {/* 🔹 메인 배너 */}
            <div className="text-center mb-5">
                <img src="/public/assets/banner.png" alt="과일 배너" className="img-fluid rounded shadow-lg" />
            </div>

            {/* 🔹 필터 및 검색창 */}
            <Row className="mb-4">
                <Col md={3}>
                    <Form.Select onChange={(e) => setSelectedCategory(e.target.value)}>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={6}>
                    <Form.Control
                        type="text"
                        placeholder="상품명을 입력하세요"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
                <Col md={3} className="text-end">
                    <Button variant="success">상품 등록</Button>
                </Col>
            </Row>

            {/* 🔹 상품 리스트 */}
            <Row>
                {filteredProducts.map((product) => (
                    <Col md={4} key={product.id} className="mb-4">
                        <Card className="shadow-sm border-0">
                            <Card.Img variant="top" src={product.image} className="rounded-top" />
                            <Card.Body>
                                <Card.Title className="fw-bold">{product.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{product.category}</Card.Subtitle>
                                <Card.Text>
                                    <strong className="text-danger">{product.price}</strong>
                                    <br />
                                    <small className="text-muted">등록일: {product.date}</small>
                                </Card.Text>
                                <Button variant="primary" className="w-100">구매하기</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductListPage;