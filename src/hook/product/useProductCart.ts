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
        option: "",
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl,
      }));
      setCart(cartItems);
      setSelectedItems(cartItems.map((item) => item.id));
    } catch (error) {
      console.error("장바구니 불러오기 실패:", error);
      alert("장바구니를 불러오지 못했습니다. 로그인 상태를 확인해 주세요.");
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
  const getShippingFee = (item: CartItemType) =>
    getItemTotal(item) >= 30000 ? 0 : 3000;

  // ✅ 선택된 상품만 필터링 (하단 계산용)
  const selectedCart = cart.filter((item) => selectedItems.includes(item.id));

  // ✅ 선택된 상품의 총 가격 계산
  const totalPrice = selectedCart.reduce((acc, item) => acc + getItemTotal(item), 0);

  // ✅ 선택된 상품의 전체 배송비 합산
  const totalShippingFee = selectedCart.reduce(
    (acc, item) => acc + getShippingFee(item),
    0
  );

  // ✅ 최종 결제 금액
  const finalPrice = totalPrice + totalShippingFee;

  useEffect(() => {
    fetchCartItems();
  }, []);

  // 모든 변수와 함수를 return 문에서 반환
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
  };
};