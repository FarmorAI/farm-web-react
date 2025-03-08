import Carousel from "../../components/pagelayout/Carousel.tsx";
import ProductCard from "../../components/product/ProductList.tsx";
import useProductList from "../../hook/product/useProductList.ts";

const slidesData = [
  {
    image: "/assets/images/product/productList1.png",
    title: "신선한 딸기 마켓",
    subtitle: "최고 품질의 딸기를 만나보세요.",
  },
  {
    image: "/assets/images/product/productList2.png",
    title: "자연 그대로의 딸기",
    subtitle: "신선함과 달콤함을 그대로 담았습니다.",
  },
  {
    image: "/assets/images/product/productList3.png",
    title: "자연 그대로의 딸기",
    subtitle: "신선함과 달콤함을 그대로 담았습니다.",
  },
];

const ProductListPage = () => {
  const { products, loading, error } = useProductList();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-red-500"></div>
        <p className="mt-4 text-gray-600">상품 목록을 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="container px-4 py-6">
      <div className="mb-6">
        <Carousel slides={slidesData} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
