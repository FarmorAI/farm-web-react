import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
import { fetchTechInfo, fetchBugInfo } from "../../api/infoApi.ts";

const InfoDisplay = () => {
    const [techInfo, setTechInfo] = useState<{ title: string; thumbnailUrl: string; url: string }[]>([]);
    const [bugInfo, setBugInfo] = useState<{ title: string; fileurl: string }[]>([]);

    useEffect(() => {
        const loadTechInfo = async () => {
            const data = await fetchTechInfo();
            console.log("🔍 Tech Info Data:", data);
            setTechInfo(data.map((item: any) => ({
                title: item.title,
                image: item.thumbnailUrl,
                url: item.url
            })));
        };

        const loadBugInfo = async () => {
            const data = await fetchBugInfo();
            console.log("🐞 Bug Info Data:", data);
            setBugInfo(data.map((item: any) => ({
                title: item.title,
                url: item.fileurl
            })));
        };

        loadTechInfo();
        loadBugInfo();
    }, []);

    return (
        <div className="grid grid-cols-3 gap-4 p-6 bg-white rounded-2xl shadow-md">
            {/* 왼쪽: 이달의 농업기술 */}
            <div className="col-span-2">
                <h2 className="text-2xl font-bold text-purple-700 mb-4">이달의 농업기술</h2>
                <div className="relative">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={3}
                        navigation
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                    >
                        {techInfo.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="rounded-xl overflow-hidden shadow-lg">
                                    <img src={item.thumbnailUrl} alt={item.title} className="w-full h-48 object-cover" />
                                    <a
                                        href={item.thumbnailUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block p-3 text-sm font-semibold bg-white hover:text-purple-700"
                                    >
                                        {item.title}
                                    </a>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* 오른쪽: 병해충 정보 */}
            <div className="col-span-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">병해충 정보</h2>
                <div className="h-80 overflow-y-auto border rounded-lg p-3 bg-gray-50">
                    {bugInfo.map((item, index) => (
                        <a
                            key={index}
                            href={item.fileurl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-2 mb-2 bg-white rounded-md shadow hover:bg-gray-100"
                        >
                            {item.title}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InfoDisplay;
