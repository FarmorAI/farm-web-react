import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa"; // 아이콘 추가
import { menuData } from "./MenuData";

const Sidebar: FC = () => {
  const location = useLocation();

  // 현재 경로와 가장 일치하는 섹션 찾기
  const currentMenu = menuData.find((menu) => location.pathname.startsWith(menu.path));

  return (
  <aside className="w-64 bg-white border border-gray-500 rounded-lg overflow-hidden ml-20 my-3">
    {/* 헤더 (아이콘 + 텍스트) */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 flex items-center text-white">
        <FaFileAlt className="text-2xl mr-2" />
        <span className="text-lg font-semibold">{currentMenu?.name || "메뉴"}</span>
      </div>

      {/* 메뉴 리스트 */}
      <nav className="p-2 ">
        {currentMenu && (
          <div>
            {currentMenu.links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg shadow-md my-3 border-2 transition ${
                  location.pathname === to 
                    ? "border-blue-600 text-blue-600 bg-white"  // 선택된 메뉴: 파란색 테두리 + 파란색 글씨
                    : "border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600"
                } transition`}
              >
                <span className="ml-3">{label}</span>
              </Link> 
            ))}
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
