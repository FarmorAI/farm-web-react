import { useEffect, useState } from "react";
import { fetchBlogData } from "../../api/infoApi.ts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPost {
    title: string;
    url: string;
    blogname: string;
    thumbnail: string;
    datetime: string;
}

interface InfoDisplayProps {
    query: string;
}

const BlogDisplay: React.FC<InfoDisplayProps> = ({ query }) => {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchBlogData(query);
            setPosts(data);
        };
        loadData();
    }, [query]);

    return (
        <div className="max-w-6xl mx-auto my-10 px-6 relative">
            {/* 제목 & 네비게이션 버튼 */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-left">{query} 관련 블로그</h2>
                <div className="flex space-x-5">
                    <button className="swiper-button-prev p-3 bg-gray-200 rounded-full hover:bg-gray-300">
                        <ChevronLeft size={24} />
                    </button>
                    <button className="swiper-button-next p-3 bg-gray-200 rounded-full hover:bg-gray-300">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
                navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                className="w-full pb-16" // 🔹 하단 여백 추가하여 동그라미와 겹치지 않도록 함
            >
                {posts.slice(0, 12).map((post, idx) => (
                    <SwiperSlide key={idx} className="pb-6"> {/* 🔹 카드 하단 여백 추가 */}
                        <a
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
                        >
                            <div className="flex flex-col h-96 justify-between"> {/* 🔹 카드 내용 균형 유지 */}
                                <img
                                    src={post.thumbnail || "/default-thumbnail.jpg"}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 flex-grow">{post.blogname}</p>
                                    <p className="text-xs text-gray-400">
                                        {new Date(post.datetime).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* 네비게이션 여백 조정 */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 py-6">
                <div className="swiper-pagination"></div>
            </div>
        </div>
    );
};

export default BlogDisplay;
