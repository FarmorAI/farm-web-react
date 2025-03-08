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
    />
  );
};

export default ProductCartPage;