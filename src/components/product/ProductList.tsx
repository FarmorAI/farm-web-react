import { useNavigate } from "react-router-dom";
import { ProductDto } from "../../model/product";

interface ProductCardProps {
  product: ProductDto;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border border-gray-200"
      onClick={() => navigate(`/product/${product.productId}`)}
    >
      <div className="relative">
        <img
          src={product.imageUrl || "/assets/images/default.png"}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
      </div>
      <div className="p-4 text-center flex flex-col">
        <h3 className="font-semibold text-lg text-gray-800 truncate">{product.name}</h3>
        <p className="text-gray-500 text-sm mt-1">{product.description}</p>
        <p className="text-red-500 font-bold text-lg mt-2">
          {new Intl.NumberFormat("ko-KR").format(product.price)}원
        </p>
        <button className="mt-4 py-2 bg-red-500 text-white font-semibold rounded-lg transition hover:bg-red-600">
          구매하기
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
