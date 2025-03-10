import { useEffect, useState } from "react";
import axios from "axios";
import { ProductDto } from "../../model/product";
import { API_BASE_URL } from "../../api/memberApi";

const useProductList = () => {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/product/list`);
      setProducts(response.data);
    } catch (error) {
      console.error("상품 목록 불러오기 실패:", error);
      setError("상품 목록을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useProductList;
