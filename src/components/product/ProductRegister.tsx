import { Container, Form, Button, Row, Col, Card, InputGroup } from "react-bootstrap";
import { FaTag, FaMoneyBillWave, FaAppleAlt, FaLayerGroup, FaBoxes, FaCamera } from "react-icons/fa";
import { ProductForm } from "../../model/product";

interface ProductFormProps {
  formData: ProductForm;  // ✅ 정확한 타입 지정
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const appleVarieties = [
  "부사", "홍옥", "아오리", "후지", "청송사과", "골든딜리셔스",
  "애플망고", "파인애플사과", "시나노골드", "한라봉사과"
];

const productCategories = ["특", "상", "보통"];

export const ProductRegisterForm = ({
  formData,
  handleChange,
  handleFileChange,
  handleSubmit,
}: ProductFormProps) => {
  return (
    <Container fluid className="py-5 d-flex justify-content-center">
      <Row className="justify-content-center w-100" style={{ maxWidth: "1200px" }}>
        <Col md={10}>
          <Card className="p-5 border-0 rounded-4">
            <h2 className="fw-bold text-center mb-4 text-success display-5">🍏 사과 상품 등록</h2>
            <p className="text-center text-muted mb-4 fs-4">
              신선한 사과를 등록하고 고객들에게 판매하세요!
            </p>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">상품명</Form.Label>
                <InputGroup className="w-100">
                  <InputGroup.Text className="bg-primary text-white"><FaTag /></InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="예: 유기농 부사 사과"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ height: "50px", fontSize: "18px" }}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">사과 품종</Form.Label>
                <InputGroup className="w-100">
                  <InputGroup.Text className="bg-success text-white"><FaAppleAlt /></InputGroup.Text>
                  <Form.Select
                    name="variety"
                    value={formData.variety}
                    onChange={handleChange}
                    required
                    style={{ height: "50px", fontSize: "18px" }}
                  >
                    <option value="">📌 품종을 선택하세요</option>
                    {appleVarieties.map((variety, index) => (
                      <option key={index} value={variety}>{variety}</option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </Form.Group>

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

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">상품 설명</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  rows={4}
                  placeholder="사과의 특징과 신선도를 설명하세요."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  style={{ fontSize: "16px" }}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">상품 이미지</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-danger text-white"><FaCamera /></InputGroup.Text>
                  <Form.Control type="file" accept="image/*" onChange={handleFileChange} required />
                </InputGroup>
              </Form.Group>

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

              <Button variant="success" type="submit" className="w-100 fw-bold py-3 fs-4">
                사과 등록 🍏
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};