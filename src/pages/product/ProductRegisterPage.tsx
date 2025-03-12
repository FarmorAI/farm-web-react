import { ProductRegisterForm } from "../../components/product/ProductRegister";
import { useProductRegister } from "../../hook/product/useProductRegister";

const ProductRegisterPage = () => {
  const { formData, handleChange, handleFileChange, handleSubmit } = useProductRegister();

  return (
    <ProductRegisterForm
      formData={formData}
      handleChange={handleChange}
      handleFileChange={handleFileChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default ProductRegisterPage;