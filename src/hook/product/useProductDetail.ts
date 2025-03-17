import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ProductDto } from "../../model/product";
import { API_BASE_URL } from "../../api/memberApi";
import { getCookie } from "../../util/cookieUtill";

export const useProductDetail = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<ProductDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    // ✅ 상품 상세 정보 가져오기
    const fetchProductDetail = async () => {
        try {
            const response = await axios.get<{ data: ProductDto }>(
                `${API_BASE_URL}/product/${productId}`
            );
            setProduct(response.data.data);
            setSelectedImage(response.data.data.imageUrl);
        } catch (error) {
            console.error("상품 상세정보 불러오기 실패:", error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ 장바구니에 추가
    const handleAddToCart = async () => {
        try {
            const quantity = selectedOption === "대용량 (20팩)" ? 20 : 1;
            await axios.post(
                `${API_BASE_URL}/cart`,
                null,
                {
                    params: {
                        productId: parseInt(productId!),
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
    };

    // ✅ 옵션 선택 핸들러
    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        const updatedPrice =
            selectedValue === "대용량 (20팩)"
                ? (product?.price || 0) * 20
                : product?.price || 0;
        setTotalPrice(updatedPrice);
    };

    // ✅ 결제 요청
    const handlePayment = async () => {
        try {
            const quantity = selectedOption === "대용량 (20팩)" ? 20 : 1;

            // ✅ 주문 생성 요청
            const orderResponse = await axios.post(
                `${API_BASE_URL}/order`,
                {
                    orderItems: [
                        {
                            productId: product?.productId,
                            price: product?.price,
                            quantity: quantity,
                        },
                    ],
                    totalAmount: totalPrice,
                    shippingFee: 0,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getCookie("jwt")}`,
                    },
                }
            );

            const orderNumber = orderResponse.data.data.orderNumber;
            console.log(orderNumber);

            // ✅ 네이버페이 결제 요청
            const paymentResponse = await axios.post(
                `${API_BASE_URL}/payment/naverpay/cart`,
                {
                    orderNumber,
                    items: [
                        {
                            productId: product?.productId,
                            name: product?.name,
                            price: product?.price,
                            quantity: quantity,
                        },
                    ],
                    totalShippingFee: 0,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getCookie("jwt")}`,
                    },
                }
            );
            // ✅ 네이버페이 리다이렉트 URL 확인
            const { reserveId } = paymentResponse.data.body;
            if (!reserveId) {
                throw new Error("reserveId가 응답에 없습니다.");
            }
            // ✅ 네이버페이 결제 페이지로 이동
            window.location.href = `https://test-m.pay.naver.com/payments/${reserveId}`;
        } catch (error) {
            console.error("네이버페이 결제 오류:", error);
            alert("결제 요청에 실패했습니다.");
        }
    };

    useEffect(() => {
        fetchProductDetail();
    }, [productId]);

    return {
        product,
        loading,
        selectedImage,
        selectedOption,
        totalPrice,
        showSuccessAlert,
        handleOptionChange,
        handleAddToCart,
        handlePayment,
    };
};