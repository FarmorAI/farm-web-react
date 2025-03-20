import {
    Container,
    Row,
    Col,
    Card,
    Spinner,
    Alert,
    Tab,
    Tabs,
    Table,
} from "react-bootstrap";
import {FaTruck} from "react-icons/fa";
import {ProductDto} from "../../model/product";
import React from "react";

interface ProductDetailUIProps {
    product: ProductDto | null,
    loading: boolean,
    selectedImage: string,
    selectedOption: string,
    totalPrice: number,
    showSuccessAlert: boolean,
    handleOptionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    handleAddToCart: () => void,
    handlePayment: () => void,
}

const ProductDetail: React.FC<ProductDetailUIProps> = ({
                                                           product,
                                                           loading,
                                                           selectedImage,
                                                           selectedOption,
                                                           totalPrice,
                                                           showSuccessAlert,
                                                           handleOptionChange,
                                                           handleAddToCart,
                                                           handlePayment
                                                       }) => {
    if (loading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" role="status"/>
                <p>상품 정보를 불러오는 중...</p>
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

    return (
        <Container fluid className="py-5">
            <Row className="justify-content-center">
                <Col lg={10} className="d-flex">
                    <div className="d-flex flex-column me-4">
                        <Card className="shadow-sm border-0">
                            <Card.Img
                                variant="top"
                                src={selectedImage || "/assets/images/default.png"}
                                className="rounded-3"
                                style={{width: "500px", height: "500px", objectFit: "cover"}}
                            />
                        </Card>
                    </div>

                    <Col lg={6} className="ps-lg-5">
                        <div className="flex flex-col space-y-4 p-6 bg-white rounded-lg">
                            <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
                            <p className="text-gray-500">{product.variety} / {product.category}</p>
                            <h3 className="text-green-600 font-bold text-2xl">
                                {totalPrice.toLocaleString()}원
                            </h3>

                            <div className="flex items-center space-x-2">
                                <FaTruck size={20} className="text-gray-500"/>
                                <p className="text-gray-500">무료배송 | 2~3일 내 도착</p>
                            </div>

                            <hr/>

                            <label className="font-bold">상품 옵션 선택</label>
                            <select
                                className="p-2 border rounded-md"
                                value={selectedOption}
                                onChange={handleOptionChange}
                            >
                                <option value="">상품을 선택하세요</option>
                                <option value="기본 (1팩)">기본 (1팩)</option>
                                <option value="대용량 (20팩)">대용량 (20팩)</option>
                            </select>

                            <div className="flex items-center space-x-4">
                                <p className="font-bold text-lg">총 상품금액:</p>
                                <h3 className="text-green-600 font-bold text-2xl">
                                    {totalPrice.toLocaleString()}원
                                </h3>
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    className="w-1/2 py-3 text-center text-gray-700 border border-gray-400 rounded-lg font-bold hover:bg-gray-100"
                                    onClick={handleAddToCart}
                                >
                                    장바구니
                                </button>
                                <button
                                    className="w-1/2 py-3 text-center bg-green-500 text-white rounded-lg font-bold hover:bg-green-600"
                                    onClick={handlePayment}
                                >
                                    구매하기
                                </button>
                            </div>
                        </div>
                        {showSuccessAlert && (
                            <Alert variant="success" className="mt-4">
                                장바구니에 추가되었습니다!
                            </Alert>
                        )}
                    </Col>
                </Col>
            </Row>

            <Row className="justify-content-center mt-5">
                <Col lg={10}>
                    <Tabs defaultActiveKey="info" id="product-detail-tabs" className="mb-3">
                        <Tab eventKey="info" title="상품정보">
                            <h4 className="fw-bold mt-3">상품 정보</h4>
                            <p>{product.description}</p>
                        </Tab>

                        <Tab eventKey="details" title="상세정보">
                            <h4 className="fw-bold mt-3">상세 정보</h4>
                            <img
                                src={product.imageUrl}
                                alt="상세 이미지"
                                style={{width: "100%", borderRadius: "10px"}}
                            />
                        </Tab>

                        <Tab eventKey="shipping" title="배송·교환·반품">
                            <Container fluid className="py-5">
                                <Row className="justify-content-center">
                                    <Col lg={10}>
                                        <Card className="p-4 shadow-sm">
                                            <h3 className="fw-bold mb-4">🚚 배송/교환/반품 안내</h3>

                                            <h5 className="fw-bold">📦 배송 안내</h5>
                                            <Table bordered className="mb-4">
                                                <tbody>
                                                <tr>
                                                    <th className="bg-light text-center" style={{width: "20%"}}>
                                                        배송비
                                                    </th>
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

                                            <h5 className="fw-bold">🔄 교환/반품 안내</h5>
                                            <Table bordered className="mb-4">
                                                <tbody>
                                                <tr>
                                                    <th className="bg-light text-center" style={{width: "20%"}}>
                                                        반품/교환비
                                                    </th>
                                                    <td>교환/반품 배송비: 편도 10,000원</td>
                                                </tr>
                                                <tr>
                                                    <th className="bg-light text-center">교환/반품 가능기간</th>
                                                    <td>
                                                        - 단순 변심: 상품 수령일로부터 7일 이내 (배송비: 구매자 부담) <br/>- 상품 하자:
                                                        수령 후 3개월 이내 또는 하자 사실을 인지한 날로부터 30일 이내 (판매자 부담)
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className="bg-light text-center">반품 불가 사유</th>
                                                    <td>
                                                        - 제품 사용/훼손 시 반품 불가 <br/>- 신선식품(냉장/냉동) 단순변심 반품 불가 <br/>-
                                                        상품 패키지 훼손 및 개봉 후 재판매가 어려운 경우
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </Table>

                                            <h5 className="fw-bold">📜 거래조건에 대한 정보</h5>
                                            <Table bordered>
                                                <tbody>
                                                <tr>
                                                    <th className="bg-light text-center" style={{width: "20%"}}>
                                                        재화 등의 공급시기
                                                    </th>
                                                    <td>상품 상세페이지 참고 (배송일 및 출고일 기재)</td>
                                                </tr>
                                                <tr>
                                                    <th className="bg-light text-center">청약철회 제한 사유</th>
                                                    <td>
                                                        - 소비자의 책임 있는 사유로 상품이 멸실되거나 훼손된 경우 <br/>- 신선식품, 주문 제작
                                                        상품 등 특성상 반품이 불가능한 경우
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className="bg-light text-center">소비자보호법 기준</th>
                                                    <td>
                                                        - 전자상거래법 및 소비자보호법에 따라 환불 및 반품 기준 적용 <br/>- 제품 특성에 따라
                                                        추가적인 제한 사항이 있을 수 있음
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

export default ProductDetail;