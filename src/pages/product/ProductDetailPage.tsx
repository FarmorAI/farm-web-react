import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../api/memberApi";
import { ProductDto } from "../../model/product";
import {Container, Row, Col, Card, Button, Spinner, Alert, Form, Tab, Tabs, Table} from "react-bootstrap";
import { FaShoppingCart, FaTruck } from "react-icons/fa";

const ProductDetailPage = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<ProductDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [totalPrice, setTotalPrice] = useState<number>(0);

    // ✅ 상품 상세 정보 가져오기
    const fetchProductDetail = async () => {
        try {
            const response = await axios.get<ProductDto>(`${API_BASE_URL}/product/${productId}`);
            setProduct(response.data);
            setSelectedImage(response.data.imageUrl); // 기본 이미지 설정
        } catch (error) {
            console.error("상품 상세정보 불러오기 실패:", error);
            setError("상품 정보를 불러올 수 없습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductDetail();
    }, [productId]);

    if (loading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" role="status" />
                <p>상품 정보를 불러오는 중...</p>
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

    if (!product) {
        return (
            <Container className="py-5 text-center">
                <Alert variant="warning">해당 상품을 찾을 수 없습니다.</Alert>
            </Container>
        );
    }
    // ✅ 옵션 선택 핸들러
    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);

        // 옵션에 따라 가격 업데이트 (예시: 대용량 옵션 추가)
        const updatedPrice = selectedValue === "대용량 (20팩)" ? product.price * 20 : product.price;
        setTotalPrice(updatedPrice);
    };

    return (
        <Container fluid className="py-5">
            <Row className="justify-content-center">
                <Col lg={10} className="d-flex">
                    {/* 상품 이미지 영역 */}
                    <div className="d-flex flex-column me-4">
                        <Card className="shadow-sm border-0">
                            <Card.Img
                                variant="top"
                                src={selectedImage || "/assets/images/default.png"}
                                className="rounded-3"
                                style={{ width: "500px", height: "500px", objectFit: "cover" }}
                            />
                        </Card>
                    </div>

                    {/* 상품 정보 영역 */}
                    <Col lg={6} className="ps-lg-5">
                        <h2 className="fw-bold text-dark">{product.name}</h2>
                        <p className="text-muted">{product.variety} / {product.category}</p>
                        <h3 className="text-danger fw-bold fs-2">{totalPrice.toLocaleString()}원</h3>

                        {/* 배송 정보 */}
                        <div className="d-flex align-items-center mt-3">
                            <FaTruck size={20} className="text-muted me-2" />
                            <p className="m-0 text-muted">무료배송 | 2~3일 내 도착</p>
                        </div>

                        <hr />

                        {/* 🔹 옵션 선택 Select Box */}
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold">상품 옵션 선택</Form.Label>
                            <Form.Select value={selectedOption} onChange={handleOptionChange} required>
                                <option value="">상품을 선택하세요</option>
                                <option value="기본 (1팩)">기본 (1팩)</option>
                                <option value="대용량 (20팩)">대용량 (20팩)</option>
                            </Form.Select>
                        </Form.Group>

                        {/* 상품 개수 및 버튼 */}
                        <div className="d-flex align-items-center mt-4">
                            <p className="fw-bold fs-5 me-3">총 상품금액:</p>
                            <h3 className="text-danger fw-bold fs-3">{totalPrice.toLocaleString()}원</h3>
                        </div>

                        <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
                            <Button variant="outline-secondary" size="lg" className="w-50 fw-bold d-flex align-items-center justify-content-center gap-2">
                                <FaShoppingCart /> 장바구니
                            </Button>
                            <Button variant="danger" size="lg" className="w-50 fw-bold">
                                구매하기
                            </Button>
                        </div>
                    </Col>
                </Col>
            </Row>

            {/* 🔹 하단 정보 탭 */}
            <Row className="justify-content-center mt-5">
                <Col lg={10}>
                    <Tabs defaultActiveKey="info" id="product-detail-tabs" className="mb-3">
                        {/* 상품정보 */}
                        <Tab eventKey="info" title="상품정보">
                            <h4 className="fw-bold mt-3">상품 정보</h4>
                            <p>{product.description}</p>
                        </Tab>

                        {/* 상세정보 */}
                        <Tab eventKey="details" title="상세정보">
                            <h4 className="fw-bold mt-3">상세 정보</h4>
                            <img src={product.imageUrl} alt="상세 이미지" style={{ width: "100%", borderRadius: "10px" }} />
                        </Tab>

                        {/* 구매후기 */}
                        <Tab eventKey="reviews" title={`구매후기 (24)`}>
                            <h4 className="fw-bold mt-3">구매후기</h4>
                            <p>✅ 아직 리뷰가 없습니다.</p>
                        </Tab>

                        {/* 상품문의 */}
                        <Tab eventKey="qna" title={`상품문의 (14)`}>
                            <h4 className="fw-bold mt-3">상품문의</h4>
                            <p>💬 현재 등록된 상품 문의가 없습니다.</p>
                        </Tab>

                        {/* 배송·교환·반품 */}
                        <Tab eventKey="shipping" title="배송·교환·반품">
                            <Container fluid className="py-5">
                                <Row className="justify-content-center">
                                    <Col lg={10}>
                                        <Card className="p-4 shadow-sm">
                                            <h3 className="fw-bold mb-4">🚚 배송/교환/반품 안내</h3>

                                            {/* 배송 정보 */}
                                            <h5 className="fw-bold">📦 배송 안내</h5>
                                            <Table bordered className="mb-4">
                                                <tbody>
                                                <tr>
                                                    <th className="bg-light text-center" style={{ width: "20%" }}>배송비</th>
                                                    <td>무료배송 (제주/도서산간 지역 배송 불가)</td>
                                                </tr>
                                                <tr>
                                                    <th className="bg-light text-center">배송방법/소요일</th>
                                                    <td>묶음배송 | 택배배송 | 5일 이내 출고 (주말/공휴일 제외)</td>
                                                </tr>
                                                <tr>
                                                    <th className="bg-light text-center">배송가능지역</th>
                                                    <td>전국 (제주/도서산간 지역 제외)</td>
                                                </tr>
                                                </tbody>
                                            </Table>

                                            {/* 교환/반품 안내 */}
                                            <h5 className="fw-bold">🔄 교환/반품 안내</h5>
                                            <Table bordered className="mb-4">
                                                <tbody>
                                                <tr>
                                                    <th className="bg-light text-center" style={{ width: "20%" }}>반품/교환비</th>
                                                    <td>교환/반품 배송비: 편도 10,000원</td>
                                                </tr>
                                                <tr>
                                                    <th className="bg-light text-center">교환/반품 가능기간</th>
                                                    <td>
                                                        - 단순 변심: 상품 수령일로부터 7일 이내 (배송비: 구매자 부담) <br />
                                                        - 상품 하자: 수령 후 3개월 이내 또는 하자 사실을 인지한 날로부터 30일 이내 (판매자 부담)
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className="bg-light text-center">반품 불가 사유</th>
                                                    <td>
                                                        - 제품 사용/훼손 시 반품 불가 <br />
                                                        - 신선식품(냉장/냉동) 단순변심 반품 불가 <br />
                                                        - 상품 패키지 훼손 및 개봉 후 재판매가 어려운 경우
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </Table>

                                            {/* 거래조건 안내 */}
                                            <h5 className="fw-bold">📜 거래조건에 대한 정보</h5>
                                            <Table bordered>
                                                <tbody>
                                                <tr>
                                                    <th className="bg-light text-center" style={{ width: "20%" }}>재화 등의 공급시기</th>
                                                    <td>상품 상세페이지 참고 (배송일 및 출고일 기재)</td>
                                                </tr>
                                                <tr>
                                                    <th className="bg-light text-center">청약철회 제한 사유</th>
                                                    <td>
                                                        - 소비자의 책임 있는 사유로 상품이 멸실되거나 훼손된 경우 <br />
                                                        - 신선식품, 주문 제작 상품 등 특성상 반품이 불가능한 경우
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className="bg-light text-center">소비자보호법 기준</th>
                                                    <td>
                                                        - 전자상거래법 및 소비자보호법에 따라 환불 및 반품 기준 적용 <br />
                                                        - 제품 특성에 따라 추가적인 제한 사항이 있을 수 있음
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </Table>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetailPage;