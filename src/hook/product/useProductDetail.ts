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
  const handleOptionChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value;
      setSelectedOption(selectedValue);
      const updatedPrice =
        selectedValue === "대용량 (20팩)" ? (product?.price || 0) * 20 : product?.price || 0;
      setTotalPrice(updatedPrice);
    },
    [product]
  );

  // ✅ 네이버페이 결제 처리
  const handlePayment = useCallback(async () => {
    if (!parsedProductId || !product) {
      alert("상품 정보를 불러오지 못했습니다.");
      return;
    }
    if (!selectedOption) {
      alert("상품 옵션을 선택해주세요.");
      return;
    }

    const quantity = selectedOption === "대용량 (20팩)" ? 20 : 1;
    const shippingFee = totalPrice >= 30000 ? 0 : 3000; // 3만 원 이상 무료배송

    try {
      // ✅ 주문 생성 요청
      const orderResponse = await axios.post(
        `${API_BASE_URL}/order`,
        {
          orderItems: [
            {
              productId: parsedProductId,
              price: product.price,
              quantity,
            },
          ],
          totalAmount: totalPrice,
          shippingFee,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("jwt")}`,
          },
        }
      );
      const orderNumber = orderResponse.data.data.orderNumber;

      // ✅ 네이버페이 결제 요청
      const paymentResponse = await axios.post(
        `${API_BASE_URL}/payment/naverpay/cart`,
        {
          orderNumber,
          items: [
            {
              productId: parsedProductId,
              name: product.name,
              price: product.price,
              quantity,
            },
          ],
          totalShippingFee: shippingFee,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("jwt")}`,
          },
        }
      );

      console.log("백엔드 응답:", paymentResponse.data);

      const { reserveId } = paymentResponse.data.body;
      if (!reserveId) {
        throw new Error("reserveId가 응답에 없습니다.");
      }

      const reserveUrl = `https://test-m.pay.naver.com/payments/${reserveId}`;
      window.location.href = reserveUrl;
    } catch (error) {
      console.error("네이버페이 결제 오류:", error);
      alert("결제 요청에 실패했습니다.");
    }
  }, [parsedProductId, product, selectedOption, totalPrice]);

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
      handlePayment, // 추가
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
      handlePayment,
    ]
  );
};