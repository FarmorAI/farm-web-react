import { Card, Button, Container, Row, Col, Nav } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../../components/pagelayout/Carousel.tsx";

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

// ✅ 딸기 품종 데이터 (카테고리별)
const strawberryData = {
    sweet_firm: [
        { id: 1, name: "죽향", image: "/assets/images/product/jukhwang.png", price: "₩7,000" },
        { id: 2, name: "금실", image: "/assets/images/product/geumsil.png", price: "₩6,000" },
        { id: 3, name: "메리퀸", image: "/assets/images/product/merryqueen.png", price: "₩8,000" },
    ],
    tangy_firm: [
        { id: 4, name: "아리향", image: "/assets/images/product/arihyang.png", price: "₩5,500" },
        { id: 5, name: "비타베리", image: "/assets/images/product/vitaberry.png", price: "₩6,500" },
        { id: 6, name: "육보", image: "/assets/images/product/yukbo.png", price: "₩7,200" },
    ],
    sweet_soft: [
        { id: 7, name: "장희", image: "/assets/images/product/janghee.png", price: "₩6,800" },
        { id: 8, name: "만년설", image: "/assets/images/product/mannyeonsul.png", price: "₩9,000" },
    ],
    tangy_soft: [
        { id: 9, name: "설향", image: "/assets/images/product/seolhyang.png", price: "₩5,000" },
        { id: 10, name: "골드벨", image: "/assets/images/product/goldbell.png", price: "₩6,200" },
        { id: 11, name: "킹스베리", image: "/assets/images/product/kingsberry.png", price: "₩10,000" },
    ],
};

// ✅ 전체 상품 리스트 생성
const allProducts = Object.values(strawberryData).flat();

const ProductListPage = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("all");

    // ✅ 현재 선택된 카테고리에 따른 상품 목록 필터링
    const filteredProducts =
        selectedCategory === "all"
            ? allProducts
            : strawberryData[selectedCategory as keyof typeof strawberryData];

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
                    <Col key={product.id} xs={6} md={4} lg={3}>
                        <Card
                            className="shadow-sm border-0 h-100"
                            style={{
                                cursor: "pointer",
                                borderRadius: "12px",
                                transition: "0.3s",
                            }}
                            onClick={() => navigate(`/product/${product.id}`)}
                            onMouseOver={(e) => (e.currentTarget.style.boxShadow = "0px 4px 15px rgba(0, 0, 0, 0.2)")}
                            onMouseOut={(e) => (e.currentTarget.style.boxShadow = "none")}
                        >
                            <Card.Img
                                variant="top"
                                src={product.image}
                                className="rounded-top w-100 object-cover"
                                style={{ height: "200px", borderBottom: "3px solid #ff4d4d" }}
                            />
                            <Card.Body className="p-3 text-center d-flex flex-column justify-content-between">
                                <Card.Title className="fw-bold text-truncate">{product.name}</Card.Title>
                                <Card.Text className="text-danger fw-semibold">{product.price}</Card.Text>
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