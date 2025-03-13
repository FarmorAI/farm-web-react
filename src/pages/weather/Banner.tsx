import { motion } from "framer-motion";

const SmartFarmBanner: React.FC = () => {
  return (
    <div className="w-full relative overflow-hidden bg-gray-900">
      {/* 배경 이미지 컨테이너 */}
      <div className="relative w-full h-[50vh] min-h-[300px] max-h-[600px]">
        <img
          src="/assets/images/banner.jpg"
          alt="Smart Farm"
          className="w-full h-full object-cover brightness-100 transition-all duration-700 ease-in-out"
        />
        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
      </div>

      {/* 컨텐츠 영역 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        {/* 로고 (위로 떠오름 + 반짝임) */}
        <motion.img
          src="/assets/images/logo/applepick.png"
          alt="Logo"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          whileHover={{
            y: -10, // 위로 살짝 떠오름
            filter: "brightness(110%) drop-shadow(0 8px 16px rgba(255, 255, 255, 0.5))", // 반짝이는 그림자
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
          className="w-full max-w-[20rem] sm:max-w-[25rem] md:max-w-[27rem] h-auto transition-all duration-300 ease-in-out sm:hover:filter-[brightness(120%)_drop-shadow(0_10px_20px_rgba(255,255,255,0.6))] md:hover:filter-[brightness(130%)_drop-shadow(0_12px_24px_rgba(255,255,255,0.7))]"
        />

        {/* 슬로건 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          className="mt-4 text-white text-sm sm:text-base md:text-lg font-light text-center"
        >
        </motion.p>
      </div>
    </div>
  );
};

export default SmartFarmBanner;