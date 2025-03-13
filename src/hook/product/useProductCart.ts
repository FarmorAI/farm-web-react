import { useState, useEffect } from "react";
import axios from "axios";
import { ApiResponse, CartItemDto, CartItemType } from "../../model/product";
import { getCookie } from "../../util/cookieUtill";
import { API_BASE_URL } from "../../api/memberApi";

export const useProductCart = () => {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // ✅ 장바구니 데이터 가져오기
  const fetchCartItems = async () => {
    try {
      const response = await axios.get<ApiResponse<CartItemDto>>(
        `${API_BASE_URL}/cart`,
        {
          headers: {
            Authorization: `Bearer ${getCookie("jwt")}`,
          },
        }
      );
      const cartItems = response.data.data.map((item) => ({
        id: item.cartItemId,
        name: item.pname,
        productId: item.productId,
        option: "",
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl,
        pname: "",
      }));
      setCart(cartItems);
      setSelectedItems(cartItems.map((item) => item.id));
    } catch (error) {
      console.error("장바구니 불러오기 실패:", error);
      alert("장바구니를 불러오지 못했습니다. 로그인 상태를 확인해 주세요.");
    }
  };

  // ✅ 네이버페이 결제 요청
  const handlePaymentNaver = async (selectedItems: CartItemType[]): Promise<void> => {
    if (selectedItems.length === 0) {
      alert("결제할 상품을 선택해주세요.");
      return;
    }
    console.log("선택된 상품:", selectedItems);
    try {
      // ✅ 주문 생성 요청 (배송비 포함)
      const orderResponse = await axios.post(
        `${API_BASE_URL}/order`,
        {
          orderItems: selectedItems.map((item) => ({
            productId: item.productId,
            price: item.price,
            quantity: item.quantity,
          })),
          totalAmount: selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
          shippingFee: totalShippingFee,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("jwt")}`,
          },
        }
      );
      const orderNumber = orderResponse.data.data.orderNumber;

      // ✅ 네이버페이 결제 요청 (주문 ID 포함)
      const paymentResponse = await axios.post(
        `${API_BASE_URL}/payment/naverpay/cart`,
        {
          orderNumber,
          items: selectedItems.map((item) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          totalShippingFee: totalShippingFee,
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
  };

  // ✅ 수량 변경 핸들러
  const handleQuantityChange = (id: number, amount: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  // ✅ 전체 선택/해제 핸들러
  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? cart.map((item) => item.id) : []);
  };

  // ✅ 개별 선택/해제 핸들러
  const handleSelectItem = (id: number) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  // ✅ 선택된 상품 삭제 핸들러
  const handleDelete = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    setSelectedItems((prevSelected) => prevSelected.filter((itemId) => itemId !== id));
  };

  // ✅ 선택된 상품 삭제
  const handleDeleteSelected = () => {
    setCart((prevCart) => prevCart.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  // ✅ 각 상품의 총 가격 (상품 가격 × 수량)
  const getItemTotal = (item: CartItemType) => item.price * item.quantity;

  // ✅ 개별 상품 기준으로 배송비 적용 (3만 원 이상 무료, 미만 3천 원)
  const getShippingFee = (item: CartItemType) => (getItemTotal(item) >= 30000 ? 0 : 3000);

  // ✅ 선택된 상품만 필터링
  const selectedCart = cart.filter((item) => selectedItems.includes(item.id));

  // ✅ 선택된 상품의 총 가격 계산
  const totalPrice = selectedCart.reduce((acc, item) => acc + getItemTotal(item), 0);

  // ✅ 선택된 상품의 전체 배송비 합산
  const totalShippingFee = selectedCart.reduce((acc, item) => acc + getShippingFee(item), 0);

  // ✅ 최종 결제 금액
  const finalPrice = totalPrice + totalShippingFee;

  useEffect(() => {
    fetchCartItems();
  }, []);

  return {
    cart,
    selectedItems,
    totalPrice,
    totalShippingFee,
    finalPrice,
    handleSelectAll,
    handleSelectItem,
    handleQuantityChange,
    handleDelete,
    handleDeleteSelected,
    handlePaymentNaver, // 추가
  };
};