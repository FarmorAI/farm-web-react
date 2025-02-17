import { useState } from "react";
import { Star } from "lucide-react";

const RatingSection: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="mt-8 w-full max-w-xl p-8 text-center">
      <h3 className="text-xl font-semibold">AI 분석 결과를 평가해주세요</h3>
      <div className="flex justify-center mt-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={40}
            className={`cursor-pointer transition-all duration-300 ${
              star <= (hover || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
            }`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          />
        ))}
      </div>
      <textarea className="mt-4 w-full  h-22 p-2 border rounded-lg" placeholder="의견을 남겨주세요..." />
      <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">제출</button>
    </div>
  );
};

export default RatingSection;
