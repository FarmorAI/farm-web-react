import React from "react";

const SmartFarmBanner: React.FC = () => {
    return (
        <div className="w-full flex justify-center relative overflow-hidden">
            {/* 배너 이미지 */}
            <img
                src="/assets/images/banner.jpg"
                alt="Smart Farm"
                className="max-w-[90rem] max-h-[27rem] w-full h-auto object-cover"
            />

            {/* 로고 이미지 (배너 중앙에 크게 배치) */}
            <img
                src="/assets/images/logo/applepick.png"
                alt="Logo"
                className="absolute top-[45%] left-1/2 max-w-[27rem] h-auto transform -translate-x-1/2 -translate-y-1/2 z-20 scale-105"
            />
        </div>
    );
};

export default SmartFarmBanner;
