import React from "react";

const SmartFarmBanner: React.FC = () => {
    return (
        <div className="w-full flex justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 z-10"></div>
            <img
                src="public/assets/images/banner.jpg"
                alt="Smart Farm"
                className="max-w-[90rem] max-h-108 w-full h-auto object-cover"
            />
        </div>
    );
};

export default SmartFarmBanner;
