
import ProductDetail from "../../components/product/ProductDetail";
import { useProductDetail } from "../../hook/product/useProductDetail";
const ProductDetailPage = () => {
  const {
    product,
    loading,
    selectedImage,
    selectedOption,
    totalPrice,
    showSuccessAlert,
    handleOptionChange,
    handleAddToCart,
    handlePayment
  } = useProductDetail();

  return (
    <ProductDetail
      product={product}
      loading={loading}
      selectedImage={selectedImage}
      selectedOption={selectedOption}
      totalPrice={totalPrice}
      showSuccessAlert={showSuccessAlert}
      handleOptionChange={handleOptionChange}
      handleAddToCart={handleAddToCart}
      handlePayment={handlePayment}
    />
  );
};

export default ProductDetailPage;