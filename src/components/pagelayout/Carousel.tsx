import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/pagination';

interface Slide {
    image: string;
    title: string;
    subtitle: string;
}

interface CarouselProps {
    slides: Slide[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
    return (
        <div className="w-full max-w-[100vw] h-[600px] md:h-[600px] lg:h-[800px] relative">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                slidesPerView={1}
                className="w-full h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="relative w-screen h-full">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-6">
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Carousel;