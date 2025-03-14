import ProductCart from "../../components/product/ProductCart";
import { useProductCart } from "../../hook/product/useProductCart";

const ProductCartPage = () => {
  const {
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
  } = useProductCart();

  return (
    <ProductCart
      cart={cart}
      selectedItems={selectedItems}
      totalPrice={totalPrice}
      totalShippingFee={totalShippingFee}
      finalPrice={finalPrice}
      handleSelectAll={handleSelectAll}
      handleSelectItem={handleSelectItem}
      handleQuantityChange={handleQuantityChange}
      handleDelete={handleDelete}
      handleDeleteSelected={handleDeleteSelected}
      handlePaymentNaver={handlePaymentNaver} // 추가
    />
  );
};

export default ProductCartPage;