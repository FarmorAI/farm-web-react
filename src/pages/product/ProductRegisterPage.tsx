import { useState } from "react";
import { Container, Form, Button, Row, Col, Card, InputGroup } from "react-bootstrap";
import { FaTag, FaMoneyBillWave, FaSeedling, FaLayerGroup, FaBoxes } from "react-icons/fa";
import {ProductForm} from "../../model/product.ts";
import axios from "axios";
import {API_BASE_URL} from "../../api/memberApi.ts";
import {getCookie} from "../../util/cookieUtill.ts";

// ✅ 등록 가능한 딸기 품종 목록
const strawberryVarieties = [
    "죽향", "금실", "메리퀸", "아리향", "비타베리", "육보",
    "장희", "만년설", "설향", "골드벨", "킹스베리"
];

// ✅ 상품 카테고리 목록
const productCategories = ["유기농", "고당도", "제철", "특대형", "일반"];

const ProductRegisterPage = () => {
    const [formData, setFormData] = useState<ProductForm>({
        name: "",
        variety: "",
        price: 0,
        stock: 0,
        description: "",
        imageUrl: null,
        previewUrl: "",
    });

    // ✅ 입력값 변경 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // ✅ 이미지 업로드 핸들러 (FileReader API 사용)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            const reader = new FileReader();
            reader.readAsDataURL(file); // base64로 변환
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    imageUrl: file,
                    previewUrl: reader.result as string, // base64 URL 저장
                });
            };
        }
    };

    // ✅ 폼 제출 핸들러
    const handleSubmit =  async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("📌 등록할 상품 데이터:", formData.imageUrl);
        if(!formData.imageUrl){
            alert("❌ 이미지를 업로드하세요.");
            return;
        }
        const productData = {
            name: formData.name,
            variety: formData.variety,
            price: formData.price,
            stock: formData.stock,
            description: formData.description,
        }
        const data = new FormData();
        data.append("product", new Blob([JSON.stringify(productData)], { type: "application/json" }));
        data.append("file", formData.imageUrl);
        try {
            const res = await axios.post(`${API_BASE_URL}/product`, data, {
                headers: {
                    "Authorization": `Bearer ${getCookie("jwt")}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("✅ 상품이 성공적으로 등록되었습니다.");
            console.log("상품 등록 결과:", res.data);
        } catch (error) {
            console.error("상품 등록 실패:", error);
            alert("❌ 상품 등록에 실패했습니다. 다시 시도하세요.");
        }

    };

    return (
        <Container fluid className="py-5 d-flex justify-content-center">
            <Row className="justify-content-center w-100" style={{ maxWidth: "1200px" }}>
                <Col md={10}>
                    <Card className="p-5 border-0 rounded-4">
                        <h2 className="fw-bold text-center mb-4 text-danger display-5">🍓 상품 등록</h2>
                        <p className="text-center text-muted mb-4 fs-4">
                            신선한 딸기를 등록하고 고객들에게 판매하세요!
                        </p>
                        <Form onSubmit={handleSubmit}>
                            {/* 🔹 상품명 입력 */}
                            <Form.Group className="mb-4">
                                <Form.Label className="fw-bold">상품명</Form.Label>
                                <InputGroup className="w-100">
                                    <InputGroup.Text className="bg-primary text-white"><FaTag /></InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="예: 유기농 설향 딸기"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        style={{ height: "50px", fontSize: "18px" }}
                                    />
                                </InputGroup>
                            </Form.Group>

                            {/* 🔹 딸기 품종 선택 */}
                            <Form.Group className="mb-4">
                                <Form.Label className="fw-bold">딸기 품종</Form.Label>
                                <InputGroup className="w-100">
                                    <InputGroup.Text className="bg-success text-white"><FaSeedling /></InputGroup.Text>
                                    <Form.Select
                                        name="variety"
                                        value={formData.variety}
                                        onChange={handleChange}
                                        required
                                        style={{ height: "50px", fontSize: "18px" }}
                                    >
                                        <option value="">📌 품종을 선택하세요</option>
                                        {strawberryVarieties.map((variety, index) => (
                                            <option key={index} value={variety}>{variety}</option>
                                        ))}
                                    </Form.Select>
                                </InputGroup>
                            </Form.Group>

                            {/* 🔹 카테고리 선택 */}
                            <Form.Group className="mb-4">
                                <Form.Label className="fw-bold">카테고리</Form.Label>
                                <InputGroup className="w-100">
                                    <InputGroup.Text className="bg-secondary text-white"><FaLayerGroup /></InputGroup.Text>
                                    <Form.Select
                                        name="category"
                                        onChange={handleChange}
                                        required
                                        style={{ height: "50px", fontSize: "18px" }}
                                    >
                                        <option value="">📌 카테고리를 선택하세요</option>
                                        {productCategories.map((category, index) => (
                                            <option key={index} value={category}>{category}</option>
                                        ))}
                                    </Form.Select>
                                </InputGroup>
                            </Form.Group>

                            {/* 🔹 가격 입력 */}
                            <Form.Group className="mb-4">
                                <Form.Label className="fw-bold">가격 (₩)</Form.Label>
                                <InputGroup className="w-100">
                                    <InputGroup.Text className="bg-warning text-dark"><FaMoneyBillWave /></InputGroup.Text>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        placeholder="예: 7000"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        style={{ height: "50px", fontSize: "18px" }}
                                    />
                                </InputGroup>
                            </Form.Group>

                            {/* 🔹 수량 입력 */}
                            <Form.Group className="mb-4">
                                <Form.Label className="fw-bold">수량</Form.Label>
                                <InputGroup className="w-100">
                                    <InputGroup.Text className="bg-info text-white"><FaBoxes /></InputGroup.Text>
                                    <Form.Control
                                        type="number"
                                        name="stock"
                                        placeholder="예: 50"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        required
                                        style={{ height: "50px", fontSize: "18px" }}
                                    />
                                </InputGroup>
                            </Form.Group>

                            {/* 🔹 상품 설명 */}
                            <Form.Group className="mb-4">
                                <Form.Label className="fw-bold">상품 설명</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    rows={4}
                                    placeholder="상품의 특징과 신선도를 설명하세요."
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    style={{ fontSize: "16px" }}
                                />
                            </Form.Group>

                            {/* 🔹 이미지 업로드 */}
                            <Form.Group className="mb-4">
                                <Form.Label className="fw-bold">상품 이미지</Form.Label>
                                <Form.Control type="file" accept="image/*" onChange={handleFileChange} required />
                            </Form.Group>

                            {/* 🔹 이미지 미리보기 */}
                            {formData.previewUrl && (
                                <div className="text-center mb-4">
                                    <img
                                        src={formData.previewUrl}
                                        alt="미리보기"
                                        className="rounded-3 shadow"
                                        style={{ width: "100%", maxWidth: "500px", height: "auto" }}
                                    />
                                </div>
                            )}

                            {/* 🔹 등록 버튼 */}
                            <Button variant="danger" type="submit" className="w-100 fw-bold py-3 fs-4">
                                상품 등록
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductRegisterPage;