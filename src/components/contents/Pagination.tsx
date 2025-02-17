///////////////(페이지네이션 컴포넌트)////////////////////////
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = () => {
  return (
    <div className="flex justify-center p-4">
      <button className="px-3 py-2 text-gray-500 hover:bg-gray-100">
        <FaChevronLeft />
      </button>
      {[1, 2, 3, 4, 5].map((num) => (
        <button key={num} className="px-4 py-2 text-gray-700 hover:bg-gray-200">
          {num}
        </button>
      ))}
      <button className="px-3 py-2 text-gray-500 hover:bg-gray-100">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
