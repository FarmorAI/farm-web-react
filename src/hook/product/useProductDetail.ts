import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ProductDto } from "../../model/product";
import { API_BASE_URL } from "../../api/memberApi";
import { getCookie } from "../../util/cookieUtill";

export const useProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const parsedProductId = productId ? parseInt(productId, 10) : undefined;
  const [product, setProduct] = useState<ProductDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // ✅ 상품 상세 정보 가져오기
  const fetchProductDetail = useCallback(async () => {
    if (!parsedProductId) return;
    try {
      const response = await axios.get<{ data: ProductDto }>(
        `${API_BASE_URL}/product/${parsedProductId}`
      );
      setProduct(response.data.data);
      setSelectedImage(response.data.data.imageUrl);
    } catch (error) {
      console.error("상품 상세정보 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  }, [parsedProductId]);

  // ✅ 장바구니에 추가
  const handleAddToCart = useCallback(async () => {
    if (!parsedProductId) return;
    try {
      const quantity = selectedOption === "대용량 (20팩)" ? 20 : 1;
      await axios.post(
        `${API_BASE_URL}/cart`,
        null,
        {
          params: {
            productId: parsedProductId,
            quantity,
          },
          headers: {
            Authorization: `Bearer ${getCookie("jwt")}`,
          },
        }
      );
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    } catch (error) {
      console.error("장바구니 추가 실패:", error);
      alert("장바구니 추가에 실패했습니다. 로그인 상태를 확인해 주세요.");
    }
  }, [parsedProductId, selectedOption]);

  // ✅ 옵션 선택 핸들러
  const handleOptionChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const updatedPrice =
      selectedValue === "대용량 (20팩)" ? (product?.price || 0) * 20 : product?.price || 0;
    setTotalPrice(updatedPrice);
  }, [product]);

  useEffect(() => {
    fetchProductDetail();
  }, [fetchProductDetail]);

  return useMemo(
    () => ({
      product,
      loading,
      selectedImage,
      selectedOption,
      totalPrice,
      showSuccessAlert,
      handleOptionChange,
      handleAddToCart,
    }),
    [
      product,
      loading,
      selectedImage,
      selectedOption,
      totalPrice,
      showSuccessAlert,
      handleOptionChange,
      handleAddToCart,
    ]
  );
};