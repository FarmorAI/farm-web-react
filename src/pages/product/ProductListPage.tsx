import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../../components/pagelayout/Carousel.tsx";
import axios from "axios";
import { API_BASE_URL } from "../../api/memberApi";

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
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
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
                    <div
                        key={product.productId}
                        className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border border-gray-200"
                        onClick={() => navigate(`/product/${product.productId}`)}
                    >
                        <div className="relative">
                            <img
                                src={product.imageUrl || "/assets/images/default.png"}
                                alt={product.name}
                                className="w-full h-56 object-cover"
                            />
                            {product.discount && (
                                <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                                    {product.discount}% 할인
                                </span>
                            )}
                        </div>
                        <div className="p-4 text-center flex flex-col">
                            <h3 className="font-semibold text-lg text-gray-800 truncate">{product.name}</h3>
                            <p className="text-gray-500 text-sm mt-1">{product.description}</p>
                            <p className="text-red-500 font-bold text-lg mt-2">{new Intl.NumberFormat("ko-KR").format(product.price)}원</p>
                            <div className="flex justify-center mt-2">
                                <span className="text-yellow-400 text-sm font-bold">⭐ {product.rating} ({product.reviews} 리뷰)</span>
                            </div>
                            <button className="mt-4 py-2 bg-red-500 text-white font-semibold rounded-lg transition hover:bg-red-600">
                                구매하기
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListPage;
