export interface ProductForm{
    name: string;
    variety: string;
    price: number;
    stock: number;
    description: string;
    imageUrl: File | null;
    previewUrl: string,
}

export interface ProductDto{
    productId: number;
    name: string;
    variety: string;
    price: number;
    stock: number;
    description: string;
    imageUrl: string;
    category: string | null;

}



// 백엔드 응답 구조 인터페이스 정의
export interface CartItemDto {
  cartItemId: number;
  cartId: number;
  productId: number;
  quantity: number;
  createdAt: string;
  price: number;
  pname: string;
  imageUrl: string;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T[];
}

// 프론트엔드에서 사용할 CartItemType
export interface CartItemType {
  id: number; // cartItemId로 매핑
  productId: number;
  name: string; // pname으로 매핑
  option: string; // 백엔드에서 제공되지 않으므로 임시로 빈 문자열
  price: number;
  quantity: number;
  imageUrl: string;
}
