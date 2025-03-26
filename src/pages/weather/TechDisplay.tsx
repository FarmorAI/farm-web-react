import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
import { fetchTechInfo } from "../../api/infoApi.ts";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface TechDisplayProps {
    query: string;
}
const TechDisplay:React.FC<TechDisplayProps> = ({query}) => {
    const style = document.createElement("style");
    style.innerHTML = `
            @font-face {
                font-family: 'Gyeonggi_Title_Medium';
                src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2410-3@1.0/Title_Medium.woff') format('woff');
                font-weight: 500;
                font-style: normal;
            }
            @font-face {
                font-family: 'GowunDodum-Regular';
                src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/GowunDodum-Regular.woff') format('woff');
                font-weight: normal;
                font-style: normal;
            }`;
    document.head.appendChild(style);
    const [techInfo, setTechInfo] = useState<{ title: string; thumbnailUrl: string; contentId: string }[]>([]);

    useEffect(() => {
        const loadTechInfo = async () => {
            const data = await fetchTechInfo(query);
            console.log("🔍 Tech Info Data:", data);
            setTechInfo(data.map((item: any) => ({
                title: item.title,
                thumbnailUrl: item.thumbnailUrl,
                contentId: item.contentId
            })));
        };
        loadTechInfo();
    }, [query]);

    return (
        <div className="max-w-[1500px] mx-auto px-6 ">
            {/* 제목 영역 */}
            <div className="bg-blue-50 text-gray-800 text-lg font-semibold py-3 px-4 rounded-t-lg flex items-center justify-between" style={{ fontFamily: "Gyeonggi_Title_Medium" }}>
                <span>📢 이달의 농업기술</span>
                <div className="flex space-x-2" >
                    <button className="tech-swiper-button-prev bg-white p-2 rounded-full cursor-pointer text-blue-300">
                        <ChevronLeft size={20} />
                    </button>
                    <button className="tech-swiper-button-next bg-white p-2 rounded-full cursor-pointer text-blue-300">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* 슬라이드 컨테이너 */}
            <div className="p-4 border-b border-gray-200 bg-white rounded-b-lg" style={{ fontFamily: "GowunDodum-Regular" }}>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={10}
                    slidesPerView={4}
                    navigation={{ nextEl: ".tech-swiper-button-next", prevEl: ".tech-swiper-button-prev" }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                >
                    {techInfo.map((item, index) => (
                        <SwiperSlide key={index}>
                            <a
                                href={`https://www.nongsaro.go.kr/portal/ps/psv/psvr/psvre/curationDtl.ps?menuId=PS03352&srchCurationNo=${item.contentId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <div className="rounded-lg overflow-hidden h-72 flex flex-col border border-gray-200 transition-transform duration-300 ease-in-out hover:scale-105" style={{ fontFamily: "GowunDodum-Regular" }}>
                                    <img src={item.thumbnailUrl} alt={item.title} className="w-full h-48 object-cover" />
                                    <div className="block p-3 text-sm font-semibold text-center text-gray-900 hover:text-green-700 break-words overflow-wrap break-word"
                                         style={{ wordBreak: "keep-all", whiteSpace: "normal", lineHeight: "1.4", maxWidth: "90%" }}
                                    >
                                        {item.title}
                                    </div>
                                </div>
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default TechDisplay;