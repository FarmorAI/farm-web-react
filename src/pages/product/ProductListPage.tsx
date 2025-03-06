import { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col, Nav, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Carousel from "../../components/pagelayout/Carousel.tsx";
import axios from "axios";
import { API_BASE_URL } from "../../api/memberApi";

// ✅ 메인 배너 데이터
const slidesData = [
    {
        image: "/assets/images/product/productList1.png",
        title: "신선한 딸기 마켓",
        subtitle: "최고 품질의 딸기를 만나보세요.",
    },
    {
        image: "/assets/images/product/productList2.png",
        title: "자연 그대로의 딸기",
        subtitle: "신선함과 달콤함을 그대로 담았습니다.",
    },
    {
        image: "/assets/images/product/productList3.png",
        title: "자연 그대로의 딸기",
        subtitle: "신선함과 달콤함을 그대로 담았습니다.",
    },
];

// ✅ 딸기 품종 카테고리
const categories = [
    { title: "전체", key: "all" },
    { title: "단단하고 달콤한", key: "sweet_firm" },
    { title: "단단하고 상큼한", key: "tangy_firm" },
    { title: "부드럽고 달콤한", key: "sweet_soft" },
    { title: "부드럽고 상큼한", key: "tangy_soft" },
];

const ProductListPage = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // ✅ 백엔드에서 상품 목록 불러오기
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/product/list`);
            setProducts(response.data); // 상품 목록 상태 업데이트
        } catch (error) {
            console.error("상품 목록 불러오기 실패:", error);
            setError("상품 목록을 불러오는 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" role="status" />
                <p>상품 목록을 불러오는 중...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-5 text-center">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    // ✅ 현재 선택된 카테고리에 따른 상품 목록 필터링
    const filteredProducts =
        selectedCategory === "all"
            ? products
            : products.filter((product) => product.category === selectedCategory);

    return (
        <Container fluid className="py-4">
            {/* 🔹 메인 배너 */}
            <div className="mb-4">
                <Carousel slides={slidesData} />
            </div>

            {/* 🔹 카테고리 네비게이션 */}
            <Nav variant="pills" className="justify-content-center mb-4 gap-2">
                {categories.map((category) => (
                    <Nav.Item key={category.key}>
                        <Nav.Link
                            active={selectedCategory === category.key}
                            onClick={() => setSelectedCategory(category.key)}
                            className="fw-bold px-4 py-2 rounded-pill"
                            style={{
                                backgroundColor: selectedCategory === category.key ? "#ff4d4d" : "#f8f9fa",
                                color: selectedCategory === category.key ? "#fff" : "#333",
                                transition: "0.3s",
                                border: "1px solid #ff4d4d",
                            }}
                        >
                            {category.title}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>

            {/* 🔹 상품 목록 (그리드 형식) */}
            <Row className="g-3">
                {filteredProducts.map((product) => (
                    <Col key={product.productId} xs={6} md={4} lg={3}>
                        <Card
                            className="shadow-sm border-0 h-100"
                            style={{
                                cursor: "pointer",
                                borderRadius: "12px",
                                transition: "0.3s",
                            }}
                            onClick={() => navigate(`/product/${product.productId}`)}
                            onMouseOver={(e) => (e.currentTarget.style.boxShadow = "0px 4px 15px rgba(0, 0, 0, 0.2)")}
                            onMouseOut={(e) => (e.currentTarget.style.boxShadow = "none")}
                        >
                            <Card.Img
                                variant="top"
                                src={product.imageUrl || "/assets/images/default.png"}
                                className="rounded-top w-100 object-cover"
                                style={{ height: "200px", borderBottom: "3px solid #ff4d4d" }}
                            />
                            <Card.Body className="p-3 text-center d-flex flex-column justify-content-between">
                                <Card.Title className="fw-bold text-truncate">{product.name}</Card.Title>
                                <Card.Text className="text-danger fw-semibold">
                                    {new Intl.NumberFormat("ko-KR").format(product.price)}원
                                </Card.Text>
                                <Button
                                    variant="outline-danger"
                                    className="w-100 mt-auto"
                                    style={{
                                        transition: "0.3s",
                                        fontWeight: "bold",
                                        borderRadius: "8px",
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#ff4d4d")}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                                >
                                    구매하기
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductListPage;