import { useState } from "react";
import axios from "axios";
import { ProductForm } from "../../model/product.ts";
import { getCookie } from "../../util/cookieUtill.ts";
import { API_BASE_URL } from "../../api/memberApi.ts";

export const useProductRegister = () => {
  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    variety: "",
    price: 0,
    stock: 0,
    description: "",
    imageUrl: null,
    previewUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({
          ...formData,
          imageUrl: file,
          previewUrl: reader.result as string,
        });
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      alert("❌ 이미지를 업로드하세요.");
      return;
    }

    const productData = {
      name: formData.name,
      variety: formData.variety,
      price: formData.price,
      stock: formData.stock,
      description: formData.description,
    };

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
      alert("✅ 사과 상품이 성공적으로 등록되었습니다.");
      console.log("상품 등록 결과:", res.data);
    } catch (error) {
      console.error("상품 등록 실패:", error);
      alert("❌ 상품 등록에 실패했습니다. 다시 시도하세요.");
    }
  };

  return { formData, handleChange, handleFileChange, handleSubmit };
};